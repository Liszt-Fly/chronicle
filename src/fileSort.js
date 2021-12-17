const fsPromise = require("fs/promises")
const fs=require("fs")
const path=require('path')

const base = "/Users/qiaoyang/Desktop/"
exports.sortFile= async function sortFile(accordantce, dir) {
	let storage = []
	await fsPromise.readdir(dir).then(async (files) => {
		for (let file of files) {
			let stat = fs.lstatSync(path.resolve(dir,file))
		     let isDirectory=stat.isDirectory()
			await fsPromise.stat(path.join(dir,file)).then((s) => {
				storage.push({ stat: s, name: file,ignoredName:file.substr(0,file.length-path.extname(file).length),isDirectory })
			})
		}
		storage = storage.sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs)
	})
	return storage
}
