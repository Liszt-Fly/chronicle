import { Ref, ref } from "vue"
import path from 'path'
import { chronicleUserPath } from "./init"
import { qFile } from "@/interfaces/type"
export let files = ref([])
//* fileTree暂时存储在内存中，在chronicle关闭和打开的时候进行加载和存储
export let storage: Ref<qFile[]> = ref([])
export let cFileStorage = ref([])
export let default_path = path.resolve(chronicleUserPath, "assets", "Standard.md")
//* 将所有的tag都存储在tag容器内
export let cTagContainer: Ref<string[]> = ref([])
//* 加载的当前默认文件
export let currentFile = ref<string>(default_path)
//* 默认的fileTree存储路径
export let defaultFileTreePath = path.resolve(chronicleUserPath, "config", "fileTree.json")