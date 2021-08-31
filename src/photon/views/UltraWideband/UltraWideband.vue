<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>搜索条件</span>
          </div>
          <Search ref="research" @search="handleTableSearchClick"></Search>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card>
          <div slot="header" v-if="showButton" class="clearfix">
            <el-button
              style="float: right; padding: 3px 20px"
              type="text"
              @click="ImportData('0')"
              >导入样本</el-button
            >
            <el-button
              style="float: right; padding: 3px 20px"
              type="text"
              @click="ImportData('1')"
              >导入数据</el-button
            >
            <el-button
              style="float: right; padding: 3px 20px"
              type="text"
              @click="Downloadexp()"
              >结构模板</el-button
            >
          </div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="环境参数">
              <el-table-column
                prop="workingMode"
                label="工作方式"
                :formatter="WorkTypeFormatter"
              >
              </el-table-column>
              <el-table-column
                prop="dataFrom"
                label="数据来源"
                :formatter="DataFromFormatter"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="lightType"
                label="入射光偏振态"
                :formatter="lightTypeFormatter"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="lightAngle" label="入射角(°)">
              </el-table-column>
            </el-table-column>
            <el-table-column label="材料参数">
              <el-table-column prop="bandwidth" label="相对带宽" width="120">
              </el-table-column>

              <el-table-column
                prop="armr"
                label="工字型臂宽度角度(mm)"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="army" label="工字型臂线宽(mm)" width="120">
              </el-table-column>
              <el-table-column prop="laylerx" label="反射板距离系数">
              </el-table-column>
              <el-table-column prop="period" label="周期系数">
              </el-table-column>
              <el-table-column
                prop="permittivity"
                label="基板介电常数"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="rectx"
                label="工字型矩形线宽(两侧)(mm)"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="rectx2"
                label="工字型矩形线宽(中间)(mm)"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="recty"
                label="工字型矩形长度(mm)"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="subh" label="基板厚度(mm)">
              </el-table-column>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-button @click="programClick(scope.row)">程序</el-button>
                <el-button @click="handleClick(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <PageInput
            class="margin"
            :total="total"
            @refresh="handlePageRefresh"
          ></PageInput>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 微波宽带相位调控
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import PageInput from "../../../components/form/input/PageInput.vue";
import Search from "./search.vue";
import AntennaTypes from "../../../photon/components/config/AntennaTypes";
export default {
  components: { breadcrumb, PageInput, Search },
  data() {
    return {
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "微波宽带偏振转换",
          url: "/photonm/UltraWideband",
        },
      ],
      total: 0,
      tableData: [],
      searchForm: { pageNum: "1", pageSize: "10", form: {} },
      showButton: true,
    };
  },
  mounted() {
    this.patchTableData();
    this.showimportbutton();
  },
  methods: {
    /**
     * 获取表格数据
     * */

    patchTableData() {
      this.$postserver.getData(
        "/micro_phase/page",
        this.buildSearchParams(),
        function (response) {
          if (response.data) {
            this.tableData = response.data.rows;
            this.total = response.data.total;
          } else {
            this.total = 0;
          }
        }.bind(this)
      );
    },

    /**
     * 点击搜索按钮
     * */

    handleTableSearchClick(form) {
      this.searchForm.form = form;
      this.patchTableData();
    },

    /**
     * 构建上传参数
     * */

    buildSearchParams() {
      if (this.searchForm.form.armr) {
        let params = {
          pageNum: this.searchForm.pageNum,
          pageSize: this.searchForm.pageSize,
          workingMode: this.searchForm.form.workingMode,
          dataFrom: this.searchForm.form.dataFrom,
          lightType: this.searchForm.form.lightType,
          armr: {
            gte: this.searchForm.form.armr.gte,
            lte: this.searchForm.form.armr.lte,
          },
          army: {
            gte: this.searchForm.form.army.gte,
            lte: this.searchForm.form.army.lte,
          },
          laylerx: {
            gte: this.searchForm.form.laylerx.gte,
            lte: this.searchForm.form.laylerx.lte,
          },
          lightAngle: {
            gte: this.searchForm.form.lightAngle.gte,
            lte: this.searchForm.form.lightAngle.lte,
          },
          period: {
            gte: this.searchForm.form.period.gte,
            lte: this.searchForm.form.period.lte,
          },
          bandwidth: {
            gte: this.searchForm.form.bandwidth.gte,
            lte: this.searchForm.form.bandwidth.lte,
          },
          permittivity: {
            gte: this.searchForm.form.permittivity.gte,
            lte: this.searchForm.form.permittivity.lte,
          },
          recty: {
            gte: this.searchForm.form.recty.gte,
            lte: this.searchForm.form.recty.lte,
          },
          subh: {
            gte: this.searchForm.form.subh.gte,
            lte: this.searchForm.form.subh.lte,
          },
          rectx2: {
            gte: this.searchForm.form.subh.gte,
            lte: this.searchForm.form.subh.lte,
          },
          rectx: {
            gte: this.searchForm.form.subh.gte,
            lte: this.searchForm.form.subh.lte,
          },
        };
        return params;
      } else {
        let params = {
          pageNum: this.searchForm.pageNum,
          pageSize: this.searchForm.pageSize,
        };
        return params;
      }
    },

    /**
     * 点击上传文件，跳转页面
     * 0 :导入是样本
     * 1：导入是数据
     * */
    ImportData(data) {
      this.$router.push({
        path: "UltraWidebandImport?data=" + data,
      });
    },

    /**
     * Downloadexp 下载模板
     * */

    Downloadexp() {
      this.$postserver.getFile(
        "/micro_phase/template",
        {},
        function (response) {
          console.log(response);
        }.bind(this)
      );
    },

    /**
     * 点击详情
     * */

    handleClick(data) {
      this.$router.push({
        path: "UltraWidebanddetailed",
        query: {
          id: data.id,
        },
      });
    },

    /**
     * 点击程序
     * */

    programClick(data) {
      console.log(data);
      this.$postserver.getFile("/history/process", { id: data.importId });
    },

    /**
     *  判断是否展示导入按钮
     * */

    showimportbutton() {
      let a = this.$route.path.split("/");
      if (a[1] == "photonm") {
        this.showButton = true;
      } else if (a[1] == "photon") {
        this.showButton = false;
      } else {
        this.showButton = false;
      }
    },

    /**
     * 点击页面切换
     * */

    handlePageRefresh(page) {
      this.searchForm.pageNum = page.pageNum;
      this.searchForm.pageSize = page.pageSize;
      this.patchTableData();
    },

    /**
     * 工作方式
     * */

    WorkTypeFormatter(row, column, cellValue, index) {
      // console.log("工作方式", row, column, cellValue, index);
      for (var index1 in AntennaTypes.workMethod) {
        if (AntennaTypes.workMethod[index1].value == cellValue) {
          return AntennaTypes.workMethod[index1].label;
        }
      }
      return "不详";
    },
    DataFromFormatter(row, column, cellValue, index) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.dataFrom) {
        if (AntennaTypes.dataFrom[index1].value == cellValue) {
          return AntennaTypes.dataFrom[index1].label;
        }
      }
      return "不详";
    },
    lightTypeFormatter(row, column, cellValue, index) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.lightFrom) {
        if (AntennaTypes.lightFrom[index1].value == cellValue) {
          return AntennaTypes.lightFrom[index1].label;
        }
      }
      return "不详";
    },
  },
};
</script>

<style>
</style>