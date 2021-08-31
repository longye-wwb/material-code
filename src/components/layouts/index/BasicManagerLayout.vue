<template>
  <div>
    <el-row>
      <router-view name="header"></router-view>
    </el-row>
    <el-row>
      <el-col :span="3">
        <router-view name="menu"></router-view>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view name="footer"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BasicManagerLayout",
};
</script>