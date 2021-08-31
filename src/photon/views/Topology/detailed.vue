<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20">
      <el-col :span="17"
        ><el-card class="margin">
          <div slot="header" class="clearfix">
            <span>环境参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">数据来源: {{ tableData.dataFrom }}</el-col>
            <el-col :span="6">工作方式: {{ tableData.workingMode }}</el-col>
            <el-col :span="6">入射角: {{ tableData.lightAngle }}（°）</el-col>
            <el-col :span="6">光源偏振态: {{ tableData.lightType }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">天线材料: {{ tableData.material }}</el-col>
            <el-col :span="6">天线介电常数: {{ tableData.constant }}</el-col>
            <el-col :span="6">天线类型: {{ tableData.type }}</el-col>
            <el-col :span="6"
              >天线长轴-(L): {{ tableData.longAxis }}(nm)</el-col
            >
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6"
              >天线短轴-(W): {{ tableData.minorAxis }}(nm)</el-col
            >
            <el-col :span="6">天线高度-(h): {{ tableData.height }}(nm)</el-col>
            <el-col :span="6">基底材料: {{ tableData.baseMaterial }}</el-col>
            <el-col :span="6"
              >基底介电常数: {{ tableData.baseConstant }}</el-col
            >
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6">基底类型: {{ tableData.baseType }}</el-col>
            <el-col :span="6"
              >基底厚度: {{ tableData.baseThickness }}(nm)</el-col
            >
            <el-col :span="6"
              >基底边长-(p): {{ tableData.baseSide }}(nm)</el-col
            >
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img class="imgHight center" src="@/assets/hwkdpzzh.png" alt="" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color: rgba(0, 0, 0, 0.5); font-weight: 1000">
          注：以下图像分别为功能材料的红外波段交叉极化振幅和相位曲线
        </div>
        <Echars :data="echarsdata" ref="echarts"></Echars>
        <Echars02 ref="echarts02"></Echars02>
      </div>
    </el-card>
  </div>
</template>

<script>
/**
 * 拓扑优化超透镜-详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "./echars";
import Echars02 from "./echars02";
import AntennaTypes from "../../components/config/AntennaTypes";
export default {
  components: { breadcrumb, Echars, Echars02 },
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
          name: "拓扑优化超透镜",
          url: "/photonm/InfraredPolarizationConversion",
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
        "/topology/info",
        this.buildSearchParams(),
        function (response) {
          this.tableData = response.data;
          this.echarsdata = JSON.parse(response.data.dataStr);
          this.$refs.echarts.getData(this.echarsdata);
          this.$refs.echarts02.getData(this.echarsdata);
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
.imgHight {
  height: 240px;
}
</style>
