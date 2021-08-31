<!--
 * @Descripttion: 微波宽带位相调控
 * @version: v1.0.2
 * @Author: payne (wenyi)
 * @Date: 2021-06-29 16:55:12
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-30 11:23:30
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
            <el-col :span="6">入射光偏振态: {{ tableData.lightType }}</el-col>
            <el-col :span="6">入射角: {{ tableData.lightAngle }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"
              >工字型臂宽度角度-(armR): {{ tableData.armr }}(mm)</el-col
            >
            <el-col :span="6"
              >工字型臂线宽-(armY): {{ tableData.army }}(mm)</el-col
            >
            <el-col :span="6"
              >反射板距离系数-(laylerx): {{ tableData.laylerx }}</el-col
            >
            <el-col :span="6">周期系数-(period): {{ tableData.period }}</el-col>
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6"
              >基板介电常数-(permittivity): {{ tableData.permittivity }}</el-col
            >
            <el-col :span="6"
              >工字型矩形线宽(两侧)-(rectx): {{ tableData.rectx }}(mm)</el-col
            >
            <el-col :span="6"
              >工字型矩形线宽(中间)-(rectx2): {{ tableData.rectx2 }}(mm)</el-col
            >
            <el-col :span="6"
              >工字型矩形长度-(recty): {{ tableData.recty }}(mm)</el-col
            >
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6">基板厚度-(subH): {{ tableData.subh }}(mm)</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img class="imgHight center" src="@/assets/wbkdxwtk.png" alt="" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料反射光场的交叉极化幅度曲线
</div>
      </div>
      <Echars :data="echarsdata" ref="echarts"></Echars>
    </el-card>
  </div>
</template>

<script>
/**
 * 微波宽带相位调控
 * 后台页面
 * @author Chris
 * */
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "../UltraWideband/echars";
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
          name: "微波宽带偏振转换",
          url: "/photonm/UltraWideband",
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
          console.log("获得示例数据",response);
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