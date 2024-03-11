/* eslint-disable no-nested-ternary */
import { cancel, request } from "./animationFrame.js";
import height from "./height.js";
import getWindow from "./isWindow.js";
import getOffset from "./offset.js";
import getScrollParent from "./scrollParent.js";
import scrollTop from "./scrollTop.js";
export default function scrollTo(selected, scrollParent) {
  var offset = getOffset(selected);
  var poff = {
    top: 0,
    left: 0
  };
  if (!selected) return undefined;
  var list = scrollParent || getScrollParent(selected);
  var isWin = getWindow(list);
  var listScrollTop = scrollTop(list);
  var listHeight = height(list, true);
  if (!isWin) poff = getOffset(list);
  offset = {
    top: offset.top - poff.top,
    left: offset.left - poff.left,
    height: offset.height,
    width: offset.width
  };
  var selectedHeight = offset.height;
  var selectedTop = offset.top + (isWin ? 0 : listScrollTop);
  var bottom = selectedTop + selectedHeight;
  listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;
  var id = request(function () {
    return scrollTop(list, listScrollTop);
  });
  return function () {
    return cancel(id);
  };
}