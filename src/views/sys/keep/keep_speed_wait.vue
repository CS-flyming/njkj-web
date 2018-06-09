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
            <Button type="primary" @click="$router.push({ name: 'keep-apply-add',query:{name:$route.name }})">维修单申请</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import departSelector from "components/depart-selector";
import { getSpeedKeeping } from "@/actions/depart";
export default {
  name: "keep_speed_wait",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "code",
          title: "维修申请单号"
        },
        {
          key: "departIdName",
          title: "报修单位"
        },
        {
          key: "name",
          title: "报修物品"
        },
        {
          key: "createTime",
          title: "报修时间"
        },
        {
          key: "areaDesc",
          title: "所属区域"
        },
        {
          key: "statusDesc",
          title: "状态"
        },
        {
          key: "number",
          title: "物品编号"
        },
        {
          type: "action",
          title: "操作",
          //   width: 180,
          render: (h, params) => {
            return h("div", [
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "success",
              //         
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
              //     "同意"
              //   ),
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         
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
                "Button",
                {
                  props: {
                    type: "primary",
                    
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "keep-detail",
                        params: {
                          id: params.row.id
                        },
                        query: {
                          item: JSON.stringify(params.row),
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
      getSpeedKeeping(this.filter).then(res => {
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
