
<template>
    <Card>
        <p slot="title">
            新增业务员
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
            <FormItem label="所属渠道" prop="agentId">
                <agent-selector v-model="form.agentId"></agent-selector>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <FormItem label="登录密码" prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入6-18位字符和字母组合的密码（不修改，请留空）" ></Input>
            </FormItem>
            <FormItem label="业务员姓名" prop="name">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="业务员性别" prop="sex">
                <RadioGroup v-model="form.sex">
                    <Radio label="1">男</Radio>
                    <Radio label="2">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="是否启用" prop="state">
                <RadioGroup v-model="form.state">
                    <Radio label="1">启用</Radio>
                    <Radio label="-1">未启用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="备注">
                <Input v-model="form.remark"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import agentSelector from "components/agent-selector";
import { validateData } from "./validate";
import { addOrUpdateAgentManager } from "@/actions/agent";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "agent-manager-add",
    data() {
        const validePassword = (rule, value, callback) => {
            if (value.length < 6 || value.length > 18) {
                callback(new Error("请输入6-18位密码"));
            } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
                callback(new Error("密码格式不正确"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            form: {
                agentId: "",
                phone: "",
                password: "",
                name: "",
                sex: "1",
                state: "1",
                remark: ""
            },
            rules: {
                ...validateData,
                password: [
                    {
                        required: true,
                        message: "请填写登录密码",
                        trigger: "blur"
                    },
                    { validator: validePassword, trigger: "blur" }
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
                    addOrUpdateAgentManager(formData).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "agent-manager");
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
        agentSelector
    }
};
</script>
