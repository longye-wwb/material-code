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
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                ></el-table-column>
                <el-table-column label="环境参数">
                  <el-table-column
                    property="dataFrom"
                    label="数据来源"
                    :formatter="DataFromFormatter"
                    width="140"
                  ></el-table-column>
                  <el-table-column
                    property="lightAngle"
                    label="入射角 (°)"
                  ></el-table-column>
                  <el-table-column
                    property="lightType"
                    label="光源偏振态"
                    :formatter="lightTypeFormatter"
                    width="140"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="材料参数">
                  <el-table-column prop="bandwidth" label="相对带宽">
                  </el-table-column>
                  <el-table-column
                    property="baseMaterial"
                    label="基底材料"
                  ></el-table-column>
                  <el-table-column
                    property="baseThickness"
                    label="基底厚度(mm)"
                  ></el-table-column>
                  <el-table-column
                    property="dielectric"
                    label="介质介电常数"
                  ></el-table-column>
                  <el-table-column
                    property="length"
                    label="结构外环边长（mm）"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    property="mediumMaterial"
                    label="介质材料"
                  ></el-table-column>
                  <el-table-column
                    property="mediumThickness"
                    label="介质厚度（mm）"
                  ></el-table-column>
                  <el-table-column
                    property="period"
                    label="结构周期(mm)"
                  ></el-table-column>
                  <el-table-column
                    property="structureMaterial"
                    label="结构材料"
                  ></el-table-column>
                  <el-table-column
                    property="structureThickness"
                    label="结构厚度（mm）"
                  ></el-table-column>

                  <el-table-column
                    property="width"
                    label="结构宽度（mm）"
                  ></el-table-column>
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
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 微波窄带吸收
 * 后台页面
 * @author Chris
 * */

import PhotonViewMixin from "../PhotonViewMixin.js";
import Search from "./search.vue";
import NanoAntennaImportForm from "../../components/form/RadiantImportFrom.vue";
import AntennaTypes from "../../components/config/AntennaTypes.js";
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import PageInput from "../../../components/form/input/PageInput.vue";
export default {
  mixins: [PhotonViewMixin],
  components: {
    Search,
    NanoAntennaImportForm,
    breadcrumb,
    PageInput,
  },
  data() {
    return {
      total: 0,
      tableData: [],
      searchForm: { pageNum: "1", pageSize: "10", form: {} },
      showButton: true,
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "微波窄带吸收",
          url: "/photonm/MicrowaveTransmission",
        },
      ],
    };
  },
  mounted() {
    this.patchTableData();
    this.showimportbutton();
  },
  methods: {
    /**
     * 导入数据成功后回调
     * */

    addSuccess() {
      this.showImportDialog = false;
      this.patchTableData();
    },

    /**
     * 获取表格数据
     * */

    patchTableData() {
      this.$postserver.getData(
        "/breadth/selectList",
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
     * 点击上传文件，跳转页面
     * 0 :导入是样本
     * 1：导入是数据
     * */
    ImportData(data) {
      this.$router.push({
        path: "MicrowaveTransmissionImport?data=" + data,
      });
    },

    /**
     * Downloadexp 下载模板
     * */

    Downloadexp() {
      this.$postserver.getFile(
        "/breadth/template",
        {},
        function (response) {
          console.log(response);
        }.bind(this)
      );
    },

    /**
     * 构建上传参数
     * */

    buildSearchParams() {
      if (this.searchForm.form.baseThickness) {
        let params = {
          pageNum: this.searchForm.pageNum,
          pageSize: this.searchForm.pageSize,
          workingMode: this.searchForm.form.workingMode,
          dataFrom: this.searchForm.form.dataFrom,
          lightType: this.searchForm.form.lightType,
          baseThickness: {
            gte: this.searchForm.form.baseThickness.gte,
            lte: this.searchForm.form.baseThickness.lte,
          },
          dielectric: {
            gte: this.searchForm.form.dielectric.gte,
            lte: this.searchForm.form.dielectric.lte,
          },
          width: {
            gte: this.searchForm.form.width.gte,
            lte: this.searchForm.form.width.lte,
          },
          period: {
            gte: this.searchForm.form.period.gte,
            lte: this.searchForm.form.period.lte,
          },
          bandwidth: {
            gte: this.searchForm.form.bandwidth.gte,
            lte: this.searchForm.form.bandwidth.lte,
          },
          lightAngle: {
            gte: this.searchForm.form.lightAngle.gte,
            lte: this.searchForm.form.lightAngle.lte,
          },
          structureThickness: {
            gte: this.searchForm.form.structureThickness.gte,
            lte: this.searchForm.form.structureThickness.lte,
          },
          baseMaterial: {
            gte: this.searchForm.form.baseMaterial.like,
          },
          mediumMaterial: {
            gte: this.searchForm.form.mediumMaterial.like,
          },
          structureMaterial: {
            gte: this.searchForm.form.structureMaterial.like,
          },
          mediumThickness: {
            gte: this.searchForm.form.mediumThickness.gte,
            lte: this.searchForm.form.mediumThickness.lte,
          },
          length: this.searchForm.form.length,
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
     * 条件搜索
     * */

    handleTableSearchClick(form) {
      this.searchForm.form = form;
      this.patchTableData();
    },
    handleProcessDownloadClick(file) {
      var files = JSON.parse(file);
      console.log("未实现程序下载", files);
    },

    /**
     * 点击详情，跳转到详情页面
     * 传参：点击行的数据
     * */

    handleClick(data) {
      this.$router.push({
        path: "MicrowaveTransmission_details",
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
      for (var index1 in AntennaTypes.Polarization) {
        if (AntennaTypes.Polarization[index1].value == cellValue) {
          return AntennaTypes.Polarization[index1].label;
        }
      }
      return "不详";
    },
  },
};
</script>
<style lang="scss">
</style>