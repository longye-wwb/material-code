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
            <el-col :span="6">数据来源: {{ tableData.dataFrom }}</el-col>
            <el-col :span="6">入射角: {{ tableData.lightAngle }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料发射率</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"
              >整体红外反射率-(ε): {{ tableData.emissivity }}</el-col
            >
            <el-col :span="6"
              >贴片红外反射率-(ε1): {{ tableData.patchEmissivity }}</el-col
            >
            <el-col :span="6"
              >基底红外反射率-(ε2): {{ tableData.baseEmissivity }}</el-col
            >
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"
              >基底介电常数: {{ tableData.baseDielectric }}</el-col
            >
            <el-col :span="6">基底材料: {{ tableData.baseMaterial }}</el-col>
            <el-col :span="6"
              >基底厚度-(t1): {{ tableData.baseThickness }}(μm)</el-col
            >
            <el-col :span="6">贴片材料: {{ tableData.patchMaterial }}</el-col>
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6"
              >贴片占空比-(t): {{ tableData.patchPercent }}</el-col
            >
            <el-col :span="6"
              >贴片周期-(p): {{ tableData.patchPeriod }}(μm)</el-col
            >
            <el-col :span="6"
              >贴片宽度-(d): {{ tableData.patchWidth }}(μm)</el-col
            >
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img
            class="spciledededed"
            src="@/assets/hwkdgfsjwbkdgts.png"
            alt=""
          />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料的微波波段透射率曲线</div>
      </div>
      <Echars :data="echarsdata" ref="echarts"></Echars>
    </el-card>
  </div>
</template>

<script>
/**
 * 红外微波一体化详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "./echars";
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
          name: "红外宽带高反及微波宽带高透",
          url: "/photonm/InfraredAndMicrowaveIntegration",
        },
        {
          name: "导入",
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
        "/infrared_projection/info",
        this.buildSearchParams(),
        function (response) {
          this.tableData = response.data;
          this.echarsdata = JSON.parse(response.data.projection);
          this.$refs.echarts.getData(this.echarsdata);
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
.spciledededed {
  width: 100%;
}
</style>