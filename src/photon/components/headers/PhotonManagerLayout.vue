<template>
  <div style="text-align: left; padding: 20px">
    <!-- <el-row>
      <el-col>
        <page-breadcrumb
          v-if="local.length > 0"
          :pathArr="local"
        ></page-breadcrumb>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PageBreadcrumb from "../../../components/navigation/PageBreadcrumb.vue";
export default {
  name: "PhotonManagerLayout",
  components: {
    PageBreadcrumb,
  },
  data() {
    return {
      local: [{ name: "首页", url: "/crledu/home" }],
    };
  },
  mounted: function () {
    // console.log("嵌套顶点获取路径", this.$route.path);
  },
  provide() {
    return { usePagelocal: this.refrashLocal };
  },
  methods: {
    refrashLocal(route) {
      // console.log("内容顶部组件刷新面包屑",route.meta.local);
      this.local = route.meta.local;
    },
  },
};
</script>