<template>
    <div>
        <Card class="filter-wrap">
          <!-- filterForm  引用ref重置 -->
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="客户经理名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="filter.phone"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>                                                           
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'marketing-customer-add' })" v-if="checkPermission('marketing-customer-add')">新增客户经理</Button>
        </div>
        
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import {
    getCustomerManagerList,
    deleteCustomerManager
} from "@/actions/merchant";
export default {
    name: "marketing-customer",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            selectedSelection: [],
            columns: [
                {
                    key: "code",
                    title: "客户经理工号"
                },
                {
                    key: "phone",
                    title: "手机号"
                },
                {
                    key: "name",
                    title: "客户经理名称"
                },
                {
                    key: "sexDesc",
                    title: "客户经理性别"
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
                                            this.$router.push(
                                                `customer/${params.row.id}/edit`
                                            );
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
                                                "是否确认删除该客户经理？",
                                                () => {
                                                    deleteCustomerManager(
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
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                name: "", //客户经理名称
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                phone: "" //手机号
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
            getCustomerManagerList(this.filter).then(
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
        pagination
    }
};
</script>

