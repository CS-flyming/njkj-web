
<template>
    <Card>
        <p slot="title">
            商户密钥详情
        </p>
        <Form 
            style="max-width: 800px;" 
            :model="form" 
            :label-width="120" 
            label-position="right">
            <FormItem label="商户名称">
                <Input v-model="form.name" readonly></Input>              
            </FormItem>
             <FormItem label="商户编号">
                <Input v-model="form.code" readonly></Input>
            </FormItem>
             <FormItem label="APP ID" >
                <Input v-model="form.id" readonly></Input>
            </FormItem>
            <FormItem label="公钥" >
                <Input v-model="form.publicKey" type="textarea" :rows="5" readonly></Input>
            </FormItem>
            <FormItem label="私钥" >
                <Input v-model="form.privateKey" type="textarea" :rows="20" readonly></Input>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import { getMerchantSecretInfo } from "@/actions/merchant";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "merchant-secret-detail",
    data() {
        return {
            form: {}
        };
    },
    activated() {
        getMerchantSecretInfo(this.$route.query.id).then(
            res => {
                this.form = res.data;
            },
            () => {
                closeCurrentErrPage(this, "merchant-secret");
            }
        );
    },
    components: {
        dateRangeSelector,
        merchantSelector
    }
};
</script>
