<template>
  <el-row>
    <el-col>
      <el-card>
        <absorbing-materials-search-form></absorbing-materials-search-form>
      </el-card>
    </el-col>
    <el-col style="padding-top: 20px">
      <el-card>
        <div slot="header" class="clearfix">
          <span>吸波材料</span>
        </div>
        <el-row>
          <el-col>
            <el-table :data="tableData" stripe>
              <el-table-column
                label="序号"
                type="index"
                :width="width"
              ></el-table-column>
              <el-table-column
                prop="n"
                label="吸收频带数"
                :width="width"
              ></el-table-column>
              <el-table-column label="吸收频带">
                <el-table-column label="1">
                  <el-table-column
                    label="起始频率"
                    prop="fmin1"
                    :width="width"
                  ></el-table-column>
                  <el-table-column
                    label="最大频率"
                    prop="fmax1"
                    :width="width"
                  ></el-table-column>
                  <el-table-column
                    label="中心频率"
                    prop="fc1"
                    :width="width"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="2">
                  <el-table-column
                    label="起始频率"
                    prop="fmin2"
                    :width="width"
                  ></el-table-column>
                  <el-table-column
                    label="最大频率"
                    prop="fmax2"
                    :width="width"
                  ></el-table-column>
                  <el-table-column
                    label="中心频率"
                    prop="fc2"
                    :width="width"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="3">
                  <el-table-column
                    label="起始频率"
                    prop="fmin2"
                    :width="width"
                  ></el-table-column>
                  <el-table-column
                    label="最大频率"
                    prop="fmax2"
                    :width="width"
                  ></el-table-column>
                  <el-table-column
                    label="中心频率"
                    prop="fc2"
                    :width="width"
                  ></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="吸收率阈值"
                prop="db"
                :width="width"
              ></el-table-column>
              <el-table-column
                label="频率带宽"
                prop="fDelta"
                :width="width"
              ></el-table-column>
              <el-table-column
                label="波长带宽"
                prop="lambdaDelta"
                :width="width"
              ></el-table-column>
              <el-table-column
                label="厚度"
                prop="d"
                :width="width"
              ></el-table-column>
              <el-table-column
                label="Rozanov参数"
                prop="rozanov"
                :width="width"
              ></el-table-column>
              <el-table-column
                label="入射角度"
                prop="angle"
                :width="width"
              ></el-table-column>
              <el-table-column
                label="偏振"
                prop="polarization"
                :width="width"
              ></el-table-column>
              <el-table-column label="相关论文">
                <template slot-scope="scope">
                  <el-link :href="scope.row.article" type="success"
                    >相关论文</el-link
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="padding-top: 20px">
          <el-col :span="12">
            <el-button
              type="primary"
              @click="handleDownlodCurrentPageButtonClick"
              >导出本页</el-button
            >
            <el-button type="primary" @click="handleDownlodAllButtonClick"
              >导出全部</el-button
            >
          </el-col>
          <el-col :span="12">
            <page-input :total="total"></page-input>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PhotonViewMixin from "../PhotonViewMixin.js";
import AbsorbingMaterialsSearchForm from "../../components/form/AbsorbingMaterialsSearchForm.vue";
import PageInput from "../../../components/form/input/PageInput.vue";

export default {
  name: "AbsorbingMaterialsListView",
  mixins: [PhotonViewMixin],
  components: {
    AbsorbingMaterialsSearchForm,
    PageInput,
  },
  data() {
    return {
      width: 64,
      tableData: [],
      searchForm: {
        pageNum: 1,
        pageSize: 30,
        polarization: 1,
        angle: [1, 180],
        bandwidth: [1, 200],
      },
      total: 100,
    };
  },
  mounted: function () {
    this.patchTableData();
  },
  methods: {
    patchTableData() {
      const params = this.buildSearchForm();
      this.$postserver.getData(
        "/photon/getList",
        params,
        function (response) {
          this.tableData = response.data.rows;
          this.total = response.data.total;
        }.bind(this)
      );
    },
    buildSearchForm() {
      const params = {
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize,
      };
      return params;
    },

    /**
     * 导出全部按钮
     * */

    handleDownlodAllButtonClick() {
      const params = {};
      this.$postserver.postJsonGetFile("/photon/export", params);
    },

    /**
     * 导出本页
     * */

    handleDownlodCurrentPageButtonClick() {
      const params = this.buildSearchForm();
      this.$postserver.postJsonGetFile("/photon/export", params);
    },
  },
};
</script>