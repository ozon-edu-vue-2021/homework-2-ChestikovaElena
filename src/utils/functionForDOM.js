const findListInElement = (element) => {
  let result = null;
  if (element.querySelector('ul')) {
    result = element.querySelector('ul').firstChild.querySelector('.node-wrapper');
  }
  return result;
}

const findNextSibling = (element) => {
  if (element.closest('li')) {
    let siblingInElement = element.closest('li').nextSibling || null;
    if (!siblingInElement) {
      return {
        sibling: null,
        isRootElement: false
      };
    } else {
      siblingInElement = siblingInElement.querySelector('.node-wrapper');
      return {
        sibling: siblingInElement,
        isRootElement: false
      };
    }
  } else {
    return {sibling: null, isRootElement: true};
  }
}

const findPreviousSibling = (element) => {
  let result = null;
  if (element.closest('li')) {
    let siblingInElement = element.closest('li').previousSibling || null;
    let parentElement = element.closest('li').closest('.node-wrapper');
    if (!siblingInElement) {
      result = {sibling: parentElement, isRootElement: false};
    } else {
      siblingInElement = siblingInElement.querySelector('.node-wrapper');
      if (!siblingInElement.querySelector('ul')) {
        result = {
          sibling: siblingInElement,
          isRootElement: false
        };
      } else {
        const lastChildInSibling = siblingInElement.querySelector('ul').lastChild;
        result = {
          sibling: lastChildInSibling,
          isRootElement: false
        };
      }
    }
  } else {
    result = {sibling: null, isRootElement: true};
  }
  return result;
}

export { findListInElement, findNextSibling, findPreviousSibling }