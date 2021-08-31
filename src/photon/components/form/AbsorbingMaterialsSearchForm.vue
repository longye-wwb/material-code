<template>
  <el-form :inline="true">
    <el-form-item label="偏振">
      <el-select v-model="searchForm.polarization" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入射角（°）">
      <el-input-number
        v-model="searchForm.angle[0]"
        controls-position="right"
        :min="0"
        :max="180"
        :precision="2"
      ></el-input-number>
      <el-input-number
        class="marginL"
        v-model="searchForm.angle[1]"
        controls-position="right"
        :min="0"
        :max="180"
        :precision="2"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="波段（10^2nm)">
      <el-input-number
        v-model="searchForm.bandwidth[0]"
        controls-position="right"
        :min="3"
        :max="3000"
        :precision="2"
      ></el-input-number>
      <el-input-number
        class="marginL"
        v-model="searchForm.bandwidth[1]"
        controls-position="right"
        :min="3"
        :max="3000"
        :precision="2"
      ></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AbsorbingMaterialsSearchForm",
  data() {
    return {
      searchForm: {
        polarization: 1,
        angle: [1, 180],
        bandwidth: [1, 200],
      },
      options: [
        {
          value: 1,
          label: "TE",
        },
        {
          value: 2,
          label: "LCP",
        },
        {
          value: 3,
          label: "RCP",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.marginL {
  margin-left: 20px;
}
</style>