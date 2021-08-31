<!--
 * @Descripttion: 
 * @version: v1.0.1
 * @Author: payne (wenyi)
 * @Date: 2020-11-19 16:39:41
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-23 14:09:21
-->
<template>
  <div>
    <el-row style="height: 240px">
      <span></span>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h2 class="login_right_msg_top">结构功能材料数据库</h2>
        <h3>业务系统登录</h3>
      </el-col>
      <el-col :span="8">
        <router-view></router-view>
      </el-col>
      <el-col :span="4">
        <span></span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
 * @Author: Chris
 * @Date: 2021-05-17 09:58:09
 * @Last Modified by:   Chris
 * @Last Modified time: 2021-05-17 09:58:09
 */
export default {
  name: "LoginLayout",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.login_right_msg_top {
  font-size: 35px;
}
</style>
