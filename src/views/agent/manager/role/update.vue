
<template>
    <Card>
        <p slot="title">
            修改管理员权限
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
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="管理员手机" prop="phone" :required="true">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <FormItem label="所属渠道" prop="agentName">
                <agent-selector v-model="form.agentName"></agent-selector>
            </FormItem>
            <!-- <FormItem label="角色配置" prop="roleIds"> -->
                <!-- <manager-role-selector v-model="form.roleIds"></manager-role-selector> -->
            <!-- </FormItem> -->
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
// import managerRoleSelector from 'components/manager-role-selector';
import agentSelector from "components/agent-selector";

export default {
    name: "agent-manager-role-update",
    data() {
        return {
            loading: false,
            form: {
                name: "",
                phone: "",
                agentName: ""
            }
        };
    },
    methods: {
        init() {
            this.$http
                .post(`/agent/manager/role/detail/${this.$route.query.id}`)
                .then(res => {
                    this.form = Object.assign(this.form, res.data.data);
                });
        },
        submit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let formData = this.form;
                    this.$http.post(`/sys/manager/add`, formData).then(
                        res => {
                            if (res.data.result) {
                                this.$refs.form.resetFields();
                                this.$lf.message("保存成功", "success");
                                this.loading = false;
                                this.$router.push({
                                    name: "sys-manager"
                                });
                            } else {
                                this.loading = false;
                                this.$lf.alert.error(res.data.message);
                            }
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }
            });
        }
    },
    mounted() {
        //  if (this.form.id !== this.$route.query.id) {
        this.init();
        // }
    },
    // watch: {
    //     'form._roleIds'(val) {
    //         this.form.roleIds = [val];
    //     },
    // },
    components: {
        // managerRoleSelector,
        agentSelector
    }
};
</script>
