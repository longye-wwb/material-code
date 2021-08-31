<!--
 * @Descripttion: 微波宽带偏振转换
 * @version: v1.0.2
 * @Author: payne (wenyi)
 * @Date: 2021-06-29 15:30:55
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-30 11:32:21
-->
<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20">
      <el-col :span="17">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>环境参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">工作方式: {{ tableData.workingMode }}</el-col>
            <el-col :span="6">数据来源: {{ tableData.dataFrom }}</el-col>
            <el-col :span="6">入射角: {{ tableData.lightAngle }}(°)</el-col>
            <el-col :span="6">入射光偏振态: {{ tableData.constant }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"
              >介质材料介电常数: {{ tableData.constant }}</el-col
            >
            <el-col :span="6">电容缝隙宽度-(g): {{ tableData.gap }}(mm)</el-col>
            <el-col :span="6"
              >中间电容线长-(w): {{ tableData.length }}(mm)</el-col
            >
            <el-col :span="6"
              >介质材料厚度-(t2): {{ tableData.thickness }}(mm)</el-col
            >
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6"
              >中间电容线宽-(w2): {{ tableData.width }}(mm)</el-col
            >
            <el-col :span="6"
              >两端线宽-(w1): {{ tableData.widthLength }}(mm)</el-col
            >
            <el-col :span="6"
              >介质材料x方向尺寸-(Px): {{ tableData.xpath }}(mm)</el-col
            >
            <el-col :span="6"
              >介质材料y方向尺寸-(Py): {{ tableData.ypath }}(mm)</el-col
            >
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img class="imgHight center" src="@/assets/wbkdpzzh.png" alt="" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料反射光场的x轴线偏光与y轴线偏光的相位差曲线</div>
      </div>
      <Echars :data="echarsdata" ref="echarts"></Echars>
    </el-card>
  </div>
</template>

<script>
/**
 * 微波宽带偏振转换详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "../PolarizationConversion/echars.vue";
import AntennaTypes from "../../components/config/AntennaTypes";
export default {
  components: { breadcrumb, Echars },
  data() {
    return {
      tableData: {},
      echarsdata: {},
      id: "",
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "微波宽带位相调控",
          url: "/photonm/PolarizationConversion",
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
        "/history/example",
        this.buildSearchParams(),
        function (response) {
          this.tableData = response.data.data;
          this.echarsdata = response.data.data;
          this.$refs.echarts.getData(this.echarsdata);
          this.tableData.dataFrom = this.DataFromFormatter(
            this.tableData.dataFrom
          );
          this.tableData.lightType = this.lightTypeFormatter(
            this.tableData.lightType
          );
          this.tableData.workingMode = this.WorkTypeFormatter(
            this.tableData.workingMode
          );
        }.bind(this)
      );
    },

    /**
     * 构建上传参数
     * */

    buildSearchParams() {
      let params = {
        importId: this.id,
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