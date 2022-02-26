import { ref } from "vue"
export let files = ref([])
export let basePath = ref("")

//* 加载的当前默认文件
export let currentFile = ref<string>("")
