<template>
  <el-card>
    <el-row>
      <el-col> 用户登录成功！ </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "AccountLoginSuccessForm",
  data() {
    return {
      user: {
        id: 0,
        name: "",
        profile:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        moble: "",
        email: "",
        orgId: 0,
        orgName: "",
        orgs: [],
        address: "",
      },
    };
  },
  mounted() {
    this.patchCurrentUser();
  },
  methods: {
    patchCurrentUser() {
      this.$postserver.getData(
        "/user/current",
        {},
        function (response) {
          console.log("获得当前用户信息", response.data);
          this.saveUserInSession(response);
          this.$router.push("/photonm/absorbing");
        }.bind(this)
      );
    },
    saveUserInSession(data) {
      const userData = data.data;
      this.user.id = userData.id;
      this.user.name = userData.name;
      this.user.profile = userData.profile;
      this.user.moble = userData.moble;
      this.user.email = userData.email;
      this.user.orgId = userData.org;
      this.user.orgName = userData.orgName;
      this.user.orgs = userData.manageOrgs;
      this.user.address = userData.address;
      sessionStorage.setItem("user", JSON.stringify(this.user));
    },
    toLogin() {
      this.$router.push({ path: "/login/password" });
    },
  },
};
</script>