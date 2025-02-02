import collectElements from "./collectElements.js";
/**
 * Collects all parent elements of a given element.
 * 
 * @param node the element
 */

export default function parents(node) {
  return collectElements(node, 'parentElement');
}