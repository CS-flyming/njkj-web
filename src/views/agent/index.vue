<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="渠道名称" prop="id">
                    <agents-two-selector v-model="filter.id"></agents-two-selector>
                </FormItem>
                <FormItem label="渠道编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="所属业务员" prop="salesmanId">
                    <salesman-selector v-model="filter.salesmanId"></salesman-selector>
                </FormItem>
                <!--<FormItem label="审核状态" prop="auditState">
                    <agent-audit-state-selector v-model="filter.auditState"></agent-audit-state-selector>
                </FormItem>-->
                <FormItem label="冻结状态" prop="state">
                    <agent-state-selector v-model="filter.state"></agent-state-selector>
                </FormItem>
                <FormItem label="渠道类型" prop="types">
                    <agent-type-selector v-model="filter.types"></agent-type-selector>
                </FormItem>
                 <FormItem label="查询维度" prop="queryDimension" v-if="filter.id">
                    <merchant-dimension-selector v-model="filter.queryDimension"></merchant-dimension-selector>
                </FormItem>
                <FormItem label="创建时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
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
import agentStateSelector from "components/agent-state-selector";
import agentAuditStateSelector from "components/agent-audit-state-selector";
import dateRangeSelector from "components/date-range-selector";
import merchantDimensionSelector from "components/merchant-dimension-selector";
import salesmanSelector from "components/salesman-selector";
import agentsTwoSelector from "components/agents-two-selector";
import agentTypeSelector from "components/agent-type-selector";
import pagination from "components/pagination";
import {
    getAgentList,
    disableOrEnableAgent,
    resetAgentPwd
} from "@/actions/agent";
export default {
    name: "agent-index",
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
                    key: "name",
                    title: "渠道名称"
                },
                {
                    key: "code",
                    title: "渠道编号"
                },
                {
                    key: "typesDesc",
                    title: "渠道类型"
                },
                {
                    key: "parentAgentName",
                    title: "所属渠道"
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
                    key: "createrName",
                    title: "创建人"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 240,
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
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看"
                            ),
                            params.row.auditState == "21"
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
                                : params.row.auditState == "22"
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
                                    : "",
                            params.row.state === "-1"
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
                                                          disableOrEnableAgent(
                                                              `enable/${
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
                                                          disableOrEnableAgent(
                                                              `disable/${
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
                                                "确认要密码重置吗？",
                                                () => {
                                                    resetAgentPwd(
                                                        params.row.id
                                                    ).then(res => {
                                                        this.$lf.message(
                                                            "密码重置成功",
                                                            "success"
                                                        );
                                                    });
                                                }
                                            );
                                        }
                                    }
                                },
                                "重置密码"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                id: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                code: "",
                beginDate: "",
                endDate: "",
                salesmanId: "",
                auditState: "",
                state: "",
                queryDimension: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getAgentList(this.filter).then(
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
                disableOrEnableAgent("batch/disable", { agentIds: ids }).then(
                    res => {
                        this.loadData();
                        this.$lf.message("冻结成功", "success");
                        this.disable = false;
                    },
                    err => {
                        this.disable = false;
                    }
                );
            }
        },
        handleBatchUnfreeze(selection) {
            let ids = this.selectedSelection.map(item => {
                return item.id;
            });
            if (ids.length > 0) {
                this.enable = true;
                disableOrEnableAgent("batch/enable", { agentIds: ids }).then(
                    res => {
                        this.loadData();
                        this.$lf.message("解冻成功", "success");
                        this.enable = false;
                    },
                    err => {
                        this.enable = false;
                    }
                );
            }
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    components: {
        agentStateSelector,
        agentAuditStateSelector,
        dateRangeSelector,
        pagination,
        agentsTwoSelector,
        salesmanSelector,
        agentTypeSelector,
        merchantDimensionSelector
    }
};
</script>
