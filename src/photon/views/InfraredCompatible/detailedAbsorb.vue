<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>环境参数</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">数据来源-dataFrom: {{ tableData.dataFrom }}</el-col>
        <el-col :span="6">入射角-lightAngle: {{ tableData.lightAngle }}</el-col>
      </el-row>
    </el-card>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>材料参数</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">数据状态-curStatus: {{ tableData.curStatus }}</el-col>
        <el-col :span="6">透射层周期-period: {{ tableData.period }}</el-col>
      </el-row>
    </el-card>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <Echars02 ref="echarts02"></Echars02>
      </div>
    </el-card>
  </div>
</template>

<script>
/**
 * 红外兼容页面吸收详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import AntennaTypes from "../../components/config/AntennaTypes";
import Echars02 from "./echars02";
export default {
  components: { breadcrumb, Echars02 },
  data() {
    return {
      id: "",
      tableData: {},
      echarsdata: {},
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "红外兼容吸收页面",
          url: "/photonm/InfraredCompatible",
        },
        {
          name: "吸收详细",
          url: "",
        },
      ],
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.patchTableData();
  },
  methods: {
    /**
     * 获取数据
     * */

    patchTableData() {
      this.$postserver.getData(
        "/infrared/MicrowaveInfo",
        this.buildSearchParams(),
        function (response) {
          this.tableData = response.data;
          this.echarsdata = JSON.parse(response.data.absorbingData);
          this.$refs.echarts02.getData(this.echarsdata);
          this.tableData.dataFrom = this.DataFromFormatter(
            this.tableData.dataFrom
          );
        }.bind(this)
      );
    },

    /**
     * 构建上传参数
     * */

    buildSearchParams() {
      let params = {
        id: this.id,
      };
      return params;
    },
    /**
     * 工作方式
     * */

    WorkTypeFormatter(cellValue) {
      // console.log("工作方式", row, column, cellValue, index);
      for (var index1 in AntennaTypes.workMethod) {
        if (AntennaTypes.workMethod[index1].value == cellValue) {
          return AntennaTypes.workMethod[index1].label;
        }
      }
      return "不详";
    },
    DataFromFormatter(cellValue) {
      // console.log("数据来源", row, column, cellValue, index);
      for (var index1 in AntennaTypes.dataFrom) {
        if (AntennaTypes.dataFrom[index1].value == cellValue) {
          return AntennaTypes.dataFrom[index1].label;
        }
      }
      return "不详";
    },
    lightTypeFormatter(cellValue) {
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

<style>
</style>