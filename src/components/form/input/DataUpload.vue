<!--
 * @Descripttion: 
 * @version: v1.0.1
 * @Author: payne (wenyi)
 * @Date: 2020-11-19 16:39:41
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-08 12:02:29
-->
<template>
  <el-upload
    :action="action"
    :headers="header"
    :on-success="handleSuccess"
    multiple
    :limit="1"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  name: "DataUpload",
  inject: ["reload"],
  data() {
    return {
      login: {},
      header: {
        accesstoken: "",
      },
    };
  },
  props: {
    action: {
      type: String,
    },
  },
  mounted() {
    const loginInfo = sessionStorage.getItem("user");
    this.login = JSON.parse(loginInfo);
    this.header.accesstoken = loginInfo.token;
    console.log(this.login);
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      fileList = [];
    },
  },
};
</script>