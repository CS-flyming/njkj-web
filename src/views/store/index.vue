<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="创建时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem label="门店名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="门店编号">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="所属客户经理">
                    <customer-manager-selector v-model="filter.accountManagerId"></customer-manager-selector>
                </FormItem>
                <FormItem label="所属商户">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <!--<FormItem label="审核状态">
                    <store-audit-state-selector v-model="filter.auditState"></store-audit-state-selector>
                </FormItem>-->
                <FormItem label="冻结状态">
                    <store-state-selector v-model="filter.state" :filter="[0, 1]"></store-state-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button @click="handleBatchFreeze()" :loading="disable">批量冻结</Button>
            <Button @click="handleBatchUnfreeze()" :loading="enable">批量解冻</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import storeStateSelector from "components/store-state-selector";
import storeAuditStateSelector from "components/store-audit-state-selector";
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import customerManagerSelector from "components/customer-manager-selector";
import pagination from "components/pagination";
import {
    getMerchantStoreList,
    disableOrEnableMerchantStore
} from "@/actions/store";
export default {
    name: "store-index",
    data() {
        return {
            loading: false,
            enable: false,
            disable: false,
            selectedSelection: [],
            columns: [
                {
                    type: "selection",
                    width: 55,
                    align: "center"
                },
                {
                    key: "fullName",
                    title: "门店名称"
                },
                {
                    key: "code",
                    title: "门店编号"
                },
                {
                    key: "merchantName",
                    title: "所属商户"
                },
                {
                    key: "parentName",
                    title: "上级门店"
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态"
                },
                {
                    key: "stateDesc",
                    title: "冻结状态"
                },
                {
                    key: "createTime",
                    title: "创建时间"
                },
                {
                    key: "createUserName",
                    title: "创建人"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 180,
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
                                                name: "store-detail",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看"
                            ),
                            params.row.auditState == "3"
                                ? h(
                                      "Button",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          on: {
                                              click: () => {
                                                  this.$router.push({
                                                      name: "store-edit",
                                                      params: {
                                                          id: params.row.id
                                                      }
                                                  });
                                              }
                                          }
                                      },
                                      "编辑"
                                  )
                                : params.row.auditState == "2"
                                  ? h(
                                        "Button",
                                        {
                                            props: {
                                                type: "text",
                                                size: "small"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$router.push({
                                                        name: "store-edit",
                                                        params: {
                                                            id: params.row.id
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        "编辑"
                                    )
                                  : params.row.auditState == "0"
                                    ? h(
                                          "Button",
                                          {
                                              props: {
                                                  type: "text",
                                                  size: "small"
                                              },
                                              on: {
                                                  click: () => {
                                                      this.$router.push({
                                                          name: "store-edit",
                                                          params: {
                                                              id: params.row.id
                                                          }
                                                      });
                                                  }
                                              }
                                          },
                                          "编辑"
                                      )
                                    : "",
                            params.row.state === "1"
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
                                                      "确认要解冻操作吗？",
                                                      () => {
                                                          disableOrEnableMerchantStore(
                                                              `/enable/${
                                                                  params.row.id
                                                              }`
                                                          ).then(res => {
                                                              this.loadData();
                                                              this.$lf.message(
                                                                  "解冻成功",
                                                                  "success"
                                                              );
                                                          });
                                                      }
                                                  );
                                              }
                                          }
                                      },
                                      "解冻"
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
                                                      "确认要冻结操作吗？",
                                                      () => {
                                                          disableOrEnableMerchantStore(
                                                              `/disable/${
                                                                  params.row.id
                                                              }`
                                                          ).then(res => {
                                                              this.loadData();
                                                              this.$lf.message(
                                                                  "冻结成功",
                                                                  "success"
                                                              );
                                                          });
                                                      }
                                                  );
                                              }
                                          }
                                      },
                                      "冻结"
                                  )
                            // h('Button', {
                            //     props: {
                            //         type: 'text',
                            //         size: 'small'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.$lf.confirm('确认要密码重置吗？', () => {
                            //                 this.$http.post(`/merchant/store/reset/password/${params.row.id}`).then(res => {
                            //                     if (res.data.result) {
                            //                         this.$lf.message('密码重置成功', 'success');
                            //                     } else {
                            //                         this.$lf.alert.error(res.data.message);
                            //                     }
                            //                 });
                            //             });
                            //         },
                            //     },
                            // }, '重置密码'),
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: "",
                merchantId: "",
                fullName: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                // code: '',
                beginDate: "",
                endDate: "",
                accountManagerId: "",
                auditState: 2,
                state: ""
                // agentId: '',
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantStoreList(this.filter).then(
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
        handleSelect(selection) {
            this.selectedSelection = selection;
        },
        handleBatchFreeze(selection) {
            let ids = this.selectedSelection.map(item => {
                return item.id;
            });
            if (ids.length > 0) {
                this.disable = true;
                disableOrEnableMerchantStore("disable", {
                    ids: ids.join(",")
                }).then(res => {
                    this.loadData();
                    this.$lf.message("冻结成功", "success");
                    this.disable = false;
                });
            }
        },
        handleBatchUnfreeze(selection) {
            let ids = this.selectedSelection.map(item => {
                return item.id;
            });
            if (ids.length > 0) {
                this.enable = true;
                disableOrEnableMerchantStore("enable", {
                    ids: ids.join(",")
                }).then(res => {
                    this.loadData();
                    this.$lf.message("解冻成功", "success");
                    this.enable = false;
                });
            }
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    components: {
        storeStateSelector,
        storeAuditStateSelector,
        dateRangeSelector,
        pagination,
        merchantSelector,
        customerManagerSelector
    }
};
</script>
