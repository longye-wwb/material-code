<template>
  <div style="text-align: right">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageNum"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="form.pageSize"
      :pager-count="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "PageInput",
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
      },
      pageSizes: [10, 20, 30, 100],
    };
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleSizeChange(size) {
      this.form.pageSize = size;
      this.$emit("refresh", this.form);
    },
    handleCurrentChange(current) {
      this.form.pageNum = current;
      this.$emit("refresh", this.form);
    },
    clearPage() {
      this.form.pageNum = 1;
      this.form.pageSize = 10;
    },
  },
};
</script>