<!--
 * @Descripttion: 
 * @version: v1.0.2
 * @Author: payne (wenyi)
 * @Date: 2021-06-29 15:34:33
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-29 16:52:16
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>环境参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">工作方式: {{ tableData.workType }}</el-col>
            <el-col :span="6">数据来源: {{ tableData.dataFrom }}</el-col>
            <el-col :span="6">入射角: {{ tableData.lightAngle }}(°)</el-col>
            <el-col :span="6">入射光偏振态: {{ tableData.lightType }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">基底缝宽-(g0): {{ tableData.g0 }}(mm)</el-col>
            <el-col :span="6">金属条长度-(l0): {{ tableData.l0 }}(mm)</el-col>
            <el-col :span="6">方形环周期-(p): {{ tableData.p }}(mm)</el-col>
            <el-col :span="6"
              >二层与一层间隔-(h1): {{ tableData.h1 }}(mm)</el-col
            >
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6"
              >二层与三层间隔-(h2): {{ tableData.h2 }}(mm)</el-col
            >
            <el-col :span="6"
              >三层与基底层间隔-(h3): {{ tableData.h3 }}(mm)</el-col
            >
            <el-col :span="6"
              >方形环材料一层方阻-(r1): {{ tableData.r1 }}(Ω/m²)</el-col
            >
            <el-col :span="6"
              >方形环材料二层方阻-(r2): {{ tableData.r2 }}(Ω/m²)</el-col
            >
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6"
              >方形环材料三层方阻-(r3): {{ tableData.r3 }}(Ω/m²)</el-col
            >
            <el-col :span="6"
              >方形环宽度一层-(s1): {{ tableData.s1 }}(mm)</el-col
            >
            <el-col :span="6"
              >方形环宽度二层-(s2): {{ tableData.s2 }}(mm)</el-col
            >
            <el-col :span="6"
              >方形环宽度三层-(s3): {{ tableData.s3 }}(mm)</el-col
            >
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img class="spacie" src="@/assets/wbzdtbjkdxbyth.png" alt="" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像分别为功能材料的微波波段吸收率和反射率曲线
</div>
      </div>
      <Echars :data="echarsdata" ref="echarts"></Echars>
      <Echars02 :data="echarsdata" ref="echarts02"></Echars02>
    </el-card>
  </div>
</template>

<script>
/**
 * 微波窄带透波及宽带吸波
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "../Integration/echars.vue";
import Echars02 from "../Integration/echars02.vue";
import AntennaTypes from "../../../photon/components/config/AntennaTypes";
export default {
  components: { breadcrumb, Echars, Echars02 },
  data() {
    return {
      tableData: {},
      echarsdata: null,
      id: "",
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
          console.log("获得示例数据",response);
          this.echarsdata = this.tableData.integrationDtos;
          console.log("获得示例数据",response);
          this.$refs.echarts.getData(this.echarsdata);
          this.$refs.echarts02.getData(this.echarsdata);
          this.tableData.dataFrom = this.DataFromFormatter(
            this.tableData.dataFrom
          );
          this.tableData.lightType = this.lightTypeFormatter(
            this.tableData.lightType
          );
          this.tableData.workType = this.WorkTypeFormatter(
            this.tableData.workType
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
.spacie {
  width: 100%;
}
</style>