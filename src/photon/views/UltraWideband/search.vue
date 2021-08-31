<template>
  <el-form label-width="90px">
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

    <el-form-item label="光源偏振态" class="marginT">
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
      <!-- lightAngle 入射角 -->

      <el-collapse-item title="入射角" name="4">
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

      <!-- bandwidth 相对带宽 -->

      <el-collapse-item name="9">
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

      <!-- armr 工字型臂宽度角度 -->

      <!-- <el-collapse-item name="1">
        <template slot="title">
          工字型臂宽度角度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.armr.gte || form.armr.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.armr.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.armr.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- army 工字型臂线宽 -->

      <!-- <el-collapse-item title="工字型臂线宽" name="2">
        <template slot="title">
          工字型臂线宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.army.gte || form.army.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.army.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.army.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- laylerx 反射板距离系数 -->

      <!-- <el-collapse-item title="反射板距离系数" name="3">
        <template slot="title">
          反射板距离系数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.laylerx.gte || form.laylerx.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.laylerx.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.laylerx.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- period 周期系数 -->

      <!-- <el-collapse-item title="周期系数" name="5">
        <template slot="title">
          周期系数
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

      <!-- permittivity 基板介电常数 -->

      <!-- <el-collapse-item title="基板介电常数" name="6">
        <template slot="title">
          基板介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.permittivity.gte || form.permittivity.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.permittivity.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.permittivity.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- rectx 工字型矩形线宽(两侧) -->

      <!-- <el-collapse-item title="工字型矩形线宽(两侧)" name="8">
        <template slot="title">
          工字型矩形线宽(两侧)
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.rectx.gte || form.rectx.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.rectx.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.rectx.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- rectx2 工字型矩形线宽(中间) -->

      <!-- <el-collapse-item title="工字型矩形线宽(中间)" name="8">
        <template slot="title">
          工字型矩形线宽(中间)
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.rectx2.gte || form.rectx2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.rectx2.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.rectx2.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- recty 工字型矩形长度 -->

      <!-- <el-collapse-item title="工字型矩形长度" name="7">
        <template slot="title">
          工字型矩形长度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.recty.gte || form.recty.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.recty.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.recty.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item> -->

      <!-- subh 	基板厚度 -->

      <!-- <el-collapse-item title="基板厚度" name="8">
        <template slot="title">
          基板厚度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.subh.gte || form.subh.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.subh.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.subh.lte"
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
 * 微波宽带相位调控搜索组件
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
        bandwidth: { gte: "", lte: "" },
        armr: { gte: "", lte: "" }, //工字型臂宽度角度
        army: { gte: "", lte: "" }, //工字型臂线宽
        laylerx: { gte: "", lte: "" }, //反射板距离系数
        lightAngle: { gte: "", lte: "" }, //入射角
        period: { gte: "", lte: "" }, //周期系数
        permittivity: { gte: "", lte: "" }, //基板介电常数
        recty: { gte: "", lte: "" }, //工字型矩形长度(mm)
        subh: { gte: "", lte: "" }, //基板厚度
        rectx2: { gte: "", lte: "" }, //工字型矩形线宽(两侧)
        rectx: { gte: "", lte: "" }, //工字型矩形线宽(中间)
        dataFrom: "", //数据来源
        workingMode: "", //工作方式
        lightType: "", //光源偏振态搜索
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
      this.form.bandwidth = { gte: "", lte: "" };
      this.form.armr = { gte: "", lte: "" };
      this.form.army = { gte: "", lte: "" };
      this.form.laylerx = { gte: "", lte: "" };
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.period = { gte: "", lte: "" };
      this.form.permittivity = { gte: "", lte: "" };
      this.form.recty = { gte: "", lte: "" };
      this.form.subh = { gte: "", lte: "" };
      this.form.rectx2 = { gte: "", lte: "" };
      this.form.rectx = { gte: "", lte: "" };
      (this.form.workingMode = ""), (this.form.dataFrom = "");
      this.form.lightType = "";
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