<template>
  <el-form label-width="80px">
    <el-form-item label="介电常数" class="marginT">
      <el-input-number
        v-model="form.staticl"
        :precision="2"
        :step="0.1"
        :max="10"
        @change="handleStaticlClick"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="showConfig" label="厚度(nm)" class="marginT">
      <el-input-number
        v-model="form.h"
        :step="1"
        :min="1"
        :max="3000"
        @change="handleStaticlClick"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="showConfig" label="边长(nm)" class="marginT">
      <el-input-number
        v-model="form.p"
        :step="1"
        :min="1"
        :max="3000"
        @change="handleStaticlClick"
      ></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "NatoNatennaMaterialsBottemForm",
  data() {
    return {
      form: {
        staticl: this.preForm.staticl,
        h: 0,
        p: 0,
      },
      showConfig: true,
    };
  },
  props: {
    preForm: {
      type: Object,
    },
  },
  model: {
    prop: "preForm",
    event: "change",
  },
  methods: {
    handleStaticlClick() {
      this.$emit("change", this.form);
    },
    emptyForm() {
      (this.form.staticl = 0), (this.h = 0);
      this.p = 0;
    },
  },
};
</script>