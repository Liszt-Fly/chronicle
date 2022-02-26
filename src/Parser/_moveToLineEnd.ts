export function moveToLineEnd(dom: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(dom); //obj为元素节点
    range.collapse(false);
    var sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
}