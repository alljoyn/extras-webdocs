#!/usr/bin/env node

/******************************************************************************
 * Copyright (c) 2014, AllSeen Alliance. All rights reserved.
 *
 *    Permission to use, copy, modify, and/or distribute this software for any
 *    purpose with or without fee is hereby granted, provided that the above
 *    copyright notice and this permission notice appear in all copies.
 *
 *    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 *    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 *    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 *    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 *    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 *    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 *    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 ******************************************************************************/

var marked = require('marked');
var fs = require('fs');
var htmlparser = require('htmlparser2');
var html = require('htmlparser-to-html');
var highlight = require('highlight.js')

// Note, there are some hard coded paths sprinkled through code.
var docs_dir = 'docs/';
var files_dir = 'files/';
var templates_dir = 'templates/';
var nav_file = docs_dir + 'nav.md';

var page_pre_filename = templates_dir + 'page_pre.html';
var page_postnav_filename = templates_dir + 'page_postnav.html';
var page_post_filename = templates_dir + 'page_post.html';

var out_base_dir = 'out/public/';
var for_import_base_dir = 'out/for_import/';
var deploy_html_dir_prefix = 'develop/';
var deploy_files_dir_prefix = 'sites/default/files/develop/';

// ==========================================================================
// Functions to manipulate left nav to show/hide based on current page
// ==========================================================================

function set_hidden(node, hidden) {
    if (node && hidden && node.name != 'a' && "attribs" in node) {
        node.attribs.hidden=1;
    }
    if (node && !hidden && ("attribs" in node) && ("hidden" in node.attribs)) {
        delete node.attribs['hidden'];
    }
}

function set_all_children_hidden(root) {
    if ("children" in root) {
        for (var i=0; i<root.children.length; i++) {
            var node = root.children[i];
            set_hidden(node, true);
            set_all_children_hidden(node);
        }
    }
}

function set_all_parents_children_not_hidden(root) {
    set_hidden(root, false);
    if ("children" in root) {
        for (var i=0; i<root.children.length; i++) {
            var node = root.children[i];
            set_hidden(node, false);
        }
    }
    if ("parent" in root && root.parent) {
        set_all_parents_children_not_hidden(root.parent);
    }
}

function find_page(url, root) {
    if (("type" in root) && (root.type == 'tag') && (root.name == 'a') &&
        (root.attribs.href == url)) {
        return root;
    }
    if ("children" in root) {
        for (var j=0; j<root.children.length; j++) {
            var node = root.children[j];
            var found_node = find_page(url,node);
            if (typeof found_node != "undefined") {
                return found_node;
            }
        }
    }
}

function get_nav(file) {
    var url = file.slice(5,-3); // remove leading "docs/" and trailing ".md"
    if (url.slice(-5) == 'index') url = url.slice(0,-6);  // remove trailing "/index"
    url = '/' + deploy_html_dir_prefix + url;

    var processed_nav_dom;
    var handler = new htmlparser.DomHandler(function(err, dom) {
        // Mark all nodes not at the root level as hidden
        for (var i=0; i<dom[0].children.length; i++) {
            var child = dom[0].children[i];
            set_all_children_hidden(child);
        }

        var node = find_page(url, dom[0]);
        if (node) {
            // set class so current page is highlighted in nav
            node.attribs.id = 'active';

            // show all of the node's "children"
            if ('next' in node && node.next && 'type' in node.next && node.next.type == 'tag' &&
                'name' in node.next && (node.next.name == 'ul') && 'children' in node.next) {
                set_hidden(node.next, false);
                for (var i=0; i<node.next.children.length; i++) {
                    set_hidden(node.next.children[i], false);
                }
            }

            // show all of the node's parents and parent's children
            set_all_parents_children_not_hidden(node);
        }
        processed_nav_dom = dom;
    });

    new htmlparser.Parser(handler).parseComplete(nav);
    return html(processed_nav_dom);
}

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
        if (fs.statSync(file).isFile()) {
            fs.unlinkSync(file);
        } else {
            rmdir(file);
        }
    }
    fs.rmdirSync(path);
}

// ==========================================================================
// Main processing functions
// ==========================================================================

var pre = fs.readFileSync(page_pre_filename, 'utf8');
var postnav = fs.readFileSync(page_postnav_filename, 'utf8');
var post = fs.readFileSync(page_post_filename, 'utf8');
var nav;

var renderer = new marked.Renderer();
function adjust_href(href) {
    var adj_href = href;

    if (href.substring(0,7) == '/files/') {
        adj_href = '/' + deploy_files_dir_prefix + href.substring(7);
    } else if (href[0] == '/') {
        adj_href = '/' + deploy_html_dir_prefix + href.slice(1);
    }
    return adj_href;
}

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
        return highlight.highlightAuto(code, [lang]).value;
    else
        return highlight.highlightAuto(code).value;
  },
  renderer: renderer
});


function parse_file(file) {
    console.log("Parsing file", file);

    // only process .md files
    if (file.slice(-3) != '.md') return;

    var out_file = out_base_dir + deploy_html_dir_prefix + '/' + file.slice(5,-3);
    var for_import_file = for_import_base_dir + deploy_html_dir_prefix + '/' + file.slice(5,-3);

    var content = marked(fs.readFileSync(file, 'utf8'));

    var gh = 'https://github.qualcomm.com/waynelee/docuthon2014/edit/master/';
    var edit = "<div>Edit: <a href='" + gh + "docs/nav.md'>Nav</a> | " + 
               "<a href='" + gh + file + "'>Page</a></div>";

    var out = pre + edit + get_nav(file) + postnav + content + post

    // Create file for development/preview
    create_parent_dirs(out_file);
    fs.writeFileSync(out_file, out, 'utf8');

    // Create file for Drupal import
    create_parent_dirs(for_import_file);
    fs.writeFileSync(for_import_file, content, 'utf8');
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
            var out_file = out_base_dir + deploy_files_dir_prefix + path.substring(6) + '/' + files[i];
            create_parent_dirs(out_file);
            fs.writeFileSync(out_file, fs.readFileSync(file))

            // Copy files into directory for import into Drupal
            var out_file = for_import_base_dir + deploy_files_dir_prefix + path.substring(6) + '/' + files[i];
            create_parent_dirs(out_file);
            fs.writeFileSync(out_file, fs.readFileSync(file))
        }
    }
}

function generate_nav_yaml() {
    var nav = fs.readFileSync(nav_file, {encoding:'utf8'});
    var out = "";

    lines = nav.split(/\r?\n/);
    for (var i=0; i<lines.length; i++) {
        var line = lines[i];
        matches = line.match(/(\s*)\* \[([^\]]+)\]\(([^\)]+)/);
        if (matches && matches.length == 4) {
            var indent = matches[1] + matches[1];
            var name = matches[2];
            var path = matches[3];

            out += indent + '- name: ' + name + '\n' +
                   indent + '  path: ' + path + '\n' +
                   indent + '  contents:' + '\n';
        } else {
            console.log("error processing nav line", i, line)
        }
    }
    fs.writeFileSync(for_import_base_dir + 'nav.yaml', out);
}

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

function generate_docuthon_status() {
    var scripts = {
        commit: 'git rev-parse HEAD',
        branch: 'git rev-parse --abbrev-ref HEAD',
        status: 'git status --short',
        diff: 'git diff',
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
        fs.writeFileSync(for_import_base_dir + 'docuthon.status',
            JSON.stringify(json, null, 2));
    });
}

function build_html() {
    console.log("Building html");
    rmdir(out_base_dir);
    nav = marked(fs.readFileSync(nav_file, 'utf8'));
    parse_dir(docs_dir);
    copy_files(files_dir);

    // Add top level index to redirect to first page of content
    fs.writeFileSync(out_base_dir + 'index', '<meta http-equiv="refresh" content="1;url=/' + 
        deploy_html_dir_prefix + '">');

    // Generate the nav file for Drupal import
    generate_nav_yaml();

    generate_docuthon_status();
}

// ==========================================================================
// Main program
// ==========================================================================

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
