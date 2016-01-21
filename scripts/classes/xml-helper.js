"use strict";

// Using a class here does keep things well organized and clean but I'm not sure it makes the most sense for the work that is being done.
// It does, however, demonstrate the use of `class`.
class XmlHelper {  
    constructor() {
        this.fileReader = new FileReader();
        this.domParser = new DOMParser();
        
        // The current XML file as a parsed XML DOM
        this.xmlDom = null;
        
        this.exampleXmlPath = "./data/example.xml";
        
        this.elements = {
            fileSelector: document.querySelector("#file-selection div"),
            fileInput: document.querySelector("input[type=file]"),
            xpathInput: document.querySelector("#search input"),
            searchButton: document.querySelector("#search > button"),
            xmlCode: document.querySelector("#file-selection code"),
            exampleButton: document.querySelector("#file-selection button"),
            xpathButtons: document.querySelectorAll("aside button"),
            resultCode: document.querySelector("#search code")
        };
        
        this.errorMessages = {
            fetchError: (strings, ...values) => `Error with fetch request for file ${values[0]}.`,
            invalidContentType: (strings, ...values) => `Invalid content-type; expected ${values[0]}, ${values[1]} returned.`,
            invalidXPath: "An invalid XPath 1.0 was used.",
            noXPath: "No XPath value has been set.",
            noXml: "No XML file has been loaded.",
            unknown: "An unknown error occurred.",
            noResults: "No results found."
        };
        
        // Drag and Drop events
        this.elements.fileSelector.addEventListener("dragover", this.dragOver.bind(this));
        this.elements.fileSelector.addEventListener("dragleave", this.dragDone.bind(this));
        this.elements.fileSelector.addEventListener("drop", this.dragDone.bind(this));
        this.elements.fileSelector.addEventListener("drop", this.dragDrop.bind(this));
        this.elements.fileSelector.addEventListener("click", this.dragClick.bind(this));
        this.elements.fileInput.addEventListener("change", this.dragDrop.bind(this));
        
        // `Use example.xml` button event
        this.elements.exampleButton.addEventListener("click", this.exampleButtonClick.bind(this));
        
        // Example XPath buttons setup
        let buttons = this.elements.xpathButtons;
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", this.xpathButtonClick.bind(this));
        }
        
        // Search events
        this.elements.searchButton.addEventListener("click", this.search.bind(this));
        this.elements.xpathInput.addEventListener("keypress", this.searchKeypress.bind(this));
    }
    
    dragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        
        event.dataTransfer.dropEffect = "copy";
        
        this.elements.fileSelector.classList.add("drag");
    }
    
    dragDone(event) {
        event.stopPropagation();
        event.preventDefault();
        
        this.elements.fileSelector.classList.remove("drag");
    }
    
    dragDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        
        let file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
        if(file.type !== "text/xml") {
            this.error(this.elements.xmlCode, this.errorMessages.invalidContentType`${"text/xml"} ${file.type}`);
            return;
        }
    
        this.fileReader.onload = (event) => {
            let xmlString = event.target.result;
            
            this.setXmlDom(xmlString);
        };
        
        this.fileReader.readAsText(file);  
    }
    
    dragClick(event) {
        this.elements.fileInput.click();
    }
    
    exampleButtonClick(event) {
        event.stopPropagation();
        event.preventDefault();
        
        fetch(this.exampleXmlPath)
            .then((response) => {
                if(response.ok) {
                    if(response.headers.get("content-type") === "application/xml") {
                        return response.text();
                    } else {
                        this.error(this.elements.xmlCode, this.errorMessages.invalidContentType);
                    }
                } else {
                    this.error(this.elements.xmlCode, this.errorMessages.fetchError`${this.exampleXmlPath}`);
                }
            })
            .then(xmlString => {
                this.setXmlDom(xmlString);
            })
            .catch(this.error.bind(this, this.elements.xmlCode, this.errorMessages.fetchError));
    }
    
    xpathButtonClick(event) {
        this.elements.xpathInput.value = event.target.value;
        this.elements.searchButton.click();
    }
    
    searchKeypress(event) {
        if(event.which === 13) {
            this.search();
        }
    }
    
    search() {
        if(this.elements.xpathInput.value && this.xmlDom) {
            let xpathResult;
            try {
                xpathResult = this.xmlDom.evaluate(this.elements.xpathInput.value, this.xmlDom, null, XPathResult.ANY_TYPE, null);
            } catch(error) {
                if(error instanceof DOMException) {
                    this.error(this.elements.resultCode, this.errorMessages.invalidXPath);
                } else {
                    this.error(this.elements.resultCode, this.errorMessages.unknown);
                }
                
                return;
            }

            let result = "";
            switch(xpathResult.resultType) {
                case XPathResult.NUMBER_TYPE:
                    result = xpathResult.numberValue.toString();
                    break;
                case XPathResult.STRING_TYPE:
                    result = xpathResult.stringValue;
                    break;
                case XPathResult.BOOLEAN_TYPE:
                    result = xpathResult.booleanValue.toString();
                    break;
                default:
                    // If ANY_TYPE is used the result type will only be an UNORDERED_NODE_ITERATOR_TYPE
                    // https://developer.mozilla.org/en-US/docs/Introduction_to_using_XPath_in_JavaScript#The_ANY_TYPE_Constant
                    let currentNode = xpathResult.iterateNext();
                    
                    while(currentNode) {
                        result += currentNode.outerHTML || currentNode.textContent;
                        currentNode = xpathResult.iterateNext();
                    }
            }
            
            result || (result = this.errorMessages.noResults);

            this.display(this.elements.resultCode, result);
        }
        
        if(!this.elements.xpathInput.value) {
            this.error(this.elements.resultCode, this.errorMessages.noXPath);
        }
        
        if(!this.xmlDom) {
            this.error(this.elements.xmlCode, this.errorMessages.noXml);
            
            this.display(this.elements.resultCode, "");
        }
    }

    setXmlDom(xmlString) {
        this.xmlDom = this.domParser.parseFromString(xmlString, "text/xml");
        this.display(this.elements.xmlCode, xmlString);
        this.display(this.elements.resultCode, "");
    }
    
    display(whichElement, value) {
        whichElement.classList.remove("invalid");
        whichElement.textContent = vkbeautify.xml(value);
        hljs.highlightBlock(whichElement);
    }
    
    error(whichElement, message) {
        if(whichElement === this.elements.xmlCode) {
            this.xmlDom = null;
            this.display(this.elements.resultCode, "");
        }
        
        whichElement.classList.add("invalid");
        whichElement.textContent = message;
    }
}