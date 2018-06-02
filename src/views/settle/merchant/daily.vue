<style lang="less" scoped>
.xft-card-title {
    display: inline-flex;
    height: 40px;
    line-height: 40px;
    width: 100%;
    justify-content: center;
    text-align: center;
    img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }
}
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120">
                <FormItem label="交易时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginTime" :end-date.sync="filter.endTime"></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>
                </FormItem>
            </Form>
        </Card>
        <Row>
            <Col span="6">
            <Card>
                <div class="xft-card-title">
                    <img src="../../../images/jiaoyi1.png" alt=""> 总支付金额 :{{allPayAmount}}
                </div>
            </Card>
            </Col>
            <Col span="6">
            <Card>
                <div class="xft-card-title">
                    <img src="../../../images/jiaoyi2.png" alt=""> 总实际到账金额 :{{allAmount}}
                </div>
            </Card>
            </Col>
            <Col span="6">
            <Card>
                <div class="xft-card-title">
                    <img src="../../../images/tuikuan1.png" alt=""> 总退款金额 :{{allRefundAmount}}
                </div>
            </Card>
            </Col>
            <Col span="6">
            <Card>
                <div class="xft-card-title">
                    <img src="../../../images/tuikuan2.png" alt=""> 总手续费 :{{allRateAmount}}
                </div>
            </Card>
            </Col>
        </Row>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import settleStateSelector from "components/settle-state-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getDailySettleCheckingMerchantList } from "@/actions/settle";
export default {
    name: "settle-merchant-daily",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "chargeDate",
                    title: "交易时间"
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "payAmount",
                    title: "支付金额"
                },
                {
                    key: "refundAmount",
                    title: "退款金额"
                },
                {
                    key: "rateAmount",
                    title: "手续费"
                },
                {
                    key: "amount",
                    width: 110,
                    title: "实际到账金额"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""],
                beginTime: "",
                endTime: ""
            },
            data: [],
            total: 0,
            allPayAmount: 0,
            allAmount: 0,
            allRefundAmount: 0,
            allRateAmount: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getDailySettleCheckingMerchantList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                    this.allPayAmount = res.data.allPayAmount;
                    this.allAmount = res.data.allAmount;
                    this.allRefundAmount = res.data.allRefundAmount;
                    this.allRateAmount = res.data.allRateAmount;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        // 导出Excel查询订单
        downloadExcel() {
            this.$util.downloadExcel(
                "settle/checking/merchant/export",
                this.filter
            );
        }
    },
    components: {
        dateRangeSelector,
        merchantSelector,
        settleStateSelector,
        pagination
    }
};
</script>
