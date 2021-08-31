<template>
  <el-form label-width="80px">
    <!-- 数据来源 -->

    <!-- <el-form-item label="数据来源" class="marginT">
      <el-select v-model="form.dataFrom" placeholder="请选择">
        <el-option
          v-for="item in options.dataFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item> -->

    <el-collapse v-model="activeName" accordion>
      <!-- 衍射角 -->
      <el-collapse-item name="1">
        <template slot="title">
          衍射角
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.angle.gte || form.angle.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.angle.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.angle.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <!-- baseRefractive baseRefractive -->

      <el-collapse-item name="2">
        <template slot="title">
          基底折射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseRefractive.gte || form.baseRefractive.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseRefractive.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.baseRefractive.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!--  inLine 入射波长 -->

      <el-collapse-item name="3">
        <template slot="title">
          入射波长
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.inLine.gte || form.inLine.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.inLine.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.inLine.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- order  衍射阶数 -->

      <el-collapse-item name="4">
        <template slot="title">
          衍射阶数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.order.gte || form.order.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.order.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.order.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- period 材料周期 -->

      <el-collapse-item name="5">
        <template slot="title">
          材料周期
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
      </el-collapse-item>

      <!-- refractive 材料折射率 -->

      <el-collapse-item title="材料折射率" name="6">
        <template slot="title">
          材料折射率
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.refractive.gte || form.refractive.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.refractive.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.refractive.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item name="7">
        <template slot="title">
          均匀性误差
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.diffcote.gte || form.diffcote.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.diffcote.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.diffcote.lte"
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
/*
 * @Author: Chris
 * @Date: 2021-05-18 15:04:49
 * @Last Modified by: Chris
 * @Last Modified time: 2021-05-18 15:06:00
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
        angle: { gte: "", lte: "" }, //衍射角
        baseRefractive: { gte: "", lte: "" }, //入射角
        refractive: { gte: "", lte: "" }, //基底介电常数
        period: { gte: "", lte: "" }, //材料周期
        inLine: { gte: "", lte: "" }, //整体红外发射率
        order: { gte: "", lte: "" }, //贴片红外发射率
        diffcote:{ gte: "", lte: "" }//均匀性误差
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
      this.form.baseRefractive = { gte: "", lte: "" };
      (this.form.workingMode = ""), (this.form.dataFrom = "");
      this.form.refractive = { gte: "", lte: "" };
      this.form.period = { gte: "", lte: "" };
      this.form.inLine = { gte: "", lte: "" };
      this.form.order = { gte: "", lte: "" };
      this.form.diffcote = { gte: "", lte: "" };
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
