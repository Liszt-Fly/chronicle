import { Ref, ref } from "vue"
import path from 'path'
import { chronicleUserPath } from "../api/init"
import { fileTree } from "@/api/FileTree/fileTree"
import { fileNode } from "@/api/FileTree/fileNode"
export let bClickedParent: Ref<boolean> = ref(false)
//* 将所有的tag都存储在tag容器内
export let cTagContainer: Ref<string[]> = ref([])
//* 加载的当前默认文件
export let openFiles: Ref<Set<string>> = ref(new Set([]))
export let currentFile = ref<string>("")
//* 默认的fileTree存储路径
export let defaultFileTreePath = path.resolve(chronicleUserPath, "config", "fileTree.json")
export let fTree: Ref<fileTree | null> = ref(null)
export let SettingPage: Ref<string> = ref("/Setting/Info")
export let menuDisplay = ref("none");
export let dialogVisible = ref(false)
export let trashBin: Ref<fileTree | null> = ref(null)