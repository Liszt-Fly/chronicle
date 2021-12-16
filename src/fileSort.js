const fsPromise = require("fs/promises")
const path=require('path')

const base = "/Users/qiaoyang/Desktop/"
exports.sortFile= async function sortFile(accordantce, dir) {
	let storage = []
	await fsPromise.readdir(dir).then(async (files) => {
		for (let file of files) {
			await fsPromise.stat(path.join(dir,file)).then((s) => {
				storage.push({ stat: s, name: file })
			})
		}
		storage = storage.sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs)
	})
	return storage
}
