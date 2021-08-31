<template>
  <el-form label-width="80px">
    <!-- 数据来源 -->

    <el-form-item label="数据来源" class="marginT">
      <el-select v-model="form.dataFrom" placeholder="请选择">
        <el-option
          v-for="item in options.dataFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 光源偏振态搜索 -->

    <el-form-item label="光偏振态" class="marginT">
      <el-select v-model="form.lightType" placeholder="请选择">
        <el-option
          v-for="item in options.Polarization"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-collapse v-model="activeName" accordion>
      <!-- lightAngle 入射角 -->

      <el-collapse-item name="1">
        <template slot="title">
          入射角
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.lightAngle.gte || form.lightAngle.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.lightAngle.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.lightAngle.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- material 材料 -->

      <el-collapse-item name="2">
        <template slot="title">
          材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.material.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.material.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- bandwidth 相对带宽 -->

      <el-collapse-item title="相对带宽" name="6">
        <template slot="title">
          相对带宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.bandwidth.gte || form.bandwidth.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.bandwidth.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.bandwidth.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- height 微结构高 -->

      <el-collapse-item title="微结构高" name="3">
        <template slot="title">
          微结构高
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.height.gte || form.height.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.height.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.height.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- space 边缘间距 -->

      <el-collapse-item title="边缘间距" name="4">
        <template slot="title">
          边缘间距
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.space.gte || form.space.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.space.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.space.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- width  微结构宽-->

      <el-collapse-item title="微结构宽" name="5">
        <template slot="title">
          微结构宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.width.gte || form.width.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.width.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.width.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-form-item class="margin">
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleEmptyClick">置空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 红外偏振转换搜索组件
 * @author Chris
 * */
import AntennaTypes from "../../../photon/components/config/AntennaTypes";
export default {
  name: "NanoAntennaImportSearchForm",
  components: {},
  data() {
    return {
      activeName: "0",
      options: AntennaTypes,
      refrashAntennaForm: false,
      refrashBottomForm: false,
      form: {
        dataFrom: "", //数据来源
        workingMode: "", //工作方式
        lightType: "", //光源偏振态搜索
        bandwidth: { gte: "", lte: "" },
        material: { like: "" },
        lightAngle: { gte: "", lte: "" }, //入射角
        height: { gte: "", lte: "" }, //微结构高
        space: { gte: "", lte: "" }, //边缘间距
        width: { gte: "", lte: "" }, //微结构宽
      },
    };
  },
  methods: {
    /**
     * 点击搜索
     */

    handleSearchClick() {
      this.$emit("search", this.form);
    },

    getSearchForm() {
      return this.form;
    },

    /**
     * 清空form表单
     * */

    emptyForm() {
      (this.form.workingMode = ""), (this.form.dataFrom = "");
      this.form.lightType = "";
      this.form.bandwidth = { gte: "", lte: "" };
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.height = { gte: "", lte: "" };
      this.form.space = { gte: "", lte: "" };
      this.form.width = { gte: "", lte: "" };
      material = { like: "" };
    },

    /**
     * 点击置空按钮
     * */

    handleEmptyClick() {
      this.emptyForm();
      this.$emit("search", this.form);
    },
  },
};
</script>
<style lang="scss" >
.marginT {
  margin-top: 10px;
}
</style>