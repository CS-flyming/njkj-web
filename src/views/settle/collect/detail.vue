<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
             <p slot="title">
            结算单明细
        </p>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import pagination from "components/pagination";
import { getSettleStatementCollectDetail } from "@/actions/settle";
export default {
    name: "settle-collect-detail",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "outTradeNo",
                    title: "订单编号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "name",
                    title: "入账账户名"
                },

                {
                    key: "bankName",
                    title: "开户行"
                },
                {
                    key: "refundRecord",
                    title: "开户行号"
                },
                {
                    key: "agentName",
                    title: "清算行号"
                },
                {
                    key: "payRecord",
                    title: "开户账号"
                },

                {
                    key: "payAmount",
                    title: "结算金额"
                },
                {
                    key: "refundRecord",
                    title: "付款成功"
                },
                {
                    key: "refundRecord",
                    title: "结算状态"
                }
            ],
            filter: {
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                merchantCode: "", //定义名称为string类型
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                merchantName: "", //定义编号为code类型
                beginDate: "",
                endDate: "" //两个都是时间控件相关
            },
            // 贮存请求到的数据
            data: [],
            total: 0
        };
    },
    methods: {
        // 进入页面所请求的api  有四次调用
        loadData() {
            this.loading = true;
            getSettleStatementCollectDetail(
                this.$route.query.id,
                this.filter
            ).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        }
    },
    components: {
        dateRangeSelector,
        pagination
    }
};
</script>

