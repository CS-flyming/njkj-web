<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
          <!-- filterForm  引用ref重置 -->
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <!-- <FormItem label="支付通道"> -->
                  <!-- 这里没有返回字段 -->
                    <!-- <payment-channels-selector></payment-channels-selector> -->
                <!-- </FormItem>  -->
                <FormItem label="对账日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="对账文件获取状态" prop="state">
                    <batch-state-selector v-model="filter.state"></batch-state-selector>
                </FormItem>
                 <FormItem label="对账批次结果" prop="result">
                    <batch-result-selector v-model="filter.result"></batch-result-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
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
// import paymentChannelsSelector from "components/payment-channels-selector";
import batchStateSelector from "components/batch-state-selector";
import batchResultSelector from "components/batch-result-selector";
import pagination from "components/pagination";
import { getSettleCheckingBatch } from "@/actions/reconcile";
export default {
    name: "reconcile-batch",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "id",
                    title: "对账批次号"
                },
                {
                    key: "checkingDate",
                    title: "对账日期"
                },
                {
                    key: "totalItems",
                    title: "对账总笔数"
                },

                {
                    key: "totalAmount",
                    title: "对账总金额(元)"
                },
                {
                    key: "resultDesc",
                    title: "对账结果"
                },
                {
                    key: "stateDesc",
                    title: "对账文件获取状态"
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
                                                name: "reconcile-batch-detail",
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
                endDate: "", //两个都是时间控件相关
                state: "",
                result: ""
            },
            // 贮存请求到的数据
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getSettleCheckingBatch(this.filter).then(
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
        // paymentChannelsSelector,
        batchStateSelector,
        batchResultSelector,
        pagination
    }
};
</script>

