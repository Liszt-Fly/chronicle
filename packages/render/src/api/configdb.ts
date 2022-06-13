import { Ref, ref } from "vue"
import path from 'path'
import { chronicleUserPath } from "./init"
import { fileTree } from "@/FileTree/fileTree"
export let files = ref([])
export let bClickedParent: Ref<boolean> = ref(false)
export let default_path = path.resolve(chronicleUserPath, "assets", "Standard.md")
//* 将所有的tag都存储在tag容器内
export let cTagContainer: Ref<string[]> = ref([])
//* 加载的当前默认文件
export let currentFile = ref<string>(default_path)
//* 默认的fileTree存储路径
export let defaultFileTreePath = path.resolve(chronicleUserPath, "config", "fileTree.json")
export let fTree: Ref<fileTree | null> = ref(null)