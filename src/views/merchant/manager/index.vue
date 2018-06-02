<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="管理员姓名" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="管理员手机" prop="phone">
                    <Input v-model="filter.phone"></Input>
                </FormItem>
                <FormItem label="管理员账号" prop="userName">
                    <Input v-model="filter.userName"></Input>
                </FormItem>
                <FormItem label="所属商户" prop="merchantId">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="创建时间" prop="_dateRange">
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
import { getMerchantManagerList } from "@/actions/merchant";
export default {
    name: "merchant-manager",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "phone",
                    title: "管理员手机号"
                },
                {
                    key: "name",
                    title: "管理员姓名"
                },
                {
                    key: "userName",
                    title: "管理员账号"
                },
                {
                    key: "email",
                    title: "管理员邮箱"
                },
                {
                    key: "merchantName",
                    title: "所属商户"
                },
                {
                    key: "createTime",
                    title: "创建时间"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: "",
                phone: "",
                userName: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "",
                merchantId: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantManagerList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                () => {
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
    }
};
</script>
