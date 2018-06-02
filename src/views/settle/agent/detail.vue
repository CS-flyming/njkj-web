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
            <P>渠道结算单明细</P>
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
                <FormItem label="所属渠道编号" class="minWidth">
                    <Input v-model="form.agentCode" class="inputWidth" readonly></Input>
                </FormItem> 
                <FormItem label="所属渠道名称" class="minWidth">
                    <Input v-model="form.agentName" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="支付类型" class="minWidth">
                    <Input v-model="form.payType" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="商户费率" class="minWidth">
                    <Input v-model="form.merchantRate"class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="交易金额"  class="minWidth">
                    <Input v-model="form.chargeAmount" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="退款订单号" class="minWidth">
                    <Input v-model="form.refId" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="渠道商费率" class="minWidth">
                    <Input v-model="form.agentRate" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="分润金额" class="minWidth">
                    <Input v-model="form.profitAmount"class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="退款金额"  class="minWidth">
                    <Input v-model="form.refundAmount" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="退还手续费" class="minWidth">
                    <Input v-model="form.rfPoundageAmount" class="inputWidth" readonly></Input>      
                </FormItem>
                <!--  -->
                <FormItem label="补贴费率(万分之)" class="minWidth">
                    <Input v-model="form.subsidyRate" class="inputWidth" readonly></Input>      
                </FormItem>
                <!--  -->
                <FormItem label="退还补贴费" class="minWidth">
                    <Input v-model="form.subsidyAmount" class="inputWidth" readonly></Input>
                </FormItem>
               <FormItem label="渠道商结算金额" class="minWidth">
                    <Input v-model="form.agentSettleAmount" class="inputWidth" readonly></Input>
                </FormItem>  
                <FormItem label="结算状态" class="minWidth">
                    <Input v-model="form.settleStateDesc" class="inputWidth" readonly></Input>
                </FormItem> 
                <FormItem label="协议付款日期" class="minWidth">
                    <Input v-model="form.createTime" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="结算账户名" class="minWidth">
                    <Input v-model="form.settleName" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="结算账号" class="minWidth">
                    <Input v-model="form.bankCardNumber"class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="结算开户行"  class="minWidth">
                    <Input v-model="form.bankName" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="结算开户行联行行号" class="minWidth">
                    <Input v-model="form.unionNo" class="inputWidth" readonly></Input>      
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import { getSettleCheckingAgentDetail } from "@/actions/settle";
export default {
    name: "settle-agent-detail",
    data() {
        return {
            form: {}
        };
    },
    activated() {
        getSettleCheckingAgentDetail(this.$route.query.id).then(res => {
            this.form = res.data;
        });
    }
};
</script>

