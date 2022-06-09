
export function moveCursorToNextLine(target: HTMLElement, index: number) {
    setTimeout(() => {

        let range = document.createRange()

        range.setStartAfter(target.children[index!])
        range.collapse(false)

        let sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
    }, 0);
}