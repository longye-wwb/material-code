<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录成功</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >帮助</el-button
        > -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CasServiceLoginForm",
  data() {
    return {
      jsessionid: this.$route.query.jsessionid,
    };
  },
  mounted: function () {
    console.log("获取到session", this.jsessionid);
    if (this.jsessionid) {
      this.$cookie.setCookie("JSESSIONID", this.jsessionid, 60 * 60 * 24);
      this.$postserver.getData(
        "/user/current",
        {},
        function (response) {
          const user = {
            profile:
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          };
          let userData = response.data;
          user.id = userData.id;
          user.name = userData.name;
          user.profile = userData.profile;
          user.moble = userData.moble;
          user.email = userData.email;
          user.orgId = userData.org;
          user.orgName = userData.orgName;
          user.orgs = userData.manageOrgs;
          user.address = userData.address;
          sessionStorage.setItem("user", JSON.stringify(user));
          //页面跳转
          this.$router.push({ path: "/photonm/home" });
        }.bind(this)
      );
    } else {
      //window.location.assign(window.location.protocol+"//"+window.location.hostname+":1987/web/cas/auth");
      window.location.assign("/api/cas/auth");
    }
  },
};
</script>