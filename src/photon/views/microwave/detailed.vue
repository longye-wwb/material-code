<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>环境参数</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">数据来源-dataFrom: {{ tableData.dataFrom }}</el-col>
        <el-col :span="6">入射角: {{ tableData.lightAngle }}(°)</el-col>
        <el-col :span="6">光源偏振态: {{ tableData.lightType }}</el-col>
        <el-col :span="6">功做波段: {{ tableData.workingBand }}</el-col>
      </el-row>
    </el-card>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>具体参数</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">基底材料: {{ tableData.baseMaterial }}</el-col>
        <el-col :span="6">基底厚度: {{ tableData.baseThickness }}（mm）</el-col>
        <el-col :span="6">介电常数: {{ tableData.dielectric }}</el-col>
        <el-col :span="6">数据导入历史: {{ tableData.importId }}</el-col>
      </el-row>
      <el-row :gutter="20" class="margin">
        <el-col :span="6">结构外环边长: {{ tableData.length }}（mm）</el-col>
        <el-col :span="6">损耗正切: {{ tableData.loss }}</el-col>
        <el-col :span="6">介质材料: {{ tableData.mediumMaterial }}</el-col>
        <el-col :span="6"
          >介质厚度: {{ tableData.mediumThickness }}（mm）</el-col
        >
      </el-row>
      <el-row :gutter="20" class="margin">
        <el-col :span="6">结构周期: {{ tableData.period }}</el-col>
        <el-col :span="6">结构材料: {{ tableData.structureMaterial }}</el-col>
        <el-col :span="6"
          >结构厚度: {{ tableData.structureThickness }}（mm）</el-col
        >
        <el-col :span="6">数据对象: {{ tableData.waveDtos }}</el-col>
      </el-row>
    </el-card>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料的微波波段吸收率曲线
</div>
        <Echars :data="echarsdata" ref="echarts"></Echars>
      </div>
    </el-card>
  </div>
</template>


<script>
/**
 * 微波窄带吸收详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "./microwaveEchars";
import AntennaTypes from "../../../photon/components/config/AntennaTypes";
export default {
  components: { breadcrumb, Echars },
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
          name: "微波窄带吸收",
          url: "/photonm/MicrowaveTransmission",
        },
        {
          name: "详情",
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
        "/breadth/selectInfo",
        this.buildSearchParams(),
        function (response) {
          console.log(response.data, "999");
          this.tableData = response.data;
          this.echarsdata = JSON.parse(response.data.data);
          this.$refs.echarts.getData(this.echarsdata);
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

<style>
</style>