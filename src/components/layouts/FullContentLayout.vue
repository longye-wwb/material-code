<template>
  <div>
    <el-row class="header">
      <el-col>{{system}}</el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "FullContentLayout",
  data() {
    return {
      system: "东辰教育集团OA系统",
    };
  },
};
</script>

<style>
.header {
  height: 360px;
}
</style>