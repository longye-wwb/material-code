<!--
 * @Descripttion: 
 * @version: v1.0.1
 * @Author: payne (wenyi)
 * @Date: 2020-11-19 16:39:41
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-23 14:23:25
-->
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/photon">首页</el-menu-item>

    <el-submenu index="2">
      <template slot="title">材料视图</template>
      <!-- <el-menu-item index="/photon/absorbing">吸波材料</el-menu-item> -->
      <!-- <el-menu-item index="/photon/antenna_imp">纳米天线</el-menu-item> -->
      <!-- <el-menu-item index="/photon/ImportRadiantCooling">辐射制冷</el-menu-item> -->
      <!-- <el-menu-item index="/photon/InfraredCompatible">红外兼容</el-menu-item> -->
      <el-menu-item index="/photon/PolarizationConversion">
        微波宽带相位调控
      </el-menu-item>
      <el-menu-item index="/photon/UltraWideband">
        微波宽带偏振转换
      </el-menu-item>
      <el-menu-item index="/photon/InfraredAndMicrowaveIntegration">
        红外宽带高反及微波宽带高透
      </el-menu-item>
      <el-menu-item index="/photon/InfraredPolarizationConversion">
        红外偏振转换
      </el-menu-item>
      <el-menu-item index="/photon/InfraredPhaseControl">
        红外相位调控
      </el-menu-item>
      <el-menu-item index="/photon/InfraredSensor">红外传感</el-menu-item>
      <el-menu-item index="/photon/VisibleLightPhaseControl"
        >可见光相位调控</el-menu-item
      >
      <el-menu-item index="/photon/MicrowaveAbsorber"
        >微波宽带吸波</el-menu-item
      >
      <el-menu-item index="/photon/MicrowaveTransmission"
        >微波窄带吸收</el-menu-item
      >
      <el-menu-item index="/photon/diffraction"> 衍射组件 </el-menu-item>
      <el-menu-item index="/photon/Topology"> 拓扑优化超透镜 </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="3">
      <template slot="title">曲线视图</template> -->
    <!-- <el-menu-item index="/photon/absorbing">吸波材料</el-menu-item> -->
    <!-- <el-menu-item index="/photon/antenna_imp">纳米天线</el-menu-item> -->
    <!-- <el-menu-item index="/photon/ImportRadiantCooling">辐射制冷</el-menu-item>
      <el-menu-item index="/photon/InfraredCompatible">红外兼容</el-menu-item>
      <el-menu-item index="/photon/PolarizationConversion"
        >微波宽带偏振转换</el-menu-item
      >
      <el-menu-item index="/photon/UltraWideband"
        >微波宽带相位调控</el-menu-item
      >
      <el-menu-item index="/photon/InfraredAndMicrowaveIntegration"
        >红外微波一体化</el-menu-item
      >
      <el-menu-item index="/photon/InfraredPolarizationConversion"
        >红外偏振转换</el-menu-item
      >
      <el-menu-item index="/photon/InfraredPhaseControl"
        >红外相位调控</el-menu-item
      >
      <el-menu-item index="/photon/InfraredSensor">红外传感</el-menu-item> -->
    <!-- </el-submenu> -->
    <el-menu-item index="/photon/database">数据仓库</el-menu-item>
    <el-menu-item index="/photon/AboutUS">关于我们</el-menu-item>
    <!-- <el-menu-item index="3">实验数据</el-menu-item>
    <el-menu-item index="4">关于我们</el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: "PhotonHomeMenu",
  data() {
    return { activeIndex: "/photon" };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>
