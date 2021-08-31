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
              <el-table-column prop="lightAngle" label="入射角">
              </el-table-column>
            </el-table-column>
            <el-table-column label="材料参数">
              <el-table-column prop="baseMaterial" label="基底材料">
              </el-table-column>
              <el-table-column prop="curStatus" label="基底介电常数">
              </el-table-column>
              <el-table-column prop="baseEmissivity" label="基底红外发射率">
              </el-table-column>
              <el-table-column prop="curStatus" label="当前数据类型">
              </el-table-column>
              <el-table-column prop="dataFrom" label="数据来源类型">
              </el-table-column>
              <el-table-column prop="dielectricConstant" label="介质层介电常数">
              </el-table-column>
              <el-table-column
                prop="dielectricEmissivity"
                label="介质层红外发射率"
              >
              </el-table-column>
              <el-table-column prop="dielectricMaterial" label="介质层材料">
              </el-table-column>
              <el-table-column prop="dielectricThickness" label="介质层厚度">
              </el-table-column>
              <el-table-column prop="emissivity" label="透射层红外发射率">
              </el-table-column>
              <el-table-column
                prop="patchEmissivity"
                label="金属贴片红外发射率"
              >
              </el-table-column>
              <el-table-column prop="patchMaterial" label="金属贴片层材料">
              </el-table-column>
              <el-table-column prop="patchPercent" label="金属贴片占空比">
              </el-table-column>
              <el-table-column prop="patchPeriod" label="金属贴片周期">
              </el-table-column>
              <el-table-column prop="patchWidth" label="金属贴片宽度">
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
 * 红外兼容页面——透射层
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import PageInput from "../../../components/form/input/PageInput.vue";
import Search from "./search.vue";
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
          name: "红外兼容-透射层",
          url: "/photonm/InfraredCompatible",
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
        "/infrared/ProjectionList",
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
      if (this.searchForm.form) {
        let params = {
          pageNum: this.searchForm.pageNum,
          pageSize: this.searchForm.pageSize,
          workingMode: this.searchForm.form.workingMode,
          dataFrom: this.searchForm.form.dataFrom,
          baseDielectric: this.searchForm.form.baseDielectric,
          baseEmissivity: this.searchForm.form.baseEmissivity,
          baseMaterial: this.searchForm.form.baseMaterial,
          dielectricConstant: this.searchForm.form.dielectricConstant,
          dielectricEmissivity: this.searchForm.form.dielectricEmissivity,
          dielectricMaterial: this.searchForm.form.dielectricMaterial,
          dielectricThickness: this.searchForm.form.dielectricThickness,
          emissivity: this.searchForm.form.emissivity,
          lightAngle: this.searchForm.form.lightAngle,
          patchEmissivity: this.searchForm.form.patchEmissivity,
          patchMaterial: this.searchForm.form.patchMaterial,
          patchPercent: this.searchForm.form.patchPercent,
          patchPeriod: this.searchForm.form.patchPeriod,
          patchWidth: this.searchForm.form.patchWidth,
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
        path: "InfraredCompatibleImport?data=" + data,
      });
    },

    /**
     * Downloadexp 下载模板
     * */

    Downloadexp() {
      this.$postserver.getFile(
        "/infrared/projection_temp",
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
        path: "InfraredCompatible_transmissiondetailed",
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
  },
};
</script>

<style>
</style>