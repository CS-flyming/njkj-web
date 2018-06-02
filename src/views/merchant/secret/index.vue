<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <!-- <FormItem label="创建时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem> -->
                <FormItem label="商户名称" prop="merchantId">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="商户编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <!-- <FormItem label="公钥" prop="publicKey">
                    <Input v-model="filter.publicKey" type="textarea"></Input>
                </FormItem>
                <FormItem label="私钥" prop="privateKey">
                    <Input v-model="filter.privateKey" type="textarea"></Input>
                </FormItem> -->
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
import pagination from "components/pagination";
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import { getMerchantSecretList } from "@/actions/merchant";
export default {
    name: "merchant-secret",
    data() {
        return {
            modalLoading: true,
            loading: false,
            columns: [
                {
                    key: "name",
                    title: "商户名称"
                },
                {
                    key: "code",
                    title: "商户编号"
                },
                {
                    key: "id",
                    title: "APP ID"
                },
                {
                    key: "publicKey",
                    title: "公钥"
                },
                {
                    key: "privateKey",
                    title: "私钥"
                },
                {
                    key: "type",
                    title: "类型"
                },
                {
                    key: "createTime",
                    title: "创建时间"
                },
                {
                    key: "updateTime",
                    title: "修改时间"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 130,
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
                                                name: "merchant-secret-detail",
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
                                                name: "merchant-secret-edit",
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
                privateKey: "",
                merchantId: "",
                privateKey: "",
                type: "RSA2",
                code: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantSecretList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
                this.data.forEach(element => {
                    // console.log(element.privateKey.substring(0,10))
                    element.privateKey = "******";
                    element.publicKey = "******";
                });
            });
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
    }
};
</script>
