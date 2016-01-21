# JavaScript XML Helper
>An example of how XML can be parsed and searched using JavaScript.

We often hire student developers where I work.  During the interview we ask them to complete a programming task.  This task is designed to see how they handle the task and not necessarily the completion of the task.  The task is simple enough; given an XML file can you extract a certain value and display it somewhere.  They can use any programming language and display the value however they want.

Here is an example situation.  With the XML file that follows display the address of the first item in the response.  This is the address of `Roseann Hudson`.

###XML
```xml
?xml version="1.0" encoding="utf-8"?>
<response>
    <items>
        <item id="569d3598b320de7ab24f0d9d">
            <favoriteFruit>banana</favoriteFruit>
            <greeting>Hello, Roseann! You have 8 unread messages.</greeting>
            <friends>
                <friend>3</friend>
                <friend>
                    <name>Gentry Duke</name>
                    <id>1</id>
                </friend>
            </friends>
            <range>
                <range>0</range>
                <range>1</range>
                <range>2</range>
                <range>3</range>
                <range>4</range>
                <range>5</range>
                <range>6</range>
                <range>7</range>
                <range>8</range>
                <range>9</range>
            </range>
            <tags>
                <tag>7</tag>
                <tag>sit</tag>
            </tags>
            <longitude>-141.185708</longitude>
            <latitude>-56.292414</latitude>
            <registered>Monday, February 2, 2015 3:06 PM</registered>
            <about>Ullamco nostrud enim quis dolor proident magna. Deserunt voluptate elit anim anim esse cupidatat incididunt magna laboris do laboris cupidatat velit ullamco. Dolore ad ea in ut esse voluptate aute eu veniam in.</about>
            <address>218 Norwood Avenue, Norfolk, Ohio, 5385</address>
            <phone>+1 (842) 426-2748</phone>
            <email>roseann.hudson@assitia.tv</email>
            <company>ASSITIA</company>
            <name>
                <last>Hudson</last>
                <first>Roseann</first>
            </name>
            <eyeColor>green</eyeColor>
            <age>27</age>
            <picture>http://placehold.it/32x32</picture>
            <balance>$1,432.39</balance>
            <isActive>false</isActive>
            <guid>88c42041-1cd3-4c73-b62c-912262f7176d</guid>
            <index>0</index>
        </item>
    </items>
</response>
```

Some students choose to use JavaScript to accomplish this task.  Very few are able to come close to completing this task.  This repository contains a solution using JavaScript.  It showcases the following features.

JavaScript features such as:
- Reading an XML file using [FileReader](https:///developer.mozilla.org/en-US/docs/Web/API/FileReader)
- Reading an XML file using [Fetch](https:///developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Selecting an XML file using [Drag and Drop](https:///developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- Parsing an XML file into a DOM Document using [DOMParser](https:///developer.mozilla.org/en-US/docs/Web/API/DOMParser)
- Searching for a string value, node attribute, node, list of nodes, or other values using [XPath 1.0](https:///developer.mozilla.org/en-US/docs/Web/XPath) and [Document.evaluate](https:///developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)
- Displaying a value, node, or list of nodes that have been found using [XPathResult](https:///developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMXPathResult)
- `let`, `class`, `arrow functions`, `rest parameters`, `template strings`, `tagged template strings`, and others.

The CSS feature:
- Numbering sections using [CSS Counters](https:///developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)

<br>
<br>
This project is not meant to work in every browser.

Thanks to [highlight.js](https://highlightjs.org/) for the XML highlighting.
<br>
Thanks to [vkBeautify](https://github.com/vkiryukhin/vkBeautify) for the XML beautifying.