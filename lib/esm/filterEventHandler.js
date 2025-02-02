import contains from "./contains.js";
import qsa from "./querySelectorAll.js";
export default function filterEvents(selector, handler) {
  return function filterHandler(e) {
    var top = e.currentTarget;
    var target = e.target;
    var matches = qsa(top, selector);
    if (matches.some(function (match) {
      return contains(match, target);
    })) handler.call(this, e);
  };
}