import { Parser } from "./Parser";
import { ref } from 'vue'
let map = new Map<string, Parser>();
export let article = ref<Map<string, Parser>>(map)

