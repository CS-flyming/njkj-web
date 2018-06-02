<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="角色名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'sys-role-add' })">新建角色</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getSysRoleList, deleteRoleById } from "@/actions/sys";
export default {
    name: "sys-role",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "id",
                    title: "角色编号"
                },
                {
                    key: "name",
                    title: "角色名称"
                },
                {
                    key: "updateUserId",
                    title: "更新操作员"
                },
                {
                    key: "note",
                    title: "备注"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 150,
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
                                                name: "sys-role-edit",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
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
                                            this.$lf.confirm(
                                                "是否确认删除该角色？",
                                                () => {
                                                    deleteRoleById(
                                                        params.row.id
                                                    ).then(res => {
                                                        this.$lf.message(
                                                            "删除成功",
                                                            "success"
                                                        );
                                                        this.loadData();
                                                    });
                                                }
                                            );
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
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
            getSysRoleList(this.filter).then(
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
        pagination
    }
};
</script>
