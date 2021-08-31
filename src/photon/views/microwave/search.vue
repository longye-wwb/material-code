<template>
  <el-form label-width="90px">
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

    <el-form-item label="光源偏振态" class="marginT">
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
          <el-input v-model="form.lightAngle.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- bandwidth 相对带宽 -->

      <el-collapse-item title="相对带宽" name="3">
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

      <!-- baseMaterial 基底材料 -->

      <!-- <el-collapse-item name="2">
        <template slot="title">
          基底材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseMaterial.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseMaterial.like"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- baseThickness 基底厚度 -->

      <!-- <el-collapse-item name="4">
        <template slot="title">
          基底厚度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseThickness.gte || form.baseThickness.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseThickness.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.baseThickness.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- dielectric 介质介电常数 -->

      <!-- <el-collapse-item name="5">
        <template slot="title">
          介质介质介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.dielectric.gte || form.dielectric.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.dielectric.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.dielectric.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- length 结构外环边长 -->

      <!-- <el-collapse-item name="6">
        <template slot="title">
          结构外环边长
          <i class="header-icon el-icon-info marginL" v-if="form.length"></i>
        </template>
        <div class="flex">
          <el-input v-model="form.length" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- mediumMaterial 介质材料 -->

      <!-- <el-collapse-item name="7">
        <template slot="title">
          介质材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.mediumMaterial.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.mediumMaterial.like"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- mediumThickness 介质厚度 -->

      <!-- <el-collapse-item name="9">
        <template slot="title">
          介质厚度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.mediumThickness.gte || form.mediumThickness.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.mediumThickness.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.mediumThickness.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- period 结构周期 -->
      <!-- <el-collapse-item name="12">
        <template slot="title">
          结构周期
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.period.gte || form.period.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.period.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.period.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- period 结构周期 -->

      <!-- <el-collapse-item name="9">
        <template slot="title">
          结构周期
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.mediumThickness.gte || form.mediumThickness.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.mediumThickness.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.mediumThickness.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- structureMaterial 结构材料 -->

      <!-- <el-collapse-item name="8">
        <template slot="title">
          结构材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.structureMaterial.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.structureMaterial.like"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- structureThickness 结构厚度 -->

      <!-- <el-collapse-item name="10">
        <template slot="title">
          结构厚度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.structureThickness.gte || form.structureThickness.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.structureThickness.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.structureThickness.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- <el-collapse-item name="11">
        <template slot="title">
          结构宽度
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
      </el-collapse-item> -->
    </el-collapse>

    <el-form-item class="margin">
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleEmptyClick">置空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 微波窄带吸收搜索组件
 * @author Chris
 * */
/*
 * @Author: Chris
 * @Date: 2021-05-17 09:58:18
 * @Last Modified by:   Chris
 * @Last Modified time: 2021-05-17 09:58:18
 */
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
        length: "", //结构外环边长（mm）
        baseThickness: { gte: "", lte: "" }, //基底厚度
        bandwidth: { gte: "", lte: "" },
        dielectric: { gte: "", lte: "" }, //介质介电常数
        lightAngle: { gte: "", lte: "" }, //入射角
        structureThickness: { gte: "", lte: "" }, //结构厚度
        baseMaterial: { like: "" }, //基底材料
        mediumMaterial: { like: "" }, //介质材料
        mediumThickness: { gte: "", lte: "" },
        structureMaterial: { like: "" }, //结构材料
        width: { gte: "", lte: "" },
        period: { gte: "", lte: "" },
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
      this.form.length = "";
      this.form.bandwidth = { gte: "", lte: "" };
      this.form.baseThickness = { gte: "", lte: "" };
      this.form.dielectric = { gte: "", lte: "" };
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.structureThickness = { gte: "", lte: "" };
      this.form.baseMaterial = { like: "" };
      this.form.mediumMaterial = { like: "" };
      this.form.structureMaterial = { like: "" };
      this.form.mediumThickness = { gte: "", lte: "" };
      this.form.width = { gte: "", lte: "" };
      this.form.period = { gte: "", lte: "" };
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
<style lang="scss">
.marginT {
  margin-top: 10px;
}
</style>
