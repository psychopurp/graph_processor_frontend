<template>
  <a-layout class="main-layout">
    <a-layout-header class="main-header">
      <div class="logo">图数据处理平台</div>
      <a-menu
        :theme="theme"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        @click="menuClickHandle"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item of menu" :key="item.key">{{ item.value }}</a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content
      class="main-content"
      :style="{ margin: '20px 16px', padding: '24px', background: '#fff' }"
    >
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { SidebarMenu, AvatarDropdown } from "@/components";
import { LOGIN_PAGE_NAME } from "@/router/auth";
import { MenuType } from "@/api/menu";
import { isEmpty } from "@/utils/common";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "TaskLayout",
  components: {
    SidebarMenu,
    AvatarDropdown,
    MenuOutlined,
    HomeOutlined,
    UserOutlined,
    LockOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const menu = [
      {
        key: "create",
        value: "创建任务",
        url: "/task/create",
      },
      {
        key: "status",
        value: "任务状态",
        url: "/task/status",
      },
      //   {
      //     key: "report",
      //     value: "任务报告",
      //     url: "/task/report",
      //   },
    ];

    // 页面状态
    const state = reactive({
      theme: "dark",
      collapsed: false,
      selectedKeys: route.path.split("/").pop(),
    });

    /**
     * 菜单点击事件处理
     *
     * @param e Event
     */
    function menuClickHandle(e: any) {
      router.push(`/task/${e.key}`);
    }

    return {
      ...toRefs(state),
      menuClickHandle,
      menu,
    };
  },
});
</script>

<style lang="less" scoped>
@import "~ant-design-vue/lib/style/themes";

.main-layout {
  width: 100%;
  height: 100%;

  .main-header {
    box-shadow: 2px 0 4px #888;
    z-index: 10;

    .logo {
      color: #fff;
      font-size: 22px;
      font-weight: 600;
      margin: 0 24px 0 24px;
      vertical-align: middle;
      float: left;
    }
  }

  .main-content {
    overflow: auto;
  }
}
</style>
