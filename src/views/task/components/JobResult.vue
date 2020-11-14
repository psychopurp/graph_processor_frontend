<template>
  <a-card title="已完成任务可视化结果" class="main">
    <a-tabs
      tab-position="left"
      :style="{ height: '500px' }"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane v-for="(i, index) in jobs" :key="index" :tab="i">
        <div style="height: 100%">
          <a-row type="flex" justify="end">
            <a-button type="primary" shape="round" size="small">
              <template #icon>
                <DownloadOutlined />
                导出任务结果
              </template>
            </a-button>
          </a-row>
          <a-row type="flex" align="middle" justify="center">
            <a-empty />
          </a-row>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Task, TaskCommon, TaskParam } from "@/model/task";
import { DownloadOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "JobResult",
  components: { DownloadOutlined },
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
  //   background: #f66;
  height: 100%;
}
</style>
