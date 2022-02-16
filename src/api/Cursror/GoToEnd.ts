export function gotoEnd(target: Node) {
    let range = document.createRange()
    range.setEndAfter(target)
    range.collapse(false)
    let sel = window.getSelection();
    sel?.removeAllRanges()
    sel?.addRange(range)
}