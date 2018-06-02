<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="商户名称" prop="merchantId">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
                <p style="margin-left:60px;">温馨提示：该功能主要用于在星富通按系统交易总额分润时剔除某些特定商户</p>
            </Form>
        </Card>
        <div class="data-control">
            <Button type="primary" @click="$router.push({ name: 'settle-white-add' })">新增白名单</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
      <Modal
            v-model="firstCheckState"
            title="修改生效时间"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="firstCheckSubmit">
            <Form label-position="top">
               <FormItem label="生效时间" prop="_dateRange">
                    <date-range-selector style="width:100%" v-model="takeTime._dateRange" :start-date.sync="takeTime.beginDate" :end-date.sync="takeTime.endDate"></date-range-selector>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import pagination from "components/pagination";
import dateRangeSelector from "components/date-range-selector";
// import merchantCodeSelector from "components/merchant-code-selector";
import merchantSelector from "components/merchant-selector";
import {
    getSettleWhitelist,
    disableOrEnableWhitelist,
    addOrUpdateWhitelist
} from "@/actions/settle";
export default {
    name: "settle-white",
    data() {
        return {
            modalLoading: true,
            firstCheckState: false,
            loading: false,
            columns: [
                {
                    key: "merchantId",
                    title: "商户编号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "beginDate",
                    title: "有效开始日期"
                },
                {
                    key: "endDate",
                    title: "有效截止日期"
                },
                {
                    key: "stateDesc",
                    title: "状态"
                },
                {
                    key: "remark",
                    title: "备注"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 150,
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
                                            this.firstCheckState = true;
                                            this.takeTime.merchantId =
                                                params.row.merchantId;
                                            this.takeTime.id = params.row.id;
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            params.row.state === "1"
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
                                                      "确认要禁用吗？",
                                                      () => {
                                                          disableOrEnableWhitelist(
                                                              `disable/${
                                                                  params.row.id
                                                              }`
                                                          ).then(res => {
                                                              this.loadData();
                                                              this.$lf.message(
                                                                  "禁用成功",
                                                                  "success"
                                                              );
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
                                                      "确认要启用吗？",
                                                      () => {
                                                          disableOrEnableWhitelist(
                                                              `enable/${
                                                                  params.row.id
                                                              }`
                                                          ).then(res => {
                                                              this.loadData();
                                                              this.$lf.message(
                                                                  "启用成功",
                                                                  "success"
                                                              );
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
                merchantCode: "",
                merchantId: ""
            },
            takeTime: {
                _dateRange: ["", ""],
                beginDate: "",
                endDate: "",
                type: 1,
                id: ""
            },
            data: [],
            total: 0
        };
    },
    // 查询白名单
    methods: {
        loadData() {
            this.loading = true;
            getSettleWhitelist(this.filter).then(
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
        firstCheckSubmit() {
            let formData = this.takeTime;
            addOrUpdateWhitelist(formData).then(
                res => {
                    this.$lf.message("修改成功", "success");
                    this.firstCheckState = false;
                    this.loadData();
                },
                err => {
                    this.modalLoading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
        // merchanCode(val){
        //     console.log(val)
        // }
    },
    components: {
        dateRangeSelector,
        pagination,
        merchantSelector
        // merchantCodeSelector
    }
};
</script>
