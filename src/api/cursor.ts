
export function moveCursorToNextLine(target: HTMLElement, index: number) {
    setTimeout(() => {
        console.log(document)
        let range = document.createRange()
        console.log(range)

        range.setStartAfter(target.children[index!])
        range.collapse(false)

        let sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
    }, 0);
}