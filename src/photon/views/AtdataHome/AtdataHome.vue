<template>
  <div>
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">数据文件</div>
          <div class="home_card_msg">
            {{ bigdatasize
            }}<span class="home_card_smmsg">{{ bigdatasizetype }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">导入数据</div>
          <div class="home_card_msg">
            {{ historydata }}<span class="home_card_smmsg">条</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">数据模块</div>
          <div class="home_card_msg">
            11<span class="home_card_smmsg">个</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="home_card">
          <div class="home_card_title">累计访问</div>
          <div class="home_card_msg">
            {{ hotsdata }}<span class="home_card_smmsg">次</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="home_echars">
      <el-col :span="24">
        <el-card
          ><Echars
            :config="lineConfig"
            :lines="lineData"
            ref="childValueLineMap"
          ></Echars
        ></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
import Echars from "../aboutUS/DataTotalEcharts.vue";
export default {
  components: { breadcrumb, Echars },
  data() {
    return {
      lineData: [],
      lineConfig: { max: 200, min: 187, type: 1 },
      historydata: "",
      historytype: "",
      hotsdata: "",
      hotstype: "",
      bigdatasize: "",
      bigdatasizetype: "查询中...",
      local: [
        {
          name: "首页",
          url: "/user/home",
        },
      ],
    };
  },
  mounted() {
    this.gethistoryDataSize();
    this.gethotstotal();
    this.getbigdatasize();
  },
  methods: {
    /**
     * 数据文件
     * */
    getbigdatasize() {
      this.$postserver.getData(
        "/bigdata/size",
        {},
        function (response) {
          this.bigdatasize = response.data;
          let s = response.data;
          this.bigdatasize = s.replace(/[^\d.]/g, "");
          this.bigdatasizetype = s.replace(/[0-9.]/g, "");
        }.bind(this)
      );
    },

    /**
     * 访问次数
     * */
    gethotstotal() {
      this.$postserver.getData(
        "/hots/total",
        {},
        function (response) {
          this.hotsdata = response.data;
        }.bind(this)
      );
    },
    /**
     * 导入数据大小
     * */
    gethistoryDataSize() {
      this.$postserver.getData(
        "/history/data_total",
        {},
        function (response) {
          this.historydata = response.data;
          console.log(response);
        }.bind(this)
      );
    },
  },
};
</script>

<style lang='scss' >
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
}
</style>