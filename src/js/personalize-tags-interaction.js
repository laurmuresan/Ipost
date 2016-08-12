import { reverseString } from './utils/string';

/* The handleTagInteraction() function requires the following parameters:
   - inputNode - the input DOM node in which the tag interaction is implemented

   - inputValueAlteringCallback(output, tagLength) - the function that modifies the input's value;
                                                     it's either a Nuclear Action or a function that alters
                                                     the input HTML element's value directly;

   - event - the event object provided by the onKeyDown Event

   NOTE: always wrap handleTagInteraction() in a component class method, then assign it to the onKeyDown event.
*/

export function handleTagInteraction(inputNode, inputValueAlteringCallback, event, isCKEditor, kc) {
  let target;
  let keyCode;
  let value;
  let selectionStart;
  let selectionEnd;

  if (isCKEditor === 'source') { // CKEditor in source mode
    value = inputNode.value;
    selectionStart = inputNode.selectionStart;
    selectionEnd = inputNode.selectionEnd;
    keyCode = kc;
  }

  if (isCKEditor === 'wysiwyg') { // CKEditor in wyswyg mode
    let caretPosition = getCaretInContentEditable(inputNode);
    value = inputNode.innerText; // issues deleting itl from a multi-line section => merges all lines into one; this happens due to lack of newlines (\n)
    //todo: the problem here is the fact that you get the caret for the text but you actually work with the html, so the selectionIndex will be wrong due to the extra html tags
    //value = inputNode.innerHTML; // this fixes the above issue but only works for the first line, for the 2nd line the detection algorithm fails
    //value = value.replace(/&nbsp;/g,' '); //replace &nbsp with spaces
    selectionStart = caretPosition;
    selectionEnd = caretPosition;
    keyCode = kc;
  }

  if (!isCKEditor) { // textareas, inputs
    target = event.target;
    keyCode = event.keyCode;
    value = target.value;
    selectionStart = target.selectionStart;
    selectionEnd = target.selectionEnd;
  }

  const arrowKeys = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
  const isNotRangeSelection = selectionStart === selectionEnd;
  let isDangerousKey = true;
  let caretInTagData = null;
  let caretOutsideOfTagData = null;

  for (let key in arrowKeys) {
    if (arrowKeys[key] === keyCode) {
      isDangerousKey = false;
    }
  }
  if (isNotRangeSelection && isDangerousKey) {
    const payload = {
      value,
      selectionIndex: selectionStart,
      keyCode,
      event
    };

    caretInTagData = handleCaretInTag(payload);
    caretOutsideOfTagData = handleCaretOutsideOfTag(payload);

    if (caretInTagData.output || (caretInTagData.tagLength && !caretInTagData.output)) {
      const { output, tagLength } = caretInTagData;

      inputValueAlteringCallback(output, tagLength);
      handleCaretReposition(selectionStart, tagLength, inputNode);
    }
    if (caretOutsideOfTagData.output || (caretOutsideOfTagData.tagLength && !caretOutsideOfTagData.output)) {
      const { output, tagLength } = caretOutsideOfTagData;

      inputValueAlteringCallback(output, tagLength);
      handleCaretReposition(selectionStart, tagLength, inputNode);
    }
  }
}

// function setCaretInCKEditor(inputNode, selectionIndex) {
//   let editor = window.CKEDITOR.currentInstance;
//   editor.focus();
//   let range = editor.createRange();
//
//   range.moveToPosition( range.root.editor, CKEDITOR.POSITION_BEFORE_END );
//   editor.getSelection().selectRanges( [ range ] );
//
//   // range.setStart(editor.document.$.body, selectionIndex);
//   // //range.setStart(inputNode.children[0], selectionIndex);
//   // range.setEnd(editor.document.$.body.children[0], selectionIndex);
//   // //range.setEnd(inputNode.children[0], selectionIndex);
//   // editor.getSelection().selectRanges([range]);
// }

function getCaretInContentEditable(element) {
  let caretOffset = 0;
  let doc = element.ownerDocument || element.document;
  let win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection !== "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      let range = win.getSelection().getRangeAt(0);
      let preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== "Control") {
    let textRange = sel.createRange();
    let preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

function handleCaretInTag(args) {
  const { value = '', event, keyCode } = args;
  let { selectionIndex } = args;

  let leftSide = value.substring(0, selectionIndex);
  let reversedLeftSide = reverseString(leftSide);
  let rightSide = value.substring(selectionIndex, value.length);

  let isInMiddleOfTag = false;
  let hasValidClosingCurly = false;
  let hasValidOpeningCurly = false;
  let openingCurlyIndex = null;
  let closingCurlyIndex = null;

  let leftOutput = null;
  let rightOutput = null;
  let output = null;
  let tagLength = null;

  //if caret is between '{' and '/'
  if (leftSide[leftSide.length - 1] === '{' && rightSide[0] === '\\'){
    selectionIndex++;
    leftSide = value.substring(0, selectionIndex);
    reversedLeftSide = reverseString(leftSide);
    rightSide = value.substring(selectionIndex, value.length);
  }

  if (rightSide.indexOf('}') !== -1) {
    if (rightSide.indexOf('{\\') !== -1) {
      if (rightSide.indexOf('}') < rightSide.indexOf('{\\')) {
        hasValidClosingCurly = true;
      }
    } else {
      hasValidClosingCurly = true;
    }
    closingCurlyIndex = leftSide.length + rightSide.indexOf('}') + 1;
  }

  if (reversedLeftSide.indexOf('\\{') !== -1) {
    if (reversedLeftSide.indexOf('}') !== -1) {
      if (reversedLeftSide.indexOf('\\{') < reversedLeftSide.indexOf('}')) {
        hasValidOpeningCurly = true;
      }
    } else {
      hasValidOpeningCurly = true;
    }
    openingCurlyIndex = reversedLeftSide.length - 2 - reversedLeftSide.indexOf('\\{');
  }

  if (hasValidOpeningCurly && hasValidClosingCurly) {
    isInMiddleOfTag = true;
  }

  if (isInMiddleOfTag) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    if (keyCode === 8 || keyCode === 46) {
      leftOutput = value.substring(0, openingCurlyIndex);
      rightOutput = value.substring(closingCurlyIndex, value.length);

      output = leftOutput + rightOutput;
      tagLength = value.substring(openingCurlyIndex, selectionIndex).length;
    }
  }

  return { output, tagLength };
}

function handleCaretOutsideOfTag(args) {
  const {
    value,
    selectionIndex,
    keyCode,
    event
  } = args;
  let processedValueData = null;

  if (keyCode === 8) {
    processedValueData = handleBackspace(value, selectionIndex, event);
  }
  if (keyCode === 46) {
    processedValueData = handleDelete(value, selectionIndex, event);
  }
  // handleTagInteraction() requires that every returned
  // object has an existing output property
  return processedValueData || { output: null };
}

function handleBackspace(value, selectionIndex, event) {
  const leftSide = value.substring(0, selectionIndex);
  const reversedLeftSide = reverseString(leftSide);
  let leftOutput = '';
  let rightOutput = '';
  let tagLength = 0;
  let output = '';

  if (leftSide[leftSide.length - 1] === '}') {
    if (reversedLeftSide.indexOf('\\{') !== -1) {
      leftOutput = value.substring(0, reversedLeftSide.length - 2 - reversedLeftSide.indexOf('\\{'));
      rightOutput = value.substring(selectionIndex, value.length);
      if (event.preventDefault) {
        event.preventDefault();
      }
      output = leftOutput + rightOutput;
      tagLength = value.length - output.length;

      return { output, tagLength };
    }
  }
}

function handleDelete(value, selectionIndex, event) {
  const rightSide = value.substring(selectionIndex, value.length);
  let leftOutput = value.substring(0, selectionIndex);
  let rightOutput = '';
  let output = '';

  if (rightSide[0] === '{' && rightSide[1] === '\\') {
    if (rightSide.indexOf('{\\') < rightSide.indexOf('}')) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      rightOutput = rightSide.substring(rightSide.indexOf('}') + 1, rightSide.length);
      output = leftOutput + rightOutput;

      return { output };
    }
  }
}

function handleCaretReposition(selectionIndex, tagLength, inputNode) {
  if (tagLength) {
    selectionIndex -= tagLength;
  }
  // update caret position at next event loop
  // (after the component is re-rendered following the store interaction)
  setTimeout(() => {
    inputNode.focus();
    if (inputNode.setSelectionRange) { // resposition caret for:
      inputNode.setSelectionRange(selectionIndex, selectionIndex); // inputs, textareas
    } //else {
      // todo: fix this, range is not accepted
      // http://stackoverflow.com/questions/16835365/set-cursor-to-specific-position-in-ckeditor
      // http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element
      //setCaretInCKEditor(inputNode, selectionIndex);  // contenteditable
    //}
  }, 0);
}
