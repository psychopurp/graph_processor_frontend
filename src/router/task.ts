import { RouteRecordRaw } from "vue-router";
import TaskLayout from "@/layouts/TaskLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/task",
        name: "Task",
        component: TaskLayout,
        children: [
            {
                path: "/task/create",
                name: "Create",
                component: () =>
                    import(
                        /* webpackChunkName: "home" */
                        "@/views/task/Index.vue"
                    ),
            },
            {
                path: "/task/status",
                name: "Status",
                component: () =>
                    import(
                        "@/views/task/status/Index.vue"
                    ),
            },
            {
                path: "/task/report",
                name: "Report",
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
