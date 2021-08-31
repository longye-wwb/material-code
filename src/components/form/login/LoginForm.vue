<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="login_title">登录</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >帮助</el-button
        >
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号" class="marginT">
          <el-input placeholder="请输入账号" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="marginT">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row class="login_btn">
        <el-col :span="10">
          <el-button style="width: 100%" type="primary" @click="onSubmit"
            >登录</el-button
          >
        </el-col>
        <!-- <el-col :span="10">
          <el-button style="width: 100%" @click="handleCasLoginClick"
            >去统一认证登录</el-button
          >
        </el-col> -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    clearForm() {
      this.form.username = "";
      this.form.password = "";
    },
    /**
     * 去统一认证登录
     * */
    // handleCasLoginClick() {
    //   window.location.assign("/api/cas/auth");
    // },
    onSubmit() {
      let dataForm = {
        username: this.form.account,
        password: this.form.password,
      };
      let that = this;
      this.$postserver.postForm(
        "/account/login",
        dataForm,
        function (response) {
          if (response && response.meta && response.meta.code == "0") {
            let loginInfo = response.data;
            if (loginInfo) {
              sessionStorage.setItem("login", JSON.stringify(loginInfo));
            }
            //页面跳转
            that.loginSuccess();
          } else {
            that.$message({
              type: "info",
              $message: response.meta.message,
            });
          }
          that.clearForm();
        },
        function (error) {
          console.error(error);
        }
      );
    },
    loginSuccess() {
      //页面跳转
      this.$router.push({ path: "/login/account" });
    },
  },
  components: {},
};
</script>
<style lang="scss">
.login_title {
  font-size: 20px;
  font-weight: 600;
}
.login_btn {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.marginT {
  margin-top: 10px;
}
</style>