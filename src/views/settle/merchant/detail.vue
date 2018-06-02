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
            <P>商户结算单明细</P>
            <Form label-position="right" :label-width="200">
                <FormItem label="商户订单号" class="minWidth">
                    <Input v-model="form.outTradeNo" class="inputWidth" readonly></Input>      
                </FormItem>
                <!--  -->
                <FormItem label="商户编号" class="minWidth">
                    <Input v-model="form.merchantCode" class="inputWidth" readonly></Input>
                </FormItem>
                <!--  -->
               <FormItem label="商户名称" class="minWidth">
                    <Input v-model="form.merchantName" class="inputWidth" readonly></Input>
                </FormItem>  
                <FormItem label="门店编号" class="minWidth">
                    <Input v-model="form.storeCode" class="inputWidth" readonly></Input>
                </FormItem> 
                <FormItem label="门店名称" class="minWidth">
                    <Input v-model="form.storeName" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="原交易订单号" class="minWidth">
                    <Input v-model="form.refId" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="入账账户名" class="minWidth">
                    <Input v-model="form.name"class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="开户行"  class="minWidth">
                    <Input v-model="form.bankName" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="开户账号" class="minWidth">
                    <Input v-model="form.bankId" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="联行行号" class="minWidth">
                    <Input v-model="form.uninoNo" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="支付类型" class="minWidth">
                    <Input v-model="form.payType" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="商户费率"  class="minWidth">
                    <Input v-model="form.merchantRate" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="交易金额" class="minWidth">
                    <Input v-model="form.chargeAmount" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="手续费金额" class="minWidth">
                    <Input v-model="form.rate" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="退款金额" class="minWidth">
                    <Input v-model="form.refundAmount" class="inputWidth" readonly></Input>
                </FormItem>
               <FormItem label="退还手续费" class="minWidth">
                    <Input v-model="form.poundageAmount" class="inputWidth" readonly></Input>
                </FormItem>  
                <FormItem label="结算状态"  class="minWidth">
                    <Input v-model="form.settleStateDesc" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="协议付款日期" class="minWidth">
                    <Input v-model="form.createTime" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="所属渠道名" class="minWidth">
                    <Input v-model="form.agentName" class="inputWidth" readonly></Input>      
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import { getSettleCheckingMerchantDetail } from "@/actions/settle";
export default {
    name: "settle-merchant-detail",
    data() {
        return {
            form: {}
        };
    },
    activated() {
        getSettleCheckingMerchantDetail(this.$route.query.id).then(res => {
            this.form = res.data;
        });
    }
};
</script>

