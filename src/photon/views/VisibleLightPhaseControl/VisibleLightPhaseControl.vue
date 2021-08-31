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
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="lightType"
                label="光源类型"
                :formatter="lightTypeFormatter"
                width="140"
              >
              </el-table-column>
              <el-table-column prop="lightAngle" label="入射角">
              </el-table-column>
            </el-table-column>
            <el-table-column label="材料参数">
              <el-table-column prop="eff" label="高效带宽"> </el-table-column>
              <el-table-column prop="material" label="天线材料">
              </el-table-column>
              <el-table-column prop="constant" label="天线介电常数" width="110">
              </el-table-column>
              <el-table-column prop="type" label="天线类型" :formatter="TypeFromFormatter"> </el-table-column>
              <el-table-column prop="longAxis" label="天线长轴(nm)">
              </el-table-column>
              <el-table-column prop="minorAxis" label="天线短轴">
              </el-table-column>
              <el-table-column prop="height" label="天线高度(nm)">
              </el-table-column>
              <el-table-column prop="baseMaterial" label="基底材料">
              </el-table-column>
              <el-table-column
                prop="baseConstant"
                label="基底介电常数"
                width="110"
              >
              </el-table-column>
              <el-table-column prop="baseType" label="基底类型" :formatter="BaseTypeFromFormatter">
              </el-table-column>
              <el-table-column prop="baseThickness" label="基底厚度(nm)">
              </el-table-column>
              <el-table-column prop="baseSide" label="基底边长">
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
 * 可见光相位调控页面
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
          name: "可见光相位调控",
          url: "/photonm/VisibleLightPhaseControl",
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
        "/visible_phase/page",
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
      let params = {
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize,
      };
      if (this.searchForm.form.workingMode) {
        params.workingMode = this.searchForm.form.workingMode;
      }
      if(this.searchForm.form.dataFrom){
        params.dataFrom = this.searchForm.form.dataFrom;
      }
      if(this.searchForm.form.lightType){
        params.lightType = this.searchForm.form.lightType;
      }
      if(this.searchForm.form.lightAngle){
        params.lightAngle = {
        gte: this.searchForm.form.lightAngle.gte,
        lte: this.searchForm.form.lightAngle.lte,
      };
      }
      if(this.searchForm.form.eff){
        params.eff = {
        gte: this.searchForm.form.eff.gte,
        lte: this.searchForm.form.eff.lte,
      };
      }
      params.type= this.searchForm.form.type;
      params.baseType=this.searchForm.form.baseType;
      return params;
    },

    /**
     * 点击上传文件，跳转页面
     * 0 :导入是样本
     * 1：导入是数据
     * */

    ImportData(data) {
      this.$router.push({
        path: "VisibleLightPhaseControlImport?data=" + data,
      });
    },

    /**
     * Downloadexp 下载模板
     * */

    Downloadexp() {
      this.$postserver.getFile(
        "/infrared_phase/template",
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
        path: "VisibleLightPhaseControldetailed",
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
    BaseTypeFromFormatter(row, column, cellValue, index) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.bottomTypes) {
        if (AntennaTypes.bottomTypes[index1].value == cellValue) {
          return AntennaTypes.bottomTypes[index1].label;
        }
      }
      return "不详";
    },
    TypeFromFormatter(row, column, cellValue, index) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.antnnaTypes) {
        if (AntennaTypes.antnnaTypes[index1].value == cellValue) {
          return AntennaTypes.antnnaTypes[index1].label;
        }
      }
      return "不详";
    },
  },
};
</script>

<style>
</style>