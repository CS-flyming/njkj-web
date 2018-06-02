
<template>
    <Card>
        <p slot="title">
            编辑商户密钥
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
            <FormItem label="商户名称" prop="merchantId" readonly>
                <merchant-selector v-model="form.merchantId" ></merchant-selector>
            </FormItem>
            <FormItem label="公钥" prop="publicKey">
                <Input v-model="form.publicKey" type="textarea" :rows="5"></Input>
            </FormItem>
            <FormItem label="私钥" prop="privateKey">
                <Input v-model="form.privateKey" type="textarea" :rows="20"></Input>
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
    getMerchantSecretInfo,
    updateMerchantSecretInfo
} from "@/actions/merchant";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "merchant-secret-edit",
    data() {
        return {
            loading: false,
            form: {
                merchantId: "",
                privateKey: "",
                publicKey: ""
            },
            rules: {
                merchantId: {
                    required: true,
                    message: "请选择商户名称",
                    trigger: "change"
                },
                privateKey: {
                    required: true,
                    message: "请输入私钥",
                    trigger: "blur"
                },
                publicKey: {
                    required: true,
                    message: "请输入公钥",
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
            getMerchantSecretInfo(this.$route.query.id).then(
                res => {
                    this.form = res.data;
                },
                err => {
                    closeCurrentErrPage(this, "merchant-secret");
                }
            );
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    updateMerchantSecretInfo(formData).then(
                        res => {
                            this.loading = false;
                            this.$lf.alert.success("保存成功");
                            closeCurrentErrPage(this, "merchant-secret");
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
