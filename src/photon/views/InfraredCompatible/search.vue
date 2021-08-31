<template>
  <el-form label-width="80px">
    <el-collapse v-model="activeName" accordion>
      <!-- 入射角 lightAngle -->
      <el-collapse-item name="9">
        <template slot="title">
          入射角
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.lightAngle"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.lightAngle"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 基底介电常数 baseDielectric -->
      <el-collapse-item name="1">
        <template slot="title">
          基底介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseDielectric"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseDielectric"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 基底红外发射率 baseEmissivity -->
      <el-collapse-item name="2">
        <template slot="title">
          基底红外发射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseEmissivity"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseEmissivity"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 基底材料 baseMaterial -->
      <el-collapse-item name="3">
        <template slot="title">
          基底材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseMaterial"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseMaterial"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 基底材料介电常数 dielectricConstant -->
      <el-collapse-item name="4">
        <template slot="title">
          基底材料介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.dielectricConstant"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.dielectricConstant"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 介质层红外发射率 dielectricEmissivity -->
      <el-collapse-item name="5">
        <template slot="title">
          介质层红外发射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.dielectricEmissivity"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.dielectricEmissivity"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 介质层材料 dielectricMaterial -->
      <el-collapse-item name="6">
        <template slot="title">
          介质层材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.dielectricMaterial"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.dielectricMaterial"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 介质层厚度 dielectricThickness -->
      <el-collapse-item name="7">
        <template slot="title">
          介质层厚度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.dielectricThickness"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.dielectricThickness"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 透射层红外发射率 emissivity -->
      <el-collapse-item name="8">
        <template slot="title">
          透射层红外发射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.emissivity"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.emissivity"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- 金属贴片红外发射率 patchEmissivity -->
      <el-collapse-item name="10">
        <template slot="title">
          金属贴片红外发射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchEmissivity"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchEmissivity"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 金属贴片层材料 patchMaterial -->
      <el-collapse-item name="11">
        <template slot="title">
          金属贴片层材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchMaterial"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchMaterial"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 金属贴片占空比 patchPercent -->
      <el-collapse-item name="12">
        <template slot="title">
          金属贴片占空比
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchPercent"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchPercent"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 金属贴片周期 patchPeriod -->
      <el-collapse-item name="13">
        <template slot="title">
          金属贴片周期
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchPeriod"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchPeriod"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- 金属贴片宽度 patchWidth -->
      <el-collapse-item name="14">
        <template slot="title">
          金属贴片宽度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchWidth"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchWidth"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- <el-form-item label="工作方式" class="marginT">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in options.workMethod"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数据来源" class="marginT">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in options.dataFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item> -->

    <el-form-item class="margin">
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleEmptyClick">置空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 红外兼容搜索框——透射层
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
        baseDielectric: "", //基底介电常数
        baseEmissivity: "", //基底红外发射率
        baseMaterial: "", //基底材料
        dielectricConstant: "", //基底材料介电常数
        dielectricEmissivity: "", //介质层红外发射率
        dielectricMaterial: "", //介质层材料
        dielectricThickness: "", //介质层厚度
        emissivity: "", //透射层红外发射率
        lightAngle: "", //入射角
        patchEmissivity: "", //金属贴片红外发射率
        patchMaterial: "", //金属贴片层材料
        patchPercent: "", //金属贴片占空比
        patchPeriod: "", //金属贴片周期
        patchWidth: "", //金属贴片宽度
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
      (this.form.baseDielectric = ""), //基底介电常数
        (this.form.baseEmissivity = ""), //基底红外发射率
        (this.form.baseMaterial = ""), //基底材料
        (this.form.dielectricConstant = ""), //基底材料介电常数
        (this.form.dielectricEmissivity = ""), //介质层红外发射率
        (this.form.dielectricMaterial = ""), //介质层材料
        (this.form.dielectricThickness = ""), //介质层厚度
        (this.form.emissivity = ""), //透射层红外发射率
        (this.form.lightAngle = ""), //入射角
        (this.form.patchEmissivity = ""), //金属贴片红外发射率
        (this.form.patchMaterial = ""), //金属贴片层材料
        (this.form.patchPercent = ""), //金属贴片占空比
        (this.form.patchPeriod = ""), //金属贴片周期
        (this.form.patchWidth = ""); //金属贴片宽度
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