import { cTreeNode } from "@/api/interfaces/type"
import { ref } from "vue"
export let files = ref([])
export let display = ref(true)
export let basePath = ref("")
export let content = ref("")
//* 当前Editor的节点列表
export let paragraphs = ref<cTreeNode[]>([])
//* 加载的当前默认文件
export let currentFile = ref<string>("")
export let rootPath = ref("")



