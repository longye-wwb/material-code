<template>
  <el-row align="middle" :gutter="20">
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>搜索条件</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <nano-antenna-ahape-search-form
          ref="search"
          @search="handleSearchClick"
        ></nano-antenna-ahape-search-form>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>检索结果</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <el-row>
          <el-col>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column
                prop="lightAngle"
                label="入射角"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="波长"
                width="180"
              ></el-table-column>
              <el-table-column prop="address" label="厚度"></el-table-column>
              <el-table-column prop="phase" label="相位"></el-table-column>
              <el-table-column prop="amplitude" label="振幅"></el-table-column>
              <el-table-column
                prop="workType"
                label="工作方式"
                :formatter="workwayFormtter"
              ></el-table-column>
              <el-table-column
                prop="source"
                label="数据来源"
                :formatter="dataFromFormtter"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="相关文件"
              ></el-table-column>
            </el-table>
          </el-col>
          <el-col style="padding-top: 20px">
            <el-row>
              <el-col :span="8">
                <el-button type="primary">导出本页</el-button>
                <el-button type="primary">导出全部</el-button>
              </el-col>
              <el-col :span="16">
                <page-input
                  @refresh="handlePageRefresh"
                  :total="total"
                ></page-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PhotonViewMixin from "../PhotonViewMixin.js";
import AntennaTypes from "../../components/config/AntennaTypes.js";
import NanoAntennaAhapeSearchForm from "../../components/form/NanoAntennaAhapeSearchForm.vue";
import PageInput from "../../../components/form/input/PageInput.vue";

export default {
  name: "NanoAntennaMaterialsListview",
  mixins: [PhotonViewMixin],
  components: {
    NanoAntennaAhapeSearchForm,
    PageInput,
  },
  data() {
    return {
      searchForm: {
        topType: 1,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },
  mounted: function () {
    this.searchForm = Object.assign(
      this.searchForm,
      this.$refs.search.getSearchForm()
    );
    this.patchTableData();
  },
  methods: {
    patchTableData() {
      this.$postserver.postJson(
        "/nano",
        this.buildSearchParam(),
        function (response) {
          this.tableData = response.data.rows;
          this.total = response.data.total;
        }.bind(this)
      );
    },
    buildSearchParam() {
      let params = {
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize,
      };
      console.log("表单检索参数", this.searchForm, this.searchForm.type);
      if (this.searchForm.type != "0") {
        params.topType = this.searchForm.type;
      }
      if (this.searchForm.antennaForm.staticl != 0) {
        params.topConstant = this.searchForm.antennaForm.staticl;
      }
      if (this.searchForm.bottomType != "0") {
        params.downType = this.searchForm.bottomType;
      }
      if (this.searchForm.bottemForm.staticl != 0) {
        params.downConstant = this.searchForm.bottemForm.staticl;
      }
      if (this.searchForm.lightFrom != "0") {
        params.lightType = this.searchForm.lightFrom;
      }
      if (
        this.searchForm.angle.length == 2 &&
        this.searchForm.angle[0] &&
        this.searchForm.angle[1]
      ) {
        params.lightAngleStart = this.searchForm.angle[0];
        params.lightAngleEnd = this.searchForm.angle[1];
      }
      if (
        this.searchForm.wave.length == 2 &&
        this.searchForm.wave[0] &&
        this.searchForm.wave[1]
      ) {
        //params.start = this.searchForm.wave[0];
        //params.end = this.searchForm.wave[1];
      }
      if (this.searchForm.workWay != "0") {
        params.workType = this.searchForm.workWay;
      }
      if (this.searchForm.dataFrom != "0") {
        params.workType = this.searchForm.dataFrom;
      }
      return params;
    },
    handlePageRefresh(page) {
      this.searchForm.pageNum = page.pageNum;
      this.searchForm.pageSize = page.pageSize;
      this.patchTableData();
    },
    handleSearchClick(form) {
      this.searchForm = Object.assign(this.searchForm, form);
      this.patchTableData();
    },
    workwayFormtter(row, column, cellValue, index) {
      console.log("格式化工作方式参数", row, column, cellValue, index);
      for (var i in AntennaTypes.workMethod) {
        if (AntennaTypes.workMethod[i].value == cellValue) {
          return AntennaTypes.workMethod[i].label;
        }
      }
      return "未知";
    },
    dataFromFormtter(row, column, cellValue, index) {
      console.log("格式化工作方式参数", row, column, cellValue, index);
      for (var i in AntennaTypes.dataFrom) {
        if (AntennaTypes.dataFrom[i].value == cellValue) {
          return AntennaTypes.dataFrom[i].label;
        }
      }
      return "未知";
    },
  },
};
</script>