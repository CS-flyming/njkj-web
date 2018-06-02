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
                <FormItem label="代理商名称" prop="agentId">
                    <agent-selector v-model="filter.agentId"></agent-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data" ></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import agentSelector from "components/agent-selector";
import pagination from "components/pagination";
import { getAgentDailyCharge } from "@/actions/statictics";
export default {
    name: "statictics-agent",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "agentName",
                    title: "代理商名称"
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
                    title: "交易净额(元)"
                },
                {
                    key: "dailyTime",
                    title: "统计当前日期"
                }
            ],
            filter: {
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                merchantId: "",
                beginDate: "",
                endDate: "" //两个都是时间控件相关
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
            getAgentDailyCharge(this.filter).then(
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
        agentSelector,
        pagination
    }
};
</script>



