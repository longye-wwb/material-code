const viewMixin = {
    inject: ["reload", "usePagelocal"],
    data() {
      return {
        searchForm: {},
      }
    },
    mounted: function () {
      this.usePagelocal(this.$route);
    },
    methods: {
      emptySearchForm() {
        for (var key in this.searchForm) {
          if(key === "pagNum"){
            this.searchForm[key] = 1;
          }else if(key === "pagSize"){
            this.searchForm[key] = 10;
          }else{
            this.searchForm[key] = '';
          }
        }
      },
      formaterDate(row, column, cellVal, index) {
        console.log("j接收到参数：", cellVal, row, column, index);
        let value = new Date(cellVal);
        return this.$dateFormater.dateFtt("yyyy年MM月dd日", value);
      },
      formatStatus(row, column, cellValue, index){
        console.log("修改状态的参数：",row,column,cellValue,index);
        const status = this.buildStatusArray();
        if(status){
          for(var index1 in status){
            if(typeof(cellValue)=='number' && cellValue === status[index1].id){
              return status[index1].name;
            }else if(typeof(cellValue)=='string' && cellValue === status[index1].code){
              return status[index1].name;
            }
          }
        }
        return "未知";
      },
    }
  
  }
  
  export default viewMixin;