<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="资产名称">
                    <Input v-model="filter.name" clearable/>
                </FormItem>
                 <FormItem label="资产编号">
                    <Input v-model="filter.number" clearable/>
                </FormItem>
                <FormItem label="状态" >
                    <Select  v-model="filter.status"  clearable>
                        <Option value="1" >使用中</Option>
                        <Option value="0" >报废</Option>
                    </Select>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'assets-add' })">新增资产</Button>
            <Button type="primary" @click="$downloadByForm('assests/down',filter)">导出</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getAssetsList, deleteAssetsById } from "@/actions/depart";
export default {
  name: "assets_list",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "assetsinfo",
          title: "资产基本信息",
          render: (h, params) => {
            return h("div", [
              h("p", `名称：${params.row.name}`),
              h("p", `条形码编号：${params.row.code}`)
            ]);
          },
          width: 200
        },
        {
          key: "departName",
          title: "所属部门"
        },
        {
          key: "toTime",
          title: "配发时间"
        },
        {
          key: "areaName",
          title: "所属区域"
        },
        {
          key: "statusDesc",
          title: "资产状态"
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
                        name: "assets-edit",
                        params: {
                          id: params.row.id
                        },
                        query: {
                          item: JSON.stringify(params.row)
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
                    type: "warning"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "assets-detail",
                        params: {
                          id: params.row.id
                        },
                        query: {
                          item: JSON.stringify(params.row)
                        }
                      });
                    }
                  }
                },
                "查看"
              ),
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
                      deleteAssetsById(params.row.id).then(res => {
                        this.$lf.message("删除成功", "success");
                        this.loadData();
                      });
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
      getAssetsList(this.filter).then(res => {
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
    pagination
  }
};
</script>
