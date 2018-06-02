
<template>
    <Card>
        <p slot="title">
            编辑商户微信配置
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="form" 
            :label-width="120" 
            :rules="rules"
            label-position="right">
            <FormItem label="商户名称" prop="merchantId">
                <Input v-model="form.fullName"  readonly></Input>
                <!-- <merchant-selector v-model="form.merchantId" ></merchant-selector> -->
            </FormItem>
            <!-- <FormItem label="商户编号" prop="code">
                <Input v-model="form.code"></Input>
            </FormItem> -->
            <FormItem label="主商户编号" prop="merchantNo">
                <Input v-model="form.merchantNo"></Input>
            </FormItem>
            <FormItem label="子商户编号" prop="subMerchantNo">
                <Input v-model="form.subMerchantNo"></Input>                
            </FormItem>
            <FormItem label="经营类别" prop="businessTypeId">
                <!-- <Input v-model="form.businessTypeId" readonly></Input> -->
                <business-type-selector  v-model="form.businessTypeId"></business-type-selector>
            </FormItem>
             <FormItem label="推荐关注公众号" prop="subscribeAppId">
                <Input v-model="form.subscribeAppId"></Input>                                 
            </FormItem>
             <FormItem label="特约商户APP ID" prop="appId">
                <Input v-model="form.appId"></Input>                                 
            </FormItem>
            <FormItem label="JSAPI授权目录" prop="domainName">
                <Input v-model="form.domainName"></Input>                                 
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import merchantSelector from "components/merchant-selector";
import businessTypeSelector from "components/business-type-selector";
import {
    getMerchantInstitutionConfigDetail,
    updateMerchantInstitutionConfig
} from "@/actions/merchant";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "merchant-wechat-edit",
    data() {
        return {
            loading: false,
            form: {
                merchantId: "",
                // code: '',
                merchantNo: "",
                subMerchantNo: "",
                businessTypeId: "",
                subscribeAppId: "",
                appId: "",
                domainName: ""
            },
            rules: {
                merchantId: {
                    required: true,
                    message: "请选择商户名称",
                    trigger: "change"
                },
                merchantNo: {
                    required: true,
                    message: "请输入主商户编号",
                    trigger: "blur"
                },
                subMerchantNo: {
                    required: true,
                    message: "请输入子商户编号",
                    trigger: "blur"
                },
                businessTypeId: {
                    required: true,
                    message: "请选择经营类别",
                    trigger: "change"
                },
                subscribeAppId: {
                    required: true,
                    message: "请输入推荐关注公众号",
                    trigger: "blur"
                },
                appId: {
                    required: true,
                    message: "请输入特约商户APP ID",
                    trigger: "blur"
                },
                domainName: {
                    required: true,
                    message: "请输入JSAPI授权目录",
                    trigger: "blur"
                }
            }
        };
    },
    activated() {
        this.init();
    },
    methods: {
        init() {
            getMerchantInstitutionConfigDetail(this.$route.query.id).then(
                res => {
                    this.form = res.data;
                },
                err => {
                    closeCurrentErrPage(this, "merchant-wechat");
                }
            );
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    updateMerchantInstitutionConfig(formData).then(
                        res => {
                            this.loading = false;
                            this.$lf.alert.success("保存成功");
                            closeCurrentErrPage(this, "merchant-wechat");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    components: {
        merchantSelector,
        businessTypeSelector
    }
};
</script>
