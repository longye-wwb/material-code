<template>
  <div class="breadcrumb_style">
    <el-row style="height: 64px; margin-left: 20px">
      <el-col :span="22">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            style="line-height: 64px"
            v-for="path in pathArr"
            :key="path.name"
            :to="{ path: path.url }"
            >{{ path.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col style="line-height: 64px" :span="2">
        <i class="el-icon-document"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PageBreadcrumb",
  data() {
    return { dialogVisible: false };
  },
  props: {
    pathArr: {
      type: Array,
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.breadcrumb_style {
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(214, 214, 214);
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.iframe_style {
  width: 100%;
  height: 790px;
}
</style>