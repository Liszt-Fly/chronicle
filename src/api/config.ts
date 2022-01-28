import { ref } from "vue"
import { openFolder } from "./NavBar/TabBarFunction"
import { cTreeNode } from "./NavBar/FileSystem/type"

export let display = ref(true)
export let files = ref([])
export let basePath = ref("")
export let content = ref("")
//* 当前Editor的节点列表
export let paragraphs = ref<cTreeNode[]>([])
//* 加载的当前默认文件
export let currentFile = ref<string>("")

let tabBarItems = [
	{ item: "folder", icon: "bi bi-bookmark-heart", func: openFolder, to: "/" },
	{ item: "setting", icon: "bi bi-sliders", func: null, to: "/setting" },
]

let colorset = [
	"#16a085",
	"#f1c40f",
	"#34495e",
	"#e74c3c",
	"#c0392b",
	"#3B3B98",
	"#82589F",
	"#c56cf0",
	"#0a3d62",
	"#e58e26",
	"#0a3d62",
	"#130f40",
	"#30336b",
	"#eb4d4b",
]

function getRandomColor() {
	let index = Math.floor(Math.random() * colorset.length)
	return colorset[index]
}

export { tabBarItems, getRandomColor }
