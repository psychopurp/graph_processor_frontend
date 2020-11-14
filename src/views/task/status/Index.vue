<template>
  <div class="main">
    <a-empty v-if="taskList.length == 0" />
    <a-tabs v-else type="line" style="height: 100%">
      <a-tab-pane
        style="height: 700px; overflow: auto"
        v-for="(item, index) of taskList"
        :key="index"
        :tab="item.name"
      >
        <a-row class="pannel">
          <a-col :span="6" style="height: 100%">
            <a-row style="height: 45%; margin: 0 0 5px 0">
              <a-card hoverable class="origin" title="原始图">
                <p>image</p>
              </a-card>
            </a-row>

            <a-row style="height: 45%">
              <a-card hoverable class="origin" title="采样图">
                <template #extra
                  ><a-tag color="#87d068">图采样率：{{ item.sampleRate }}%</a-tag>
                  <a-button type="primary" shape="round" size="small">
                    <template #icon>
                      <DownloadOutlined />
                      导出
                    </template>
                  </a-button>
                </template>
                <p>image</p>
              </a-card>
            </a-row>
          </a-col>

          <a-col :span="6" style="height: 90%; margin: 0 10px 0 10px">
            <job-list :jobs="item.jobType"></job-list>
          </a-col>

          <a-col :span="11" style="height: 90%">
            <job-result :jobs="item.jobType"></job-result>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, toRef, ref } from "vue";
import { useStore } from "vuex";
import { CommonFooter } from "@/components";
import Moment from "moment";
import GithubApi from "@/api/github";
import { DownloadOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons-vue";
import FormTitle from "@/views/task/components/FormTitle.vue";
import TaskList from "@/views/task/components/TaskList.vue";
import JobList from "@/views/task/components/JobList.vue";
import JobResult from "@/views/task/components/JobResult.vue";
import { Task, TaskCommon, TaskParam } from "@/model/task";
import { Modal } from "ant-design-vue";

export default defineComponent({
  name: "TaskStatus",
  components: {
    CommonFooter,
    DownloadOutlined,
    SettingOutlined,
    FormTitle,
    TaskList,
    UploadOutlined,
    JobList,
    JobResult,
  },
  setup() {
    const store = useStore();

    const state = reactive({ taskList: store.getters.taskList });
    const taskList = computed(() => store.getters["task/taskList"]);

    // store.commit("task/appendList", [new Task("任务一", null, ["rasr", "asfas", "fff"], 40)]);
    // store.commit("task/appendList", new Task("elyar", null, [], 30));
    // taskList.push();

    // const state = reactive({
    //   changelog: [],
    //   fileList: [] as Array<File>,
    //   uploading: false,
    // });
    const taskForm = reactive({
      name: "",
      jobType: ["显示节点度分布图"],
      sampleRate: 30,
      isSuggest: true,
      clear() {
        this.name = "";
        this.jobType = ["显示节点度分布图"];
        this.sampleRate = 30;
      },
      check() {
        if (this.name == "") {
          return "请输入任务名称";
        }
      },
      onChange(checked) {
        if (checked) {
          taskForm.sampleRate = 30;
        }
      },
    });

    const data = reactive({
      jobList: [] as Array<Task>,
    });

    const jobType = [
      {
        id: 1,
        name: "显示节点度分布图",
      },
      {
        id: 2,
        name: "计算聚类系数",
      },
      {
        id: 3,
        name: "节点分类",
      },
      {
        id: 4,
        name: "节点聚类",
      },
    ];

    const jobCount = computed(() => data.jobList.length);

    function addJob() {}

    // onMounted(getLastCommits);
    return {
      state,
      taskList,
      addJob,
      taskForm,
      labelCol: { span: 4, pull: 0 },
      wrapperCol: { span: 16, pull: 0 },
      data,
      jobCount,
      jobType,
    };
  },
});
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
  //   padding: 24px 0 0 2%;
  //   background: #444444;
}

.pannel {
  height: 100%;
  width: 100%;
  //   background: #f99;
}

.origin {
  //   background: #f99;
  height: 100%;
  width: 100%;
  //   border-style: solid;
  //   border-color: red;
}
</style>
