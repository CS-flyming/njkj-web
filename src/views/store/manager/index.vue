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
                <FormItem label="状态" prop="state">
                    <Input v-model="filter.state"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'store-manager-add' })">新增管理员</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import {
    getMerchantStoreManagerList,
    disableOrEnableMerchantStoreManager
} from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "store-manager",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "userName",
                    title: "管理员账号"
                },
                {
                    key: "name",
                    title: "管理员姓名"
                },
                {
                    key: "sex",
                    title: "管理员性别"
                },
                {
                    key: "phone",
                    title: "管理员手机号"
                },
                {
                    key: "state",
                    title: "状态"
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
                                                name: "store-manager-edit",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            params.row.state == "启用"
                                ? h(
                                      "Button",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          on: {
                                              click: () => {
                                                  this.$lf.confirm(
                                                      "是否确认禁用该操作员？",
                                                      () => {
                                                          disableOrEnableMerchantStoreManager(
                                                              {
                                                                  id:
                                                                      params.row
                                                                          .id,
                                                                  state: "-1"
                                                              }
                                                          ).then(res => {
                                                              this.$lf.message(
                                                                  "禁用成功",
                                                                  "success"
                                                              );
                                                              this.loadData();
                                                          });
                                                      }
                                                  );
                                              }
                                          }
                                      },
                                      "禁用"
                                  )
                                : h(
                                      "Button",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          on: {
                                              click: () => {
                                                  this.$lf.confirm(
                                                      "是否确认启用该操作员？",
                                                      () => {
                                                          disableOrEnableMerchantStoreManager(
                                                              {
                                                                  id:
                                                                      params.row
                                                                          .id,
                                                                  state: "1"
                                                              }
                                                          ).then(res => {
                                                              this.$lf.message(
                                                                  "启用成功",
                                                                  "success"
                                                              );
                                                              this.loadData();
                                                          });
                                                      }
                                                  );
                                              }
                                          }
                                      },
                                      "启用"
                                  )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: "",
                phone: "",
                state: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantStoreManagerList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.data.forEach(element => {
                        element.sex == "1"
                            ? (element.sex = "男")
                            : (element.sex = "女"),
                            element.state == "1"
                                ? (element.state = "启用")
                                : (element.state = "禁用");
                    });
                    this.total = res.data.total;
                },
                err => {
                    closeCurrentErrPage(this, false);
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
