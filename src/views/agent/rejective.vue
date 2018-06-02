<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="渠道名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="渠道编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="所属客户经理" prop="accountManagerId">
                    <customer-manager-selector v-model="filter.accountManagerId"></customer-manager-selector>
                </FormItem>
                <FormItem label="审核状态" prop="auditState">
                    <agent-audit-state-selector v-model="filter.auditState" :filter="[12, 22]"></agent-audit-state-selector>
                </FormItem>
                <FormItem label="审核类型" prop="auditAction">
                    <agent-audit-type-selector v-model="filter.auditAction"></agent-audit-type-selector>
                </FormItem>
                <FormItem label="渠道类型" prop="types">
                    <agent-type-selector v-model="filter.types"></agent-type-selector>
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
        <Table :loading="loading" border stripe :columns="columns" :data="data" ></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import agentAuditStateSelector from "components/agent-audit-state-selector";
import agentTypeSelector from "components/agent-type-selector";
import dateRangeSelector from "components/date-range-selector";
import areaSelector from "components/area-selector";
import customerManagerSelector from "components/customer-manager-selector";
import agentAuditTypeSelector from "components/agent-audit-type-selector";
import pagination from "components/pagination";
import { getAgentAuditRefuseList } from "@/actions/agent";
export default {
    name: "agent-rejective",
    data() {
        return {
            loading: false,
            modalLoading: true,
            firstCheckState: false,
            secondCheckState: false,
            columns: [
                {
                    key: "name",
                    title: "渠道名称",
                    width: 160
                },
                {
                    key: "code",
                    title: "渠道编号",
                    width: 100
                },
                {
                    key: "typesDesc",
                    title: "渠道类型",
                    width: 100
                },
                {
                    key: "parentAgentName",
                    title: "所属渠道",
                    width: 140
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态",
                    width: 100
                },
                {
                    key: "province",
                    title: "归属省",
                    width: 100
                },
                {
                    key: "city",
                    title: "归属市",
                    width: 100
                },
                {
                    key: "accountManagerName",
                    title: "所属客户经理",
                    width: 120
                },
                {
                    key: "auditName",
                    title: "初审人",
                    width: 100
                },
                {
                    key: "updateTime",
                    title: "审核时间",
                    width: 150
                },
                {
                    key: "remark",
                    title: "审核意见",
                    width: 250
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
                                                name: "agent-detail",
                                                params: {
                                                    id: params.row.id,
                                                    auditState:
                                                        params.row.auditState
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看"
                            ),
                            params.row.auditState == "22"
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
                                                      name: "agent-edit",
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
                                : params.row.auditState == "21"
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
                                                        name: "agent-edit",
                                                        params: {
                                                            id: params.row.id
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        "编辑"
                                    )
                                  : params.row.auditState == "12"
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
                                                          name: "agent-edit",
                                                          params: {
                                                              id: params.row.id
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
                types: "",
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
            getAgentAuditRefuseList(this.filter).then(
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
        agentAuditStateSelector,
        dateRangeSelector,
        pagination,
        customerManagerSelector,
        areaSelector,
        agentAuditTypeSelector,
        agentTypeSelector
    }
};
</script>
