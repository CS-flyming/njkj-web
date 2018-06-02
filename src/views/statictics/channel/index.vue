<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
          <!-- filterForm  引用ref重置 -->
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="日结时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
               <!-- <FormItem label="支付类型" prop="institutionProductName">
                    <paytype-selector v-model="filter.institutionProductName"></paytype-selector>
                </FormItem> -->
                <FormItem label="渠道名称">
                    <agent-selector v-model="filter.agentId"></agent-selector>
                </FormItem>
                 <!-- <FormItem label="查询维度">
                    <query-dimension-selector v-model="filter.parentId"></query-dimension-selector>
                </FormItem> -->
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
            <!-- <Row type="flex" justify="space-between" class="code-row-bg">
                <Col span="4">支付成功总笔数</Col>
                <Col span="4">支付成功总金额</Col>
                <Col span="4">退款总笔数</Col>
                <Col span="4">退款总金额</Col>
                <Col span="4">交易总净额</Col>
                <Col span="4">分润总额</Col>
            </Row> -->
        </Card>

        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
// import paytypeSelector from "components/paytype-selector";
// import queryDimensionSelector from "components/query-dimension-selector";
import agentSelector from "components/agent-selector";
import pagination from "components/pagination";
import { getAgentProfit } from "@/actions/statictics";
export default {
    name: "statictics-plafform",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "createTime",
                    title: "日结时间"
                },
                {
                    key: "agentName",
                    title: "渠道名称"
                },
                {
                    key: "agentCode",
                    title: "渠道编号"
                },
                {
                    key: "parentAgentName",
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
                    key: "amount",
                    title: "支付净额(元)"
                },
                {
                    key: "profitAmount",
                    title: "分润金额(元)"
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
                                                    "statictics-channel-detail",
                                                query: {
                                                    id: params.row.id
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
            getAgentProfit(this.filter).then(
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
    components: {
        dateRangeSelector,
        pagination,
        // paytypeSelector,
        agentSelector
        // queryDimensionSelector,
    }
};
</script>


