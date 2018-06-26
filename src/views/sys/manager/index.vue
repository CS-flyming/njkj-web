<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="登录账号">
                    <Input v-model="filter.name" clearable/>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="filter.phone" clearable/>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'sys-manager-add' })">新建用户</Button>
            <Button type="primary" @click="$downloadByForm('root/user/down',filter)">导出</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import pagination from "components/pagination";
import {
  getManagers,
  resetManagerPwdById,
  deleteManagerById
} from "@/actions/sys";
export default {
  name: "base_user",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "name",
          title: "登录账号"
        },
        {
          key: "typesDesc",
          title: "所属角色"
        },
        {
          title: "角色信息",
          render: (h, params) => {
            return h("span", params.row.realName + "/" + params.row.phone);
          }
        },
        {
          key: "statusDesc",
          title: "状态",
          width: 80
        },
        {
          type: "action",
          title: "操作",
          width: 200,
          render: (h, params) => {
            return h("div", [
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
                      deleteManagerById(params.row.id).then(
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
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "sys-manager-edit",
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
              )
            ]);
          }
        }
      ],
      filter: {
        limit: 10,
        offset: 0,
        userName: "",
        phone: ""
      },
      data: [],
      total: 0
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getManagers(this.filter).then(res => {
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
