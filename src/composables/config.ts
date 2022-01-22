import { ref } from "vue"
import { openFolder, toggleTabBar } from "./TabBarFunction"
import { cTreeNode } from "./type"

export let display = ref(true)
export let files = ref([])
export let basePath = ref("")
export let content = ref("")
export let paragraphs = ref<cTreeNode[]>([])
let tabBarItems = [
	{
		item: "mindmap",
		icon: "iconfont icon-mind_map",
		func: toggleTabBar,
		to: "/",
	},
	{ item: "folder", icon: "bi bi-folder", func: openFolder, to: "/" },
	{
		item: "star",
		icon: "bi bi-bookmark-star",
		to: "/tagsystem",
		func: testFunc,
	},
	{ item: "setting", icon: "bi bi-gear", to: "/setting", func: testFunc },
	{ item: "search", icon: "bi bi-search", to: "/searchsystem", func: testFunc },
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
function testFunc() {
	console.log("测试方法已经执行")
}

export { tabBarItems, getRandomColor }
