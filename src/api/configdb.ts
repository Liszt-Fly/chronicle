import { ref } from "vue"
//!deprecated
import path from 'path'
import { chronicleArticlePath } from "./init"
export let files = ref([])
export let basePath = ref("")
export let storage = ref([])
//* 加载的当前默认文件
export let currentFile = ref<string>(path.resolve(chronicleArticlePath, "Standard.md"))
