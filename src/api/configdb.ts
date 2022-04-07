import { ref } from "vue"
//!deprecated
export let files = ref([])
export let basePath = ref("")
export let storage = ref([])
//* 加载的当前默认文件
export let currentFile = ref<string>("")
