# ABOUT THIS DOCUMENT

This document contains examples of all possible markdown styling supported by the Allseen system.

# HEADERS

Headers are preceded by one or more #:

# Header1
## Header2
### Header 3
#### Header 4

# EMPHASIS

You can use * or _ to mark text for emphasis. One is italic, two is bold:

This is *Italic*

This is _also Italic_

This is **Bold**

This is __also Bold__

*You **can** combine the two*

~~This is strikethrough~~

# LISTS

Contrary to other markdown dialects, stars are used iso hyphens.

##Simple unordered list:

* Bullet One
* Bullet Two

##Nested unordered  list:

* Bullet One
  * Nested Bullet One
  * Nested Bullet two
* Bullet Two

##Simple ordered list

1. Item One
2. Item Two

##Nested ordered list

1. Item One
   1. Sub-Item One
   2. Sub-Item Two
2. Item Two

##Combined ordered and unordered

1. Item One
2. Item Two
3. Item Three
   * Bullet One
   * Bullet Two

## Multiple Paragraphs in Lists
List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:

1.  This is a list item with two paragraphs. Bacon ipsum dolor sit amet tail short loin shank     ham capicola. Ground round cow corned beef prosciutto. 

    Tail venison kielbasa ground round 	boudin short ribs biltong hamburger spare ribs jerky. 

2.  Brisket tenderloin flank shankle andouille hamburger.

# QUOTES AND CODE 

## Block Quotes

> Bacon ipsum dolor sit amet tail short loin shank ham capicola. Ground round cow corned beef prosciutto. Tail venison kielbasa ground round boudin short ribs biltong hamburger spare ribs jerky. Brisket tenderloin flank shankle andouille hamburger.

> Corned beef tri-tip capicola, pork chuck bresaola brisket frankfurter boudin pork chop meatball. Sirloin filet mignon short ribs meatloaf chicken turkey ground round jerky ham tenderloin. Salami hamburger pork chop pork kielbasa ground round corned beef ribeye, fatback shank andouille meatball. Meatloaf frankfurter brisket andouille turducken pork chop swine doner beef ribs spare ribs pork belly. Capicola shoulder brisket, landjaeger swine doner chuck boudin kielbasa turducken bresaola rump. Sirloin porchetta flank fatback, filet mignon tail pig bacon. Pork drumstick jerky, salami ground round shankle andouille ball tip tri-tip spare ribs flank bacon short loin meatball fatback.

Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here is some example code:
> 
>     return shell_exec("echo $input | $markdown_script");

## Code 

```
function test() {
  console.log("notice the blank line before this function?");
}
```



# TABLES

Not all markdown dialects support tables, but Github fortunately does.  You can also use [Markable](http://markable.in/editor) to preview the markdown code. 

You can create tables by assembling a list of words and dividing them with hyphens "-" for the first row), and then separating each column with a pipe "|":

First Header  | Second Header
------------- | -------------
Cell one      | Cell two
Cell three    | Cell four

For aesthetic purposes, you can also add extra pipes on the ends:

| First Header  | Second Header |
| ------------- | ------------- |
| Cell one      | Cell two      |
| Cell three    | Cell four     |

Note that the dashes at the top don't need to match the length of the header text exactly:

| Name | Description          |
| ------------- | ----------- |
| Red Button    | You will not resist pushing this.|
| Cord          | You know you want to pull it.    |

You can also include inline Markdown such as links, bold, italics, or strikethrough:

| Name | Description          |
| ------------- | ----------- |
| Red Button    | ~~You will not~~ resist pushing this.|
| Cord          | _You know_ you want to pull it.    |

Finally, by including colons : within the header row, you can define text to be left-aligned, right-aligned, or center-aligned:

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| left          | centered        | right |
| aligned       | aligned         | aligned |

A colon on the left-most side indicates a left-aligned column; a colon on the right-most side indicates a right-aligned column; a colon on both sides indicates a center-aligned column.

# BACKSLASH ESCAPE

Markdown allows you to use backslash escapes to generate literal characters which would otherwise have special meaning in Markdown’s formatting syntax. For example, if you wanted to surround a word with literal asterisks, you can use backslashes before the asterisks, like this:

\* These are literal asterisks. This line is not emphasized. \*

You can escape other formatting characters in the same way.

# URL LINKS

Complete syntax

[Visit GitHub!](http://www.github.com)

Github also auto-formats a link if it recognizes a URL as such:

http://www.github.com

# Links to Other Pages

This is [a link to another page][doc-link].

Here, the [linked doc][folder-doc-link] is in a subfolder.

# ANCHORS

In standard Markdown, place an anchor <a name="abcd"> </a> where you want to link to and refer to it on the same page by [link text](#abcd).

# LINKS

Though there are multiple mechanisms for creating external links, we recommend a) using reference style links, b) using full paths relative to the host, and c) placing link paths at the end of the document. This makes it easier to parse and find links in case we need to make a global search/replace.

Here are a few examples:

This is a link to [an external document in the same dir][id-of-link]

This one links to a [document in a subfolder][id-of-link2]

Note, the actual link path is at the bottom of this document (see the source of this document).

# INSERTING IMAGES

Image links are preceded by "!" . Alt text is put between straight brackets "[]". 

For images hosted locally:

* Use reference style links, 
* Full paths relative to the host, and 
* Put url paths at the end of the document. Example:

![Dummy Image][dummy-image]

For images from the internet, provide the URL instead of the path.

![Darfield] [Darfield]

[doc-link]: linked_doc
[folder-doc-link]: subfolder/linked_doc
[dummy-image]: Images/Dummy.jpg
[Darfield]: http://project-nerd.com/wp-content/uploads/2012/12/Garfield-Dalek.jpg

