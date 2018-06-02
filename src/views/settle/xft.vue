<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120">
                <FormItem label="交易时间" prop="_dateRange">
                     <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="商戶编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>
                </FormItem>
                <FormItem label="商户名称" prop="merchantName">
                    <merchant-selector v-model="filter.merchantName"></merchant-selector>
                </FormItem> 
                <FormItem label="结算单号" prop="checkingXftCollectId">
                    <Input v-model="filter.checkingXftCollectId"></Input>
                </FormItem>
                <FormItem label="商户订单号" prop="outTradeNo">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="渠道名称" prop="agentName">
                    <Input v-model="filter.agentName"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>
                    <!-- <Button type="ghost" @click="reset" class="margin-left-6">重置</Button> -->
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getSettleCheckingXft } from "@/actions/settle";
export default {
    name: "settle-xft",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "outTradeNo",
                    title: "商户订单号"
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
                    key: "agentName",
                    title: "所属渠道"
                },
                {
                    key: "checkingXftCollectId",
                    title: "结算单号"
                },
                {
                    key: "chargeAmount",
                    title: "交易金额"
                },
                {
                    key: "chargeDate",
                    title: "交易时间"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                merchantCode: "",
                merchantName: "",
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                checkingXftCollectId: "",
                outTradeNo: "",
                agentName: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleCheckingXft(this.filter).then(
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
        },
        //导出Excel查询订单
        downloadExcel() {
            this.$util.downloadExcel("settle/checking/export/xft", this.filter);
        }
    },
    components: {
        dateRangeSelector,
        merchantSelector,
        pagination
    }
};
</script>
