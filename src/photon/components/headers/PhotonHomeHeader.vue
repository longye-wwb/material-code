<!--
 * @Descripttion: 
 * @version: v1.0.1
 * @Author: payne (wenyi)
 * @Date: 2020-11-19 16:39:41
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-23 14:03:26
-->
<template>
  <el-row style="background-color: #409eff; padding: 14px" class="title_header">
    <el-col :span="4">
      <el-col :span="24" class="right_logo">
        <el-image class="right_logo_img" :src="logo" :fit="fits[0]"></el-image>
        <div class="right_logo_title">{{ title }}</div>
      </el-col>
    </el-col>
    <el-col :span="16" class="centere_title">{{ company }}</el-col>
    <el-col :span="4" class="centere_title">
      <el-button type="text" class="logon_tohou" @click="loginTohoutai()">
        登录
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PhotonHomeHeader",
  inject: ["reload"],
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      logo: require("@/assets/crledu/image/logo.jpg"),
      title: "Metas",
      company: "结构功能材料数据库",
    };
  },
  methods: {
    loginTohoutai() {
      this.$router.push("/photonm");
    },
  },
};
</script><style lang="scss">
.title_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    .right_logo_img {
      width: 60px;
    }
    .right_logo_title {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      margin-left: 10px;
    }
  }
  .centere_title {
    font-size: 25px;
    color: #fff;
    font-weight: 600;
  }
}
.logon_tohou {
  color: #fff;
}
</style>