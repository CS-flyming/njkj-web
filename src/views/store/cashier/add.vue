
<template>
    <Card>
        <p slot="title">
            新增收银员
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
            <FormItem label="收银员姓名" prop="name">
                <Input v-model="form.name"></Input>                
            </FormItem>
            <FormItem label="所属门店" prop="storeId">
                <merchant-store-selector v-model="form.storeId"></merchant-store-selector>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <FormItem label="收银员类型" prop="types">
                <cashier-selector v-model="form.types"></cashier-selector>
            </FormItem> 
            <FormItem label="所属角色" prop="roleIds">
                <manager-role-selector v-model="form.roleIds" :disabled="disabled"></manager-role-selector>
            </FormItem>
            <FormItem label="是否启用" prop="state">
                <RadioGroup v-model="form.state">
                    <Radio label="1">启用</Radio>
                    <Radio label="-1">禁用</Radio>
                </RadioGroup>
            </FormItem>
             <FormItem label="收银员性别" prop="sex">
               <RadioGroup v-model="form.sex">
                    <Radio label="1">男</Radio>
                    <Radio label="2">女</Radio>
                </RadioGroup>                
            </FormItem>  
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import merchantStoreSelector from "components/merchant-store-selector";
import managerRoleSelector from "components/manager-role-selector";
import cashierSelector from "components/cashier-selector";
import { addOrUpdateMerchantStoreCashier } from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
export default {
    name: "store-cashier-add",
    data() {
        return {
            loading: false,
            disabled: true,
            form: {
                name: "",
                storeId: "",
                phone: "",
                types: "",
                roleIds: ["956081121316044800"],
                state: "",
                sex: ""
            },
            rules: validateData
        };
    },
    methods: {
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    addOrUpdateMerchantStoreCashier(this.form).then(
                        res => {
                            this.loading = false;
                            this.$refs.form.resetFields();
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "store-cashier");
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
    components: {
        merchantStoreSelector,
        managerRoleSelector,
        cashierSelector
    }
};
</script>
