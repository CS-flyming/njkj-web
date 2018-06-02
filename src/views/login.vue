<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    营房维修管理系统
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="remember">
                            <Checkbox v-model="form.remember"> 记住密码</Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" :loading="loading" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import { login } from "@/actions/sys";
import Cookies from "js-cookie";

export default {
    data() {
        return {
            form: {
                userName: "",
                password: "",
                userType: "1",
                remember: false
            },
            loading: false,
            rules: {
                userName: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    const form = this.form;
                    this.loading = true;
                    login(form).then(
                        res => {
                            this.loading = false;
                            let user = {
                                id: res.data.id,
                                name: res.data.name,
                                userName: form.userName,
                                userType: form.userType,
                                userTypes: res.data.userType,
                                userTypeDesc: res.data.userTypeDesc
                            };
                            Cookies.set("user", JSON.stringify(user));
                            Cookies.set("token", res.data.token);
                            if (this.form.remember) {
                                localStorage.setItem(
                                    "lf_user",
                                    JSON.stringify(user)
                                );
                                localStorage.setItem(
                                    "lf_token",
                                    res.data.token
                                );
                            }
                            this.$store.commit("saveUserInfo");
                            this.$store.commit("clearAllTags");
                            this.$router.push({
                                name: "home_index"
                            });
                        },
                        err => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    }
};
</script>

<style>
</style>
