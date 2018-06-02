
<template>
    <Card>
        <p slot="title">
            新增门店管理员
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="form" 
            :label-width="120" 
            label-position="right"
            :rules="rules">
            <FormItem label="管理员姓名" prop="name">
                <Input v-model="form.name" placeholder="" ></Input>
            </FormItem>
            <FormItem label="登陆密码" prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入6-18位字符和字母组合的密码" ></Input>
            </FormItem>
            <FormItem label="确认密码" prop="_rePassword">
                <Input type="password" v-model="form._rePassword" placeholder="请再次输入密码" ></Input>
            </FormItem>
            <FormItem label="管理员性别" prop="sex">
               <RadioGroup v-model="form.sex">
                    <Radio label="1">男</Radio>
                    <Radio label="2">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <FormItem label="是否启用" prop="state">
               <RadioGroup v-model="form.state">
                    <Radio label="2">冻结</Radio>
                    <Radio label="1">正常</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="所属角色" prop="roleIds" :required="true">
                <manager-role-selector  v-model="form.roleIds" :disabled="disabled"></manager-role-selector>
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
import { addOrUpdateMerchantStoreManager } from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "store-manager-add",
    data() {
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            disabled: true,
            loading: false,
            form: {
                name: "",
                password: "",
                _rePassword: "",
                phone: "",
                state: "1",
                sex: "1",
                roleIds: ["978560944785326080"],
                storeIds: []
            },
            rules: {
                ...validateData,
                _rePassword: [
                    {
                        required: true,
                        message: "请填写确认密码",
                        trigger: "blur"
                    },
                    { validator: valideRePassword, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
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
