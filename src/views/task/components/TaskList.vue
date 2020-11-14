<template>
  <a-list item-layout="horizontal" :data-source="tasks">
    <template #renderItem="{ item, index }">
      <a-list-item>
        <div style="width: 100%; height: 100%; margin: 0 0px 0px 0">
          <a-row type="flex" style="margin: 0 0 10px 0">
            <div class="job-name">
              任务名称: <span>{{ item.name }}</span>
            </div>

            <div class="job-sample">
              <a-tag color="#87d068">图采样率：{{ item.sampleRate }}%</a-tag>
            </div>
            <!-- <a-tag v-for="j of item.jobType" :key="j" color="pink">{{ j }}</a-tag> -->
          </a-row>
          <a-row style="width: 100%" type="flex" justify="start">
            <a-col :span="5">
              <div class="job-name" style="margin: 0px 5px 0 0">处理任务列表:</div>
            </a-col>
            <a-col :span="18">
              <a-tag
                style="margin: 2px 2px 2px 0"
                v-for="j of item.jobType"
                :key="j"
                color="pink"
                >{{ j }}</a-tag
              >
            </a-col>
          </a-row>
          <a-row type="flex" justify="space-between">
            <a-col :span="24">
              <div class="file">
                文件: <span style="margin: 0 60px 0 0">{{ item.data.name }}</span> size:
                <span>{{ fileSize(item.data.size) }} KB </span>
              </div>
            </a-col>
          </a-row>
          <a-row type="flex" justify="end" style="margin: 5px 0 5px 0">
            <a-col :span="6">
              <a-button size="small" type="danger" @click="tasks.splice(index, 1)" block>
                取消</a-button
              >
            </a-col>
          </a-row>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Task, TaskCommon, TaskParam } from "@/model/task";
export default defineComponent({
  name: "Test",
  props: {
    tasks: [],
  },
  setup() {
    const fileSize = (size: number) => {
      let newSize = (size / 1024).toFixed(2);
      return newSize;
    };
    return {
      fileSize,
    };
  },
});
</script>

<style lang="less" scoped>
.job-item {
  //   display: flex;
  //   height: 100px;
  //   align-items: flex-start;
  //   justify-content: space-between;
}
.job-name {
  //   display: flex;

  //   background: #f11111;
  > span {
    color: #000;
  }
}

.job-sample {
  margin: 0 0 0 15px;
  //   display: flex;
  //   font-size: 14px;
  //   align-self: flex-end;
  //   background: #f11111;
}
.file {
  //   font-size: 13px;
  //   font-weight: 500;
  //   color: #000;
  margin: 5px 0 5px 0;
  > span {
    margin: 0 5px 0 5px;
    color: #000;
  }
}
</style>
