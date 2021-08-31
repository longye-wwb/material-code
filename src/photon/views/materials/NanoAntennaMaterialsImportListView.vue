<template>
  <el-row :gutter="20">
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>搜索条件</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <nano-antenna-import-search-form
          ref="research"
          @search="handleTableSearchClick"
        ></nano-antenna-import-search-form>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <div slot="header" class="clearfix">
          <span>导入的数据</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="showImportDialog = true"
            >导入</el-button
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
              <el-table-column
                property="topType"
                label="天线结构"
                :formatter="antennaTypeFormatter"
              ></el-table-column>
              <el-table-column
                property="topConstant"
                label="介电常数"
              ></el-table-column>
              <el-table-column
                property="downType"
                label="基底结构"
                :formatter="bottomTypeFormatter"
              ></el-table-column>
              <el-table-column
                property="downConstant"
                label="介电常数"
              ></el-table-column>
              <el-table-column
                property="lightType"
                label="光源"
                :formatter="LightFormatter"
                width="150px"
              ></el-table-column>
              <el-table-column
                property="lightAngle"
                label="入射角"
              ></el-table-column>
              <!-- <el-table-column label="有效波段">
                <template slot-scope="scope">
                  <span>{{ scope.row.start }} - {{ scope.row.end }}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                property="workType"
                label="工作方式"
                :formatter="WorkTypeFormatter"
              ></el-table-column>
              <!-- <el-table-column label="程序">
                <template slot-scope="scope">
                  <el-link
                    v-if="scope.row.file"
                    type="primary"
                    @click="handleProcessDownloadClick(scope.row.file)"
                    >模拟程序</el-link
                  >
                </template>
              </el-table-column> -->
              <el-table-column
                property="source"
                label="数据来源"
                :formatter="DataFromFormatter"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="180">
                <template slot-scope="scope">
                  <el-button @click="programClick(scope.row)">程序</el-button>
                  <el-button @click="handleInfoClick(scope.row)"
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <PageInput
              class="margin"
              :total="total"
              @refresh="handlePageRefresh"
            ></PageInput>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col>
      <el-dialog :visible.sync="showImportDialog" title="导入">
        <nano-antenna-import-form
          @success="addSuccess()"
          @closed="showImportDialog = false"
        ></nano-antenna-import-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 纳米天线页面
 * @author Chris
 * */
import PhotonViewMixin from "../PhotonViewMixin.js";
import NanoAntennaImportSearchForm from "../../components/form/NanoAntennaImportSearchForm.vue";
import NanoAntennaImportForm from "../../components/form/NanoAntennaImportForm.vue";
import AntennaTypes from "../../components/config/AntennaTypes.js";
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import PageInput from "../../../components/form/input/PageInput.vue";
export default {
  name: "NanoAntennaMaterialsImportListView",
  mixins: [PhotonViewMixin],
  components: {
    PageInput,
    NanoAntennaImportSearchForm,
    NanoAntennaImportForm,
    breadcrumb,
  },
  data() {
    return {
      showImportDialog: false,
      tableData: [],
      total: 0,
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "纳米天线",
          url: "/photonm/antenna_imp",
        },
      ],
      searchForm: {
        pageSize: 10,
        pageNum: 1,
        form: {},
      },
    };
  },
  created: function () {
    this.patchTableData();
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
        "/nano/selectStructure",
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
     * 点击页面切换
     * */

    handlePageRefresh(page) {
      this.searchForm.pageNum = page.pageNum;
      this.searchForm.pageSize = page.pageSize;
      this.patchTableData();
    },
    /**
     * 构建上传参数
     * */
    buildSearchParams() {
      let params = {
        topType: this.searchForm.form.type,
        downType: this.searchForm.form.bottomType,
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize,
      };
      /**
       * 处理天线检索参数
       */
      if (this.searchForm.form.type != 0) {
        params.topType = this.searchForm.form.type;
      }
      if (this.searchForm.form.antennaForm) {
        var antennaForm = this.searchForm.form.antennaForm;
        if (antennaForm.staticl) {
          params.topConstant = antennaForm.staticl;
        }
        if (antennaForm.r && antennaForm.r.length == 2) {
          params.rEnd = antennaForm.r[1];
          params.rStart = antennaForm.r[0];
        }
        if (antennaForm.h && antennaForm.h.length == 2) {
          params.minHEnd = antennaForm.h[1];
          params.minHStart = antennaForm.h[0];
        }
        if (antennaForm.lx && antennaForm.lx.length == 2) {
          params.xEnd = antennaForm.lx[1];
          params.xStart = antennaForm.lx[0];
        }
        if (antennaForm.ly && antennaForm.ly.length == 2) {
          params.yEnd = antennaForm.ly[1];
          params.yStart = antennaForm.ly[0];
        }
        if (antennaForm.angle && antennaForm.angle.length == 2) {
          params.pEnd = antennaForm.angle[1];
          params.pStart = antennaForm.angle[0];
        }
      }
      /**
       * 处理基底检索参数
       */
      if (this.searchForm.form.bottemForm) {
        var bottemForm = this.searchForm.form.bottemForm;
        if (bottemForm.staticl) {
          params.downType = bottemForm.staticl;
        }
        if (antennaForm.h && bottemForm.h.length == 2) {
          params.hEnd = bottemForm.h[1];
          params.hStart = bottemForm.h[0];
        }
        if (antennaForm.p && bottemForm.p.length == 2) {
          params.rEnd = bottemForm.p[1];
          params.rStart = bottemForm.p[0];
        }
      }
      //处理入射光源
      if (this.searchForm.form.lightFrom != 0) {
        params.lightType = this.searchForm.form.lightFrom;
      }
      //处理入射角参数
      if (this.searchForm.form.lightAngle) {
        var angle = this.searchForm.form.lightAngle;
        if (angle[0]) {
          params.lightAngleStart = angle[0];
        }
        if (angle[1]) {
          params.lightAngleEnd = angle[1];
        }
      }
      //工作方式
      if (this.searchForm.form.workWay != 0) {
        params.workType = this.searchForm.form.workWay;
      }
      //数据来源
      if (this.searchForm.form.dataFrom != 0) {
        params.source = this.searchForm.form.dataFrom;
      }
      return params;
    },
    handleTableSearchClick(form) {
      this.searchForm.form = form;
      this.patchTableData();
    },
    handleProcessDownloadClick(file) {
      var files = JSON.parse(file);
      console.log("未实现程序下载", files);
    },
    handleInfoClick(row) {
      this.$router.push({
        path: "/photonm/Form_details",
        query: { data: row },
      });
    },
    /**
     * 点击程序
     * */
    programClick(data) {
      this.$postserver.getFile("/history/process", { id: data.importId });
    },
    antennaTypeFormatter(row, column, cellValue, index) {
      // console.log("天线结构：", row, column, cellValue, index);
      for (var index1 in AntennaTypes.antnnaTypes) {
        if (AntennaTypes.antnnaTypes[index1].value == cellValue) {
          return AntennaTypes.antnnaTypes[index1].label;
        }
      }
      return "不详";
    },
    bottomTypeFormatter(row, column, cellValue, index) {
      // console.log("基底结构：", row, column, cellValue, index);
      for (var index1 in AntennaTypes.bottomTypes) {
        if (AntennaTypes.bottomTypes[index1].value == cellValue) {
          return AntennaTypes.bottomTypes[index1].label;
        }
      }
      return "不详";
    },
    LightFormatter(row, column, cellValue, index) {
      // console.log("光源类型：", row, column, cellValue, index);
      for (var index1 in AntennaTypes.lightFrom) {
        if (AntennaTypes.lightFrom[index1].value == cellValue) {
          return AntennaTypes.lightFrom[index1].label;
        }
      }
      return "不详";
    },
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
  },
};
</script>