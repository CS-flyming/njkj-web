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
                <FormItem label="业务员名称">
                  <salesman-selector v-model="filter.id"></salesman-selector>
                </FormItem>
                <FormItem label="业务员手机">
                  <Input v-model="filter.phone"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
            <!-- <Row type="flex" justify="space-between" class="code-row-bg">
                <Col span="4">
                <Icon type="navicon-round"></Icon>
                交易总笔数
                </Col>
                <Col span="4">交易总金额</Col>
                <Col span="4">退款总笔数</Col>
                <Col span="4">退款总金额</Col>
                <Col span="4">交易总净额</Col>
            </Row> -->
        </Card>

        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import salesmanSelector from "components/salesman-selector";
import pagination from "components/pagination";
import { getSalsmanDevelopCount } from "@/actions/statictics";
export default {
    name: "statictics-salsman-index",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "name",
                    title: "业务员姓名"
                },
                {
                    key: "phone",
                    title: "业务员手机"
                },
                {
                    key: "merchantCount",
                    title: "拓展商户数"
                },
                {
                    key: "agentCount",
                    title: "拓展渠道数"
                },

                {
                    key: "haveTradeMerchantCount",
                    title: "有交易商户数"
                },
                {
                    key: "enableMerchantCount",
                    title: "激活商户数"
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
                                            if (
                                                params.row
                                                    .haveTradeMerchantCount == 0
                                            ) {
                                                this.$lf.alert.error(
                                                    "有交易商户数为 0"
                                                );
                                            } else {
                                                this.$router.push({
                                                    name:
                                                        "statictics-salsman-detail",
                                                    query: {
                                                        id: params.row.id
                                                    }
                                                });
                                            }
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
                id: "",
                phone: ""
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
            getSalsmanDevelopCount(this.filter).then(
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
        salesmanSelector
    }
};
</script>

