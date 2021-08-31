<template>
  <el-form label-width="80px">
    <el-form-item label="介电常数" class="marginT">
      <el-input-number
        v-model="form.staticl"
        :precision="2"
        :step="0.1"
        :max="10"
        label="nm"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="configview.radius" label="半径(nm)" class="marginT">
      <el-input-number
        v-model="form.r[0]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
      <el-input-number
        class="marginT"
        v-model="form.r[1]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="configview.height" label="高度(nm)" class="marginT">
      <el-input-number
        v-model="form.h[0]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
      <el-input-number
        v-model="form.h[1]"
        class="marginT"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="configview.major" label="长轴(nm)">
      <el-input-number
        v-model="form.lx[0]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
      <el-input-number
        v-model="form.lx[1]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="configview.minor" label="短轴(nm)">
      <el-input-number
        v-model="form.ly[0]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
      <el-input-number
        v-model="form.ly[1]"
        :step="1"
        :min="1"
        :max="3000"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="configview.rotation" label="面内旋转角(°)">
      <el-input-number
        v-model="form.angle[0]"
        :precision="2"
        :step="1"
        :min="0"
        :max="180"
      ></el-input-number>
      <el-input-number
        v-model="form.angle[1]"
        :precision="2"
        :step="1"
        :min="0"
        :max="180"
      ></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "NanoAntennaMaterialsForm",
  data() {
    return {
      form: {
        staticl: null,
        r: [],
        h: [],
        lx: [],
        ly: [],
        angle: [],
      },
      showConfig: false,
      configview: {
        radius: false,
        height: false,
        major: false,
        minor: false,
        angle: false,
        rotation: false,
      },
    };
  },
  mounted: function () {
    if (this.preForm.type == 1) {
      this.configview.radius = true;
      this.configview.height = true;
    } else if (this.preForm.type == 2) {
      this.configview.major = true;
      this.configview.minor = true;
      this.configview.angle = true;
      this.configview.rotation = true;
    }
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
    emptyForm() {
      this.form.staticl = null;
      this.form.r = [];
      this.form.h = [];
      this.form.lx = [];
      this.form.ly = [];
      this.form.angle = [];
    },
  },
};
</script>