function addElement() {
	let div: HTMLDivElement = document.createElement("div")!
	div.contentEditable = "true"
	div.style.outline = "none"

	rContainer.value!.appendChild(div)

	div.focus()
	let text = ""
	let md = ""
	let bBlock = false
	div.addEventListener("keydown", (event) => {
		let target = event.target as HTMLDivElement

		if (!bBlock) {
			bBlock = true
			if (event.keyCode == 13) {
				if (
					target.innerText.startsWith("```") &&
					target.innerText.length > 3 &&
					!target.innerText.endsWith("```")
				) {
				} else {
					event.preventDefault()
					text = target.innerText

					md = marked.parse(text)

					target.innerHTML = md
					addElement()
				}
			}
		}
		bBlock = false
	})
	div.addEventListener("focus", (event) => {
		let target = event.target as HTMLDivElement
		target.innerText = text

		// event.target.innerHTML = text
	})
	div.addEventListener("blur", (event) => {
		let target = event.target as HTMLDivElement
		if (!bBlock) {
			bBlock = true
			text = target.innerText
			md = marked.parse(text)
			console.log(md)
			target.innerHTML = md
		}
		bBlock = false
	})
}
