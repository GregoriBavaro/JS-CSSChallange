let createElements = (initObj) => {
    var element = document.createElement(initObj.Tag);
    for (var prop in initObj) {
      if (prop === "childNodes") {
        initObj.childNodes.forEach(function (node) {
          node.appendChild(element);
        });
      } else if (prop === "attributes") {
        initObj.attributes.forEach(function (attr) {
          element.setAttribute(attr.key, attr.value);
        });
      } else element[prop] = initObj[prop];
    }
    return element;
  };