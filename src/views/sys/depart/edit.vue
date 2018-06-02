
<template>
    <Card>
        <p slot="title">
            编辑操作员
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
            <FormItem label="登录名称" prop="userName" >
                <span>{{form.userName}} </span>
            </FormItem>
            <FormItem label="员工姓名" prop="name" >
                <Input v-model="form.name" placeholder="员工姓名"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone" >
                <Input v-model="form.phone" placeholder="手机号码"></Input>
            </FormItem>
            <FormItem label="身份证号" prop="certificateNo" >
                <Input v-model="form.certificateNo" placeholder="身份证号"></Input>
            </FormItem>
            <FormItem label="所属角色" prop="roleIds">
                <manager-role-selector v-model="form.roleIds"></manager-role-selector>
            </FormItem>
            <FormItem label="状态" prop="state" >
                <RadioGroup v-model="form.state">
                    <Radio label="2">冻结</Radio>
                    <Radio label="1">正常</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import managerRoleSelector from "components/manager-role-selector";
import { addOrUpdateManager, getManagerDetail } from "@/actions/sys";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
let defaultForm = {
    userName: "",
    phone: "",
    password: "",
    _rePassword: "",
    name: "",
    certificateNo: "",
    state: 1,
    roleIds: []
};
export default {
    name: "sys-manager-edit",
    data() {
        return {
            loading: false,
            form: {
                userName: "",
                phone: "",
                password: "",
                _rePassword: "",
                name: "",
                certificateNo: "",
                state: 1,
                roleIds: []
            },
            rules: validateData
        };
    },
    methods: {
        getManagerDetail() {
            let { id } = this.$route.params;
            if (this.form.id !== id) {
                getManagerDetail(id).then(res => {
                    this.form = res.data;
                });
            }
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    addOrUpdateManager(formData).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "sys-manager");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    activated() {
        this.getManagerDetail();
    },
    components: {
        managerRoleSelector
    }
};
</script>
