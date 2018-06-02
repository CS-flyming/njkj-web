
<template>
    <Card>
        <p slot="title">
            编辑门店管理员
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="form" 
            :label-width="120" 
            label-position="right">
            <FormItem label="管理员姓名" prop="name" :required="true">
                {{form.name}}
            </FormItem>
            <FormItem label="管理员性别" prop="sex" :required="true">
               <RadioGroup v-model="form.sex">
                    <Radio label="1">男</Radio>
                    <Radio label="2">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="手机号码" prop="phone" :required="true">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <FormItem label="是否启用" prop="state" :required="true">
               <RadioGroup v-model="form.state">
                    <Radio label="-1">冻结</Radio>
                    <Radio label="1">正常</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="所属角色" prop="roleIds" :required="true">
                <manager-role-selector v-model="form.roleIds" :disabled="disabled"></manager-role-selector>
            </FormItem>
            <FormItem label="管理门店" prop="storeIds" :required="true">
                <manager-store v-model="form.storeIds"></manager-store>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import managerRoleSelector from "components/manager-role-selector";
import managerStore from "components/manager-store";
import { validateData } from "./validate";
import {
    addOrUpdateMerchantStoreManager,
    getMerchantStoreManagerDetail
} from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "store-manager-edit",
    data() {
        return {
            disabled: true,
            loading: false,
            form: {
                name: "",
                phone: "",
                state: "1",
                sex: "1",
                roleIds: ["971661997026312192"],
                storeIds: []
            },
            rules: validateData
        };
    },
    methods: {
        init() {
            getMerchantStoreManagerDetail(this.$route.params.id).then(res => {
                this.form = res.data;
            });
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    if (formData.storeIds.length) {
                        addOrUpdateMerchantStoreManager(formData).then(
                            res => {
                                this.loading = false;
                                this.$refs.form.resetFields();
                                this.$lf.message("保存成功", "success");
                                closeCurrentErrPage(this, "store-manager");
                            },
                            () => {
                                this.loading = false;
                            }
                        );
                    } else {
                        this.loading = false;
                        this.$lf.message("管理门店不能为空", "error");
                    }
                }
            });
        }
    },
    activated() {
        this.init();
    },
    watch: {
        "form._roleIds"(val) {
            this.form.roleIds = [val];
        }
    },
    components: {
        managerRoleSelector,
        managerStore
    }
};
</script>
