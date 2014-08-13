docuthon2014
============

Interim space to hold revamped content for AllSeen Alliance developer content.

Organization
------------

* `docs/` - contains source of docs.
* `templates/` - templates used to generate HTML
* `scripts/` - scripts to generate HTML and to host server
* `out/public/` - generated HTML files.

How to run scripts
------------------

node.js is required.  Install from from an [installer][] or from a [package manager][].

[installer]: http://nodejs.org/download/
[package manager]: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

Install node modules:

    cd scripts
    npm install
    cd ..

Runs this to generate the HTML files in `out/public/`:

    scripts/generate_html.js

Or, run in watch mode to wait (forever) for changes in docs/files to generate the HTML files.

    scripts/generate_html.js watch
    
Run this once to start a server to host HTML fiels in `out/public/`:

    scripts/server.js
    
Optionally, you can specify a port:

    scripts/server.js 8080

Doc layout and format
---------------------

* All docs are located in `docs/` with the `.md` extension.  Each file will be a web page.  
* The organization of dirs within `docs/` follow our outline.
* Docs use [markdown formatting][].  There are lots of resources on the interwebs, like this [cheatsheet][]
* `docs/path/to/dir/index.md` is special.  It is what will be rendered at `http://server/path/to/dir/`.
* `docs/nav.md` is special. It is used to create left nav.

[markdown formatting]: http://daringfireball.net/projects/markdown/
[cheatsheet]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

Additional Tips
---------------

* Markdown supports lots of formatting, like `code` or code blocks.  If you have questions, lmk.
* There are a few ways to do links. Follow the examples in `docs/` for link references.  It's easier to read.
* You can edit/preview and commit directly in github on the web.
* http://dillinger.io/ is a great live Markdown editor.  It shows you formatting as you type.  You can save files.  
  It auto-saves as you type.  You can close the tab and reopen it and your content will still be there.  
  Pretty darn cool!
* Renaming pages/links.  This trick should work.

    grep -l -r '/learn/core-architecture' * |xargs sed -i 's!/learn/core-architecture!/learn/core-framework!g'

Test Server
-----------

This server will pull from this github repo every 30 seconds and generate new HTML.  Ping waynelee if it no workie.

http://bspencer-linux:8888/
