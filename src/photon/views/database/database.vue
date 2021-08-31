<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <el-form :inline="true">
            <el-form-item label="数据类型">
              <el-select v-model="searchForm.type" placeholder="请选择">
                <el-option
                  v-for="item in dataType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearchClick"
                >搜索</el-button
              >
              <el-button @click="handleEmptyClick">置空</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="creatorName" label="创建人姓名">
            </el-table-column>

            <el-table-column prop="type" label="数据类型"> </el-table-column>
            <el-table-column prop="total" label="数据条数"> </el-table-column>
            <el-table-column prop="total" label="示例数据">
              <template slot-scope="scope">
                <el-button @click="handleExampleClick(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="数据下载" width="120">
              <template slot-scope="scope">
                <el-button @click="handleshengdu(scope.row)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="模拟程序" width="100">
              <template slot-scope="scope">
                <el-button @click="handlemoni(scope.row)">下载</el-button>
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
 * 数据仓库页面
 * 官网页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import PageInput from "../../../components/form/input/PageInput.vue";
import AntennaTypes from "../../components/config/AntennaTypes";

export default {
  components: { breadcrumb, PageInput },
  data() {
    return {
      local: [
        {
          name: "首页",
          url: "/photon",
        },
        {
          name: "数据仓库",
          url: "/photon/database",
        },
      ],
      total: 0,
      tableData: [],
      dataType: AntennaTypes.DataDownload,
      searchForm: { type:null,pageNum: "1", pageSize: "10" },
    };
  },
  mounted() {
    this.patchTableData();
  },
  methods: {
    handleExampleClick(row){
      console.log("查看数据的示例",row);
      for(let i in this.dataType){
        if(this.dataType[i].label == row.type){
          this.$router.push({path:this.dataType[i].example,query:{
            id:row.id,
          }})
        }else{

        }
      }

    },
    handleSearchClick(){
      this.patchTableData();
    },
    handleEmptyClick(){
      this.searchForm.type = null;
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.patchTableData();
    },
    /**
     * 获取表格数据
     * */

    patchTableData() {
      this.$postserver.getData(
        "/history/page",
        this.buildSearchParams(),
        function (response) {
          console.log(response);
          if (response.data) {
            this.tableData = response.data.rows;
            this.total = response.data.total;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].createTime = this.getTime(
                this.tableData[i].createTime
              );
              this.tableData[i].type = this.DataDownloadFormatter(
                this.tableData[i].type
              );
            }
          } else {
            this.total = 0;
          }
        }.bind(this)
      );
    },

    /**
     * 时间戳转具体日期
     * */

    getTime(datet) {
      var date = new Date(datet);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return YY + MM + DD + " " + hh + mm;
    },

    /**
     * 构建上传参数
     * */

    buildSearchParams() {
      let params = {
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize,
      };
      if(this.searchForm.type){
        params.type =  this.searchForm.type;
      }
      return params;
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
     * 深度学习数据下载
     * */

    handleshengdu(data) {
      this.$postserver.getFile(
        "/history/data",
        { id: data.id },
        function (response) {
          console.log(response);
        }.bind(this)
      );
    },

    /**
     * 深度学习数据下载
     * */

    handlemoni(data) {
      this.$postserver.getFile(
        "/history/process",
        { id: data.id },
        function (response) {
          console.log(response);
        }.bind(this)
      );
    },

    DataDownloadFormatter(cellValue) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.DataDownload) {
        if (AntennaTypes.DataDownload[index1].value == cellValue) {
          return AntennaTypes.DataDownload[index1].label;
        }
      }
      return "不详";
    },
  },
};
</script>

<style lang='scss' >
.mar20 {
  margin-top: 20px;
}
.home_card {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .home_card_title {
    font-size: 20px;
  }
  .home_card_msg {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 50px;
    font-weight: 600;
    margin-top: 30px;
    .home_card_smmsg {
      font-size: 12px;
      font-weight: 500;
      margin-left: 5px;
      margin-bottom: 10px;
    }
  }
}
.home_echars {
  margin-top: 20px;
  .about_left {
    height: 400px;
  }
  .about_left_small {
    height: 185px;
  }
}
</style>