<template>
  <el-row class="right-header-usermsg">
    <!-- 用户头像 -->
    <el-col>
      <el-avatar
        shape="square"
        :size="50"
        :src="user.profile"
        :key="user.profile"
      ></el-avatar>
    </el-col>
    <!-- 用户的姓名 -->
    <el-col>
      <el-dropdown @command="handleCommand">
        <span
          style="
            font-size: 1.1em;
            font-weight: bold;
            color: rgb(255, 255, 255);
            user-select: none;
          "
          class="el-dropdown-link"
        >
          {{ user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">我的头像</el-dropdown-item>
          <el-dropdown-item disabled>我的资料</el-dropdown-item>
          <el-dropdown-item disabled>修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col>
      <el-dialog
        title="修改头像"
        destroy-on-close
        :visible.sync="profileEditorDialog"
      >
        <user-profile-update-form
          @fatherMethod="closeprofileEditorDialog()"
          @submited="profileEditorDialog = false"
          @closed="profileEditorDialog = false"
        ></user-profile-update-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import UserProfileUpdateForm from "../../form/user/UserProfileUpdateForm.vue";

export default {
  name: "LoginUserHeader",
  inject: ["reload"],
  data() {
    return {
      user: {
        name: "",
        profile:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604053975882&di=1f7c343d8c521cd4e47e3973db6220fc&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F05%2F20200705095715_nQBVe.thumb.400_0.jpeg",
      },
      profileEditorDialog: false,
    };
  },
  components: {
    UserProfileUpdateForm,
  },
  mounted: async function () {
    const loginUser = sessionStorage.getItem("user");
    if (loginUser) {
      const userData = JSON.parse(loginUser);
      this.user.id = userData.id;
      this.user.name = userData.name;
      if (userData.profile) {
        this.user.profile = `/api` + userData.profile;
      }
      this.user.moble = userData.moble;
      this.user.email = userData.email;
      this.user.orgId = userData.org;
      this.user.orgName = userData.orgName;
      this.user.orgs = userData.manageOrgs;
      this.user.address = userData.address;
    } else {
      this.toLoginPage();
    }
    //跳转到后台完成登录
    //window.location.assign(window.location.protocol+"//"+window.location.hostname+":1987/web/cas/auth");
  },
  methods: {
    toLoginPage() {
      this.$router.push({ path: "/login/password" });
    },
    closeprofileEditorDialog() {
      this.profileEditorDialog = false;
    },
    handleCommand(command) {
      this.$message("click on item " + command);
      if (command == "profile") {
        this.profileEditorDialog = true;
      } else if (command == "logout") {
        this.handleLogoutClick();
      }
    },
    handleLogoutClick() {
      if (this.$cookie.getCookie("JSESSIONID")) {
        //系统通通过session保持登陆。
        this.$cookie.delCookie("JSESSIONID");
      } else {
        sessionStorage.removeItem("login");
      }
      sessionStorage.removeItem("user");
      // this.reload();
      this.$nextTick(() => {
        this.$router.push("/login/password");
      });
    },
  },
};
</script>
<style  scoped>
.right-header-usermsg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header_img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
</style>