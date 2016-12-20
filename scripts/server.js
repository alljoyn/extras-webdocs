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

var express = require('express');
var fs = require('fs');
var os = require('os');
var isBinaryFileSync = require('isbinaryfile');

var app = express();

app.get(/^(.*)$/, function(req, res) {
  var path = 'out/public' + req.params[0];
  var out = "No content at path";
  if (fs.existsSync(path)) {
      stats = fs.statSync(path);
      if (stats.isFile()) {
          console.log("Serving", path);
          if (isBinaryFileSync(path)) {
              out = fs.readFileSync(path);
          } else {
              out = fs.readFileSync(path,'utf8');
          }
          if (path.substring(path.length-4) == '.css') {
            res.contentType('text/css')
          }
          if (path.substring(path.length-4) == '.pdf') {
            res.contentType('application/pdf')
          }

      } else {
          path = path + '/index';
          if (fs.existsSync(path)) {
              console.log("Serving", path);
              out = fs.readFileSync(path, 'utf8');
          } else {
              console.log("Bad path", path);
          }
      }
  } else {
     console.log("Bad path", path);
  }
  res.send(out);
});

var port = 8000;
if (process.argv.length >= 3) { 
    port = process.argv[2];
}

var server = app.listen(port, function() {
    console.log('Started server: http://' + os.hostname() + ':' + port);
});

server.on('error', function(err) {
    if (err.syscall == 'listen' && err.code == 'EADDRINUSE') {
      console.log("Port", port, "already in use")
    } else {
      console.log(err.message);
    }
});
