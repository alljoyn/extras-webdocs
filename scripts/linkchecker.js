#!/usr/bin/env node

/******************************************************************************
 *    Copyright (c) Open Connectivity Foundation (OCF) and AllJoyn Open
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
 *    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
 *    WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 *    WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
 *    AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
 *    DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 *    PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 *    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *    PERFORMANCE OF THIS SOFTWARE.
 ******************************************************************************/
var fs = require('fs');
var path = require('path');
var htmlparser = require("htmlparser2");
var url = require("url");

function recursiveFiles(file, callback) {
	fs.stat(file, function(err, stat) {
		if (err) {
			callback(err);
		} else {
			if (stat.isFile()) {
				callback(null, [file])
			} else if (stat.isDirectory()) {
				fs.readdir(file, function(err, files) {
					var toScan = files.length;
					var gathered = [];
					if(0 == toScan) {
						callback(null, []);
					} else {
						for (var i = files.length - 1; i >= 0; i--) {
							recursiveFiles(path.join(file, files[i]), function(err, found) {
								if(err) {
									callback(err);
								} else {
									gathered = gathered.concat(found);
									if(0 == --toScan) {
										callback(null, gathered);
									}
								}
							});
						}
					}
				});
			} else {
				callback("Unkown file type '" + file + "'");
			}
		}
	});
}

function check(root, start) {
	process.chdir(root);
	recursiveFiles('.', function(err, allFiles) {
		var fileStatus = {};
		var notFound = {};
		var visiting = 0;

		for (var i = allFiles.length - 1; i >= 0; i--) {
			fileStatus[path.normalize("/" + allFiles[i])] = {visited: false, used:false};
		};

		var visit, done;

		emit404 = function(file, from) {
			notFound[file] = notFound[from] || []
			notFound[file].push(from);
		}

		visit = function(file, from) {
			if(!fileStatus[file]) {
				var indexedFile = path.normalize(file + "/index");
				if(!fileStatus[indexedFile]) {
					emit404(file,from);
					return;
				} else {
					file = indexedFile;
				}
			}
            var dirname = path.dirname(file);

			if(fileStatus[file].visited) {
				return;
			}

			++visiting
			fileStatus[file].visited = true;
			fileStatus[file].used = true;

			fs.readFile("." + file, 'utf8', function (err,data) {
				if (err) {
					console.error(file + " " + err);
				} else {
					var parser = new htmlparser.Parser({
						onopentag: function(name, attribs){
							if(("a" == name) && (attribs["href"])){
								var href = url.parse(attribs["href"]);
								if((!href.hostname) && (href.pathname)) {
                                    /* resolve against dirname, so we can deal with relative links */
									newFile = path.resolve(dirname, href.pathname).replace(/^[A-Z]:/,'');
									visit(newFile, file);
								}
							}
							if("img" == name) {
								var src = url.parse(attribs["src"]);
								if(!src.hostname) {
                                    /* resolve against dirname, so we can deal with relative links */
									var img = path.resolve(dirname, src.pathname).replace(/^[A-Z]:/,'');
									if(fileStatus[img]) {
										fileStatus[img].used = true;
									} else {
										emit404(img, file);
									}
								}
							}
						}
					});

					parser.write(data);
					parser.end();
				}

				if(0 == --visiting) {
					done();
				}
			});
		}

		done = function() {
			console.log("Done");
			if(0 < Object.keys(notFound).length) {
				console.error("Not Found:\n==========");
				for (var link in notFound) {
					console.error(" - " + link + " referenced by: " + notFound[link]);
				};
			}

			var notUsed = [];
			for(var file in fileStatus) {
				if(!fileStatus[file].used) {
					notUsed.push(file);
				}
			}
			if(0 < notUsed.length) {
				console.error("Not Used:\n=========");
				for (var i = notUsed.length - 1; i >= 0; i--) {
					console.error(" - " + notUsed[i]);
				};
			}
		};

		if(! fs.existsSync("."+start)) {
			console.error("Root " + start + " does not exists");
		}
		visit(start, "<initialization>");
	});
}
var initialroot = path.normalize ('out/public');
var initialstart = path.normalize ('/framework/documentation/index');

function parse_cmdline_args() {
    var root_dir="../../interfaces/";

    var i = 0;
    for (i = 2; i < process.argv.length; ++i) {
        var arg = process.argv[i];
        if (arg == '-r' && ++i < process.argv.length) {
            initialroot = path.normalize(process.argv[i]);
        } else if (arg == '-s' && ++i < process.argv.length) {
            initialstart = path.normalize(process.argv[i]);
        } else {
            console.log("Usage:");
            console.log("  ", process.argv[1], "[-r renderer_output_dir] [-s start_url]");
            console.log("Arguments:");
            console.log("\t-r renderer_output_dir: output path of the rendering script");
            console.log("\t                        (default: out/public/)");
            console.log("\t                        Normally, you shouldn't have to change this.");
            console.log("\t-s start_url: URL path from which to start validation.");
            console.log("\t              For webdocs: /framework/documentation/index");
            console.log("\t              For interface definitions: /interfaces/index");
            console.log("\t              (default: /framework/documentation/index)");
            process.exit(1);
        }
    }

    docs_dir = root_dir + 'interfaces/';
}

parse_cmdline_args();
console.log ("root: "+initialroot);
console.log ("start at: "+initialstart);

check(initialroot,initialstart)