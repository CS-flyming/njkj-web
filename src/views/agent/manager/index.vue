<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="业务员名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="filter.phone"></Input>
                </FormItem>
                <FormItem label="所属渠道" prop="agentId">
                    <agent-selector v-model="filter.agentId"></agent-selector>
                </FormItem>
                <FormItem label="是否启用" prop="state">
                    <Select v-model="filter.state" placeholder="不限">
                        <Option value="">不限</Option>
                        <Option value="1">是</Option>
                        <Option value="-1">否</Option>
                    </Select>
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
            <Button type="primary" @click="$router.push({ name: 'agent-manager-add' })">新建</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import agentSelector from "components/agent-selector";
import pagination from "components/pagination";
import {
    getAgentManagerList,
    disableOrEnableAgentManager,
    resetAgentManagerPwd
} from "@/actions/agent";
export default {
    name: "agent-manager",
    data() {
        return {
            loading: false,
            columns: [
                {
                    key: "userName",
                    title: "登录账号"
                },
                {
                    key: "phone",
                    title: "手机号"
                },
                {
                    key: "name",
                    title: "业务员姓名"
                },
                {
                    key: "sexDesc",
                    title: "性别"
                },
                {
                    key: "stateDesc",
                    title: "是否启用"
                },
                {
                    key: "agentName",
                    title: "所属渠道"
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
                    key: "remark",
                    title: "备注"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 200,
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
                                                name: "agent-manager-edit",
                                                params: {
                                                    id:
                                                        params.row
                                                            .agentManagerId
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
                                                "确认要密码重置吗？",
                                                () => {
                                                    resetAgentManagerPwd(
                                                        params.row
                                                            .agentManagerId
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
                                                      "是否确认禁用该业务员？",
                                                      () => {
                                                          disableOrEnableAgentManager(
                                                              {
                                                                  id:
                                                                      params.row
                                                                          .agentManagerId,
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
                                                      "是否确认启用该业务员？",
                                                      () => {
                                                          disableOrEnableAgentManager(
                                                              {
                                                                  id:
                                                                      params.row
                                                                          .agentManagerId,
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
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                phone: "",
                beginDate: "",
                endDate: "",
                state: "",
                agentId: ""
            },
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getAgentManagerList(this.filter).then(
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
        dateRangeSelector,
        pagination,
        agentSelector
    }
};
</script>
