<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>环境参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">数据来源: {{ tableData.dataFrom }}</el-col>
            <el-col :span="6">工作方式: {{ tableData.workType }}</el-col>
            <el-col :span="6">光源偏振态: {{ tableData.lightType }}</el-col>
            <el-col :span="6">入射光角度: {{ tableData.lightAngle }}(°)</el-col>
          </el-row>
        </el-card>
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>材料参数</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">材料层数-layer: {{ tableData.layer }}</el-col>
            <el-col :span="6">周期-p: {{ tableData.p }}(mm)</el-col>
            <el-col :span="6">间隙-g: {{ tableData.g }}(mm)</el-col>
            <el-col :span="6">填充材料-filler: {{ tableData.filler }}</el-col>
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6">第一层方阻-rs1: {{ tableData.rs1 }}(Ω/m²)</el-col>
            <el-col :span="6">第二层方阻-rs2: {{ tableData.rs2 }}(Ω/m²)</el-col>
            <el-col :span="6">第三层方阻-rs3: {{ tableData.rs3 }}(Ω/m²)</el-col>
            <el-col :span="6">第一层高度-h1: {{ tableData.h1 }}(mm)</el-col>
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6">第二层高度-h2: {{ tableData.h2 }}(mm)</el-col>
            <el-col :span="6">第三层高度-h3: {{ tableData.h3 }}(mm)</el-col>
            <el-col :span="6">第一层线宽-s1: {{ tableData.s1 }}(mm)</el-col>
            <el-col :span="6">第二层线宽-s2: {{ tableData.s2 }}(mm)</el-col>
          </el-row>
          <el-row :gutter="20" class="margin">
            <el-col :span="6">第三层线宽-s3: {{ tableData.s3 }}(mm)</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="margin">
          <div slot="header" class="clearfix">
            <span>图例</span>
          </div>
          <img class="wbkdxs" src="@/assets/wbkdxs.png" alt="" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="margin">
      <div slot="header" class="clearfix">
        <span>图像</span>
        <div style="color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像为功能材料的微波波段吸收率曲线
</div>
      </div>
      <Echars :data="echarsdata" ref="echarts"></Echars>
    </el-card>
  </div>
</template>

<script>
/**
 * 微波吸波器-详情
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
          name: "微波宽带吸收",
          url: "/photonm/MicrowaveAbsorber",
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
        "/microwave_absorbing/selectInfo",
        this.buildSearchParams(),
        function (response) {
          this.tableData = response.data;
          this.echarsdata = response.data.absorptionRateDtos.absorptionRateDtos;
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
.wbkdxs {
  width: 100%;
}
</style>