<a name="Top"></a>

# Type Your Document Title Here

## About this Template

This is a very general template and serves as an example, not as a carbon copy of the structure your document should adhere to.
Feel free to use the elements within this template as guidelines or basis of your documents, but use common sense as far as the
structure of your document is concerned. Try to keep the documents as simple as possible. Remove this block from your document.

## About this Document

Provide a short description of what this document is all about, what kind of information is provided etcetera. Keep it short.
The object of this paragraph is to allow a reader to decide whether or not he should read this document with respect to the
information he is looking for.

Note that this table of contents is on a chapter level, but you can add additional levels by adding additional links. The links
are relative links and use automatically generated anchors. For more information about anchors, see below.

## Terms

Below is a list of used terms:

* **ACR:** Define an acronym here.
* **Term:** Define a term here.

If not needed, remove this. If you add new terms, make sure to add them to the general glossary as well.

## Table of Contents

* [Chapter 1 Some Sample Content][Chap1]
* [Chapter 2 Your Chapter Title Here][Chap2]
* [Appendix A Markdown Cheat Sheet][AppA]


Note this *Back to Top* link below? It is very useful in larger documents to allow people to link back to the top of the document
(where you typically put a table of contents) without having to scroll all the way there. Remember that people will read your document
as a web page, not as a text file.


[Back to Top][Top]
##Chapter 1 Some Sample Content

### In this Chapter

For the purposes of the this template, this chapter will provide you with sample syntax you can use to create your document. You can
copy/paste it and adapt it or write it from scratch. This chapter serves both as example syntax and as tutorial. Start each chapter
with a small section called "in this chapter" which describes what the chapter is about and the kind of information it contains.
This helps your reader decide whether or not he actually needs to read this chapter. Remember that readers of technical documents are 
generally rather lazy: they want to read as little as possible to gain exactly the knowledge they need.

### Overview

<a name="Chap2over"> </a>


* [Paragraph Styles](#paragraph-styles)

* [Text Formatting](#text-formatting)

* [Using Lists](#using-lists)

* [Inserting Images](#inserting-images)

* [Using Code Blocks](#using-code-blocks)

* [Using Block Quotes](#using-block-quotes)

* [Tables](#tables)

* [Using Links](#using-links)

* [Formatting Procedures](#formatting-procedures)

For the formatting of these links, read the section on links below. The above shows you how to create a local table of content.
This is only needed if you're writing a large document. For smaller documents, you can add a table of content on top. For very
small documents, a table of content is not needed. it is added here to show you how to create one should you need it. A table
of content is a very useful tool for a reader. It allows him to skip to the part he is really interested in without having to
read all the rest.

### Paragraph Styles

A good document does not require tons of paragraph styles. The basic building blocks you need are headings, numbered lists,
bulleted lists and regular paragraphs. The use of headers is quite obvious here. You can use six levels of headers (h1 to h6).
h1 corresponds with a single hash, h2 is two hashes and so on. As a good practice, try to limit yourself to three or four levels.
More levels can make the document quite complex. For a paragraph, just type regular text.

[Back to Formatting Overview][Chap2over]


### Text Formatting

As with paragraph styles, font styles (text formatting) is a question of "less is more". Although markdown allows for much more, you
only need to use italic and bold. Here are some examples:

You can use * or _ to mark text for text formatting. One is italic, two is bold:

This is *Italic*

This is _also Italic_

This is **Bold**

This is __also Bold__

*You **can** combine the two*

**Note**

Markdown allows you to use backslash escapes to generate literal characters which would otherwise have special meaning in Markdown’s
formatting syntax. For example, if you wanted to surround a word with literal asterisks, you can use backslashes before the asterisks,
like this:

 \* These are literal asterisks. This line is not emphasized. \*

You can escape other formatting characters in the same way.

[Back to Formatting Overview][Chap2over]



### Using Lists

Lists are a very useful visual element to structure content. They are easy to read and help the reader to quickly process the information.
There are two types of lists:

* A bulleted list: this uses bullets to separate the elements in the list. Use this for listing stuff for which the order is irrelevant.
* A numbered list: this uses numbers to separate the elements in the list. Use this when the order is important, e.g. for procedures.

**Note: **Contrary to other markdown dialects, stars are used iso hyphens.

You can also use a list as element of a list. This is called a nested list. Avoid more than two levels in a nested list. As a best practice,
put a short sentence in front of each list describing its purpose or contents. This is called a stem sentence. Notice the use of stem
sentences throughout this template.

Here are some typical
examples:

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

List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:

1.  This is a list item with two paragraphs. Bacon ipsum dolor sit amet tail short loin shank ham capicola. Ground round cow corned beef
    prosciutto. 

    Tail venison kielbasa ground round boudin short ribs biltong hamburger spare ribs jerky.

2.  Brisket tenderloin flank shankle andouille hamburger.

[Back to Formatting Overview][Chap2over]


### Inserting Images

Images can be a great asset to your documents. For images hosted locally:

* Use reference style links, 
* Full paths relative to the host, and 
* Put url paths at the end of the document. Example:

![Dummy Image][dummy-image]

**Figure 1. Sample Figure 1**

Note that the caption underneath the image is optional. Instead of captions, you can also introduce the image with a stem sentence, e.g.
"The diagram below shows the layout of the AllJoyn bus:". This is called a stem sentence.

For images from the internet, use the URL of the image instead of the path.

![IoE][ioe]

**Warning: ** In this template, images are in a folder "images" nest to the document. This is for the purposes of the template only.
For AllSeen documents, you should not do this. Instead, you should put you images, as well as anything you link to in the webdocs/files
folder. The path should be tha same as your document path.

*Example:* if your document is in de docs/learn folder, you linked files and images should be in the files/learn folder.

Be sure to test your links before submitting your documents. You can do this using the linkchecker.js script.

For captions: always put the caption below the figure and use **bold**.

[Back to Formatting Overview][Chap2over]



### Using Code Blocks

A code block is a specifically styled paragraph format, use for representing (you've guessed it) a block of code.


```java

function test() {
  console.log("notice the blank line before this function?");
}
```

[Back to Formatting Overview][Chap2over]


### Using Block Quotes

Block quotes are another type of paragraph with a specific layout. Below is an example:

> Bacon ipsum dolor sit amet tail short loin shank ham capicola. Ground round cow corned beef prosciutto. Tail venison kielbasa
  ground round boudin short ribs biltong hamburger spare ribs jerky. Brisket tenderloin flank shankle andouille hamburger.

> Corned beef tri-tip capicola, pork chuck bresaola brisket frankfurter boudin pork chop meatball. Sirloin filet mignon short
  ribs meatloaf chicken turkey ground round jerky ham tenderloin. Salami hamburger pork chop pork kielbasa ground round corned
  beef ribeye, fatback shank andouille meatball. Meatloaf frankfurter brisket andouille turducken pork chop swine doner beef ribs
  spare ribs pork belly.

Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
> ```java
     return shell_exec("echo $input | $markdown_script");```

[Back to Formatting Overview][Chap2over]


### Tables

Tables are very useful to structure complex data. Not all markdown flavours support tables, but the Github syntax AllSeen uses
fortunately does. 

There are a couple of ways you can format tables:

* You can create them by assembling a list of words and dividing them with hyphens "-" for the first row), and then separating
each column with a pipe "|". Always precede a table with a table title in **bold**.

**Table 1: Sample table 1**

First Header  | Second Header
------------- | -------------
Cell one      | Cell two
Cell three    | Cell four

* For aesthetic purposes, you can also add extra pipes on the ends:

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

Finally, by including colons : within the header row, you can define text to be left-aligned, right-aligned, or center-aligned:

**Table 5: Sample table 5**

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| left          | centered        | right |
| aligned       | aligned         | aligned |


A colon on the left-most side indicates a left-aligned column; a colon on the right-most side indicates a right-aligned column;
a colon on both sides indicates a center-aligned column.

**Note:** All of the examples above will convert to HTML in the same way. But if you want the document to be readable as plain text,
without the markdown being rendered, it helps to spend some time on table formatting.

[Back to Formatting Overview][Chap2over]


### Using Links

#### About Links

Links are an essential part of making your document user-friendly. You will need to link to internal anchors within your document
as well as external documents.

#### Standard Link Syntax

The link text goes between square brackets, the URL goes between round brackets. 

[Visit GitHub!](http://www.github.com)

Github also auto-formats a link if it recognizes a URL as such:

http://www.github.com

**Note: ** For easy maintainability of the document, we strongly recommend using relative links, and placing the link definition at thwe
bottom of the document.

#### Relative Link Syntax

A relative link is declared in two steps: 

1. The actual link is placed inline in the text: [link text][linkID]. Both the text of the link and the name of the link are placed between
   square brackets.

2. The path of the link is defined at the bottom of the document:
   [linkID]: /path/ or URL
   Look at the bottom of this template for some examples of link definitions.

Using relative links makes it easy to update links without having to look through your entire document. Adopting this practice will increase the
maintainability of your document.

For example, this one goes to Google:

[Goto Google][Google]
[Google]: http://www.google.be




#### Internal Links Using Anchors

In Markdown, you need first toplace an anchor where you want to link to go :

```<a name="tagname"> </a>```

To create a link to the reference, use this syntax:

```[link text](#tagname)```

When using headers, a tag is automatically created for each header. The name of the tag is equal to the header text, but:

* with initial caps replaced by lowercase
* with spaces between words replaced by hyphens.

If you want to use these, it helps to keep your headings concise.


#### External Links

You can link to an external document by using its name. If document you are referring
to is not in the same folder, you need to provide the full path.

* This is a link to [an external document][ext1]
  [ext1]: /path/to/document/document.md
* In this [link][ext2], the document is on the same folder
  [ext2]: document.md

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

You've seen examples in this text. We know you can do it! In order to quickly create text elements, copy paste them and fill them 
with your own content. 

[Back to Top][Top]

##Appendix A Appendix Title


Use an appendix if you need one. Avoid this if you can, for it tends to lead to complex documents. If you want an appendix,  we strongly
recommend creating them as separate documents and linking to them from the main document.

[Back to Top][Top]

[dummy-image]:  /images/dummy.jpg
[ioe]: http://semanticweb.com/wp-content/uploads/sites/2/2013/12/allseen.png
[Top]:#Top
[Chap1]: #chapter-1-some-sample-content
[Chap2]: #chapter-2-your-chapter-title-here
[AppA]: #appendix-a-markdown-cheat-sheet
[Chap2over]: #Chap2over
