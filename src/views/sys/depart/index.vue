<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="部门名称">
                    <Input v-model="filter.name" clearable></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <!-- <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'sys-manager-add' })">新建用户</Button>
        </div> -->
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getDepartList } from "@/actions/depart";
export default {
    name: "sys-manager",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "name",
                    title: "部门名称"
                },
                {
                    key: "code",
                    title: "部门编号"
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getDepartList(this.filter).then(res => {
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
        pagination
    }
};
</script>
