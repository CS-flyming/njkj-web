<style lang="less">
</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="登录账号">
                    <Input v-model="filter.name" clearable></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="filter.phone" clearable></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'sys-manager-add' })">新建用户</Button>
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
          title: "登录账号",
          width: 150
        },
        {
          key: "typesDesc",
          title: "所属角色",
          width: 150
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
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "sys-manager-edit",
                        params: {
                          id: params.row.id
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
                      this.$lf.confirm("确认要密码重置吗？", () => {
                        resetManagerPwdById(params.row.id).then(res => {
                          this.$lf.message("密码重置成功", "success");
                        });
                      });
                    }
                  }
                },
                "重置密码"
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
                      this.$lf.confirm("是否确认删除该操作员？", () => {
                        deleteManagerById(params.row.id).then(res => {
                          this.$lf.message("删除成功", "success");
                          // this.data.splice(params.index, 1);
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
