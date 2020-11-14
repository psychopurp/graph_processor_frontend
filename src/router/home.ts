import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import TaskLayout from "@/layouts/TaskLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: TaskLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(
            /* webpackChunkName: "home" */
            "@/views/home/Index.vue"
          ),
      },
    ],
  },
];

export default routes;
