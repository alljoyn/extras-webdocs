webdocs
=======

Project contains content for AllSeen Alliance developer website.

Organization
------------

* `docs/` - contains source of docs.
* `templates/` - templates used to generate HTML
* `scripts/` - scripts to generate HTML and to host server
* `out/public/` - generated HTML files.
* `out/for_import/` - generated HTML for Drupal import (usually not needed)

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

    node scripts/generate_html.js

Or, run in watch mode to wait (forever) for changes in docs/files to generate the HTML files.

    node scripts/generate_html.js watch
    
Run this once to start a server to host HTML fiels in `out/public/`:

    node scripts/server.js
    
Optionally, you can specify a port:

    node scripts/server.js 8080

Doc layout and format
---------------------

* All docs are located in `docs/` with the `.md` extension.  Each file will be a web page.
* Docs use [markdown formatting][].  There are lots of resources on the interwebs, like this [cheatsheet][]
* `docs/path/to/dir/index.md` is special.  It is what will be rendered at `http://server/path/to/dir/`.
* `docs/nav.yaml` is special. It is used to create left nav.

[markdown formatting]: http://daringfireball.net/projects/markdown/
[cheatsheet]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

Workarounds
-----------

If you get this error on Windows when running `npm install`:

```bat
Error: ENOENT, stat 'C:\Users\username\AppData\Roaming\npm'
```

Do this:

```bat
mkdir C:\Users\username\AppData\Roaming\npm
```

How to run script for import into Drupal
----------------------------------------

If you want to generte the for_import directory to create content in a format
for the Drupal import scripts, then run like the following. Note, most everyone
will not need to do this.

    node scripts/generate.js import