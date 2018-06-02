<style lang="less">

</style>

<template>
  <div>
    <Card class="filter-wrap">
      <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120">
        <FormItem label="收银员姓名" prop="name">
          <Input v-model="filter.name"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input v-model="filter.phone"></Input>
        </FormItem>
        <FormItem label="收银员编号" prop="managerId">
          <Input v-model="filter.managerId"></Input>
        </FormItem>
        <FormItem label="收银员类型" prop="types">
          <cashier-selector v-model="filter.types"></cashier-selector>
        </FormItem>
        <FormItem label="所属门店" prop="storeId">
          <Input v-model="filter.storeId"></Input>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" html-type="submit">筛选</Button>
        </FormItem>
      </Form>
    </Card>
    <div class="data-control">
      <Button type="primary" @click="$router.push({ name: 'store-cashier-add' })">新增收银员</Button>
    </div>
    <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
    <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
  </div>
</template>

<script>
import pagination from "components/pagination";
import cashierSelector from "components/cashier-selector";
import {
    getMerchantStoreCashierList,
    deleteMerchantStoreCashier,
    disableOrEnableMerchantStoreManager
} from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "store-cashier",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "id",
                    title: "收银员编号"
                },
                {
                    key: "name",
                    title: "收银员姓名"
                },
                {
                    key: "storeName",
                    title: "所属门店"
                },
                {
                    key: "typesDesc",
                    title: "收银员类型"
                },
                {
                    key: "phone",
                    title: "手机号码"
                },
                {
                    key: "roleNames",
                    title: "所属角色",
                    render: (h, params) => {
                        return h("span", params.row.roleNames.join("|"));
                    }
                },
                {
                    key: "stateDesc",
                    title: "状态"
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
                                                name: "store-cashier-edit",
                                                query: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            params.row.state == "1"
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
                                                      "是否确认禁用该收银员？",
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
                                                      "是否确认启用该收银员？",
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
                storeId: "",
                types: "",
                managerId: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantStoreCashierList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
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
        pagination,
        cashierSelector
    }
};
</script>
