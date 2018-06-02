<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter"  label-position="right" :label-width="120" >
                <FormItem label="商户名称" >
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="所属客户经理" >
                    <customer-manager-selector v-model="filter.accountManagerId"></customer-manager-selector>
                </FormItem>
                <FormItem label="审核状态" >
                    <merchant-audit-state-selector v-model="filter.auditState" :filter="[0, 3]"></merchant-audit-state-selector>
                </FormItem>
                <FormItem label="所在省市" >
                    <area-selector gutter="0" :province-id.sync="filter.provinceId" :city-id.sync="filter.cityId" />
                </FormItem>
                <FormItem label="审核时间" >
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data" ></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import merchantAuditStateSelector from "components/merchant-audit-state-selector";
import merchantTypeSelector from "components/merchant-type-selector";
import dateRangeSelector from "components/date-range-selector";
import areaSelector from "components/area-selector";
import merchantSelector from "components/merchant-selector";
import customerManagerSelector from "components/customer-manager-selector";
import merchantAuditTypeSelector from "components/merchant-audit-type-selector";
import pagination from "components/pagination";
import { getMerchantAuditRefuseList } from "@/actions/merchant";
export default {
    name: "merchant-rejective",
    data() {
        return {
            loading: false,
            modalLoading: true,
            firstCheckState: false,
            secondCheckState: false,
            columns: [
                {
                    key: "fullName",
                    title: "商户名称"
                    // width: 160,
                },
                {
                    key: "agentName",
                    title: "所属渠道"
                    // width: 140,
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态"
                    // width: 100,
                },
                {
                    key: "provinceName",
                    title: "归属省"
                    // width: 100,
                },
                {
                    key: "cityName",
                    title: "归属市"
                    // width: 100,
                },
                {
                    key: "accountManagerName",
                    title: "所属客户经理"
                    // width: 120,
                },

                {
                    key: "auditName",
                    title: "初审人"
                    // width: 100,
                },
                {
                    key: "autidTime",
                    title: "审核时间"
                    // width: 150,
                },
                {
                    key: "auditNote",
                    title: "审核意见"
                    // width: 150,
                },
                {
                    type: "action",
                    title: "操作",
                    // fixed: 'right',
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
                                                name: "merchant-detail",
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
                                                      name: "merchant-edit",
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
                                                        name: "merchant-edit",
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
                                                          name: "merchant-edit",
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
                customerNo: "",
                beginDate: "",
                endDate: "",
                accountManagerId: "",
                auditState: "",
                auditAction: "",
                cityId: "",
                provinceId: "",
                merchantId: "" //商户ID
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantAuditRefuseList(this.filter).then(res => {
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
        merchantAuditStateSelector,
        dateRangeSelector,
        pagination,
        customerManagerSelector,
        areaSelector,
        merchantSelector,
        merchantAuditTypeSelector
    }
};
</script>
