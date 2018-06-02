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
                <FormItem label="平台订单号" prop="tradeId">
                    <Input v-model="filter.tradeId"></Input>
                </FormItem>
                <FormItem label="退款订单号" prop="refOutTradeNo">
                    <Input v-model="filter.refOutTradeNo"></Input>
                </FormItem>
                 <FormItem label="名称" prop="fullName">
                    <Input v-model="filter.fullName"  placeholder="输入商户名称或门店名称"></Input>
                </FormItem>
                 <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"  placeholder=""></Input>
                </FormItem>
                <FormItem label="门店编号" prop="storeId">
                    <merchant-store-code-selector v-model="filter.storeId"></merchant-store-code-selector>                  
                </FormItem>
                <FormItem label="支付类型" prop="payTypes">
                    <payment-channels-selector v-model="filter.payTypes"></payment-channels-selector>
                </FormItem>
                <FormItem label="退款状态" prop="auditState">
                    <refund-status-selector v-model="filter.auditState"></refund-status-selector>                                        
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>                    
                </FormItem>
            </Form>
         </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
          <Modal
            v-model="firstCheckState"
            title="操作"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="firstCheckSubmit">
            <Form label-position="top">
               <RadioGroup v-model="takeTime.auditState">
                  <Radio label="1">同意退款</Radio>
                  <Radio label="2">撤回退款</Radio>
                  <Radio label="3">驳回退款</Radio>
                  <Radio label="4">取消驳回</Radio>
              </RadioGroup>
         <!-- 0 待审核   1 审核通过 2 审核拒绝  3 取消驳回 -->
          </Form>
        </Modal>
    </div>
</template>

<script>
import paymentChannelsSelector from "components/payment-channels-selector";
import dateRangeSelector from "components/date-range-selector";
import Cookies from "js-cookie";
import merchantStoreCodeSelector from "components/merchant-store-code-selector";
// import orderStatusSelector from "components/order-status-selector";
import refundStatusSelector from "components/refund-status-selector";
import pagination from "components/pagination";
import {
    getSettleTransactionRefundPendingList,
    auditSettleTransactionRefund
} from "@/actions/settle";
export default {
    name: "transaction-rejective",
    data() {
        return {
            modalLoading: true,
            firstCheckState: false,
            loading: false,
            columns: [
                {
                    key: "createTime",
                    title: "退款申请时间"
                    // width:150
                },
                {
                    key: "refOutTradeNo",
                    title: "商户退款订单号"
                    // width:160
                },
                {
                    key: "id",
                    title: "平台订单号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                    // width:150
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                    // width:150
                },
                {
                    key: "storeName",
                    title: "门店名称"
                    // width:150
                },
                {
                    key: "institutionName",
                    title: "支付类型"
                    // width:140
                },
                {
                    key: "refundAmount",
                    title: "退款总额(元)"
                    // width:110
                },
                {
                    key: "stateDesc",
                    title: "退款状态"
                    // width:100
                },
                {
                    key: "auditStateDesc",
                    title: "退款审核状态"
                    // width:120
                },
                {
                    type: "action",
                    title: "操作",
                    width: 130,
                    // fixed:"right",
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
                                                name:
                                                    "transaction-order-detail",
                                                query: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.firstCheckState = true;
                                            this.takeTime = Object.assign(
                                                {},
                                                this.defaultCheckObj
                                            );
                                            this.takeTime.id = params.row.id;
                                            this.takeTime.auditState =
                                                params.row.auditState;
                                        }
                                    }
                                },
                                "审核"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                outTradeNo: "",
                spdbTradeNo: "",
                fullName: "",
                payTypes: "",
                auditState: "",
                refOutTradeNo: "",
                merchantCode: "",
                storeId: "",
                tradeId: ""
            },
            takeTime: {
                id: "",
                auditState: ""
            },
            defaultCheckObj: {},
            data: [],
            total: 0
        };
    },
    methods: {
        init() {
            this.defaultCheckObj = this.takeTime;
        },
        loadData() {
            this.loading = true;
            getSettleTransactionRefundPendingList(this.filter).then(
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
        firstCheckSubmit() {
            let formData = this.takeTime;
            auditSettleTransactionRefund(formData).then(res => {
                if (res.data.state == "00" || res.data.state == "05") {
                    this.$lf.message("操作成功", "success");
                } else {
                    this.$lf.message(res.data.stateDesc, "error");
                }
                this.firstCheckState = false;
                this.loadData();
            });
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "settle/transaction/export/refund/pending/list",
                this.filter
            );
        }
    },
    mounted() {
        this.init();
    },
    components: {
        dateRangeSelector,
        pagination,
        paymentChannelsSelector,
        // orderStatusSelector,
        refundStatusSelector,
        merchantStoreCodeSelector
    }
};
</script>
