<template>
  <a-tag class="main" color="#87d068">
    {{ title }}
  </a-tag>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormTitle",
  props: {
    title: String,
  },
});
</script>

<style lang="less" scoped>
.main {
  height: 40px;
  width: 120px;
  font-size: 13px;
  padding: 10px;
}
</style>
