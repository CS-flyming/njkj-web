<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="门店名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="门店编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="所属客户经理" prop="accountManagerId">
                    <customer-manager-selector v-model="filter.accountManagerId"></customer-manager-selector>
                </FormItem>
                <FormItem label="审核状态" prop="auditState">
                    <store-audit-state-selector v-model="filter.auditState" :filter="[0, 3]"></store-audit-state-selector>
                </FormItem>
                <FormItem label="所在省市" prop="cityId">
                    <area-selector gutter="0" :province-id.sync="filter.provinceId" :city-id.sync="filter.cityId" />
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
import storeAuditStateSelector from "components/store-audit-state-selector";
import dateRangeSelector from "components/date-range-selector";
import areaSelector from "components/area-selector";
import customerManagerSelector from "components/customer-manager-selector";
import pagination from "components/pagination";
import { getMerchantStoreAuditRefuseList } from "@/actions/store";
export default {
    name: "store-rejective",
    data() {
        return {
            loading: false,
            modalLoading: true,
            columns: [
                {
                    key: "fullName",
                    title: "门店名称",
                    width: 160
                },
                {
                    key: "code",
                    title: "门店编号",
                    width: 100
                },
                {
                    key: "merchantName",
                    title: "所属商户",
                    width: 140
                },
                {
                    key: "parentName",
                    title: "上级门店",
                    width: 140
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态",
                    width: 100
                },
                {
                    key: "provinceName",
                    title: "归属省",
                    width: 100
                },
                {
                    key: "cityName",
                    title: "归属市",
                    width: 100
                },
                {
                    key: "accountManagerName",
                    title: "所属客户经理",
                    width: 120
                },
                {
                    key: "auditAction",
                    title: "审核类型",
                    width: 100
                },
                {
                    key: "auditName",
                    title: "审核人",
                    width: 120
                },
                {
                    key: "auditTime",
                    title: "审核时间",
                    width: 150
                },
                {
                    key: "createTime",
                    title: "创建时间",
                    width: 150
                },
                {
                    key: "auditNote",
                    title: "审核意见",
                    width: 150
                },
                {
                    type: "action",
                    title: "操作",
                    fixed: "right",
                    width: 120,
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
                                                          id: params.row.id,
                                                          auditState:
                                                              params.row
                                                                  .auditState
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
                                                            id: params.row.id,
                                                            auditState:
                                                                params.row
                                                                    .auditState
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
                                                              id: params.row.id,
                                                              auditState:
                                                                  params.row
                                                                      .auditState
                                                          }
                                                      });
                                                  }
                                              }
                                          },
                                          "编辑"
                                      )
                                    : ""
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                code: "",
                beginDate: "",
                endDate: "",
                accountManagerId: "",
                auditState: "",
                auditAction: "",
                cityId: "",
                provinceId: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantStoreAuditRefuseList(this.filter).then(
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
        storeAuditStateSelector,
        dateRangeSelector,
        pagination,
        customerManagerSelector,
        areaSelector
    }
};
</script>
