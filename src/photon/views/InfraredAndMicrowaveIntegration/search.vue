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

    <el-collapse v-model="activeName" accordion>
      <!-- lightAngle 入射角 -->

      <el-collapse-item name="8">
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

      <!--  emissivity 整体红外反射率 -->

      <el-collapse-item name="4">
        <template slot="title">
          整体红外反射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.emissivity.gte || form.emissivity.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.emissivity.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.emissivity.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- patchEmissivity  贴片红外反射率 -->

      <el-collapse-item name="5">
        <template slot="title">
          贴片红外发射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchEmissivity.gte || form.patchEmissivity.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchEmissivity.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.patchEmissivity.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- baseEmissivity 基底红外发射率 -->

      <el-collapse-item name="2">
        <template slot="title">
          基底红外反射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseEmissivity.gte || form.baseEmissivity.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseEmissivity.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.baseEmissivity.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- baseConstant 基底介电常数 -->

      <!-- <el-collapse-item title="基底介电常数" name="1">
        <template slot="title">
          基底介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseConstant.gte || form.baseConstant.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseConstant.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.baseConstant.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- baseMaterial 基底材料 -->

      <!-- <el-collapse-item title="基底材料" name="10">
        <template slot="title">
          基底材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseMaterial.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseMaterial.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- baseThickness 基底厚度  -->

      <!-- <el-collapse-item name="3">
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

      <!-- patchMaterial 贴片材料 -->

      <!-- <el-collapse-item title="贴片材料" name="11">
        <template slot="title">
          贴片材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchMaterial.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchMaterial.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- patchPercent 贴片占空比 -->

      <!-- <el-collapse-item title="贴片占空比" name="12">
        <template slot="title">
          贴片占空比
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchPercent.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchPercent.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- patchPeriod  贴片周期 -->

      <!-- <el-collapse-item title="贴片周期" name="6">
        <template slot="title">
          贴片周期
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchPeriod.gte || form.patchPeriod.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchPeriod.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.patchPeriod.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- patchWidth  贴片宽度 -->

      <!-- <el-collapse-item name="7">
        <template slot="title">
          贴片宽度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.patchWidth.gte || form.patchWidth.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.patchWidth.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.patchWidth.lte"
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
        lightAngle: { gte: "", lte: "" }, //入射角
        baseConstant: { gte: "", lte: "" }, //基底介电常数
        baseEmissivity: { gte: "", lte: "" }, //基底红外发射率
        // baseThickness: { gte: "", lte: "" }, //基底厚度
        emissivity: { gte: "", lte: "" }, //整体红外发射率
        patchEmissivity: { gte: "", lte: "" }, //贴片红外发射率
        patchPeriod: { gte: "", lte: "" }, //贴片周期
        patchWidth: { gte: "", lte: "" }, //贴片宽度
        baseMaterial: { like: "" }, //基底材料
        patchMaterial: { like: "" }, //贴片材料
        patchPercent: "", //贴片占空比
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
      // this.$refs.topform.emptyForm();
      // this.$refs.bottomForm.emptyForm();
      this.form.lightAngle = { gte: "", lte: "" };
      (this.form.workingMode = ""), (this.form.dataFrom = "");
      this.form.baseConstant = { gte: "", lte: "" };
      this.form.baseEmissivity = { gte: "", lte: "" };
      // this.form.baseThickness = { gte: "", lte: "" };
      this.form.emissivity = { gte: "", lte: "" };
      this.form.patchEmissivity = { gte: "", lte: "" };
      this.form.patchPeriod = { gte: "", lte: "" };
      this.form.patchWidth = { gte: "", lte: "" };
      this.form.baseMaterial = { like: "" };
      this.form.patchMaterial = { like: "" };
      this.form.patchPercent = "";
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