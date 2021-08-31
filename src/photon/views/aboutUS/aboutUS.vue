<template>
  <div>
    <!-- <breadcrumb :pathArr="local"></breadcrumb> -->
    <!-- <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">收录材料</div>
          <div class="home_card_msg">
            581<span class="home_card_smmsg">种</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">收录模型程序</div>
          <div class="home_card_msg">
            647<span class="home_card_smmsg">个</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">收录模型数据</div>
          <div class="home_card_msg">
            3654<span class="home_card_smmsg">条</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">收录学术文章</div>
          <div class="home_card_msg">
            6726<span class="home_card_smmsg">条</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="home_echars">
      <el-col :span="6">
        <el-row :gutter="20" class="about-left_out">
          <el-col :span="24">
            <el-card class="about_left_small"
              ><MsgEcharts :config="lineConfig" :lines="lineData"></MsgEcharts
            ></el-card>
          </el-col>
          <el-col :span="24">
            <el-card class="about_left_small mar20"
              ><Search :config="lineConfig" :lines="lineData"></Search
            ></el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="18"
        ><el-card class="about_left"
          ><SysEcharts
            :config="lineConfig"
            :lines="lineData"
          ></SysEcharts></el-card
      ></el-col>
    </el-row> -->
    <el-row>
      <el-row>
        <h4 style="padding:0px 200px;width:100%;">
          系统简介
        </h4>
      </el-row>
      <el-col>
        <p style="padding:0px 200px;text-indent:2em;line-height:32px">《结构功能材料数据库》是用于指导先进结构功能材料的逆向设计和人工智能设计的在线数据存储库。用户可根据个人科研需求下载库内的功能材料数据，并可通过搜索功能精确获取特定指标的数据集。同时，库内提供了功能材料的电磁计算程序下载功能，用户可利用此程序扫描结构参数获取新的数据，以此满足不同的科研任务需求。数据库为用户开放了数据上传权限，希望以此方式吸纳广大科研工作者的智慧结晶，不断拓展数据库的参数空间。</p>
        <p style="padding:0px 200px;text-indent:2em;line-height:32px">目前，数据库内共包含：微波段宽带吸收、微波窄带吸收、微波窄带透波及宽带吸波一体化、红外宽带高反射及微波宽带高透射一体化、微波宽带偏振转换、红外宽带偏振转换、微波宽带位相调控、红外宽带位相调控、可见光宽带位相调控、红外窄带传感、光束分束功能材料在内共十一个模块，共110余万条数据。同时，仍有多种模块在研发中。相信未来《结构功能材料数据库》的数据容量和功能种类会不断更新与完善。</p>
        <p style="padding:0px 200px;text-indent:2em;line-height:32px">《结构功能材料数据库》由中国科学院光电技术研究所研发。蒲明博研究员作为主要负责人，助理研究员罗宇作为二级负责人，参与人还有：冯兴东、张雅鑫、汪江宇、马巨、游鹏等，对以上人员的工作致谢。同时，特别感谢创享源信息技术有限公司对数据库程序构建给予的关键技术支持。</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 关于我们页面
 * @author Chris
 * */

import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import SysEcharts from "./SystemflowEchaets";
import MsgEcharts from "./msgEcharts";
import Search from "./SearchEcharts";
export default {
  components: { breadcrumb, SysEcharts, MsgEcharts, Search },
  data() {
    return {
      lineData: [],
      lineConfig: { max: 200, min: 187, type: 1 },
      local: [
        {
          name: "首页",
          url: "/user/home",
        },
      ],
    };
  },
};
</script>

<style lang='scss' >
.mar20 {
  margin-top: 20px;
}
.home_card {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .home_card_title {
    font-size: 20px;
  }
  .home_card_msg {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 50px;
    font-weight: 600;
    margin-top: 30px;
    .home_card_smmsg {
      font-size: 12px;
      font-weight: 500;
      margin-left: 5px;
      margin-bottom: 10px;
    }
  }
}
.home_echars {
  margin-top: 20px;
  .about_left {
    height: 400px;
  }
  .about_left_small {
    height: 185px;
  }
}
</style>