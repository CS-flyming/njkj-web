<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="渠道商编号" prop="agentCode">
                    <Input v-model="filter.agentCode"></Input>
                </FormItem>
                <FormItem label="协议付款日期" prop="_dateRange">
                      <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="渠道名称" prop="agentName">
                    <merchant-selector v-model="filter.agentName"></merchant-selector>
                </FormItem>
                <FormItem label="结算单号" prop="checkingAgentCollectId">
                    <Input v-model="filter.checkingAgentCollectId"></Input>
                </FormItem>
                <FormItem label="结算状态" prop="settleState">
                    <settle-state-selector v-model="filter.settleState"></settle-state-selector>
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
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import settleStateSelector from "components/settle-state-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getSettleCheckingAgent } from "@/actions/settle";
export default {
    name: "settle-agent",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "checkingAgentCollectId",
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
                    key: "merchantName",
                    title: "商户名称",
                    width: 100
                },
                {
                    key: "storeName",
                    title: "门店名称",
                    width: 100
                },
                {
                    width: 110,
                    key: "agentCode",
                    title: "渠道商编号"
                },
                {
                    key: "agentName",
                    title: "渠道名称",
                    width: 110
                },
                {
                    key: "chargeAmount",
                    title: "交易金额",
                    width: 100
                },
                {
                    key: "profitAmount",
                    title: "分润金额",
                    width: 100
                },
                {
                    key: "settleAmount",
                    title: "结算金额",
                    width: 110
                },
                {
                    key: "type",
                    title: "交易类型",
                    width: 110
                },
                {
                    key: "createTime",
                    title: "协议付款日期",
                    width: 120
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
                                                name: "settle-agent-detail",
                                                query: {
                                                    id:
                                                        params.row
                                                            .checkingAgentId
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
                agentCode: "",
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                agentName: "",
                checkingAgentCollectId: "",
                settleState: "",
                minAmount: "",
                maxAmount: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleCheckingAgent(this.filter).then(
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
                "settle/checking/export/agent",
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
