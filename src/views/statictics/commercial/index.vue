<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
          <!-- filterForm  引用ref重置 -->
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="统计日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <!-- <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>
                </FormItem>
                <FormItem label="商户名称" prop="merchantName">
                    <merchant-selector v-model="filter.merchantName"></merchant-selector>
                </FormItem> -->
                 <!-- <FormItem label="是否补贴" prop="subsidy">
                   <subsidy-selector v-model="filter.subsidy"></subsidy-selector>
                </FormItem> -->
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
            <!-- <Row type="flex" justify="space-between" class="code-row-bg">
                <Col span="3">支付成功总笔数</Col>
                <Col span="3">支付成功总金额</Col>
                <Col span="3">退款总笔数</Col>
                <Col span="3">退款总金额</Col>
                <Col span="3">支付总净额</Col>
                <Col span="3">商户手续费总额</Col>
                <Col span="3">商户补贴总额</Col>
            </Row> -->
        </Card>

        <Table :loading="loading" border stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
// import subsidySelector from "components/subsidy-selector";
import { getMerchantFee } from "@/actions/statictics";
export default {
    name: "statictics-commercial-index",
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
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "agentName",
                    title: "所属渠道"
                },

                {
                    key: "payRecord",
                    title: "支付成功总笔数"
                },
                {
                    key: "payAmount",
                    title: "支付成功总金额(元)"
                },
                {
                    key: "refundRecord",
                    title: "退款总笔数"
                },
                {
                    key: "refundAmount",
                    title: "退款总金额(元)"
                },
                {
                    key: "netAmount",
                    title: "支付净额(元)"
                },
                {
                    key: "poundageAmount",
                    title: "商户手续费(元)"
                },
                {
                    key: "subsidyAmount",
                    title: "补贴金额(元)"
                },
                {
                    type: "action",
                    title: "操作",
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
                                                name:
                                                    "statictics-commercial-detail",
                                                query: {
                                                    id:
                                                        params.row
                                                            .checkingMerchantCollectId
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
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "", //两个都是时间控件相关
                merchantCode: "",
                merchantName: ""
                // subsidy:"",
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
            getMerchantFee(this.filter).then(
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
        merchantSelector
        // subsidySelector
    }
};
</script>

