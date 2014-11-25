![Allseen Logo][AllSeenlogo]
<a name="Top"> </a>



# Type Document Title Here

Month Day, Year




## Table of Contents

* [Introduction][Intro]
* [Chapter 1 Overview][Chap1]
* [Chapter 2 Some Syntax Examples][Chap2]
* [Chapter 3 title][Chap3]
* [Appendix A Markdown Cheat Sheet][AppA]



Note that this table of contents is on a chapter level, but you can add additional levels
by adding additional anchors. This table uses reference links (see below).


##Introduction

### Purpose

Type a purpose for this document

### Scope

Indicate the targeted audience for this document, e.g. :

This document is intended for software engineers and assumes familiarity with the AllJoyn
SDK. This template actually assumes that you have a very basic knowledge of the markdown text format.

In order to understand all the examples in this template, you need to look at the
non-rendered text in a text editor. If you want to preview what your document will
(more or less) look like, there are a number of editors available on the Internet that provide this.

As a general piece of advice; since this document will become a single page on the Allseen
documentation system in Drupal, keep it concise. Split your document into several sub-documents
if necessary. You can use a top document to link the separate documents together.

### References

If there are pages or documents that complement this one, list them. Otherwise, remove this section.

## Acronyms and Terms

Below is a list of used acronyms and terms:

* **ACR:** Define an acronym here
* **Term:** Define a term here.

[Back to Top][Top]



##Chapter 1 Overview


### What is it all about?

If you need it, and you have too much information to put into the introduction, you can use this
section to provide an overview of what is in the document. 

### Not Too Much Detail

Do not use too much detail here. That comes in subsequent chapters.

### Try Structured Writing

Try writing your document in a structured way. Use labels and block of text and organise
these blocks in consistent "maps" or sections. Entire libraries of books were written
on the subject, so there's no way of going into detail here. But this document template
should already give you an idea.




[Back to Top][Top]
##Chapter 2 Some Syntax Examples

### In this Chapter

Now you're actually starting to write content. Add whatever is needed. For the purposes
of the this template, this chapter will provide you with sample syntax you can use to
create your document. You can copy/paste it and adapt it or write it from scratch.

This chapter serves both as example syntax and as tutorial.

### Overview

<a name="Chap2over"> </a>


* [Paragraph Styles](#paragraph-styles)

* [Text Formatting](#text-formatting)

* [Using Lists](#using-lists)

* [Inserting Images](#inserting-images)

* [Using Code Blocks](#using-code-blocks)

* [Using Block Quotes](#using-block-quotes)

* [Tables](#tables)

* [Using Links](using-links)

* [Formatting Procedures](#formatting-procedures)


### Paragraph Styles

You can use heading style and regular paragraphs. The use of headers is quite obvious
here. You can use h1 to h6. h1 corresponds with a single hash, h2 is two hashes and so on.
For a paragraph, just type regular text.

[Back to Formatting Overview][Chap2over]


### Text Formatting

You can use italic, bold and strikethrough. Here are some examples:

You can use * or _ to mark text for text formatting. One is italic, two is bold:

This is *Italic*

This is _also Italic_

This is **Bold**

This is __also Bold__

*You **can** combine the two*



**Note**

Markdown allows you to use backslash escapes to generate literal characters which
would otherwise have special meaning in Markdown’s formatting syntax. For example,
if you wanted to surround a word with literal asterisks, you can use backslashes before
the asterisks, like this:

 \* These are literal asterisks. This line is not emphasized. \*

You can escape other formatting characters in the same way.

[Back to Formatting Overview][Chap2over]



### Using Lists

Contrary to other markdown dialects, stars are used iso hyphens.

#### Simple unordered list:

* Bullet One
* Bullet Two

#### Nested unordered  list:

* Bullet One
  * Nested Bullet One
  * Nested Bullet two
* Bullet Two

#### Simple ordered list

1. Item One
2. Item Two


#### Nested ordered list

1. Item One
   1. Sub-Item One
   2. Sub-Item Two
2. Item Two

#### Combined ordered and unordered

1. Item One
2. Item Two
3. Item Three
   * Bullet One
   * Bullet Two

#### Multiple Paragraphs in Lists
List items may consist of multiple paragraphs. Each subsequent paragraph in a list item
must be indented by either 4 spaces or one tab:

1.  This is a list item with two paragraphs. Bacon ipsum dolor sit amet tail short loin
    shank ham capicola. Ground round cow corned beef prosciutto.

    Tail venison kielbasa ground round 	boudin short ribs biltong hamburger spare ribs jerky.

2.  Brisket tenderloin flank shankle andouille hamburger.


[Back to Formatting Overview][Chap2over]


### Inserting Images

For images hosted locally:

* Use reference style links, 
* Full paths relative to the host, and 
* Put url paths at the end of the document. Example:

![Dummy Image][dummy-image]

**Figure 1. Sample Figure 1**

For images from the internet, use the URL of the image instead of the path.


![IoE][ioe]

**Warning: ** In this template, images are in a folder "images" nest to the document.
This is for the purposes of the template only.  For AllSeen documents, you should not do
this. Instead, you should put you images, as well as anything you link to in the
webdocs/files folder. The path should be tha same as your document path.

*Example:* if your document is in de docs/learn folder, you linked files and images should
be in the files/learn folder.

Be sure to test your links before submitting your documents.


**Figure 2. Sample Figure 2**

Always put the figure title below the figure and use **bold**.

[Back to Formatting Overview][Chap2over]



### Using Code Blocks

A code block is a specifically styled paragraph format, use for representing
(you've guessed it) a block of code.


```
function test() {
  console.log("notice the blank line before this function?");
}
```

[Back to Formatting Overview][Chap2over]


### Using Block Quotes

Block quotes are another type of paragraph with a specific layout. Below is an example:
Block Quotes

> Bacon ipsum dolor sit amet tail short loin shank ham capicola. Ground round cow
corned beef prosciutto. Tail venison kielbasa ground round boudin short ribs biltong
hamburger spare ribs jerky. Brisket tenderloin flank shankle andouille hamburger.

> Corned beef tri-tip capicola, pork chuck bresaola brisket frankfurter boudin pork
chop meatball. Sirloin filet mignon short ribs meatloaf chicken turkey ground round
jerky ham tenderloin. Salami hamburger pork chop pork kielbasa ground round corned
beef ribeye, fatback shank andouille meatball. Meatloaf frankfurter brisket andouille
turducken pork chop swine doner beef ribs spare ribs pork belly. Capicola shoulder
brisket, landjaeger swine doner chuck boudin kielbasa turducken bresaola rump.
Sirloin porchetta flank fatback, filet mignon tail pig bacon. Pork drumstick jerky,
salami ground round shankle andouille ball tip tri-tip spare ribs flank bacon short
loin meatball fatback.

Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     return shell_exec("echo $input | $markdown_script");

[Back to Formatting Overview][Chap2over]


### Tables

There are a couple of ways you can format tables.You can create them by assembling a
list of words and dividing them with hyphens "-" for the first row), and then separating
each column with a pipe "|". Always precede a table with a table title in **bold**.

**Table 1: Sample table 1**

First Header  | Second Header
------------- | -------------
Cell one      | Cell two
Cell three    | Cell four

For aesthetic purposes, you can also add extra pipes on the ends:

**Table 2: Sample table 2**

| First Header  | Second Header |
| ------------- | ------------- |
| Cell one      | Cell two      |
| Cell three    | Cell four     |

Note that the dashes at the top don't need to match the length of the header text exactly:

**Table 3: Sample table 3**

| Name | Description          |
| ------------- | ----------- |
| Red Button    | You will not resist pushing this.|
| Cord          | You know you want to pull it.    |

You can also include inline Markdown such as links, bold, italics, or strikethrough:

**Table 4: Sample table 4**

| Name | Description          |
| ------------- | ----------- |
| Red Button    | ~~You will not~~ resist pushing this.|
| Cord          | _You know_ you want to pull it.    |

Finally, by including colons : within the header row, you can define text to be left-aligned,
right-aligned, or center-aligned:

**Table 5: Sample table 5**

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| left          | centered        | right |
| aligned       | aligned         | aligned |


A colon on the left-most side indicates a left-aligned column; a colon on the right-most side
indicates a right-aligned column; a colon on both sides indicates a center-aligned column.

**Note:** All of the examples above will view equally well in Github and will convert to HTML
in the same way. But if you want the document to be readable as plain text, without the
markdown being rendered, it helps to spend some time on table formatting.

[Back to Formatting Overview][Chap2over]


### Using Links

#### Complete Link Syntax

The link text goes between square brackets, the URL goes between round brackets. 

[Visit GitHub!](http://www.github.com)

Github also auto-formats a link if it recognizes a URL as such:

http://www.github.com



#### Internal Links

In Markdown, you need first toplace an anchor where you want to link to go : 

```<a name="tagname"> </a>``` 

To create a link to the reference, use this syntax:

```[link text](#tagname)```


#### External Links

You can link to an external document by using its name. If document you are referring
to is not in the same folder, you need to provide the full path.

* This is a link to [an external document](conversiontest2.md)

* This one links to [an external document in a subfolder](/testfolder/conversiontest2.md)


#### Reference Links

The preferred way of creating links is using references. This is useful if you want to
use multiple links to the same anchor and if you want to manage them more easily afterwards.

Instead of a creating the link in one go, you first create a link to an ID:

```[Link text][LinkID]```

Then you define where that ID links to: 

```LinkID: http://your.url.here```

For example, this one goes to Google:

[Goto Google][Google]
[Google]: http://www.google.be

If you have multiple references to the same link, this method allows for easy updating of the
link, since you do not need to update the (multiple) links but simply update the (single) reference line.

**Note:** When defining the target of a link, you can also use a named anchor instead of a path or URL.
This method was used to create the [Back to Top][Top] links in this document as well as the Table of Contents.

[Back to Formatting Overview][Chap2over]


### Formatting Procedures

Use numbered lists for procedures. If a step has substeps, use a nested list:

Proceed as follows to... : 

1. Step 1
2. Step 2
	1. Step 2.1
	2. Step 2.2

If you put images inline in a procedure, do not use figure titles.


[Back to Top][Top]



##Chapter 3 Your Chapter Title Here

###Start Writing

We know you can do it!

[Back to Top][Top]

##Appendix A Appendix Title


Use an appendix if you need one.

For longer appendices, we strongly recommend creating them as separate documents and
linking the main document and the Appendix together using an overview document. 

[Back to Top][Top]

[AllSeenlogo]:  /images/AllSeenlogo2014.jpg
[dummy-image]:  /images/dummy.jpg
[ioe]: http://semanticweb.com/wp-content/uploads/sites/2/2013/12/allseen.png
[Top]:#Top
[Intro]: #introduction
[Chap1]: #chapter-1-overview
[Chap2]: #chapter-2-some-syntax-examples
[Chap3]: #chapter-3-your-chapter-title-here
[AppA]: #appendix-a-markdown-cheat-sheet
