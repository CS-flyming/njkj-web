<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
           <Form @submit.native.prevent="handleFilter" :model="filter" label-position="right" :label-width="120">
                <!-- <FormItem label="商户名称" prop="fullName">
                    <merchant-selector v-model="filter.fullName"></merchant-selector>
                </FormItem>
                <FormItem label="商户编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem> -->
                <FormItem label="拓展日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
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
import { getCustomerManagerSettleDataDetail } from "@/actions/statictics";
export default {
    name: "statictics-client-detail",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "fullName",
                    title: "名称"
                },
                {
                    key: "code",
                    title: "商户编号"
                },
                {
                    key: "typeDesc",
                    title: "类型"
                },
                {
                    key: "dailyTime",
                    title: "拓展日期"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                id: ""
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
            getCustomerManagerSettleDataDetail(this.filter).then(
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
    activated() {
        this.init();
    },
    components: {
        pagination,
        merchantSelector,
        dateRangeSelector
    }
};
</script>


