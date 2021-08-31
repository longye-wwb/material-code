<template>
  <el-form label-width="90px">
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

      <el-collapse-item title="入射角" name="3">
        <template slot="title">
          入射角
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.lightAngle.gte || form.lightAngle.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.lightAngle.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.lightAngle.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- g0 基底缝宽 -->

      <!-- <el-collapse-item title="基底缝宽" name="1">
        <template slot="title">
          基底缝宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.g0.gte || form.g0.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.g0.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.g0.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->

      <!-- tBandwidth 透射相对带宽 -->

      <el-collapse-item title="透射相对带宽" name="13">
        <template slot="title">
          透射相对带宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.tBandwidth.gte || form.tBandwidth.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.tBandwidth.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.tBandwidth.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item>

      <!-- aBandwidth 吸收相对带宽 -->

      <el-collapse-item title="吸收相对带宽" name="14">
        <template slot="title">
          吸收相对带宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.aBandwidth.gte || form.aBandwidth.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.aBandwidth.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.aBandwidth.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- l0 金属条长度 -->

      <!-- <el-collapse-item title="金属条长度" name="2">
        <template slot="title">
          金属条长度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.l0.gte || form.l0.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.l0.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.l0.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- p 方形环周期 -->

      <!-- <el-collapse-item title="方形环周期" name="5">
        <template slot="title">
          方形环周期
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.p.gte || form.p.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.p.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.p.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->

      <!-- h1 二层与一层间隔  -->

      <!-- <el-collapse-item title="二层与一层间隔" name="4">
        <template slot="title">
          二层与一层间隔
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.h1.gte || form.h1.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.h1.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.h1.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->

      <!-- h2 二层与三层间隔 -->

      <!-- <el-collapse-item title="二层与三层间隔" name="6">
        <template slot="title">
          二层与三层间隔
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.h2.gte || form.h2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.h2.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.h2.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->

      <!-- h3 三层与基底层间隔 -->

      <!-- <el-collapse-item title="三层与基底层间隔" name="7">
        <template slot="title">
          三层与基底层间隔
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.h3.gte || form.h3.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.h3.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.h3.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->

      <!-- r1 方形环材料一层方阻 -->

      <!-- <el-collapse-item title="方形环材料一层方阻" name="8">
        <template slot="title">
          方形环材料一层方阻
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.r1.gte || form.r1.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.r1.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.r1.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->

      <!-- r2 方形环材料二层方阻 -->

      <!-- <el-collapse-item title="方形环材料二层方阻" name="9">
        <template slot="title">
          方形环材料二层方阻
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.r2.gte || form.r2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.r2.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.r2.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->
      <!-- r3 方形环材料三层方阻 -->

      <!-- <el-collapse-item title="方形环材料三层方阻" name="10">
        <template slot="title">
          方形环材料三层方阻
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.r3.gte || form.r3.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.r3.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.r3.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->
      <!-- s1 方形环宽度一层 -->

      <!-- <el-collapse-item title="方形环宽度一层" name="11">
        <template slot="title">
          方形环宽度一层
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.s1.gte || form.s1.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.s1.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.s1.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->
      <!-- s2 方形环宽度二层 -->

      <!-- <el-collapse-item title="方形环宽度二层" name="12">
        <template slot="title">
          方形环宽度二层
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.s2.gte || form.s2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.s2.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.s2.lte" controls-position="right"> </el-input>
        </div>
      </el-collapse-item> -->
      <!-- s3 方形环宽度三层 -->

      <!-- <el-collapse-item title="方形环宽度三层" name="13">
        <template slot="title">
          方形环宽度三层
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.s3.gte || form.s3.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.s3.gte" controls-position="right"> </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.s3.lte" controls-position="right"> </el-input>
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
 * 微波窄带透波及宽带吸波搜索组件
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
        g0: { gte: "", lte: "" }, //基底缝宽
        tBandwidth: { gte: "", lte: "" },
        aBandwidth: { gte: "", lte: "" },
        lightType: "", //光源偏振态搜索
        l0: { gte: "", lte: "" }, //金属条长度
        lightAngle: { gte: "", lte: "" }, //入射角
        h1: { gte: "", lte: "" }, //二层与一层间隔
        p: { gte: "", lte: "" }, //方形环周期
        h2: { gte: "", lte: "" }, //二层与三层间隔
        h3: { gte: "", lte: "" }, //三层与基底层间隔
        r1: { gte: "", lte: "" }, //方形环材料一层方阻
        r2: { gte: "", lte: "" }, //方形环材料二层方阻
        r3: { gte: "", lte: "" }, //方形环材料三层方阻
        s1: { gte: "", lte: "" }, //方形环宽度一层
        s2: { gte: "", lte: "" }, //方形环宽度二层
        s3: { gte: "", lte: "" }, //方形环宽度三层
        dataFrom: "", //数据来源
        workingMode: "", //工作方式
      },
    };
  },
  methods: {
    /**
     * 点击搜索
     */

    handleSearchClick() {
      console.log("这个搜索表单为啥不传值",this.form)
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
      this.form.g0 = { gte: "", lte: "" };
      this.form.l0 = { gte: "", lte: "" };
      this.form.tBandwidth = { gte: "", lte: "" };
      this.form.aBandwidth = { gte: "", lte: "" };
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.h1 = { gte: "", lte: "" };
      this.form.p = { gte: "", lte: "" };
      this.form.h2 = { gte: "", lte: "" };
      this.form.h3 = { gte: "", lte: "" };
      this.form.r1 = { gte: "", lte: "" };
      this.form.r2 = { gte: "", lte: "" };
      this.form.r3 = { gte: "", lte: "" };
      this.form.s1 = { gte: "", lte: "" };
      this.form.s2 = { gte: "", lte: "" };
      this.form.s3 = { gte: "", lte: "" };
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
</style>