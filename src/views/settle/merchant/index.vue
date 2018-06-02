<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>
                </FormItem>
                <FormItem label="协议付款日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="商户名称" prop="merchantName">
                    <merchant-selector v-model="filter.merchantName"></merchant-selector>
                </FormItem>
                <FormItem label="结算单号" prop="checkingMerchantCollectId">
                    <Input v-model="filter.checkingMerchantCollectId"></Input>
                </FormItem>
                <FormItem label="入账账户名" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="开户账号" prop="bankId">
                    <Input v-model="filter.bankId"></Input>
                </FormItem>
               <FormItem label="交易金额">
                    <Input v-model="filter.minAmount" style="max-width:110px;"></Input>至 
                    <Input v-model="filter.maxAmount"  style="max-width:110px;"></Input>                                
                </FormItem>
                <FormItem label="商户订单号" prop="outTradeNo">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="结算状态" prop="settleState">
                    <settle-state-selector v-model="filter.settleState"></settle-state-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button> 
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import settleStateSelector from "components/settle-state-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getSettleCheckingMerchant } from "@/actions/settle";
export default {
    name: "settle-merchant",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "checkingMerchantCollectId",
                    title: "结算单号",
                    width: 100
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号",
                    width: 110
                },
                {
                    key: "refId",
                    title: "退款订单号",
                    width: 110
                },
                {
                    key: "merchantCode",
                    title: "商户编号",
                    width: 110
                },
                {
                    key: "merchantName",
                    title: "商户名称",
                    width: 100
                },
                {
                    key: "name",
                    title: "入账账户名",
                    width: 110
                },
                {
                    key: "bankName",
                    title: "开户行",
                    width: 110
                },
                {
                    key: "bankId",
                    width: 110,
                    title: "开户账号"
                },
                {
                    key: "chargeAmount",
                    width: 110,
                    title: "交易金额"
                },
                {
                    key: "rateAmount",
                    width: 110,
                    title: "手续费金额"
                },
                {
                    key: "settleAmount",
                    title: "结算金额",
                    width: 100
                },
                {
                    key: "method",
                    title: "交易类型",
                    width: 100
                },
                {
                    key: "createTime",
                    title: "协议付款日期",
                    width: 110
                },
                {
                    key: "settleStateDesc",
                    title: "结算状态",
                    width: 110
                },
                {
                    type: "action",
                    title: "操作",
                    fixed: "right",
                    width: 100,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "settle-merchant-detail",
                                                query: {
                                                    id:
                                                        params.row
                                                            .checkingMerchantId
                                                }
                                            });
                                        }
                                    }
                                },
                                "明细查询"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                merchantCode: "",
                merchantName: "",
                checkingMerchantCollectId: "",
                name: "",
                bankId: "",
                minAmount: "",
                maxAmount: "",
                outTradeNo: "",
                settleState: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleCheckingMerchant(this.filter).then(
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
            this.$util.downloadExcel(
                "settle/checking/export/merchant",
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
