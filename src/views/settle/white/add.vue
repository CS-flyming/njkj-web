
<template>
    <Card>
        <p slot="title">
            新增白名单
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="form" 
            :label-width="120" 
            label-position="right">
            <FormItem label="商户名称" prop="merchantId" :required="true">
                <merchant-selector v-model="form.merchantId"></merchant-selector>
            </FormItem>
            <!-- <FormItem label="商户编号" prop="merchantId" :required="true">
                <Input v-model="form.merchantId"></Input>
            </FormItem> -->
             <FormItem label="生效时间" prop="_dateRange">
                <date-range-selector v-model="form._dateRange" :start-date.sync="form.beginDate" :end-date.sync="form.endDate"></date-range-selector>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input v-model="form.remark" type="textarea"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
export default {
    name: 'settle-white-add',
    data() {
        return {
            loading: false,
            form: {
                remark:"",
                merchantId: '',
                // merchantName: '',
                _dateRange: ['',''],    // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: '',
                endDate: '',
                type:1
            },
        };
    },
    methods: {
        submit(e) {
            this.loading = true;
            this.$http.post(`/settle/checking/whitelist/add`, this.form).then(res => {
                this.loading = false;
                if (res.data.result) {
                    this.$refs.form.resetFields();
                    this.$lf.message('保存成功', 'success');
                    this.$router.push({
                        name: 'settle-white',
                    });
                } else {
                    this.$lf.alert.error(res.data.message);
                }
            }, () => {
                this.loading = false;
            });
        },
    },
    components: {
        dateRangeSelector,
        merchantSelector,
    },
};
</script>
