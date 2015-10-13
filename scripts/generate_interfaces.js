#!/usr/bin/env node

//TODO index files in all directories

/******************************************************************************
 * Copyright (c) Open Connectivity Foundation (OCF) and AllJoyn Open
 *    Source Project (AJOSP) Contributors and others.
 *
 *    SPDX-License-Identifier: Apache-2.0
 *
 *    All rights reserved. This program and the accompanying materials are
 *    made available under the terms of the Apache License, Version 2.0
 *    which accompanies this distribution, and is available at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Copyright (c) Open Connectivity Foundation and Contributors to AllSeen
 *    Alliance. All rights reserved.
 *
 *    Permission to use, copy, modify, and/or distribute this software for
 *    any purpose with or without fee is hereby granted, provided that the
 *    above copyright notice and this permission notice appear in all
 *    copies.
 *
 *     THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
 *     WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 *     WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
 *     AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
 *     DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 *     PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 *     TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *     PERFORMANCE OF THIS SOFTWARE.
 ******************************************************************************/

var marked = require('marked');
var fs = require('fs');
var yaml = require('yamljs')
var escape = require('escape-html');

/* templates for local (non-import) rendering */
var templates_dir = 'templates/';
var page_pre_filename = templates_dir + 'page_pre.html';
var page_postnav_filename = templates_dir + 'page_postnav.html';
var page_post_filename = templates_dir + 'page_post.html';

/* output directories */
var timestamp = new Date().getTime();
var out_dir = 'out/';
var out_public_dir = out_dir + 'public/';
var for_import_wrapper_dir = out_dir + 'for_import/';
var for_import_base_dir = for_import_wrapper_dir + timestamp + '/';
var for_import_prev_dir = for_import_wrapper_dir + 'latest/';
var gen_dir = out_dir + 'gen/';
var gen_indexes_dir = gen_dir + 'indexes/';
var deploy_html_dir_prefix = 'interfaces/';
var deploy_files_dir_prefix = 'sites/default/files/' + deploy_html_dir_prefix;

/* overridden by command-line parsing */
var docs_dir = '../../interfaces/interfaces/';
var nav_file = gen_dir + 'nav.yaml';
var doImport = false;
var doWatch = false;

/* global state variables needed in rendering callbacks */
var CURRENT_PATH = '';
var CURRENT_PREFIX = '';

// ==========================================================================
// File/dir manipulation helpers
// ==========================================================================

function normalize_dir(path) {
    if (path.slice(-1) != '/') {
        return path + '/';
    }
    return path;
}

function create_parent_dirs(path) {
    var parts = path.split('/');
    var p = '';
    for (var i=0; i<parts.length-1; i++) {
        p = p + parts[i] + '/';
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
}

function rmdir(path) {
    if (!fs.existsSync(path)) return;

    var files = fs.readdirSync(path);
    for (var i=0; i<files.length; i++) {
        var file = path + '/' + files[i];
        if (fs.lstatSync(file).isDirectory()) {
            rmdir(file);
        } else {
            fs.unlinkSync(file);
        }
    }
    fs.rmdirSync(path);
}

// ==========================================================================
// Main processing functions - helpers
// ==========================================================================

function adjust_href(href) {
    var adj = adjust_href2(href);
    return adj;
}

function adjust_href2(href) {
    if (href.indexOf("://") != -1) {
        /* full-scale URL, leave it alone */
        return href;
    }

    var is_relative = href[0] != '/';

    var parts = split_file_name(href, "");
    if (parts.extension == '') {
        /* HTML content generated from .md file */
        if (is_relative) {
            /* leave relative document links alone */
            return href;
        }
        /* absolute links need to be transmogrified */
        return '/' + deploy_html_dir_prefix + href.slice(1);
    } else {
        /* auxiliary content copied to /sites/default/interfaces/... */
        var abs_href = href;
        if (is_relative) {
            abs_href = normalize_dir(CURRENT_PATH) + href;
        }
        return '/' + deploy_files_dir_prefix + abs_href.slice(1);
    }

    return href;
}

// ==========================================================================
// Main processing functions - left nav
// ==========================================================================

function adj_nav(objs, path, show) {
    // if path found, show children, siblings, parents, parents siblings,
    // grandparents and grandparent siblings, etc
    var path_found = false
    for (var i=0; i<objs.length; i++) {
        var obj = objs[i];
        var show_children = false

        if (!show)
            obj.hidden = 1
        if ('path' in obj) {
            obj.path = adjust_href(obj.path)
            if (obj.path == path) {
                obj.id = 'active'
                path_found = true
                show_children = true
            }
        }
        if ('contents' in obj && obj.contents) {
            path_found |= adj_nav(obj.contents, path, show_children)
        }
    }

    if (path_found) {
        for (var i=0; i<objs.length; i++) {
            var obj = objs[i];
            obj.hidden = 0
        }
    }
    return path_found
}

function get_indent_str(cnt) {
    var str = "";
    for (var i=0; i < cnt; i++) {
        str += " ";
    }
    return str
}
function gen_nav_html(objs, indent) {
    if (!objs) return "";

    str = "";
    str += get_indent_str(indent) + "<ul>\n"
    for (var i=0; i<objs.length; i++) {
        var obj = objs[i];
        if ('name' in obj && 'path' in obj) {
            var hidden_str = ""
            var id_str = ""
            if (obj.hidden == 1)
                hidden_str = " hidden=1"
            if ('id' in obj)
                id_str = " id='active'"
            str += get_indent_str(indent+4) + '<li' + hidden_str + '><a href="' + obj.path +
                   '"' + id_str + '>' + obj.name + '</a></li>\n'
        }
        if ('contents' in obj && obj.contents)
            str += gen_nav_html(obj.contents, indent+4)
    }
    str += get_indent_str(indent) + "</ul>\n"
    return str;
}

// ==========================================================================
// Main processing function - doc html generation
// ==========================================================================

var pre = fs.readFileSync(page_pre_filename, 'utf8');
var postnav = fs.readFileSync(page_postnav_filename, 'utf8');
var post = fs.readFileSync(page_post_filename, 'utf8');

var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
    title_str = '';
    text_str = '';
    if (title) title_str = ' title="' + title + '"';
    if (text) text_str = text;
    return '<a href="' + adjust_href(href) + '"' + title_str + '>' + text + '</a>';
}

renderer.image = function(href, title, alt) {
    title_str = '';
    alt_str = '';
    if (title) title_str = ' title="' + title + '"';
    if (alt) alt_str = ' alt="' + alt + '"';
    return '<img src="' + adjust_href(href) + '"' + title_str + alt_str + '>';
}

marked.setOptions({
  highlight: function (code, lang) {
    if (lang)
        return '<code class="' + lang + '">' + escape(code) + '</code>';
    else
        return '<code>' + escape(code) + '</code>';
  },
  renderer: renderer
});

function split_file_name(file, prefix) {
    /* strip off the prefix */
    var relpath = file;
    if (file.slice(0, prefix.length) == prefix) {
        relpath = file.slice(prefix.length);
    }

    /* split dirname, basename, extension */
    var lastSlash = relpath.lastIndexOf("/");
    var lastDot = relpath.lastIndexOf(".");

    var dirname = lastSlash == -1 ? "" : relpath.slice(0, lastSlash);
    var basename = relpath.slice(lastSlash + 1);
    var extension = "";
    if (lastDot > lastSlash) {
        extension = relpath.slice(lastDot);
        basename = relpath.slice(lastSlash + 1, lastDot);
    }

    var parts = {
        "path" : relpath,
        "dirname" : dirname,
        "basename" : basename,
        "extension" : extension
    };

    return parts;
}

function render_file(file) {
    // console.log("Rendering file", file);
    var parts = split_file_name(file, CURRENT_PREFIX);

    // only process .md files
    if (parts.extension != '.md') return;

    // The basename should not contain any dots. If it does, the file is most probably
    // placed in the wrong directory. Explain this to the user.
    if (parts.basename.indexOf('.') != -1) {
        var suggested_dir = parts.dirname + '/' + parts.basename.slice(0, parts.basename.lastIndexOf('.'));
        var suggested_filename = parts.basename.slice(parts.basename.lastIndexOf('.') + 1) + parts.extension;
        var suggested = suggested_dir + '/' + suggested_filename;
        console.log("WARNING: The file '" + parts.path + "' has an invalid name: dots are not allowed in markdown file names.");
        console.log("         This file will be skipped.");
        console.log("         Did you mean to create a file called '" + suggested + "' instead?");
        return;
    }

    var relpath = parts.dirname + '/' + parts.basename;
    var out_file = out_public_dir + deploy_html_dir_prefix + '/' + relpath;
    var for_import_path = deploy_html_dir_prefix + '/' + relpath;

    CURRENT_PATH = '/' + parts.dirname + '/';
    var content = marked(fs.readFileSync(file, 'utf8'));
    CURRENT_PATH = '';

    var navpath = '/' + deploy_html_dir_prefix + (parts.basename == 'index' ? parts.dirname + '/' : relpath);
    if (navpath.slice(-2) == '//') {
        /* fix special case for interfaces/index */
        navpath = navpath.slice(0, -1);
    }

    var nav_objs = yaml.parse(fs.readFileSync(nav_file, 'utf8'))
    adj_nav(nav_objs, navpath, false)
    var nav_html = gen_nav_html(nav_objs, 0)

    var out = pre + nav_html + postnav + content + post

    // Create file for development/preview
    create_parent_dirs(out_file);
    fs.writeFileSync(out_file, out, 'utf8');

    if (doImport) {
        // Create file for Drupal import
        write_import_file(for_import_path, content, 'utf8');
    }
}

function copy_file(file) {
    // console.log("Copying file", file);

    var parts = split_file_name(file, docs_dir);
    var out_file = out_public_dir + deploy_files_dir_prefix + parts.path;
    create_parent_dirs(out_file);
    fs.writeFileSync(out_file, fs.readFileSync(file))

    if (doImport) {
        // Copy files into directory for import into Drupal
        var out_file = deploy_files_dir_prefix + parts.path;
        write_import_file(out_file, fs.readFileSync(file))
    }
}

function process_file(file) {
    // console.log("Processing file", file);
    var parts = split_file_name(file, docs_dir);

    if (parts.extension == ".md") {
        render_file(file);
    } else {
        copy_file(file);
    }
}

function parse_dir(path) {
    //console.log("Parsing dir ", path);
    var files = fs.readdirSync(path);
    for (var i in files) {
        var file = path + files[i];
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            parse_dir(file + '/');
        } else {
            process_file(file);
        }
    }
}

// ==========================================================================
// Main processing function - files
// ==========================================================================

// Write a file for import. Try to save disk space by using hard-links where
// possible.
function write_import_file(relative_path, content, options) {
    var abs_path = for_import_base_dir + relative_path;
    var prev = for_import_prev_dir + relative_path;

    create_parent_dirs(abs_path);
    var identical = false;
    if (fs.existsSync(prev)) {
        var prev_content = fs.readFileSync(prev, options);
        if (prev_content.toString() == content.toString()) {
            identical = true;
        }
    }

    if (identical) {
        fs.linkSync(prev, abs_path);
    } else {
        fs.writeFileSync(abs_path, content, options);
    }
}

// ==========================================================================
// Main processing function
// ==========================================================================

// Execute a series of shell scripts, and callback with an array of outputs
function exec_scripts(scripts, cb) {
    var script = scripts.shift();
    if (script === undefined) {
        cb([]);
    } else {
        var exec = require('child_process').exec;
        exec(script, function(err, stdout, stderr) {
            exec_scripts(scripts, function(outputs) {
                cb([stdout].concat(outputs));
            });
        });
    }
}

function generate_webdocs_status() {
    var scripts = {
        commit: 'git rev-parse HEAD',
        branch: 'git rev-parse --abbrev-ref HEAD',
        status: 'git status --short',
        diff: 'git diff',
        log: 'git log -n1 --pretty=format:%s',
    };

    var keys = [], commands = [];
    for (var k in scripts) {
        keys.push(k);
        commands.push(scripts[k]);
    }

    exec_scripts(commands, function(outputs) {
        var json = {};
        for (var i = 0; i < keys.length; ++i) {
            var out = outputs[i];

            // Remove trailing newline if it's the only one
            if (!out.match(/\n./)) {
                out = out.replace(/\n$/, '');
            }

            json[keys[i]] = out;
        }

        json['timestamp'] = timestamp;
        fs.writeFileSync(for_import_base_dir + 'docuthon.status',
            JSON.stringify(json, null, 2));
    });
}

function set_import_symlink() {
    var latest_path = for_import_wrapper_dir + 'latest';
    if (fs.existsSync(latest_path)) {
        fs.unlinkSync(latest_path);
    }

    try {
	    fs.symlinkSync(timestamp.toString(), latest_path);
    } catch (ex) {
	    // Probably missing platform support, just continue.
    }
}

function copy_redirects() {
    if (fs.existsSync('redirect.csv')) {
        write_import_file('redirect.csv', fs.readFileSync('redirect.csv'));
    }
}

function build_html() {
    console.log("Building html");
    rmdir(out_public_dir);
    rmdir(gen_dir);
    build_nav_file();
    gen_default_index_files();
    CURRENT_PREFIX = gen_indexes_dir;
    parse_dir(gen_indexes_dir);
    CURRENT_PREFIX = docs_dir;
    parse_dir(docs_dir);
    CURRENT_PREFIX = '';

    // Add top level index to redirect to first page of content
    fs.writeFileSync(out_public_dir + 'index', '<meta http-equiv="refresh" content="1;url=/' +
        deploy_html_dir_prefix + '">');

    if (doImport) {
        write_import_file('nav.yaml', fs.readFileSync(nav_file, 'utf8'));
        generate_webdocs_status();
        copy_redirects();
        set_import_symlink();
    }
}

// ==========================================================================
// Build navigation structure
// ==========================================================================
//

function traverse_fs(path, procfile, procdir) {
    //console.log("Traversing dir ", path);
    procfile = procfile || function() {};
    procdir = procdir || function() {};

    var files = fs.readdirSync(path);
    for (var i in files) {
        var file = path + files[i];
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            procdir(file);
            traverse_fs(file + '/', procfile, procdir);
        } else {
            procfile(file);
        }
    }
}

function build_nav_tree() {
    //TODO: deeper tree?
    var interfaces = {};
    interfaces.names = [];

    /* build tree */
    function process_dir(dirname) {
        var lastSlash = dirname.lastIndexOf('/');
        var intfname = dirname.slice(lastSlash+1);
        interfaces[intfname] = [];
        interfaces[intfname].has_index = false;
        interfaces.names.push(intfname);
    }

    function process_file(filename) {
        var parts = split_file_name(filename, docs_dir);
        if (parts.extension == ".md") {
            if (parts.basename != "index") {
                interfaces[parts.dirname].push(parts.basename);
            } else {
                interfaces[parts.dirname].has_index = true;
            }
        }
    }

    traverse_fs(docs_dir, process_file, process_dir);

    /* sort tree */
    interfaces.names.sort();
    for (var i = 0; i < interfaces.names.length; ++i) {
        function filename_compare(a, b) {
            /* put theory-of-operation first if it exists */
            if (a.toLowerCase().match(/theory.*operation/)) {
                return -1;
            }
            if (b.toLowerCase().match(/theory.*operation/)) {
                return 1;
            }

            return (a < b) ? -1 : 1;
        }
        var intf = interfaces.names[i];
        interfaces[intf].sort(filename_compare);
    }

    return interfaces;
}

function build_nav_file() {
    var interfaces = build_nav_tree();
    var content = '- name: Index\n  path: /\n  contents:\n';

    for (var i = 0; i < interfaces.names.length; ++i) {
        var intf = interfaces.names[i];
        if (interfaces[intf].length == 0) {
            continue;
        }

        content += '- name: ' + intf + '\n';
        content += '  path: /'+ intf + '/\n';
        content += '  contents:\n';

        for (var j = 0; j < interfaces[intf].length; ++j) {
            var file = interfaces[intf][j];
            content += '    - name: ' + file.replace(/-/g, ' ') + '\n';
            content += '      path: /' + intf + '/' + file + '\n';
            content += '      contents:\n';
        }
    }

    create_parent_dirs(nav_file);
    fs.writeFileSync(nav_file, content);
}

function gen_default_index_files() {
    var interfaces = build_nav_tree();

    /* generate an index file for interfaces/ */
    var content = '# The AllSeen Standardized Interface Definition Repository\n';
    content += '\n';
    for (var i = 0; i < interfaces.names.length; ++i) {
        var intf = interfaces.names[i];
        if (interfaces[intf].length == 0) {
            continue;
        }

        content += '  * [' + intf + '](' + intf + '/)\n';
    }

    var gen_file_name = gen_indexes_dir + 'index.md';
    create_parent_dirs(gen_file_name);
    fs.writeFileSync(gen_file_name, content);

    /* generate an index file for each of the namespace subdirectories */
    for (var i = 0; i < interfaces.names.length; ++i) {
        var intf = interfaces.names[i];
        if (interfaces[intf].length == 0) {
            continue;
        }
        if (interfaces[intf].has_index) {
            continue;
        }

        var content = '# ' + intf.replace(/-/g, ' ') + '\n';
        content += '\n';

        for (var j = 0; j < interfaces[intf].length; ++j) {
            var filename = interfaces[intf][j];
            content += "  * [" + filename.replace(/-/g, ' ') + "](" + filename + ")\n";
        }

        gen_file_name = gen_indexes_dir + intf + '/index.md';
        create_parent_dirs(gen_file_name);
        fs.writeFileSync(gen_file_name, content);
    }
}

// ==========================================================================
// Main program
// ==========================================================================
//
/* parse command line args */
function parse_cmdline_args() {
    var root_dir="../../interfaces/";

    var i = 0;
    for (i = 2; i < process.argv.length; ++i) {
        var arg = process.argv[i];
        if (arg == 'import') {
            doImport = true;
        } else if (arg == 'watch') {
            doWatch = true;
        } else if (arg == '-d' && ++i < process.argv.length) {
            root_dir = normalize_dir(process.argv[i]);
        } else {
            console.log("Usage:");
            console.log("  ", process.argv[1], "[import] [watch] [-d interfaces_repository_root_dir]");
            console.log("Arguments:");
            console.log("\timport                             : generate Drupal import files");
            console.log("\t                                     for www.allseenalliance.org");
            console.log("\twatch                              : watch the interfaces repository for");
            console.log("\t                                     changes, and regenerate upon change");
            console.log("\t-d interfaces_repository_root_dir  : path to the root of the interfaces.git");
            console.log("\t                                     repository (default: ../../interfaces/)");
            process.exit(1);
        }
    }

    docs_dir = root_dir + 'interfaces/';
}

parse_cmdline_args();
build_html();

// If 'watch' argument specified, watch for file changesa and generate html
if (doWatch) {
    require('node-watch')([docs_dir], function(filename) {
        // Rebuild html unless file changed was vim and emacs backup files
        if (filename.slice(-4,-1) != '.sw' && filename.slice(-1) != '~') {
            console.log(filename, "changed");
            build_html();
        }
    });
}