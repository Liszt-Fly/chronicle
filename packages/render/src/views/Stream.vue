<script setup lang="ts">
import Paper from "@/components/Stream/Paper.vue";
import { qFile } from "@/interfaces/type";
import { chronicleUserPath } from "@/api/init";
import fs from "fs-extra";
import path from "path";
import { reactive } from "vue";

let storage: qFile[] = [];
let filestorage: qFile[] = [];
const stream = reactive({
  pin: false,
  tags: [],
  global_search: ""
})
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

function forEachWithNoChildren(Apath: string, storage: qFile[]) {
  let list = fs.readdirSync(Apath);
  if (list.length == 0) return;
  for (const item of list) {
    let file = fs.statSync(path.resolve(Apath, item));
    if (file.isFile()) {
      storage.push({ name: item, path: path.resolve(Apath, item), createdDate: file.birthtime, lastUpdateDate: file.mtime });
    } else {
      forEachWithNoChildren(path.resolve(Apath, item), storage);
    }
  }
}

forEachWithNoChildren(path.resolve(chronicleUserPath, "assets"), storage);
storage.forEach((item) => {
  if (!item.children) {
    if (item.name.startsWith(".")) {
      return;
    }
    filestorage.push(item);
  }
});

const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
]
</script>

<template>
  <div class="stream">

    <el-form :inline="true">
      <el-form-item v-model="stream">
        <template #label>
          <el-tooltip :content="$t('stream.pin')" placement="bottom" effect="customized">
            <i class="bi bi-pin-angle"></i>
          </el-tooltip>
        </template>
        <el-switch v-model="stream.pin" />
      </el-form-item>
      <el-form-item v-model="stream">
        <template #label>
          <el-tooltip :content="$t('stream.tag')" placement="bottom" effect="customized">
            <i class="bi bi-filter-square"></i>
          </el-tooltip>
        </template>
        <el-select v-model="stream.tags" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
          style="width: 160px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <template #label>
          <el-tooltip :content="$t('stream.global_search')" placement="bottom" effect="customized">
            <i class="bi bi-binoculars"></i>
          </el-tooltip>
        </template>
        <el-input v-model="stream.global_search" style="width: 160px">
        </el-input>
      </el-form-item>
    </el-form>

    <el-scrollbar height="80vh">
      <div class="papers">
        <el-row :gutter="30" style="width: 80%">
          <template v-for="file in filestorage">
            <el-col :span="8" :xs="12" :md="6" :sm="8" :lg="5">
              <Paper :file="file"></Paper>
            </el-col>
          </template>
        </el-row>
        <el-timeline styel="display:float">
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-scrollbar>
  </div>

</template>

<style lang="scss" scoped>
.stream {
  padding: 4px 15px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 8px);


  .el-form-item__label i {
    margin-right: 1rem;
    font-size: 1rem
  }

  .papers {
    display: flex;
    flex-direction: row;
  }
}
</style>
