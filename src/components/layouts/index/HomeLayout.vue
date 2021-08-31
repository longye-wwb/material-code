<template>
  <div>
    <el-row
      type="flex"
      justify="center"
      style="background-color: rgb(64, 158, 255)"
    >
      <el-col :span="18">
        <router-view name="header"></router-view>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <router-view name="menu"></router-view>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <router-view name="footer"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomeLayout",
  data() {
    return {
      logo: "",
      title: "哑光材料",
      fits: ["fill", "contain", "cover", "none", "scale-down"],
    };
  },
};
</script>