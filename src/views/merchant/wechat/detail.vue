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
            <P>商户微信配置详情</P>
            <Form label-position="right" :label-width="200">
                <FormItem label="商户名称" class="minWidth">
                    <Input v-model="form.fullName" class="inputWidth" readonly></Input>      
                </FormItem>
                 <FormItem label="商户简称" class="minWidth">
                    <Input v-model="form.name" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="商户编号"  class="minWidth">
                    <Input v-model="form.code" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="主商户编号" class="minWidth">
                    <Input v-model="form.merchantNo" class="inputWidth" readonly></Input>
                </FormItem> 
                <FormItem label="子商户编号" class="minWidth">
                    <Input v-model="form.subMerchantNo" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="推荐公众号" class="minWidth">
                    <Input v-model="form.subscribeAppId" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="特约商户APP ID" class="minWidth">
                    <Input v-model="form.appId" class="inputWidth" readonly></Input>      
                </FormItem>
                <FormItem label="JSAPI支付授权目录 "  class="minWidth">
                    <Input v-model="form.domainName" class="inputWidth" readonly></Input>
                </FormItem>
                <FormItem label="更新时间" class="minWidth">
                    <Input v-model="form.updateTime" class="inputWidth" readonly></Input>
                </FormItem>
               <FormItem label="商户经营类别" class="minWidth">
                    <Input v-model="form.businessTypeId" class="inputWidth" readonly></Input>
                </FormItem>  
                 
            </Form>
        </Card>
    </div>
</template>

<script>
import { getMerchantInstitutionConfigDetail } from "@/actions/merchant";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "transaction-order-detail",
    data() {
        return {
            form: {}
        };
    },
    activated() {
        getMerchantInstitutionConfigDetail(this.$route.query.id).then(
            res => {
                this.form = res.data;
            },
            () => {
                closeCurrentErrPage(this, "merchant-wechat");
            }
        );
    }
};
</script>

