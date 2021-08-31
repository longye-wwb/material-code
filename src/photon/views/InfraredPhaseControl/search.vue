<template>
  <el-form label-width="80px">
    <!-- 工作方式 -->

    <el-form-item label="工作方式" class="marginT">
      <el-select v-model="form.workingMode" placeholder="请选择">
        <el-option
          v-for="item in options.workMethod"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

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
          v-for="item in options.lightFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-collapse v-model="activeName" accordion>
      <!-- lightAngle  入射角 -->

      <el-collapse-item title="入射角" name="1">
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

      <!-- eff 转换效率 -->

      <el-collapse-item title="高效带宽" name="19">
        <template slot="title">
          高效带宽
          <i class="header-icon el-icon-info marginL" v-if="form.eff.gte"></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.eff.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.eff.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- material 天线材料 -->

      <!-- <el-collapse-item title="天线材料" name="2">
        <template slot="title">
          天线材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.material.like"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.material.like"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- constant 天线介电常数 -->

      <!-- <el-collapse-item title="天线介电常数" name="3">
        <template slot="title">
          天线介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.constant.gte || form.constant.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.constant.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.constant.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- type 天线类型 -->

      <el-collapse-item title="天线类型" name="4">
        <template slot="title">
          天线类型
          <i class="header-icon el-icon-info marginL" v-if="form.type"></i>
        </template>
        <div class="flex">
          <!-- <el-input v-model="form.type" controls-position="right"></el-input> -->
          <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in options.antnnaTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
        </div>
      </el-collapse-item>

      <!-- longAxis  天线长轴-->

      <!-- <el-collapse-item title="天线长轴" name="5">
        <template slot="title">
          天线长轴
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.longAxis.gte || form.longAxis.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.longAxis.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.longAxis.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- minorAxis 天线短轴 -->

      <!-- <el-collapse-item title="天线短轴" name="6">
        <template slot="title">
          天线短轴
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.minorAxis.gte || form.minorAxis.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.minorAxis.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.minorAxis.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!--  height 天线高度 -->

      <!-- <el-collapse-item title="天线高度" name="7">
        <template slot="title">
          天线高度
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
      </el-collapse-item> -->

      <!-- baseMaterial 基底材料  -->

      <!-- <el-collapse-item name="8">
        <template slot="title">
          基底材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseMaterial.eq || form.baseMaterial.like"
          ></i>
        </template>
        <el-form-item label="全等" class="marginT">
          <el-input
            v-model="form.baseMaterial.eq"
            controls-position="right"
          ></el-input>
        </el-form-item>
        <el-form-item label="匹配" class="marginT">
          <el-input
            v-model="form.baseMaterial.like"
            controls-position="right"
          ></el-input>
        </el-form-item>
      </el-collapse-item> -->

      <!-- baseConstant 基底介电常数 -->

      <!-- <el-collapse-item name="9">
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

      <!-- baseType 基底类型 -->

      <el-collapse-item title="基底类型" name="10">
        <template slot="title">
          基底类型
          <i class="header-icon el-icon-info marginL" v-if="form.baseType"></i>
        </template>
        <div class="flex">
          <!-- <el-input
            v-model="form.baseType"
            controls-position="right"
          ></el-input> -->
          <el-select v-model="form.baseType" placeholder="请选择">
                <el-option
                  v-for="item in options.bottomTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
        </div>
      </el-collapse-item>

      <!-- baseThickness 基底厚度 -->

      <!-- <el-collapse-item title="基底厚度" name="11">
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

      <!-- baseSide 基底边长 -->

      <!-- <el-collapse-item title="基底边长" name="12">
        <template slot="title">
          基底边长
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.baseSide.gte || form.baseSide.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.baseSide.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.baseSide.lte"
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
 * 红外宽带相位调控搜索组件
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
        eff: { gte: "", lte: "" },
        longAxis: { gte: "", lte: "" }, //天线长轴
        minorAxis: { gte: "", lte: "" }, //天线短轴
        baseConstant: { gte: "", lte: "" }, //基底介电常数
        baseMaterial: { eq: "", like: "" }, //基底材料
        baseThickness: { gte: "", lte: "" }, //基底厚度
        baseSide: { gte: "", lte: "" }, //基底边长
        constant: { gte: "", lte: "" }, //天线介电常数
        height: { gte: "", lte: "" }, //天线高度
        lightAngle: { gte: "", lte: "" }, //入射角
        material: { like: "" }, //天线材料
        type: "",
        baseType: "", //基底类型
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
      this.form.eff = { gte: "", lte: "" };
      this.form.baseConstant = { gte: "", lte: "" };
      this.form.baseMaterial = { eq: "", like: "" };
      this.form.baseThickness = { gte: "", lte: "" };
      this.form.baseSide = { gte: "", lte: "" };
      this.form.constant = { gte: "", lte: "" };
      this.form.height = { gte: "", lte: "" };
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.material = { like: "" };
      this.form.type = "";
      this.form.baseType = "";
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
