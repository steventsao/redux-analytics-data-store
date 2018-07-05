## What is a data layer?

> A data layer (or data object) is a set of information that exists on the web page, hidden in the code, invisible to the human eye, but readable if you know where to look. It contains any data that you might need to pass to other systems or software.

OR:

```javascript
// It's just metadata
window.dataLayer = {
  page: {
    id: 1234,
    name: "marketing page",
    category: "B"
  }
};
```

### What problem does it solve?

1.  If VendorA wants event names to be formatted as `PageID + PAGENAME + PAGECATEGORY` and VendorB `pageName.pageId`, both vendors can derive their desired format by knowing the paths to get those values
2.  Solves #2 in the previous slide.

### How?

Embed a data layer accessor by including a JavaScript snippet in the `<body>` that observes the `dataLayer` object and pushes updates to a selected tag manager.

- DataLayer can be an object or an array that describes what changed.

### Existing solutions

- [Google Tag Manager](https://developers.google.com/tag-manager/)
- [Adobe Dynamic Tag Manager](https://marketing.adobe.com/resources/help/en_US/dtm/)

### Reference

![](tag_manager_diagram.png)
