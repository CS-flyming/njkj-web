<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="协议付款日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="付款类型" prop="types">
                    <pay-type-selector v-model="filter.types"></pay-type-selector>
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
import payTypeSelector from "components/pay-type-selector";
import pagination from "components/pagination";
import { getSettleStatementCollectList } from "@/actions/settle";
export default {
    name: "settle-collect",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "outTradeNo",
                    title: "结算单号"
                },
                {
                    key: "agreedDate",
                    title: "协议付款日期"
                },
                {
                    key: "types",
                    title: "付款类型"
                },

                {
                    key: "total",
                    title: "付款笔数"
                },
                {
                    key: "amount",
                    title: "付款金额"
                }
                // {
                //     type: "action",
                //     title: "操作",
                //     width: 100,
                //     render: (h, params) => {
                //         return h("div", [
                //             h(
                //                 "Button",
                //                 {
                //                     props: {
                //                         type: "text",
                //                         size: "small"
                //                     },
                //                     on: {
                //                         click: () => {
                //                             this.$router.push({
                //                                 name: "settle-collect-detail",
                //                                 query: {
                //                                     id: params.row.id
                //                                 }
                //                             });
                //                         }
                //                     }
                //                 },
                //                 "明细查询"
                //             )
                //         ]);
                //     }
                // }
            ],
            filter: {
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "", //两个都是时间控件相关
                types: ""
            },
            // 贮存请求到的数据
            data: [],
            total: 0
        };
    },
    methods: {
        init() {},
        // 进入页面所请求的api  有四次调用
        loadData() {
            this.loading = true;
            getSettleStatementCollectList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        //导出Excel查询订单
        downloadExcel() {
            this.$util.downloadExcel(
                "settle/statement/export/settle/collect",
                this.filter
            );
        }
    },
    components: {
        dateRangeSelector,
        payTypeSelector,
        pagination
    }
};
</script>

