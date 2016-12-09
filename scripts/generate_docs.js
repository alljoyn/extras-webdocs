#!/usr/bin/env node

/******************************************************************************
 * Copyright (c) 2016 Open Connectivity Foundation (OCF) and AllJoyn Open
 *    Source Project (AJOSP) Contributors and others.
 *
 *    SPDX-License-Identifier: Apache-2.0
 *
 *    All rights reserved. This program and the accompanying materials are
 *    made available under the terms of the Apache License, Version 2.0
 *    which accompanies this distribution, and is available at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Copyright 2016 Open Connectivity Foundation and Contributors to
 *    AllSeen Alliance. All rights reserved.
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

// Note, there are some hard coded paths sprinkled through code.
var docs_dir = 'docs/';
var files_dir = 'files/';
var templates_dir = 'templates/';
var nav_file = docs_dir + 'nav.yaml';

var page_pre_filename = templates_dir + 'page_pre.html';
var page_postnav_filename = templates_dir + 'page_postnav.html';
var page_post_filename = templates_dir + 'page_post.html';

var timestamp = new Date().getTime();
var out_dir = 'out/';
var out_public_dir = out_dir + 'public/';
var for_import_wrapper_dir = out_dir + 'for_import/';
var for_import_base_dir = for_import_wrapper_dir + timestamp + '/';
var for_import_prev_dir = for_import_wrapper_dir + 'latest/';
var deploy_html_dir_prefix = 'framework/documentation/';
var deploy_files_dir_prefix = 'sites/default/files/framework/documentation/';

var doImport = true;

// ==========================================================================
// File/dir manipulation helpers
// ==========================================================================

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
    var adj_href = href;

    if (href.substring(0,7) == '/files/') {
        adj_href = '/' + deploy_files_dir_prefix + href.substring(7);
    } else if (href[0] == '/') {
        adj_href = '/' + deploy_html_dir_prefix + href.slice(1);
    }
    return adj_href;
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

function parse_file(file) {
    console.log("Parsing file", file);

    // only process .md files
    if (file.slice(-3) != '.md') return;

    var out_file = out_public_dir + deploy_html_dir_prefix + '/' + file.slice(5,-3);
    var for_import_path = deploy_html_dir_prefix + '/' + file.slice(5,-3);

    var content = marked(fs.readFileSync(file, 'utf8'));

    var path = file.slice(5,-3); // remove leading "docs/" and trailing ".md"
    if (path.slice(-5) == 'index') path = path.slice(0,-6);  // remove trailing "/index"
    path = '/' + deploy_html_dir_prefix + path;

    var nav_objs = yaml.parse(fs.readFileSync(nav_file, 'utf8'))
    adj_nav(nav_objs, path, false)
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

function parse_dir(path) {
    //console.log("Parsing dir ", path);
    var files = fs.readdirSync(path);
    for (var i in files) {
        var file = path + files[i];
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            parse_dir(file + '/');
        } else {
            parse_file(file);
        }
    }
}

// ==========================================================================
// Main processing function - files
// ==========================================================================

function copy_files(path) {
    //console.log("Copying dir ", path);
    var files = fs.readdirSync(path);
    for (var i in files) {
        var file = path + files[i];
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            copy_files(file + '/');
        } else {
            // Copy files into directory for development/preview
            var out_file = out_public_dir + deploy_files_dir_prefix + path.substring(6) + '/' + files[i];
            create_parent_dirs(out_file);
            fs.writeFileSync(out_file, fs.readFileSync(file))

            if (doImport) {
                // Copy files into directory for import into Drupal
                var out_file = deploy_files_dir_prefix + path.substring(6) + '/' + files[i];
                write_import_file(out_file, fs.readFileSync(file))
            }
        }
    }
}

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
    parse_dir(docs_dir);
    copy_files(files_dir);

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
// Main program
// ==========================================================================
if (process.argv.length >= 3 && process.argv[2] == 'import') {
    doImport = true;
}

build_html();

// If 'watch' argument specified, watch for file changesa and generate html
if (process.argv.length >= 3 && process.argv[2] == 'watch') {
    require('node-watch')(['docs', 'files'], function(filename) {
        // Rebuild html unless file changed was vim and emacs backup files
        if (filename.slice(-4,-1) != '.sw' && filename.slice(-1) != '~') {
            console.log(filename, "changed");
            build_html();
        }
    });
}