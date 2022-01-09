const fs = require("fs")
const path = require("path")

exports.sortFileInDepth = function sortFileInDepth(dir, storage) {
	let files = fs.readdirSync(dir)
	files.forEach((f) => {
		let item = {}
		item.name = f
		let stat = fs.lstatSync(dir, f).isDirectory()
		if (fs.lstatSync(path.resolve(dir, f)).isDirectory()) {
			item.isDirectory = true
			if (item["children"]) {
			} else {
				item["children"] = []
			}
			storage.push(item)
			sortFileInDepth(path.resolve(dir, f), item["children"])
		} else {
			item.name = f
			if (item["children"]) {
				item["children"].push(item)
			} else {
				item.isDirectory = false
				storage.push(item)
			}
		}
	})
	return storage
}
