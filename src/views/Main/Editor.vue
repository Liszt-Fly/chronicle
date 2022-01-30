<script setup lang="ts">
import { onMounted, Ref, ref, watch, watchEffect } from "vue"
import { currentFile, paragraphs } from "@/api/configdb"
import { initMarked } from "@/api/init"
import { loadNodeLists, saveArticle } from "@/api/Editor/Editor"

import FileSystem from "@/components/Main/Editor/FileSystem/FileSystem.vue"

let rContainer = ref<HTMLBaseElement | null>(null)
function save(event: KeyboardEvent) {
	if (event.metaKey && event.keyCode == 83 && currentFile.value != "") {
		saveArticle(paragraphs.value, currentFile.value)
	}
}
let shouldChange:Ref<boolean> =ref(false)
let editable: Ref<boolean> = ref(false)
initMarked()
onMounted(() => {
//如果应该change,那么就应该Change
watch(shouldChange,(value,oldvalue)=>{
editable.value = !editable.value
})

	setInterval(()=>{
		//如果value不为0说明应该进行change
		shouldChange.value=!(window.getSelection()!.focusOffset-(window.getSelection()!.anchorOffset)==0)
			console.log(shouldChange.value)
	})

	watchEffect(() => {

		if (currentFile.value != "") {
			paragraphs.value = loadNodeLists(currentFile.value)

		} else {
			console.log("当前无文件")
		}
	})
})



const drag = () => {
	console.log("drag")
}
</script>

<template>
	<div style="display: flex;">
		<div class="extendedPanel">
			<FileSystem></FileSystem>
		</div>
		<!-- <div class="magic" @click="edit()" title="点击改变选择模式">
			<i
				:class="[
					'bi',
					{ 'bi-textarea-t': editable },
					{ 'bi-fonts': !editable },
				]"
			></i>
		</div>-->

		<div class="editor" ref="rContainer" @keydown="save($event)" :contenteditable="editable" >
			<template v-for="paragraph in paragraphs" :key="paragraph.title">
				<component :is="paragraph.type" :paragraph="paragraph" ></component>
			</template>
		</div>
	</div>
</template>

<style>
.magic {
	position: fixed;
	top: 20px;
	right: 20px;
	width: 32px;
	height: 32px;
	text-align: center;
	background-color: #fff;
	border-radius: 5px;
	display: grid;
	color: #444;
	justify-items: center;
	align-items: center;
	cursor: pointer;
}
</style>