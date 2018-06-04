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
            <Button type="primary" @click="$router.push({ name: 'assets-add' })">维修单申请</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import { getKeepMyList } from "@/actions/depart";
export default {
  name: "keep_apply",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "number",
          title: "编号"
        },
        {
          key: "code",
          title: "维修申请单号"
        },
        {
          key: "departIdName",
          title: "报修单位"
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
          key: "keepUserId",
          title: "维修人员"
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
                    type: "text",
                    size: "small"
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
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$lf.confirm("是否确认删除该资产？", () => {
                        deleteAssetsById(params.row.id).then(res => {
                          this.$lf.message("删除成功", "success");
                          this.loadData();
                        });
                      });
                    }
                  }
                },
                "删除"
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
      getKeepMyList(this.filter).then(res => {
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
