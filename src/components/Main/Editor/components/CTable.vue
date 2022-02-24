<script setup lang="ts">
import { bContentedible } from '@/Parser/db';
import { Parser } from '@/Parser/Parser';
import { onMounted, ref } from 'vue';

let emits = defineEmits(['addRow'])
let tbody = ref<HTMLTableElement | null>()


const props = defineProps({
    parser: Parser
})
let rowNumber: number = props.parser!.table!.length
let columnNumber: number = props.parser!.table![0].length
let header = ref<HTMLElement | null>()
let tarray = ref(props.parser!.table)
let table = ref<HTMLElement | null>()

onMounted(() => {
    Parser.currentNodeParser = props.parser!
    bContentedible.value = true

})
const addRow = () => {
    tarray.value!.push([])
    rowNumber = tarray.value!.length
    for (let i = 0; i < columnNumber; i++) {
        tarray.value![rowNumber - 1].push("")
    }

}
const addColumn = () => {

    columnNumber++;
    for (let i = 0; i < rowNumber; i++) {
        if (tarray.value![i]!.length < columnNumber) {
            tarray.value![i].push("")
        }
    }

}
</script>

<template>
    <div class="table-component">
        <div class="button-group" contenteditable="false">
            <div style="border:solid 1px#ddd;cursor:pointer; font-size:12px" @click="addRow">
                <i class="iconfont icon-add"></i> AddRow
            </div>
            <div style="border:solid 1px#ddd;cursor:pointer; font-size:12px" @click="addColumn">
                <i class="iconfont icon-add"></i> AddColumn
            </div>
            <div style="border:solid 1px#ddd;cursor:pointer; font-size:12px" @click="addColumn">
                <i class="iconfont icon-order"></i> Sort
            </div>
        </div>
        <table border="0" ref="table" id="tables" class="dataintable">
            <tr ref="header" v-for="row in tarray">
                <td v-for="column in row ">{{ column }}</td>
            </tr>
        </table>
    </div>
</template>
<style  lang="scss">
$baseheight: 50px;
.table-component {
    .button-group {
        display: flex;
        margin-bottom: 0px !important;
        border: solid 1px orange;

        div {
            padding: 5px;
            margin-bottom: 0 !important;
            vertical-align: middle;
        }
    }
    table {
        width: 100%;
    }
    table td {
        min-width: 50px;
        height: 30px;
    }
}

// table.dataintable {
//     margin-top: 10px;
//     border-collapse: collapse;
//     border: 1px solid #aaa;
//     width: 100%;
// }
// table.dataintable th {
//     vertical-align: baseline;
//     display: flex;
//     flex-direction: row;
//     padding: 5px 15px 5px 6px;
//     background-color: #3f3f3f;
//     border: 1px solid #3f3f3f;
//     text-align: left;
//     color: #fff;
// }
// table.dataintable td {
//     vertical-align: text-top;
//     padding: 6px 15px 6px 6px;
//     border: 1px solid #aaa;
// }
// table.dataintable tr:nth-child(odd) {
//     background-color: transparent;
// }
// table.dataintable tr:nth-child(even) {
//     background-color: transparent;
// }
</style>
