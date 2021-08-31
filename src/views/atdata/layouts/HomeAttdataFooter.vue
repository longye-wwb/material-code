<template>
  <div>
    <el-row>
      <el-col>{{ content }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DefaultFooter",
  data() {
    return {
      content: "All Right © 创享源信息技术有限公司",
    };
  },
};
</script>