<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>环境参数</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">入射角-lightAngle: {{ tableData.lightAngle }}</el-col>
      </el-row>
    </el-card>
    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>材料参数</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6"
          >基底材料-baseMaterial: {{ tableData.baseMaterial }}</el-col
        >
        <el-col :span="6"
          >基底介电常数-curStatus: {{ tableData.curStatus }}</el-col
        >
        <el-col :span="6"
          >基底红外发射率-baseEmissivity: {{ tableData.baseEmissivity }}</el-col
        >
        <el-col :span="6"
          >当前数据类型-curStatus: {{ tableData.curStatus }}</el-col
        >
      </el-row>
      <el-row :gutter="20" class="margin">
        <el-col :span="6"
          >数据来源类型-dataFrom: {{ tableData.dataFrom }}</el-col
        >
        <el-col :span="6"
          >介质层介电常数-dielectricConstant:
          {{ tableData.dielectricConstant }}</el-col
        >
        <el-col :span="6"
          >介质层红外发射率-dielectricEmissivity:
          {{ tableData.dielectricEmissivity }}</el-col
        >
        <el-col :span="6"
          >介质层材料-dielectricMaterial:
          {{ tableData.dielectricMaterial }}</el-col
        >
      </el-row>
      <el-row :gutter="20" class="margin">
        <el-col :span="6"
          >介质层厚度-dielectricThickness:
          {{ tableData.dielectricThickness }}</el-col
        >
        <el-col :span="6"
          >透射层红外发射率-emissivity: {{ tableData.emissivity }}</el-col
        >
        <el-col :span="6"
          >金属贴片红外发射率-patchEmissivity:
          {{ tableData.patchEmissivity }}</el-col
        >
        <el-col :span="6"
          >金属贴片层材料-patchMaterial: {{ tableData.patchMaterial }}</el-col
        >
      </el-row>
      <el-row :gutter="20" class="margin">
        <el-col :span="6"
          >金属贴片占空比-patchPercent: {{ tableData.patchPercent }}</el-col
        >
        <el-col :span="6"
          >金属贴片周期-patchPeriod: {{ tableData.patchPeriod }}</el-col
        >
        <el-col :span="6"
          >金属贴片宽度-patchWidth: {{ tableData.patchWidth }}</el-col
        >
      </el-row>
    </el-card>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <Echars :data="echarsdata" ref="echarts"></Echars>
      </div>
    </el-card>
  </div>
</template>

<script>
/**
 * 红外兼容页面透射层详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "./echars";
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
          name: "红外兼容透射层",
          url: "/photonm/InfraredCompatible_transmission",
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
        "/infrared/ProjectionInfo",
        this.buildSearchParams(),
        function (response) {
          this.tableData = response.data;
          this.echarsdata = JSON.parse(response.data.projectionData);
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
  },
};
</script>

<style>
</style>