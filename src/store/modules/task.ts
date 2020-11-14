import { Module } from "vuex";
import { toList } from "@/utils/tree";
import MenuApi from "@/api/menu";
import { Task } from "@/model/task";

interface TaskStoreState {
    taskList: Array<Task>;
}

const MENU_TREE_STORAGE = "menu-tree";

const taskModule: Module<TaskStoreState, any> = {
    namespaced: true,
    state() {
        let taskList = [];

        return {
            taskList
        };
    },
    getters: {
        taskList({ taskList }) {
            return taskList;
        },

    },
    mutations: {
        appendList(state, task: Task[]) {

            state.taskList.push(...task);
        },
        removeEventListener(state, index) {
            state.taskList.splice(index, 1)
        }
    },
    actions: {
        async uploadTasks({ commit }, task) {
            // const { data } = await MenuApi.currentMenuTree();

            // 保存数据
            commit("appendList", task);
        }
    }
};

export default taskModule;
