<template>
  <div>
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo menuStyle"
        style="text-align: left"
        router
        unique-opened
      >
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>资料库</span>
          </template>
          <el-menu-item-group>
            <!-- <el-menu-item index="/photonm/absorbing">微波吸收材料</el-menu-item> -->
            <!-- <el-menu-item index="/photonm/antenna_imp">纳米天线</el-menu-item> -->
            <!-- <el-menu-item index="/photonm/ImportRadiantCooling">
              辐射制冷
            </el-menu-item> -->
            <!-- <el-menu-item index="/photonm/InfraredCompatible">
              红外兼容
            </el-menu-item> -->
            <!-- <el-submenu index="1-4">
              <template slot="title">红外兼容</template>
              <el-menu-item index="/photonm/InfraredCompatible_transmission">
                透射层
              </el-menu-item>
              <el-menu-item index="/photonm/InfraredCompatible">
                吸收层
              </el-menu-item>
            </el-submenu> -->
            <!-- <el-submenu index="1-5">
              <template slot="title">微波窄带透波及宽带吸波</template>
              <el-menu-item index="/photonm/X"> 窄带 </el-menu-item>
              <el-menu-item index="/photonm/X"> 宽带 </el-menu-item>
            </el-submenu> -->
            <el-menu-item index="/photonm/Integration">
              微波窄带透波及宽带吸波
            </el-menu-item>
            <el-menu-item index="/photonm/PolarizationConversion">
              微波宽带位相调控
            </el-menu-item>
            <el-menu-item index="/photonm/UltraWideband">
              微波宽带偏振转换
            </el-menu-item>
            <el-menu-item index="/photonm/InfraredAndMicrowaveIntegration">
              <!-- 红外微波一体化 -->
              红外宽带高反及微波宽带高透
            </el-menu-item>
            <el-menu-item index="/photonm/InfraredPolarizationConversion">
              红外宽带偏振转换
            </el-menu-item>
            <el-menu-item index="/photonm/InfraredPhaseControl">
              红外宽带位相调控
            </el-menu-item>
            <el-menu-item index="/photonm/InfraredSensor">
              红外窄带传感
            </el-menu-item>
            <el-menu-item index="/photonm/VisibleLightPhaseControl">
              可见光宽带位相调控
            </el-menu-item>
            <el-menu-item index="/photonm/MicrowaveAbsorber">
              微波宽带吸收
            </el-menu-item>
            <el-menu-item index="/photonm/MicrowaveTransmission">
              微波窄带吸收
            </el-menu-item>
            <el-menu-item index="/photonm/diffraction"> 衍射组件 </el-menu-item>
            <el-menu-item index="/photonm/Topology">
              拓扑优化超透镜
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/photonm/users">用户管理</el-menu-item>
            <el-menu-item index="/photonm/csvConversion">CSV转换</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "PhotonManagerMenu",
  data() {
    return {
      org: sessionStorage.getItem("selectedOrg"),
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
  },
};
</script>
<style lang="scss">
.menuStyle {
  height: 880px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
