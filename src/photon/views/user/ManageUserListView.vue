<template>
  <el-row>
    <el-col>
      <el-card>
        <el-form :inline="true">
          <el-form-item label="姓名" class="user_serch">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入需要搜索的用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item class="user_serch">
            <el-button type="primary">搜索</el-button>
            <el-button>置空</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col style="padding-top: 20px">
      <el-card>
        <div slot="header" class="clearfix">
          <span>系统用户</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="createUserDialog = true"
            >添加</el-button
          >
        </div>
        <el-row>
          <el-col>
            <el-table :prop="tableData">
              <el-table-column label="待定"> </el-table-column>
            </el-table>
          </el-col>
          <el-col style="padding-top: 20px">
            <el-row>
              <el-col :span="12">
                <el-form :inline="true">
                  <el-form-item>
                    <el-button @click="createUserDialog = true">添加</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger">删除</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <page-input :total="total"></page-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col>
      <el-dialog title="新建用户" :visible.sync="createUserDialog" width="60%">
        <user-create-form :url="url" :preform="createUser"></user-create-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import PhotonViewMixin from "../PhotonViewMixin.js";
import PageInput from "../../../components/form/input/PageInput.vue";
import UserCreateForm from "../../../components/form/user/UserCreateForm.vue";

export default {
  name: "ManageUserListView",
  mixins: [PhotonViewMixin],
  components: {
    PageInput,
    UserCreateForm,
  },
  data() {
    return {
      searchForm: {
        name: "",
        pageSize: 10,
        pageNum: 1,
      },
      createUser: {
        account: "",
        userName: "",
        password: "",
        telephone: "",
        email: "",
        addr: "",
        org: "",
      },
      tableData: [],
      total: 100,
      url: "/user/regist",
      createUserDialog: false,
    };
  },
  mounted: function () {
    this.patchTableData();
  },
  methods: {
    patchTableData() {
      const params = this.buildSearchForm();
      this.$postserver.postJson(
        "/user/page",
        params,
        function (response) {
          this.tableData = response.data.rows;
          this.total = response.data.total;
        }.bind(this)
      );
    },

    /**
     *  构建搜索参数
     * */

    buildSearchForm() {
      const params = {
        nameValue: this.searchForm.name,
        sex: 0,
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize,
      };
      return params;
    },
  },
};
</script>
<style lang="scss">
.el-form-item {
  margin-bottom: 0 !important;
}
</style>