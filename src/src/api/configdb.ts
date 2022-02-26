import { cTreeNode } from "@/api/interfaces/type"
import { ref } from "vue"
export let files = ref([])
export let basePath = ref("")

//* 当前Editor的节点列表
export let nodes = ref<cTreeNode[]>([])
//* 加载的当前默认文件
export let currentFile = ref<string>("")
