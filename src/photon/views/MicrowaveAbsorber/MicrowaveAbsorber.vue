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
            <el-table-column label="环境参数"
              ><el-table-column
                prop="dataFrom"
                label="数据来源"
                :formatter="DataFromFormatter"
              >
              </el-table-column>
              <el-table-column
                prop="workType"
                label="工作方式"
                :formatter="WorkTypeFormatter"
              >
              </el-table-column>
              <el-table-column
                prop="lightType"
                label="光源偏振态"
                :formatter="lightTypeFormatter"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="lightAngle"
                label="入射光角度(°)"
                width="100"
              >
              </el-table-column>
            </el-table-column>
            <el-table-column label="材料参数">
              <el-table-column prop="bandwidth" label="相对带宽">
              </el-table-column>
              <el-table-column prop="layer" label="材料层数"> </el-table-column>
              <el-table-column prop="p" label="周期(mm)" width="100">
              </el-table-column>
              <el-table-column prop="g" label="间隙(mm)" width="100">
              </el-table-column>
              <el-table-column
                prop="filler"
                label="填充材料"
                :formatter="fillerFormatter"
              >
              </el-table-column>
              <el-table-column prop="rs1" label="第一层方阻(Ω/m²)" width="100">
              </el-table-column>
              <el-table-column prop="rs2" label="第二层方阻(Ω/m²)" width="100">
              </el-table-column>
              <el-table-column prop="rs3" label="第三层方阻(Ω/m²)" width="100">
              </el-table-column>
              <el-table-column prop="h1" label="第一层高度(mm)" width="100">
              </el-table-column>
              <el-table-column prop="h2" label="第二层高度(mm)" width="100">
              </el-table-column>
              <el-table-column prop="h3" label="第三层高度(mm)" width="100">
              </el-table-column>
              <el-table-column prop="s1" label="第一层线宽(mm)">
              </el-table-column>
              <el-table-column prop="s2" label="第二层线宽(mm)">
              </el-table-column
              ><el-table-column prop="s3" label="第三层线宽(mm)">
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
 * 微波宽带吸收
 * 后台页面
 * @author Chris
 * */
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import PageInput from "../../../components/form/input/PageInput.vue";
import Search from "./search.vue";
import AntennaTypes from "../../components/config/AntennaTypes.js";
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
          name: "微波宽带吸收",
          url: "/photonm/MicrowaveAbsorber",
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
        "/microwave_absorbing/selectList",
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
      if (this.searchForm.form.g) {
        let params = {
          pageNum: this.searchForm.pageNum,
          pageSize: this.searchForm.pageSize,
          workingMode: this.searchForm.form.workingMode,
          dataFrom: this.searchForm.form.dataFrom,
          lightType: this.searchForm.form.lightType,
          g: {
            gte: this.searchForm.form.g.gte,
            lte: this.searchForm.form.g.lte,
          },
          p: {
            gte: this.searchForm.form.p.gte,
            lte: this.searchForm.form.p.lte,
          },
          rs2: {
            gte: this.searchForm.form.rs2.gte,
            lte: this.searchForm.form.rs2.lte,
          },
          bandwidth: {
            gte: this.searchForm.form.bandwidth.gte,
            lte: this.searchForm.form.bandwidth.lte,
          },
          rs3: {
            gte: this.searchForm.form.rs3.gte,
            lte: this.searchForm.form.rs3.lte,
          },
          h1: {
            gte: this.searchForm.form.h1.gte,
            lte: this.searchForm.form.h1.lte,
          },
          h2: {
            gte: this.searchForm.form.h2.gte,
            lte: this.searchForm.form.h2.lte,
          },
          h3: {
            gte: this.searchForm.form.h3.gte,
            lte: this.searchForm.form.h3.lte,
          },
          s1: {
            gte: this.searchForm.form.s1.gte,
            lte: this.searchForm.form.s1.lte,
          },
          s2: {
            gte: this.searchForm.form.s2.gte,
            lte: this.searchForm.form.s2.lte,
          },
          s3: {
            gte: this.searchForm.form.s3.gte,
            lte: this.searchForm.form.s3.lte,
          },
          lightAngle: {
            gte: this.searchForm.form.lightAngle.gte,
            lte: this.searchForm.form.lightAngle.lte,
          },
          layer: this.searchForm.form.layer,
          filler: this.searchForm.form.filler,
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
        path: "MicrowaveAbsorberImport?data=" + data,
      });
    },

    /**
     * Downloadexp 下载模板
     * */

    Downloadexp() {
      this.$postserver.getFile(
        "/microwave_absorbing/template",
        {},
        function (response) {
          // console.log(response);
        }.bind(this)
      );
    },

    /**
     * 点击详情
     * */

    handleClick(data) {
      this.$router.push({
        path: "MicrowaveAbsorberdetailed",
        query: {
          id: data.id,
        },
      });
    },

    /**
     * 点击程序
     * */

    programClick(data) {
      // console.log(data);
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
      for (var index1 in AntennaTypes.Polarization) {
        if (AntennaTypes.Polarization[index1].value == cellValue) {
          return AntennaTypes.Polarization[index1].label;
        }
      }
      return "不详";
    },
    fillerFormatter(row, column, cellValue, index) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.FillerMaterial) {
        if (AntennaTypes.FillerMaterial[index1].value == cellValue) {
          return AntennaTypes.FillerMaterial[index1].label;
        }
      }
      return "不详";
    },
  },
};
</script>

<style>
</style>