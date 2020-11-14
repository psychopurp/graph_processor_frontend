<template>
  <div class="task-layout">
    <a-row>
      <a-col :span="14">
        <a-card title="任务配置" style="height: 500px">
          <a-form :model="fotaskFormrm">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务名称" required>
              <a-input v-model:value="taskForm.name" placeholder="请输入任务名称" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="装载图文件" required>
              <a-upload
                :fileList="state.fileList"
                :remove="handleRemove"
                :beforeUpload="beforeUpload"
              >
                <a-button :disabled="state.fileList.length != 0">
                  <upload-outlined /> 选择文件
                </a-button>
              </a-upload>
            </a-form-item>

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="选择分析任务"
              required
            >
              <a-select
                mode="multiple"
                v-model:value="taskForm.jobType"
                placeholder="please select your zone"
              >
                <a-select-option v-for="item of jobType" :key="item.name">{{
                  item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="图采样率" required>
              <a-row>
                <a-col :span="19"
                  ><a-slider v-model:value="taskForm.sampleRate" :min="1" :max="100"
                /></a-col>
                <a-col :span="4" :offset="1">
                  <a-input-number v-model:value="taskForm.sampleRate" :min="1" :max="100" />
                </a-col>
              </a-row>
            </a-form-item>

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="使用推荐配置"
              required
            >
              <a-switch v-model:checked="taskForm.isSuggest" @change="taskForm.onChange" />
            </a-form-item>
            <a-col :span="4" :offset="16">
              <a-button type="primary" @click="addJob">加入任务队列</a-button>
            </a-col>
          </a-form>
        </a-card>
      </a-col>

      <a-col :span="9" :offset="1">
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="10">
            <a-statistic title="待开始的任务" :value="jobCount" suffix="个" />
          </a-col>
          <a-col :span="4">
            <a-button type="primary" @click="start">开始任务</a-button>
          </a-col>
        </a-row>
        <a-divider />
        <a-card style="height: 390px; overflow: auto">
          <task-list :tasks="data.jobList"> </task-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, toRef } from "vue";
import { useStore } from "vuex";
import { UploadOutlined } from "@ant-design/icons-vue";
import FormTitle from "@/views/task/components/FormTitle.vue";
import TaskList from "@/views/task/components/TaskList.vue";
import { Task, TaskCommon, TaskParam } from "@/model/task";
import { Modal } from "ant-design-vue";

export default defineComponent({
  name: "TaskCreate",
  components: {
    FormTitle,
    TaskList,
    UploadOutlined,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      changelog: [],
      fileList: [] as Array<File>,
      uploading: false,
    });
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

    function addJob() {
      if (taskForm.name == "") {
        Modal.error({
          title: "任务配置有误",
          content: "请输入任务名称",
        });
        return;
      }
      if (state.fileList.length == 0) {
        Modal.error({
          title: "任务配置有误",
          content: "请选择需要处理的文件",
        });
        return;
      }

      data.jobList.push(
        new Task(taskForm.name, state.fileList[0], taskForm.jobType, taskForm.sampleRate)
      );
      taskForm.clear();
    }

    function beforeUpload(file: File) {
      console.log(file);
      state.fileList.push(file);
      return false;
    }
    function handleRemove(file: File) {
      const index = state.fileList.indexOf(file);
      state.fileList.splice(index, 1);
    }

    function start() {
      store.commit("task/appendList", data.jobList);
      data.jobList = [];
    }

    // onMounted(getLastCommits);
    return {
      state,
      beforeUpload,
      handleRemove,
      addJob,
      taskForm,
      labelCol: { span: 4, pull: 0 },
      wrapperCol: { span: 16, pull: 0 },
      data,
      jobCount,
      jobType,
      start,
    };
  },
});
</script>

<style lang="less" scoped>
.task-layout {
  height: 100%;
  padding: 24px 0 0 2%;
  //   background: #444444;

  .task-button {
    // width: 20px;
    background: #fff;
  }
}
</style>
