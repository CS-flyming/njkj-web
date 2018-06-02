<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="退款申请时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="商户订单号" prop="outTradeNo">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="退款订单号" prop="refOutTradeNo">
                    <Input v-model="filter.refOutTradeNo"></Input>
                </FormItem>
                <FormItem label="退款金额">
                    <Input v-model="filter.minAmount" style="max-width:110px;"></Input>至 
                    <Input v-model="filter.maxAmount"  style="max-width:110px;"></Input>                                
                </FormItem>
                <FormItem label="支付类型" prop="payTypes">
                    <payment-channels-selector v-model="filter.payTypes"></payment-channels-selector>
                </FormItem>
                <FormItem label="退款审核状态" prop="state">
                    <refund-order-status-selector v-model="filter.auditState"></refund-order-status-selector>                                        
                </FormItem>
                <FormItem label="退款状态" prop="state">
                    <refund-status-selector v-model="filter.state"></refund-status-selector>                                        
                </FormItem>
                <FormItem label="商户名称" prop="merchantName">
                    <merchant-selector v-model="filter.merchantName"></merchant-selector>
                </FormItem>
                <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>                                        
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import paymentChannelsSelector from "components/payment-channels-selector";
import dateRangeSelector from "components/date-range-selector";
import refundOrderStatusSelector from "components/refund-order-status-selector";
import refundStatusSelector from "components/refund-status-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getSettleTransactionRefundList } from "@/actions/settle";
export default {
    name: "transaction-refund",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "createTime",
                    title: "退款申请时间",
                    width: 110
                },
                {
                    key: "outTradeNo",
                    title: "原商户订单号"
                },
                {
                    key: "refOutTradeNo",
                    title: "退款订单号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "institutionName",
                    title: "支付类型"
                },
                {
                    key: "stateDesc",
                    title: "退款状态"
                },
                {
                    key: "refundAmount",
                    title: "退款金额(元)"
                },
                {
                    key: "amount",
                    title: "订单金额(元)"
                },
                {
                    key: "auditStateDesc",
                    title: "退款审核状态",
                    width: 110
                }
                // {
                //     type: 'action',
                //     title: '操作',
                //     width: 100,
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'text',
                //                     size: 'small'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.$router.push({
                //                             // name: 'transaction/refund/detail',
                //                             query: {
                //                                 id: params.row.id,
                //                             },
                //                         });
                //                     },
                //                 },
                //             }, '详情'),
                //         ]);
                //     }
                // },
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginTime: "",
                endTime: "",
                outTradeNo: "",
                payTypes: "",
                state: "",
                merchantCode: "",
                spdbTradeNo: "",
                minAmount: "",
                maxAmount: "",
                refOutTradeNo: "",
                merchantName: "",
                auditState: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleTransactionRefundList(this.filter).then(
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
    components: {
        dateRangeSelector,
        pagination,
        paymentChannelsSelector,
        refundStatusSelector,
        refundOrderStatusSelector,
        merchantSelector
    }
};
</script>