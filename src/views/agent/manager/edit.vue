
<template>
    <Card>
        <p slot="title">
            编辑业务员
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
            <FormItem label="业务员编号" prop="agentManagerId" :required="true">
                <Input v-model="form.agentManagerId" readonly></Input>
            </FormItem>
            <FormItem label="所属渠道" prop="agentId" :required="true">
                <agent-selector v-model="form.agentId"></agent-selector>
            </FormItem>
            <FormItem label="手机号码" prop="phone" :required="true">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <!-- <FormItem label="登录密码" prop="password" :required="true">
                <Input type="password" v-model="form.password" placeholder="请输入6-18位字符和字母组合的密码（不修改，请留空）" ></Input>
            </FormItem> -->
            <FormItem label="业务员姓名" prop="name" :required="true">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="业务员性别" prop="sex" :required="true">
                <RadioGroup v-model="form.sex">
                    <Radio label="1">男</Radio>
                    <Radio label="2">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="是否启用" prop="state" :required="true">
                <RadioGroup v-model="form.state">
                    <Radio label="1">启用</Radio>
                    <Radio label="-1">未启用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="备注" prop="remark">
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
import {
    getAgentManagerDetail,
    addOrUpdateAgentManager
} from "@/actions/agent";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "agent-manager-edit",
    data() {
        return {
            loading: false,
            form: {
                agentId: "",
                phone: "",
                // password: '',
                name: "",
                sex: "",
                state: 1,
                remark: ""
            },
            rules: validateData
        };
    },
    methods: {
        init() {
            getAgentManagerDetail(this.$route.params.id).then(res => {
                this.form = res.data;
            });
        },
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
    activated() {
        if (this.form.agentManagerId !== this.$route.params.id) {
            this.init();
        }
    },
    components: {
        agentSelector
    }
};
</script>
