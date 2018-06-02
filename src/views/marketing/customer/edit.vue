<template>
    <Card>
        <p slot="title">
            客户经理编辑
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="formItem" 
            :label-width="120" 
            label-position="right"
            :rules="rules"
            >
            <FormItem label="客户经理工号" prop="code">
                <Input v-model="formItem.code" placeholder="客户经理工号" disabled/>
            </FormItem>
            <FormItem label="手机号" prop="phone">
                <Input v-model="formItem.phone" placeholder="手机号" />
            </FormItem>
            <FormItem label="客户经理姓名" prop="name">
                <Input v-model="formItem.name" placeholder="客户经理姓名" />
            </FormItem>
            <FormItem label="客户经理性别">
                <Select v-model="formItem.sex">
                    <Option value="1">男</Option>
                    <Option value="2">女</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { closeCurrentErrPage } from "@/constants/constant";
import {
    addOrUpdateCustomerManager,
    getCustomerManagerDetail
} from "@/actions/merchant";
export default {
    name: "marketing-customer-edit",
    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("手机号不能为空"));
            } else if (!/^[1]\d{10}$/.test(value)) {
                callback(new Error("请输入正确手机号"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            formItem: {
                code: "",
                phone: "",
                name: "",
                sex: "1"
            },
            rules: {
                code: [
                    {
                        required: true,
                        message: "客户经理工号不能为空",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        validator: validatePhone,
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "客户经理名称不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.formItem;
                    addOrUpdateCustomerManager(formData).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("更新成功", "success");
                            closeCurrentErrPage(this, "marketing-customer");
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        },
        getCustomerDetail(id) {
            getCustomerManagerDetail(id).then(
                res => {
                    this.formItem = res.data;
                },
                err => {
                    closeCurrentErrPage(this, "marketing-customer");
                }
            );
        }
    },
    activated() {
        this.getCustomerDetail(this.$route.params.id);
    }
};
</script>
