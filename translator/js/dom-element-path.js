/*
The MIT License (MIT)

Copyright (c) 2020 Zygimantas Povilaitis (zypox)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

const parentElements = (element) => {
  const parents = [];
  while (element) {
    const tagName = element.nodeName.toLowerCase();
    const cssId = element.id ? `#${element.id}` : '';
    let cssClass = '';
    if (element.className && typeof element.className === 'string') {
      // escape class names
      cssClass = `.${element.className
          .trim()
          .replace(/\s+/g, '.')
          .replace(/[:*+?^${}()|[\]\\]/gi, '\\$&')}`;
    }

    parents.unshift({
      element,
      selector: tagName + cssId + cssClass,
    });

    element = element.parentNode !== document ? element.parentNode : false;
  }

  return parents;
};

//export { parentElements };

const nthElement = (element, sameType = true) => {
  let c = element;
  let nth = 1;
  while (c.previousElementSibling !== null) {
    if (!sameType || c.previousElementSibling.nodeName === element.nodeName) {
      nth++;
    }
    c = c.previousElementSibling;
  }

  return nth;
};

//export { nthElement };

const nthSelectorNeeded = (selector, path) => {
  const querySelector = path === '' ? selector : `${path}>${selector}`;

  return document.querySelectorAll(querySelector).length > 1;
};

const buildPathString = (parents) => {
  const pathArr = [];

  parents.forEach((parent) => {
    if (nthSelectorNeeded(parent.selector, pathArr.join('>'))) {
      parent.selector += `:nth-of-type(${nthElement(parent.element)})`;
    }
    pathArr.push(parent.selector);
  });

  return pathArr.join('>');
};

const domElementPath = (element) => {
  if (!(element instanceof HTMLElement)) {
    throw new Error('element must be of type `HTMLElement`.');
  }

  return buildPathString(parentElements(element));
};

//export default domElementPath;