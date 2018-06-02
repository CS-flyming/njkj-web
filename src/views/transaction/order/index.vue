<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="交易时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="商户订单号" prop="outTradeNo">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem>
                <FormItem label="浦发流水号" prop="spdbTradeNo">
                    <Input v-model="filter.spdbTradeNo"></Input>
                </FormItem>
                <FormItem label="平台订单号" prop="tradeId">
                    <Input v-model="filter.tradeId"></Input>
                </FormItem>
                <FormItem label="支付类型" prop="payTypes">
                    <payment-channels-selector v-model="filter.payTypes"></payment-channels-selector>
                </FormItem>
                <FormItem label="交易状态" prop="state">
                    <order-status-selector v-model="filter.state" :filter="'noRefund'"></order-status-selector>                                        
                </FormItem>
                <FormItem label="客户经理工号" prop="accountManagerId">
                    <customer-code-two-selector v-model="filter.accountManagerId"></customer-code-two-selector>                  
                </FormItem>
                 <FormItem label="名称" prop="name">
                    <Input v-model="filter.name" placeholder="输入商户名称或门店名称"></Input>                                        
                </FormItem>
                <FormItem label="门店编号" prop="storeId">
                    <merchant-store-code-selector v-model="filter.storeId"></merchant-store-code-selector>                  
                </FormItem>
                 <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>                  
                </FormItem>
                <FormItem label="交易金额">
                    <Input v-model="filter.minAmount" style="max-width:110px;"></Input>至 
                    <Input v-model="filter.maxAmount"  style="max-width:110px;"></Input>                                
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>                                        
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
        <!-- 退款 -->
        <Modal
            v-model="firstCheckState"
            title="申请退款"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="firstCheckSubmit">
            <Form label-position="top" :model="takeTime" :rules="ruleInline" ref="rejectOrderForm">
               <FormItem label="退款金额" prop="amount" :required="true">
                    <Input v-model="takeTime.amount" placeholder="请输入退款金额" ></Input>                                        
                </FormItem>
                 <FormItem label="备注信息" prop="remark">
                   <Input type="textarea" v-model="takeTime.remark"  placeholder="请输入备注信息"></Input>                                        
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import paymentChannelsSelector from "components/payment-channels-selector";
import Cookies from "js-cookie";
import dateRangeSelector from "components/date-range-selector";
import orderStatusSelector from "components/order-status-selector";
import pagination from "components/pagination";
import merchantStoreCodeSelector from "components/merchant-store-code-selector";
import customerCodeTwoSelector from "components/customer-code-two-selector";
import { getSettleTransactionList } from "@/actions/settle";
export default {
    name: "transaction-order",
    data() {
        return {
            modalLoading: true,
            firstCheckState: false,
            loading: false,
            columns: [
                {
                    key: "createTime",
                    title: "交易时间"
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                // 对应的是tradeId
                {
                    key: "id",
                    title: "平台订单号"
                },
                {
                    key: "spdbTradeNo",
                    title: "浦发流水号"
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
                    key: "storeName",
                    title: "门店名称"
                },
                {
                    key: "storeCode",
                    title: "门店编号"
                },
                {
                    key: "institutionName",
                    title: "支付类型"
                },
                {
                    key: "stateDesc",
                    title: "交易状态"
                },
                {
                    key: "amount",
                    title: "交易金额(元)"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 150,
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
                            JSON.parse(Cookies.get("user")).userTypes === "3" &&
                            (params.row.state === "00" ||
                                params.row.state === "03")
                                ? h(
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
                                                  this.takeTime.id =
                                                      params.row.id;
                                              }
                                          }
                                      },
                                      "申请退款"
                                  )
                                : ""
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
                payTypes: "",
                state: "",
                accountManagerId: "",
                minAmount: "",
                maxAmount: "",
                checkingState: "",
                tradeId: "",
                name: "",
                storeId: "",
                merchantCode: ""
            },
            takeTime: {
                amount: "",
                remark: "",
                id: ""
            },
            defaultCheckObj: {},
            data: [],
            total: 0,
            ruleInline: {
                amount: [
                    {
                        required: true,
                        message: "退款金额不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        init() {
            this.defaultCheckObj = this.takeTime;
        },
        loadData() {
            this.loading = true;
            getSettleTransactionList(this.filter).then(
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
        // 申请退款
        firstCheckSubmit() {
            this.$refs["rejectOrderForm"].validate(valid => {
                if (valid) {
                    let formData = this.takeTime;
                    this.$http
                        .post(`/settle/transaction/refund/apply`, formData)
                        .then(res => {
                            if (res.data.result) {
                                this.$lf.message("提交成功", "success");
                                this.firstCheckState = false;
                                this.loadData();
                            } else {
                                this.modalLoading = false;
                                this.$lf.alert.error(
                                    res.data.message,
                                    null,
                                    () => {
                                        this.modalLoading = true;
                                    }
                                );
                            }
                        });
                } else {
                    this.modalLoading = false;
                }
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "settle/transaction/export/list",
                this.filter
            );
        }
    },
    activated() {
        this.init();
    },
    components: {
        dateRangeSelector,
        pagination,
        paymentChannelsSelector,
        orderStatusSelector,
        customerCodeTwoSelector,
        merchantStoreCodeSelector
    }
};
</script>