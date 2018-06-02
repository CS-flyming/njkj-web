<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
          <!-- filterForm  引用ref重置 -->
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                  <FormItem label="统计日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <template v-if="isAdmin">
                  <FormItem label="商户编号" prop="merchantCode">
                      <Input v-model="filter.merchantCode"></Input>
                  </FormItem>
                  <FormItem label="商户名称" prop="merchantId">
                      <merchant-selector v-model="filter.merchantId"></merchant-selector>
                  </FormItem>
                </template>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <Button type="primary" @click="downloadExcel">导出</Button>                                                            
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data" ></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
import merchantSelector from "components/merchant-selector";
import pagination from "components/pagination";
import { getMerchantDailyCharge } from "@/actions/statictics";
export default {
    name: "statictics-index",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "agentName",
                    title: "所属渠道"
                },
                {
                    key: "payRecord",
                    title: "支付成功总笔数"
                },

                {
                    key: "payAmount",
                    title: "支付成功总金额(元)"
                },
                {
                    key: "refundRecord",
                    title: "退款总笔数"
                },
                {
                    key: "refundAmount",
                    title: "退款总金额(元)"
                },
                {
                    key: "amount",
                    title: "交易净额(元)"
                },
                {
                    key: "dailyTime",
                    title: "统计当前日期"
                }
            ],
            filter: {
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                merchantCode: "", //定义名称为string类型
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                merchantId: "", //定义编号为code类型
                beginDate: "",
                endDate: "" //两个都是时间控件相关
            },
            // 贮存请求到的数据
            data: [],
            total: 0
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getMerchantDailyCharge(this.filter).then(
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
        // html-type="submit"时调用请求
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        downloadExcel() {
            this.$util.downloadExcel(
                "settle/charge/daily/collect/export/merchant",
                this.filter
            );
        }
    },
    computed: {
        isAdmin() {
            let userType = this.$store.state.user.userInfo.userTypes;
            return userType == "1";
        }
    },
    components: {
        dateRangeSelector,
        pagination,
        merchantSelector
    }
};
</script>

