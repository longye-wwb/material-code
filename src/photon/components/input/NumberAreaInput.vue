<template>
  <div>
    <el-input-number
      v-model="model[0]"
      :min="min"
      :max="max"
      :precision="precision"
    ></el-input-number>
    <el-input-number
      v-model="model[1]"
      :min="min"
      :max="max"
      :precision="precision"
      class="marginT"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  name: "NumberAreaInput",
  props: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
    },
    precision: {
      type: Number,
    },
    value: {
      type: Array,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      model: this.value && this.value.length == 2 ? this.value : [0, 0],
    };
  },
};
</script>