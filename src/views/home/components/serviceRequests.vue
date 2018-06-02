<template>        
    <div style="width:100%;height:100%;" id="service_requests">
        <div style="text-align: center;line-height:250px;">{{message}}</div>         
    </div>    
</template>

<script>
import echarts from "echarts";
import { getHomePageDailyAmountOrNumCount } from "@/actions/sys";
export default {
    name: "serviceRequests",
    props: ["chartType", "days"],
    data() {
        return {
            message: "暂无数据"
        };
    },
    computed: {
        formData() {
            return {
                method:
                    this.chartType == 0 || this.chartType == 1
                        ? "xft.trade.pay"
                        : "xft.trade.refund",
                days: this.days
            };
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        "formData.method": {
            handler: function(val, oldVal) {
                this.$nextTick(() => {
                    this.init();
                });
            },
            // 深度观察
            deep: true
        }
    },
    methods: {
        init() {
            let data = [];
            let num = [];
            let amount = [];
            let type =
                this.chartType == 0 || this.chartType == 2 ? "amount" : "num";
            getHomePageDailyAmountOrNumCount(type, this.formData).then(res => {
                res.data.forEach(element => {
                    data.push(element.ddate);
                    amount.push(element.amount);
                    num.push(element.num);
                });
                this.echart(data, num, amount);
            });
        },
        echart(data, num, amount) {
            let labels = ["交易金额", "交易笔数", "退款金额", "退款笔数"];
            this.$nextTick(() => {
                let serviceRequests = echarts.init(
                    document.getElementById("service_requests")
                );
                serviceRequests.clear();
                const option = {
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: data
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: [
                        {
                            name: labels[this.chartType],
                            type: "line",
                            smooth: true,
                            data:
                                this.chartType == 0 || this.chartType == 2
                                    ? amount
                                    : num
                        }
                    ]
                };
                serviceRequests.setOption(option);
                window.addEventListener("resize", function() {
                    // 监控浏览器窗口大小
                    serviceRequests.resize();
                });
            });
        }
    }
};
</script>
