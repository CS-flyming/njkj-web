<style lang="less">
.minWidth {
  min-width: 43.3% !important;
}
.inputWidth {
  min-width: 13rem;
}
</style>
<template>
    <div>
        <Card class="filter-wrap">
            <P>对账批次明细查询</P>
          <!-- filterForm  引用ref重置 -->
            <Form label-position="right" :label-width="200">
                <FormItem label="对账批次号" class="minWidth">
                    <Input v-model="form.id" class="inputWidth" readonly></Input>      
                </FormItem>
                <!-- <FormItem label="支付通道"  class="minWidth"> -->
                    <!-- <Input v-model="form" class="inputWidth"></Input> -->
                <!-- </FormItem> -->
                <FormItem label="对账日期" class="minWidth">
                    <Input v-model="form.checkingDate" class="inputWidth" readonly></Input>
                </FormItem>
               <FormItem label="对账文件名称" class="minWidth">
                    <Input v-model="form.filename" class="inputWidth" readonly></Input>
                </FormItem>  
                <FormItem label="对账开始时间" class="minWidth">
                    <Input v-model="form.createTime" class="inputWidth" readonly></Input>
                </FormItem> 
                  <FormItem label="对账结束时间" class="minWidth">
                    <Input v-model="form.updateTime" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="对账文件总金额" class="minWidth">
                    <Input v-model="form.totalAmount" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="对账文件总笔数" class="minWidth">
                    <Input v-model="form.totalItems"class="inputWidth" readonly></Input>
                </FormItem>
                  <FormItem label="对平总笔数" class="minWidth">
                    <Input v-model="checkingCountList[0].itemCount" class="inputWidth" v-if="isCheckingCountList=='false'" readonly></Input>      
                    <Input class="inputWidth" readonly v-else></Input>                      
                </FormItem>
                <FormItem label="对平总金额" class="minWidth">
                    <Input v-model="checkingCountList[0].amount" class="inputWidth"  v-if="isCheckingCountList=='false'" readonly></Input>
                    <Input class="inputWidth" readonly v-else></Input>                                          
                </FormItem>
                <FormItem label="长款总笔数"  class="minWidth">
                    <Input v-model="checkingCountList[2].itemCount" class="inputWidth"  v-if="isCheckingCountList=='false'" readonly></Input>
                    <Input class="inputWidth" readonly v-else></Input>                                          
                </FormItem>
                  <FormItem label="长款总金额"  class="minWidth">
                    <Input v-model="checkingCountList[2].amount" class="inputWidth"  v-if="isCheckingCountList=='false'" readonly></Input>      
                    <Input class="inputWidth" readonly v-else></Input>                                    
                </FormItem>
                <FormItem label="短款总笔数"  class="minWidth">
                    <Input v-model="checkingCountList[1].itemCount" class="inputWidth"  v-if="isCheckingCountList=='false'" readonly></Input>
                    <Input class="inputWidth" readonly v-else></Input>                                          
                </FormItem>
                <FormItem label="短款总金额"  class="minWidth">
                    <Input v-model="checkingCountList[1].amount" class="inputWidth"  v-if="isCheckingCountList=='false'" readonly></Input>
                    <Input class="inputWidth" readonly v-else></Input>                                      
                </FormItem>  
                <!-- <FormItem label="对账文件商户总手续费" class="minWidth">
                    <Input v-model="form" class="inputWidth"></Input>      
                </FormItem> -->
                <FormItem label="对账结果"  class="minWidth">
                    <Input v-model="form.resultDesc" class="inputWidth" readonly></Input>
                </FormItem>
                <!-- <FormItem label="对账文件通道总手续费" class="minWidth">
                    <Input v-model="form"  class="inputWidth"></Input>
                </FormItem> -->
                  <FormItem label="文件获取状态" class="minWidth">
                    <Input v-model="form.stateDesc" class="inputWidth" readonly></Input>      
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
  name: "reconcile-batch-detail",
  data() {
    return {
      form: {},
      isCheckingCountList:true,
      checkingCountList: []
    };
  },
  mounted() {
    this.$http
      .post(`settle/checking/detail/${this.$route.query.id}`)
      .then(res => {
        this.form = res.data.data;
        if (this.form.checkingCountList.length=0) {
            this.isCheckingCountList =false;
        }else{
            this.isCheckingCountList =true;            
            this.checkingCountList = this.form.checkingCountList;
        }
        // console.log(this.checkingCountList[0].amount)
      });
  },
  components: {}
};
</script>

