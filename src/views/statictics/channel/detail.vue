<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        </Card>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getAgentProfitDetail } from "@/actions/statictics";
export default {
    name: "statictics-channel-detail",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "dailyTime",
                    title: "日结时间"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "payType",
                    title: "支付类型"
                },
                {
                    key: "chargeAmount",
                    title: "交易金额(元)"
                },

                {
                    key: "refundAmount",
                    title: "退款金额(元)"
                },
                {
                    key: "netAmount",
                    title: "支付净额(元)"
                },
                {
                    key: "merchantRate",
                    title: "商户费率(‰)"
                },
                {
                    key: "profitAmount",
                    title: "分润金额(元)"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                checkingAgentCollectId: ""
            },
            // 贮存请求到的数据
            data: [],
            total: 0
        };
    },
    methods: {
        init() {
            this.filter.checkingAgentCollectId = this.$route.query.id;
        },
        // 进入页面所请求的api  有四次调用
        loadData() {
            this.loading = true;
            getAgentProfitDetail(this.filter).then(
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
        // html-type="submit"时调用请求
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    activated() {
        this.init();
    },
    components: {
        pagination
    }
};
</script>


