<style lang="less">

</style>

<template>
    <Card>
        <p slot="title">
            编辑门店
        </p>
        <Form 
            style="max-width:800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="handleSubmit" 
            :model="form" 
            :label-width="120" 
            label-position="right"
            :rules="rules">
            <FormItem label="所属商户" prop="merchantId">
                <merchant-selector v-model="form.merchantId"></merchant-selector>                
            </FormItem>
            <FormItem label="所属业务员">
                <salesman-selector  v-model="form.salesManId" :agent-id="form.merchantId"></salesman-selector>
            </FormItem>
            <FormItem label="所属客户经理">
                <customer-manager-selector  v-model="form.accountManagerId"></customer-manager-selector>
            </FormItem>
             <FormItem label="上级门店">
                <store-selector v-model="form.parentId" :merchant-id="form.merchantId" ></store-selector>                          
            </FormItem>
            <FormItem label="门店名称" prop="fullName" >
                <Input  v-model="form.fullName"></Input>
            </FormItem>
            <FormItem label="门店简称" prop="name">
                <Input  v-model="form.name"></Input>
            </FormItem>
            <FormItem label="联系人名称" prop="contactName">
                <Input  v-model="form.contactName"></Input>
            </FormItem>
            <FormItem label="联系人手机" prop="contactPhone">
                <Input  v-model="form.contactPhone"></Input>
            </FormItem>
            <FormItem label="联系人邮箱" prop="contactEmail" >
                <Input  v-model="form.contactEmail"></Input>
            </FormItem>
            <FormItem label="联系人身份证" prop="contactCertificateNo">
                <Input  v-model="form.contactCertificateNo"></Input>
            </FormItem>
            <FormItem label="客服电话" prop="servicePhone">
                <Input  v-model="form.servicePhone"></Input>
            </FormItem>
            <FormItem label="门店地址" props="cityId" :required="true">
                <Row>
                    <Col span="12">
                        <FormItem prop="cityId">
                            <area-selector  :province-id.sync="form.provinceId" :city-id.sync="form.cityId"/>
                        </FormItem>
                    </Col>
                    <Col span="12" class-name="padding-left-10">
                        <FormItem prop="address">
                            <Input  v-model="form.address" placeholder="请输入详细地址"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" html-type="submit":loading="loading" >保存</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import areaSelector from "components/area-selector";
import merchantSelector from "components/merchant-selector";
import storeSelector from "components/store-selector";
import salesmanSelector from "components/salesman-selector";
import customerManagerSelector from "components/customer-manager-selector";
import settleCycleSelector from "components/settle-cycle-selector";
import settleAccountTypeSelector from "components/settle-account-type-selector";
import {
    getMerchantStoreDetail,
    addOrUpdateMerchantStore
} from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
export default {
    name: "store-add",
    data() {
        return {
            loading: false,
            form: {
                merchantId: "",
                fullName: "",
                name: "",
                servicePhone: "",
                provinceId: "", // 省份ID
                cityId: "", // 城市ID
                address: "",
                contactName: "",
                contactPhone: "",
                contactEmail: "",
                contactCertificateNo: "",
                parentId: "",
                accountManagerId: "",
                salesManId: ""
            },
            rules: validateData
        };
    },
    methods: {
        getMerchantStoreDetail() {
            let { id } = this.$route.params;
            if (this.form.id !== id) {
                getMerchantStoreDetail(id).then(
                    res => {
                        this.form = res.data;
                    },
                    err => {
                        closeCurrentErrPage(this, "store-index");
                    }
                );
            }
        },
        handleSubmit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    addOrUpdateMerchantStore(formData).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "store-index");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                } else {
                    this.loading = false;
                }
            });
        }
    },
    activated() {
        this.getMerchantStoreDetail();
    },
    components: {
        areaSelector,
        merchantSelector,
        storeSelector,
        salesmanSelector,
        customerManagerSelector,
        settleCycleSelector,
        settleAccountTypeSelector
    }
};
</script>
