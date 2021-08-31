<template>
  <div>
    <el-row class="footer">
      <el-col class="footer_text">{{ content }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PhotonManagerFooter",
  data() {
    return {
      content: "All Right © 中国科学院光电技术研究所",
    };
  },
};
</script>
<style lang="scss">
.footer {
  width: 100%;
  background-color: #409eff;
  height: 30px;
  display: flex;
  justify-items: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: 100;
  .footer_text {
    color: #fff;
    font-size: 12px;
  }
}
</style>