<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="商户名称" prop="merchantId">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="商户编号">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="更新时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
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
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getMerchantInstitutionConfigList } from "@/actions/merchant";
export default {
    name: "merchant-wechat",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "fullName",
                    title: "商户名称",
                    width: 180
                },
                {
                    key: "name",
                    title: "商户简称",
                    width: 180
                },
                {
                    key: "code",
                    title: "商户编号",
                    width: 120
                },
                {
                    key: "merchantNo",
                    title: "主商户编号",
                    width: 120
                },
                {
                    key: "subMerchantNo",
                    title: "子商户编号",
                    width: 120
                },
                {
                    key: "types",
                    title: "类型",
                    width: 100
                },
                {
                    key: "businessTypeId",
                    title: "商户经营类别",
                    width: 150
                },
                {
                    key: "subscribeAppId",
                    title: "推荐关注公众号",
                    width: 150
                },
                {
                    key: "appId",
                    title: "特约商户APP ID",
                    width: 150
                },
                {
                    key: "domainName",
                    title: "JSAPI支付授权目录",
                    width: 200,
                    ellipsis: true
                },
                {
                    key: "stateDesc",
                    title: "是否配置",
                    width: 90
                },
                {
                    key: "updateTime",
                    title: "更新时间",
                    width: 160
                },
                {},
                {
                    type: "action",
                    title: "操作",
                    width: 120,
                    fixed: "right",
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
                                                name: "merchant-wechat-detail",
                                                query: {
                                                    id: params.row.merchantId
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看"
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
                                            this.$router.push({
                                                name: "merchant-wechat-edit",
                                                query: {
                                                    id: params.row.merchantId
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                merchantId: "",
                code: "",
                _dateRange: ["", ""],
                beginDate: "",
                endDate: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantInstitutionConfigList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    components: {
        dateRangeSelector,
        merchantSelector,
        pagination
    }
};
</script>
