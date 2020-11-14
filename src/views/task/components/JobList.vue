<template>
  <a-card title="分析任务列表" class="main">
    <a-list item-layout="horizontal" :data-source="jobs">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <div style="width: 100%; height: 100%; margin: 0 0px 0px 0">
            <a-row type="flex" style="margin: 0 0 10px 0">
              <div class="job-name">{{ item }}</div>
              <a-progress :percent="50" size="small" status="active" />
            </a-row>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Task, TaskCommon, TaskParam } from "@/model/task";
export default defineComponent({
  name: "JobList",
  props: {
    jobs: [],
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
.main {
  background: #fff;
}
</style>
