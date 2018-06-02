<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
          <!-- filterForm  引用ref重置 -->
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                 <!-- <FormItem label="支付通道"> -->
                    <!-- <payment-channels-selector></payment-channels-selector> -->
                <!-- </FormItem>  -->
                <FormItem label="支付类型" prop="productCode">
                    <payment-channels-selector v-model="filter.productCode"></payment-channels-selector>
                </FormItem>
               <FormItem label="商户订单号" prop="outTradeNo">
                    <Input v-model="filter.outTradeNo"></Input>
                </FormItem> 
                <!-- <FormItem label="商户名称" prop="merchantName">
                    <merchant-selector v-model="filter.merchantName"></merchant-selector>
                </FormItem>   -->
                  <FormItem label="对账日期" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem> 
                <FormItem label="通道订单号" prop="chargeId">
                    <Input v-model="filter.chargeId"></Input>
                </FormItem> 
                <FormItem label="交易金额">
                    <Input v-model="filter.minAmount" style="max-width:110px;"></Input>至 
                    <Input v-model="filter.maxAmount"  style="max-width:110px;"></Input>            
                </FormItem> 
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                    <!-- <Button type="ghost" @click="reset" class="margin-left-6">重置</Button> -->
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
    </div>
</template>

<script>
import dateRangeSelector from "components/date-range-selector";
// 支付类型
import paymentChannelsSelector from "components/payment-channels-selector";
// import merchantSelector from 'components/merchant-selector';

// import paytypeSelector from "components/paytype-selector";
import { getSettleCheckingCashOk } from "@/actions/reconcile";
import pagination from "components/pagination";
export default {
    name: "reconcile-flat",
    data() {
        return {
            // 定义开关 防止多次请求
            loading: false,
            columns: [
                {
                    key: "checkingDate",
                    title: "对账日期"
                },
                {
                    key: "checkingBatchNo",
                    title: "对账批次号"
                },
                {
                    key: "merchantName",
                    title: "商户名称"
                },
                {
                    key: "outTradeNo",
                    title: "商户订单号"
                },
                {
                    key: "chargeId",
                    title: "通道订单号"
                },
                {
                    key: "amount",
                    title: "交易金额(元)"
                },
                {
                    key: "institutionProductName",
                    title: "支付类型"
                },
                {
                    key: "chargeDate",
                    title: "交易时间"
                }
            ],
            filter: {
                limit: 10, //分页默认显示的页数
                offset: 0, //分页相关
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                beginDate: "",
                endDate: "", //两个都是时间控件相关
                productCode: "",
                outTradeNo: "",
                chargeId: "",
                minAmount: "",
                maxAmount: ""
            },
            // 贮存请求到的数据
            data: [],
            total: 0
        };
    },
    methods: {
        // 进入页面所请求的api  有四次调用
        loadData() {
            this.loading = true;
            getSettleCheckingCashOk(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        // html-type="submit"时调用请求
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        }
    },
    components: {
        dateRangeSelector,
        paymentChannelsSelector,
        // paytypeSelector,
        // merchantSelector,
        pagination
    }
};
</script>

