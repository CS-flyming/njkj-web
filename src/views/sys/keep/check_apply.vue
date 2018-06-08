<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="物品名称"  >
                    <Input v-model="filter.name" placeholder="物品名称"  />
                </FormItem>
                <FormItem label="所属区域" >
                    <Select  v-model="filter.areaId" >
                        <Option value="0" >办公区</Option>
                        <Option value="1" >生活区</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属部门" >
                <departSelector v-model="filter.depatmentId"></departSelector>
            </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'check-add',query:{name:$route.name }})">新增异常记录</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import departSelector from "components/depart-selector";
import { getPatrolAutoList, deletePatrol } from "@/actions/depart";
export default {
  name: "check_apply",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "createTime",
          title: "巡检日期"
        },
        {
          key: "departName",
          title: "单位名称"
        },
        {
          key: "areaName",
          title: "所属区域"
        },
        {
          key: "place",
          title: "位置"
        },
        {
          key: "name",
          title: "物品名称"
        },
        {
          key: "phone",
          title: "联系方式"
        },
        {
          key: "chargeUser",
          title: "责任人"
        },
        {
          key: "patrolUser",
          title: "巡检人"
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
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "check-detail-edit",
                        params: {
                          id: params.row.id
                        },
                        query: {
                          from: this.$route.name
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "5px"
              //       },
              //       on: {
              //         click: () => {
              //           this.$router.push({
              //             name: "assets-detail",
              //             params: {
              //               id: params.row.id
              //             },
              //             query: {
              //               item: JSON.stringify(params.row)
              //             }
              //           });
              //         }
              //       }
              //     },
              //     "驳回"
              //   ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      deletePatrol(params.row.id).then(
                        res => {
                          this.loading = false;
                          this.$lf.message("删除成功", "success");
                          this.loadData();
                        },
                        () => {
                          this.loading = false;
                        }
                      );
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      style: {
                        margin: "0 5px"
                      },
                      props: {
                        type: "error",
                        placement: "top"
                      }
                    },
                    "删除"
                  )
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning"
                  },
                  style: {
                    margin: "0 5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "check-detail",
                        params: {
                          id: params.row.id
                        },
                        query: {
                          from: this.$route.name
                        }
                      });
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      filter: {
        limit: 10,
        offset: 0,
        name: "",
        number: "",
        status: ""
      },
      data: [],
      total: 0
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getPatrolAutoList(this.filter).then(res => {
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
    pagination,
    departSelector
  }
};
</script>
