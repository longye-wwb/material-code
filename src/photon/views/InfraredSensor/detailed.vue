<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20">
      <el-col :span="17">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>其他参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">数据来源: {{ tableData.dataFrom }}</el-col>
            <el-col :span="6">光源类型: {{ tableData.lightType }}</el-col>
            <el-col :span="6">入射角: {{ tableData.lightAngle }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">微结构高-(h): {{ tableData.height }}</el-col>
            <el-col :span="6">边缘间距-(g): {{ tableData.spaces }}(mm)</el-col>
            <el-col :span="6">微结构宽-(d): {{ tableData.width }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img class="imgW" src="@/assets/hwzdcg.png" alt="" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料的红外波段吸收率曲线
</div>
        <Echars :data="echarsdata" ref="echarts"></Echars>
      </div>
    </el-card>
  </div>
</template>


<script>
/**
 * 红外传感详情
 * 后台页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import AntennaTypes from "../../components/config/AntennaTypes";
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
          name: "红外传感详情",
          url: "/photonm/InfraredSensor",
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
        "/mate_grating/info",
        this.buildSearchParams(),
        function (response) {
          console.log(response.data, "999");
          this.tableData = response.data;
          this.tableData.dataFrom = this.getsource(this.tableData.dataFrom);
          this.echarsdata = JSON.parse(response.data.data);
          this.$refs.echarts.getData(this.echarsdata);
          this.tableData.dataFrom = this.DataFromFormatter(
            this.tableData.dataFrom
          );
          this.tableData.lightType = this.lightTypeFormatter(
            this.tableData.lightType
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
     * 获取数据来源
     * */
    getsource(num) {
      let name = "";
      for (var i = 0; i < AntennaTypes.dataFrom.length; i++) {
        if (num == AntennaTypes.dataFrom[i].value) {
          name = AntennaTypes.dataFrom[i].label;
        }
      }
      return name;
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