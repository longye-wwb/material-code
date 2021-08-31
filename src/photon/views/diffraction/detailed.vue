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
            <el-col :span="12">衍射角: {{ tableData.angle }}</el-col>
            <el-col :span="12">入射波长: {{ tableData.inLine }}</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">衍射阶数: {{ tableData.order }}</el-col>
            <el-col :span="12">材料周期: {{ tableData.period }}</el-col>
            <el-col :span="12"
              >基底折射率: {{ tableData.baseRefractive }}</el-col
            >
            <el-col :span="12"> 材料折射率: {{ tableData.refractive }} </el-col>
            <el-col :span="12"> 均匀性误差: {{ tableData.diffcote }} </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <div class="margin_img_flex">
            <img class="spciledededed" :src="imglocal" alt="" />
            <div class="tuli">
              <div class="tuli_has">
                <div class="color"></div>
                <div class="title">结构</div>
              </div>
              <div class="tuli_no">
                <div class="color"></div>
                <div class="title">空气</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料的衍射场内各衍射级效率柱状图
</div>
      </div>
      <Echars :data="echarsdata" ref="echarts"></Echars>
    </el-card>
  </div>
</template>

<script>
/*
 * @Author: Chris
 * @Date: 2021-05-18 16:26:38
 * @Last Modified by: Chris
 * @Last Modified time: 2021-05-19 17:08:32
 */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "./echars";
import AntennaTypes from "../../components/config/AntennaTypes";

export default {
  components: { breadcrumb, Echars },
  data() {
    return {
      tableData: {},
      echarsdata: {},
      imglocal: "",
      id: "",
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "衍射组件",
          url: "/photonm/diffraction",
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
    this.getpicture();
  },

  methods: {
    /**
     * 获取图片
     * */

    getpicture() {
      console.log(this.$http);
      let _this = this;

      function _fileNameInContentDisposition(res) {
        let des = res.headers["content-disposition"];
        let last = des.lastIndexOf("filename=");
        let fileName = des.slice(last).replace("filename=", "");
        return fileName;
      }

      function getFile(url, params) {
        _this
          .$http({
            method: "get",
            url: "/api" + url + "?" + _this.$qs.encode(params),
            responseType: "arraybuffer",
            withCredentials: true,
          })
          .then(function(response) {
            let name = _fileNameInContentDisposition(response);
            // console.log("返回结果", response, response.headers['content-type'], name);
            let blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            let objectUrl = URL.createObjectURL(blob);
            // _saveFile(objectUrl, name);
            // window.URL.revokeObjectURL(blob);
            _this.imglocal = objectUrl;
          });
      }
      getFile("/diffraction/picture", { id: this.id });
    },

    /**
     * 获取数据
     * */

    patchTableData() {
      this.$postserver.getData(
        "/diffraction/info",
        this.buildSearchParams(),
        function(response) {
          this.tableData = response.data;
          this.echarsdata = JSON.parse(response.data.data);
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

<style lang="scss">
.spciledededed {
  width: 300px;
}

.margin_img_flex {
  width: 100%;
  display: flex;
  position: relative;
  .tuli {
    margin-left: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    .tuli_has {
      display: flex;

      .title {
        margin-left: 20px;
      }
      .color {
        width: 30px;
        height: 20px;
        border-radius: 5px;
        background-color: #d90429;
      }
    }
    .tuli_no {
      margin-top: 20px;
      display: flex;
      .title {
        margin-left: 20px;
      }
      .color {
        width: 30px;
        height: 20px;
        border-radius: 5px;
        background-color: rgb(220, 220, 220);
      }
    }
  }
}
</style>
