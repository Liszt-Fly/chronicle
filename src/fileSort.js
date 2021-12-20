// @ts-nocheck
const fsPromise = require("fs/promises")
const fs=require("fs")
const path=require('path')



const base = "/Users/qiaoyang/Desktop/Spring"

//递归 
exports.sortFile=async function sortFile(accordance, dir, depth) {
	let storage = []
	await fsPromise.readdir(dir).then(async (files) => {
		for (let file of files) {
			
			let stat = fs.lstatSync(path.resolve(dir, file))
			let isDirectory = stat.isDirectory()
			if (isDirectory) {
				sortFile(accordance,path.resolve(dir,file),depth+1)
			}
			await fsPromise.stat(path.join(dir,file)).then((s) => {
			storage.push({ stat: s, name: file,ignoredName:file.substr(0,file.length-path.extname(file).length),isDirectory,folderPath:isDirectory?path.resolve(dir,file):null,depth:depth})
			})
			
	
		
		}

		storage = storage.sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs)
		
	
	})
return storage
}
let storage=[]
function sortFileInDepth( dir,storage) {
	

	 
	let files = fs.readdirSync(dir)

	for (let file of files) {
		
		let item = {}
		 let stat = fs.lstatSync(path.resolve(dir, file))
		 let bDir = stat.isDirectory()
		 //如果是文件夹
		if (bDir) {
			 item.name=file
			 if (item["children"]) {
				 
			 }
			 else {
				 item.children = []
				
			 }
			 storage.push(item)
			 //递归
		
			  sortFileInDepth(path.resolve(dir,file),item["children"]
					)
		 }
		 //文件
		 else {
			 
			 item.name = file
		
			 if (item["children"]) {
				 item["children"].push(item)
			 }
			 else {
				 storage.push(item)
				
			 }
		 }
		 
		 
	 }
	 return storage

}
console.log(JSON.stringify(sortFileInDepth(base, storage),null,2));

let dataStructure = []
/*
{
	name:"",
	bDir:true
	children:[
	{
	name:"",
	children:[
	{
	name:"",
	bDir:false
	}
	]
	}
	],

}


*/






