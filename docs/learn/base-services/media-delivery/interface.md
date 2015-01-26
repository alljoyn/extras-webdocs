# AllJoyn&trade; Media Delivery Framework Interface Definition

## Release History

| Release version | Date | What changed |
|---|---|---|
| 14.12 | 12/17/2014 | <p>The Media Delivery Framework's collection of interfaces were added:</p><ul><li>org.allseen.media.content.ContentSource version 1</li></ul> |

## Definition Overview

The goal of the Media Content service is to standardize the 
way content sources are exposed on the AllJoyn network and 
queried. This document describes the Media Content service 
interfaces and metadata mappings that comprise this service. 

The Content Service API enables an application to query content 
sources for metadata. 

It consists of the ContentSource interface.

The *AllJoyn Media Content Service High-Level Design* document 
contains a more detailed discussion.

NOTE: All methods and signals are considered mandatory to 
support the AllSeen Alliance Compliance and Certification program.

### Error handling

The method calls in the interfaces will use the AllJoyn error 
message handling (the ER_BUS_REPLY_IS_ERROR_MESSAGE feature) 
to set the error name and error message.  

The following table lists the possible errors raised by the 
content interfaces.

| Error name | Error message |
|---|---|
| org.allseen.error.OutOfRange | Value out of range |
| org.allseen.error.InvalidValue | Invalid value |
| org.allseen.error.InvalidProperty | Invalid property |
| org.allseen.error.MethodNotAllowed | Method call not allowed |

### ContentSource interface

The Content Service API enables an application to query content 
sources for metadata. It consists of the ContentSource interface.

#### Interface name

| Interface name | Version | Secured | Object path |
|---|:---:|:---:|---|
| `org.allseen.media.content.ContentSource` | 1 | no | N/A |

#### Properties

| Property name | Signature | List of values | Read/Write | Description |
|---|:---:|---|---|---|
| version | `q` | N/A | Read-only | Interface version number |
| displayName | `s` | N/A | Read-only | Name of the content source. |
| iconURL | `s` | N/A | Read-only | URL to the icon for the content service. |
| lastModified | `i` | N/A | Read-only | Date the index of the Content Source metadata was last changed. This enabled third parties to cache results. |

#### Methods

The status codes and any error messages returned from method 
calls will be determined during the implementation of the API 
and subsequently added to a later version of this document.

##### `(ututa(sssa{sv})) Browse(sa{sv}tia(sy)`

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | itemID | `s` | N/A | The ID of the item you want to get the children for. Use an item ID of ASCII 0 for the initial browse i.e., to browse the root directory. |
| 1 | playerCapabilities | `a{sv}` | N/A | <p>Array of key value pairs relating to the player capabilities. These values are used to filter the returned response.</p><ul><li>If an item cannot be played on the player, the delivery URL is removed.</li><li>If it can be played, the relevant delivery URL is selected.</li><li>If an empty array is submitted, all returned items will have the delivery URLs removed. It is expected that the caller calls `GetItem` to obtain the delivery URLs for the item.</li></ul><p>Sample capability values:</p><p>`mimeTypes={"audio/mpeg","video/mp4"}`</p><p>`resolution=2560x1440`</p><p>Refer to the *AllJoyn Control Service High-Level Design* document for the possible capability values.</p>
| 2 | offset | `t` | N/A | Specifies the offset within a result. The minimum offset is 0. |
| 3 | limit | `i` | N/A | Number of results to return. Default is 20. |
| 4 | sortBy | `a(sy)` | N/A | <p>Criteria for sorting the result. Call `GetSortable Fields` to find out which fields can be used for sorting the result.</p><p><code>{("field", 0&#124;1), ("field", 0&#124;1),...}</code></p><p>e.g., <code>{("title", 0)}</code>.</p><p>This field can be an empty array if order is not important.</p><ul><li>0 - ASC</li><li>1 - DESC</li></ul> |

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | response | `s` | N/A | <p>Browse response.</p><ul><li>u - Actual number of results returned.</li><li>t - Maximum number of results that can be returned.</li><li>u - Page size / maximum number of results to return e.g., 20.</li><li>t - Offset within the result.</li><li>a(sss): s - itemID, s - title, s - type</li><li>a{sv}: Arbitrary properties, s - key, v - value</li></ul> |

**Error reply**

| Error | Description |
|---|---|
| org.allseen.error.Unauthorized | Returned if authentication is needed before this method can be called. The caller of the API will then use the interface org.allseen.media.authentication to authenticate the caller before proceeding with the method call. |

**Description**

Allows the caller to incrementally explore the content source hierarchy.

##### `(sssa{sv}) GetItem(s)`

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | itemID | `s` | N/A | The ID of the item you want to get the children for. Use an item ID of ASCII 0 for the initial browse i.e., to browse the root directory. |

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | response | `(sssa{sv})` | N/A | <p>Item.</p><ul><li>s - Item ID</li><li>s - Title</li><li>s - Type</li><li>a{sv}: Arbitrary properties, s - key, v - value</li></ul> |

**Description**

Call this method with an itemID returned from a browse 
request to retrieve all the metadata about an item.

##### `as GetSortableFields`

**Message arguments**

None.

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | sortable | `as` | N/A | Array of fields that can be used to sort the results returned by the content source e.g., artist, album, title, etc. |

**Description**

Returns the fields that can be used to sort results returned 
from this content source.

##### `a{sv} GetContentSourceInfo`

**Message arguments**

None.

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | contentSourceInfo | `a{sv}` | N/A | Array of key value pairs with information about the content source.  |

**Description**

Returns information about the content source. 

See [GetContentSourceInfo][getcontentsourceinfo] for mandatory and optional 
content source information that a media player must return 
as part of the `GetContentSourceInfo` method call.

##### `ModifyOptionalMetadata(sa{ss})`

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | itemID | `s` | N/A | ID of the item with the metadata you want to change. |
| 1 | properties | `a{ss}` | N/A | <p>Any array of key value pairs. The key is the name of the property you want to change and the value the value.</p><p>The content source should validate this value to ensure it conforms to the relevant format.</p> |

**Reply arguments**

None.

**Description**

Lets you modify the optional metadata of an item in the content source.

##### `(ututa(sssa{sv})) Search(sqqtia(sy))`

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | query | `s` | N/A | Free text search string. |
| 1 | searchMode | `q` | N/A | <p>Search mode to use.</p><ul><li>0 - Starts with. The fields must start with the submitted text.</li><li>1 - Contains. The fields must contain the submitted text.</li></ul> |
| 2 | searchType | `q` | N/A | <p>Scope for the free from search i.e., images, videos, or audio.</p><ul><li>0 - All</li><li>1 - Audio</li><li>2 - Images</li><li>3 - Video</li></ul> |
| 3 | playerCapabilities | `a{sv}` | N/A | <p>Array of key value pairs relating to the player capabilities. These values are used to filter the returned response.</p><ul><li>If an item cannot be played on the player, the delivery URL is removed.</li><li>If it can be played, the relevant delivery URL is selected.</li><li>If an empty array is submitted, all returned items will have the delivery URLs removed. It is expected that the caller calls `GetItem` to obtain the delivery URLs for the item.</li></ul><p>Sample capability values:</p><p>`mimeTypes={"audio/mpeg","video/mp4"}`</p><p>`resolution=2560x1440`</p><p>Refer to the *AllJoyn Control Service High-Level Design* document for the possible capability values.</p>
| 4 | offset | `t` | N/A | Specifies the offset within a result. The minimum offset is 0. |
| 5 | limit | `i` | N/A | Number of results to return. Default is 20. |
| 6 | sortBy | `a(sy)` | N/A | <p>Criteria for sorting the result. Call `GetSortable Fields` to find out which fields can be used for sorting the result.</p><p><code>{("field", 0&#124;1), ("field", 0&#124;1),...}</code></p><p>e.g., <code>{("title", 0)}</code>.</p><p>This field can be an empty array if order is not important.</p><ul><li>0 - ASC</li><li>1 - DESC</li></ul> |

**Reply arguments**

| Argument | Parameter name | Return signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | response | `(ututa(sssa{sv}))` | N/A | <p>The search response.</p><ul><li>u - Actual number of results returned.</li><li>t - Maximum number of results that can be returned.</li><li>u - Page size / maximum number of results to return e.g., 20.</li><li>t - Offset within the result.</li><li>a(sss):  s - Item ID</li><li>s - Title</li><li>s - Type</li><li>a{sv}: Arbitrary properties, s - key, v - value</li></ul> |

**Error reply**

| Error | Description |
|---|---|
| org.allseen.error.Unauthorized | Returned if authentication is needed before this method can be called. The caller of the API must then use the interface org.allseen.media.authentication to authenticate the caller before proceeding with the method call. |

**Description**

Used to search content sources for content. The `GetSortableFields` 
method call is used to find out how the results can be ordered.

See [Search][search] for additional information about this method.

##### GetContentSourceInfo

The following table lists the mandatory and optional content 
source information that a media player must return as part 
of the `GetContentSourceInfo` method call.

| Key | Value type | List of values | Mandatory | Description |
|---|---|---|:---:|---|
| mimeTypes | `as` | Standard or non-standard MIME types | yes | Array of the MIME types (string) that the content source supports e.g., {"audio/mpeg","video/mp4","image/jpeg"}
| transports | `aq` | <ul><li>1 - HLS</li><li>2 - MPEG DASH</li><li>3 - RTSP</li><li>4 - MMS</li><li>5 - RTP</li><li>6 - RTCP</li><li>7 - UDP</li><li>8 - TCP</li><li>9 - RTMP</li><li>10 - MPEG-TS</li><li>11 - RDT</li><li>12 - WebM</li></ul> | yes | Array of transports that the player supports. |
| iconURL | `s` | N/A | no | URL to the icon for the content service. |

##### Search

This method performs a free text search over the relevant fields 
in the content source. The free text argument can be parts of a 
string e.g., ko, in which case any items with 'ko' as part of 
search fields will be returned e.g., 'koop'. 

The search is case insensitive, and the content source implementation 
specifies which fields to include as part of the searching.

NOTE: The method must return results quickly. Performance is dependent 
on how much content is indexed and what type of content source it is.

If you search with the below string using the search mode 'starts with':

Don't worry be happy  

The results include any items that start with above words in the relevant fields.

If you search with the same string using the search mode 'contains', 
the results include items that have all of the words in one of the relevant fields. 

Use quotes to search for a set of words that one of the fields must 
include, i.e., "Don't worry be happy".

#### Signals

##### `ContentSourceIndexChanged(u)`

ContentSourceIndexChanged signal is not a Sessionless signal.

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | timestamp | `u` | N/A | Epoch time of the last update. The client should only check if the value has changed. |

**Description**

Indicates the content source index has changed.

##### `MetadataChanged(sa{sv})`

MetadataChanged signal is not a Sessionless signal.

**Message arguments**

| Argument | Parameter name | Signature | List of values | Description |
|:---:|---|:---:|---|---|
| 0 | itemID | `s` | N/A | Item ID of the item that has changed. |
| 1 | properties | `u` | N/A | Array of the changed key-value pairs. |

**Description**

Indicates the metadata has changed for the specified item. 

#### Introspecction XML

<node xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:noNamespaceSchemaLocation="https://www.allseenalliance.org/schemas/introspect.xsd">
   <interface name="org.allseen.media.content.ContentSource">
      <property name="version" type="q" access="read" />
      <property name="displayName" type="s" access="read" />
      <property name="iconURL" type="s" access="read" />
      <property name="lastModified" type="i" access="read" />
         <method name="Browse">
            <arg name="itemID" type="s" direction="in" />
            <arg name="playerCapabilities" type="a{sv}" direction="in" />
            <arg name="offset" type="t" direction="in" />
            <arg name="limit" type="i" direction="in" />
            <arg name="sortBy" type="a(sy)" direction="in" />
            <!-- 
               a(sy): 
                  s - field name
                  y - 0 = ASC, 1 DESC
            -->
            <arg name="response" type="(ututa(sssa{sv}))" direction="out" />
            <!-- 
               (utuua(sssa{sv}))
               u - The number of results returned.
               t - The maximum number of results that can be returned.
               u - The maximum number of results to return e.g. 20 used for paging.
               t = The offset within the result.
               a(sss):
               s - itemID
               s - title
               s - type
               a{sv} : Arbitrary properties
                  s - key
                  v - value	
             -->
          </method>
          <method name="GetItem">
             <arg name="itemID" type="s" direction="in" />
             <arg name="response" type="(sssa{sv})" direction="out" />
             <!--
                s - itemID
                s - title
                s - type
                a{sv} : Arbitrary properties
                   s - key
                   v - value
             -->
          </method>
          <method name="GetSortableFields">
             <arg name="sortableFields" type="as" direction="out" />
          </method>
          <method name="GetContentSourceInfo">
             <arg name="supportedMIMETypes" type="a{sv}" direction="out" />
          </method>
          <method name="ModifyOptionalMetaData">
             <arg name="itemID" type="s" direction="in" />
             <arg name="properties" type="a{ss}" direction="in" />
          </method>
          <method name="Search">
             <arg name="query" type="s" direction="in" />
             <arg name="searchMode" type="q" direction="in" />
             <!--
                searchMode: 0 = Starts with, 1 = contains 
             -->
             <arg name="searchType" type="q" direction="in" />
             <!-- 
                searchType: 0 = All items, 1 =  Audio items,
                   2 = Image items, 3 = Video items
             --> 
             <arg name="playerCapabilities" type="a{sv}" direction="in" />
             <arg name="offset" type="t" direction="in" />
             <arg name="limit" type="i" direction="in" />
             <arg name="sortBy" type="a(sy)" direction="in" />
             <arg name="response" type="(ututa(sssa{sv}))" direction="out" />
             <!-- See browse -->
          </method>
          <signal name="ContentSourceIndexChanged">
             <arg name="timeStamp" type="i" />
          </signal>
          <signal name="MetadataChanged">
             <arg name="itemID" type="s" />
             <arg name="properties" type="a{sv}" />
          </signal>
   </interface>
</node>

## Media Content Metadata

### Mandatory metadata

| Key| Type | List of values | Description |
|---|:---:|---|---|
| itemID | `s` | N/A | Unique identifier for the item |
| title | `s` | N/A | Name of the media item |
| type | `s`| Type of media contant, such as "video" or "audio". See [type metadata values][type-metadata-values] for the detailed metadata types. | 

#### type metadata values

| Type | Value | Description |
|---|---|---|
| audio | <p>media.audio</p><p>media.audio.book</p><p>media.audio.broadcast</p><p>media.audio.podcast</p><p>media.audio.track</p> | <p>Generic type for audio.</p><p>Audio book.</p><p>Audio broadcast.</p><p>Audio podcast.</p><p>Audio track.</p> |
| image | media.image | Generic type for images. |
| video	| <p>media.video</p><p>media.video.broadcast</p><p>media.video.clip</p><p>media.video.movie</p><p>media.video.podcast</p> | <p>Generic type for videos.</p><p>Video broadcast.</p><p>Video clip.</p><p>Movie.</p><p>Video podcast</p> |
| container | <p>container</p><p>container.album</p><p>container.album.audio</p><p>container.album.image</p><p>container.artist</p><p>container.genre.video</p><p>container.genre.audio</p><p>container.playlist</p> | <p>Generic type used for grouping of items.</p><p>Generic type for albums.</p><p>Music album.</p><p>Photo album.</p><p>Artist.</p><p>Movie genre.</p><p>Music genre.</p><p>Playlist.</p> |

### Media items

The media items listed below are required to be able to play an item.

| Key | Signature | List of values | Description |
|---|:---:|---|---|
| Item-> deliveryMethods[X] -> url | `s` | N/A | Location of the media. |
| Item-> deliveryMethods[X] -> mimeType | `s` | N/A | MIME type of the media. |

### Optional metadata

The optional metadata items listed below are used to describe the item content.

| Key | Signature | List of values | Description |
|---|:---:|---|---|
| additionalInfo | `s` | N/A | Generic field for specifying additional information about the media. |
| album | `s` | N/A | Album title |
| albumArtist | `s` | N/A | Album artist |
| albumRating | `y` | 0-5 | "Star" rating |
| albumURL | `s` | N/A | Album url |
| artist | `s` | N/A | Artist that performed the item. |
| artistURL | `s` | N/A | Artist URL |
| bitrate | `q` | N/A | Bitrate in bytes per second. |
| bpm | `g` | N/A | Beats per minute. |
| bitsPerSample | `q` | N/A | Bits per sample. |
| colorDepth | `q` | N/A | Color depth in bits of the resources e.g., 24 for true color. |
| compilation | `b` | N/A | Indicates if item is part of a compilation. |
| composer | `s` | N/A | Composer of the item. |
| contributor | `s` | N/A | Entity responsible for making contributions to the content. |
| creator | `s` | N/A | Entity responsible for making the content of the resource. |
| creationDate | `s` | Date | Date the item was created. See [Date value information][date-value-information]. |
| discCount | `g` | N/A | Total number of discs in a multi-disc release. |
| discNumber | `g` | N/A | Disc number in a multi-disc release. |
| description | `s` | N/A | Description of the content. | 
| displayName | `s` | N/A | Displayable name of the track, if available. |
| duration | `u` | N/A | Duration of the item in milliseconds. |
| framesPerSecond | `i` | N/A | The number of frames per second (fps). |
| genre | `s` | N/A | Genre of the item. |
| iconSmallURL | `s` | N/A | <p>URL of a small asset.</p><p>Size: 128x128</p> |
| iconMediumURL | `s` | N/A | <p>URL of a medium asset.</p><p> Size: 256x256</p> |
| iconLargeURL | `s` | N/A | <p>URL of a large asset.</p><p>Size: 600x600</p> |
| iconHDURL | `s` | N/A | <p>URL of an HD asset.</p><p>Size: 1024x1024</p>
| isExplicit | `b` | N/A | Indicates whether the item is explicit. |
| isFamilyFriendly | `b` | N/A | Indicates whether the item is family friendly. |
| language | `s` | N/A | Language of the content specified in the ISO 639-2 format e.g., swe. |
| mimeType | `s` | N/A | Item's MIME type. |
| modificationDate | `s` | Date | Date the item was last modified. See [Date value information][date-value-information]. |
| nrAudioChannels | `y` | N/A | Number of audio channels. |
| numberOfChildren | `q` | N/A | Number direct children of a folder. Only applies to folders. |
| parentId | `s` | N/A | Parent ID of the item. |
| priority | `i` | N/A | Priority associated with the deliver method e.g., ajmsp = 1 and http = 2. The lower the number, the higher priority. |
| publisher | `s` | N/A | Publisher of the creative work. |
| rating | `y` | 0-5 | "Star" rating |
| regionsAllowed | `s` | N/A | Comma-separated string of the regions where the media is allowed. If not specified, then it's assumed to be allowed everywhere. Specify the countries in ISO 3166 format. |
| releaseDate | `s` | Date | Date the item was first released. See [Date value information][date-value-information]. |
| resolution | `s` | N/A | X*Y resolution. One or more digits followed by 'x' followed by more digits i.e., 2560x1440. |
| rights | `s` | N/A | Information about the rights of the content i.e., copyright. |
| sampleFrequency | `q` | N/A | Sample frequency in Hz. |
| size | `u` | N/A | Size in bytes of the resource. |
| subject | `s` | N/A | Subject of the content. |
| trackCount | `g` | N/A | Total number of tracks on the album. |
| trackNumber | `g` | N/A | Track number of the item within the album. |
| tags | `s` | N/A | Comma-separated list of tags associated with the content. |

#### Date value information

Date values are to only be represented as strings in one of the following ISO 8601 formats:
* Year only: "&lt;year&gt;" where &lt;year&gt; includes all digits of the year.
* Date: "&lt;year&gt;&lt;month&gt;&lt;day&gt;" where:
  * &lt;year&gt; includes all digits of the year
  * &lt;month&gt; is a 2-digit representation of month ("01" = January)
  * &lt;day&gt; is the day of the month (e.g., "09").
* Date and time: "&lt;year&gt;&lt;month&gt;&lt;day&gt;T&lt;hour&gt;&lt;minute&gt;&lt;second&gt;+/-&lt;offset&gt;" where:
  * &lt;year&gt;, &lt;month&gt;, and &lt;day&gt; are the same as the date previously specified
  * &lt;hour&gt; is the hour ("00" through "23")
  * &lt;minute&gt; is the minute ("00" through "59")
  * &lt;second&gt; is the second ("00" through "59")
  * &lt;offset&gt; is the offset from UTC ("-0800" corresponds to 
  Pacific Standard Time)
* Date and time: "&lt;year&gt;&lt;month&gt;&lt;day&gt;T&lt;hour&gt;&lt;minute&gt;+/-&lt;offset&gt;" 
is the same as the previous date and time specification except 
without the &lt;second&gt; (seconds) portion.

### Response types

The following subsections specify the metadata associated with the various 
response types. Types that are typically only associated with 
the mandatory metadata are not detailed below.  

#### All responses

| Property | Mandatory |
|---|---|
| itemId | yes |
| title	| yes |
| type | yes |

#### Album (type=container.album.music)
| Property | Mandatory |
|---|---|
| albumURL | no |
| artistID | no |
| artist | no |
| artistURL | no |
| genre | no |

#### Album (type=container.album.photo)

| Property | Mandatory |
|---|---|
| date | no |
| location | no |

#### Artist (type=container.artist)

| Property | Mandatory |
|---|---|
| artistURL | no | 
| genre | no |

#### Playlst (type=container.playlist)

| Property | Mandatory | Description |
|---|---|---|
| URL | yes | URL to an external playlist file (mp3u). |
| artist | no | Names of the artists on the playlist. |
| genre | no | Applies to the entire playlist. |
| description | no | Playlist description. |
| date | no | Creation date. |

#### Audio item (type=media.audio)

| Object | Property | Mandatory |
|---|---|---|
| item	| <p>additionalInfo</p><p>album</p><p>albumArtist</p><p>albumRating</p><p>albumURL</p><p>artist</p><p>artistURL</p><p>compilation</p><p>composer</p><p>contributor</p><p>creator</p><p>creationDate</p><p>discCount</p><p>discNumber</p><p>description</p><p>displayName</p><p>duration</p><p>genre</p><p>iconURL</p><p>isExplicit</p><p>isFamilyFriendly</p><p>language</p><p>modificationDate</p><p>publisher</p><p>rating</p><p>regionsAllowed</p><p>releaseDate</p>rights<p>subject</p><p>trackCount</p><p>trackNumber</p><p>tags</p> | <p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no/p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p> |
| Item > deliveryMethods | <p>additionalInfo</p><p>bitrate</p><p>bpm</p><p>bitsPerSampe</p><p>mimeType</p><p>priority</p><p>nrAudioChannels</p><p>sampleFrequency</p><p>size</p><p>url</p><p> | <p>no</p><p>no</p><p>no</p><p>no</p><p>yes</p><p>no</p><p>no</p><p>no</p><p>no</p><p>yes</p> |

#### Image item (type=media.image)

| Object | Property | Mandatory |
|---|---|---|
| item	| <p>additionalInfo</p><p>album</p><p>compilation</p><p>composer</p><p>contributor</p><p>creationDate</p><p>creator</p><p>description</p><p>displayName</p><p>iconURL</p><p>isExplicit</p><p>isFamilyFriendly</p><p>language</p><p>modificationDate</p><p>publisher</p><p>rating</p><p>regionsAllowed</p><p>releaseDate</p>rights<p>subject</p><p>trackCount</p><p>tags</p> | <p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p> |
| Item > deliveryMethods | <p>additionalInfo</p><p>colorDepth</p><p>mimeType</p><p>priority</p><p>resolution</p><p>size</p><p>url</p> | <p>no</p><p>no</p><p>yes</p><p>no</p><p>no</p><p>no</p><p>yes</p> |

#### Video item (type=media.video)

| Object | Property | Mandatory |
|---|---|---|
| item	| <p>additionalInfo</p><p>contributor</p><p>compilation</p><p>composer</p><p>creator</p><p>description</p><p>discCount</p><p>discNumber</p><p>displayName</p><p>duration</p><p>genre</p><p>iconURL</p><p>isExplicit</p><p>isFamilyFriendly</p><p>language</p><p>modificationDate</p><p>publisher</p><p>rating</p><p>regionsAllowed</p><p>releaseDate</p>rights<p>subject</p><p>tags</p><p>trackCount</p><p>trackNumber</p> | <p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p><p>no</p> |
| Item > deliveryMethods | <p>additionalInfo</p><p>framesPerSecond</p><p>mimeType</p><p>priority</p><p>resolution</p><p>size</p><p>url</p> | <p>no</p><p>no</p><p>yes</p><p>no</p><p>no</p><p>no</p><p>yes</p> |

### Extending metadata

The AdditionalInfo field sends custom metadata, but an application 
can also have their own custom metadata fields. These fields will 
be unknown to standard AllJoyn players. 

### Dynamic metadata support

To broadcast changing metadata during continuous streaming, 
e.g., a radio station, the content source emits the signal 
MetadataChanged with the relevant metadata.

### Editing optional metadata

During playback, a user can rate the content or change some 
of the optional metadata listed in Optional metadata. To do this, 
the content source must implement ModifyOptionalMetaData 
(See [ContentSource interface][contentsource-interface] for details). 





[getcontentsourceinfo]: #getcontentsourceinfo
[type-metadata-values]: #type-metadata-values
[search]: #search
[date-value-information]: #date-value-information
[contentsource-interface]: #contentsource-interface

[media-delivery-framework-arch]: /files/learn/media-delivery-framework-arch.png

