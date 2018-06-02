<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
           <Form @submit.native.prevent="handleFilter" :model="filter" label-position="right" :label-width="120">
                <FormItem label="商户名称" prop="fullName">
                    <merchant-selector v-model="filter.fullName"></merchant-selector>
                </FormItem>
                <FormItem label="商户编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="创建时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.dailyTimeBegin" :end-date.sync="filter.dailyTimeEnd"></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
          <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        </Card>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import { getSalsmanDevelopCountDetail } from "@/actions/statictics";
export default {
    name: "statictics-salsman-detail",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "dailyTime",
                    title: "统计日期"
                },
                {
                    key: "payRecord",
                    title: "交易总笔数"
                },
                {
                    key: "payAmount",
                    title: "交易总金额"
                },
                {
                    key: "refundRecord",
                    title: "退款总笔数"
                },
                {
                    key: "refundAmount",
                    title: "退款总金额"
                },
                {
                    key: "amount",
                    title: "交易总净额"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                code: "",
                id: "",
                fullName: "",
                dailyTimeBegin: "",
                dailyTimeEnd: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        init() {
            this.filter.id = this.$route.query.id;
        },
        // 进入页面所请求的api  有四次调用
        loadData() {
            this.loading = true;
            getSalsmanDevelopCountDetail(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    mounted() {
        this.init();
    },
    components: {
        pagination,
        merchantSelector,
        dateRangeSelector
    }
};
</script>


