import {
  camelizeKeys as humpsCamelizeKeys,
  decamelizeKeys as humpsDecamelizeKeys
} from 'humps';

export function decamelizeKeys(string) {
  return humpsDecamelizeKeys(string, {
    split: /(?=[A-Z0-9])/
  });
}

export function camelizeKeys(string) {
  return humpsCamelizeKeys(string);
}

export function reverseString(string) {
  let reversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }
  return reversed;
}

export function isEllipsis(e) {
  if (e) {
    return (e.offsetWidth < e.scrollWidth);
  }
  return false;
}
