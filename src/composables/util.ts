import fs from 'fs'
import path from 'path'
import { msfile } from './type'

export let sortFileInDepth = function sortFileInDepth(dir: string, storage: msfile[]) {
    let files: string[] = fs.readdirSync(dir)
    files.forEach(f => {
        let item: msfile = {}
        item.name = f
        let stat = fs.lstatSync(path.resolve(dir, f)).isDirectory()
        if (fs.lstatSync(path.resolve(dir, f)).isDirectory()) {
            item.isDirectory = true
            if (item.children) {

            }
            else {
                item.children = []
            }
            storage.push(item)
            sortFileInDepth(path.resolve(dir, f), item["children"])
        }
        else {
            item.name = f
            if (item["children"]) {
                item["children"].push(item)
            }
            else {
                item.isDirectory = false;
                storage.push(item)
            }
        }
    })
}