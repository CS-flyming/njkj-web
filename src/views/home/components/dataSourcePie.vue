<template>
    <div style="width:100%;height:100%;" id="data_source_con">
        <div style="text-align: center;line-height:250px;">{{message}}</div>        
    </div>
</template>

<script>
import echarts from "echarts";
import { getHomePageDailyPayRatioStore } from "@/actions/sys";
export default {
    name: "dataSourcePie",
    data() {
        return {
            message: "暂无数据"
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let ratio = [];
            let storeName = [];
            let raString = "";
            getHomePageDailyPayRatioStore().then(res => {
                if (res.data.length == 0) {
                    this.message = "暂无数据";
                } else {
                    res.data.forEach(element => {
                        if (element.ratio.length == 7) {
                            raString = element.ratio.substr(0, 6);
                        } else if (element.ratio.length == 6) {
                            raString = element.ratio.substr(0, 5);
                        } else if (element.ratio.length == 5) {
                            raString = element.ratio.substr(0, 4);
                        }
                        ratio.push({
                            name: element.storeName,
                            value: raString
                        });
                        storeName.push(element.storeName);
                    });
                    this.echart(ratio, storeName);
                }
            });
        },
        echart(ratio, storeName) {
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(
                    document.getElementById("data_source_con")
                );
                const option = {
                    tooltip: {
                        trigger: "item",
                        formatter: "{a}:{c} (%)"
                    },
                    legend: {
                        orient: "vertical",
                        left: "right",
                        data: storeName
                    },
                    series: [
                        {
                            name: "收款比例",
                            type: "pie",
                            radius: "66%",
                            center: ["50%", "60%"],
                            data: ratio,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener("resize", function() {
                    dataSourcePie.resize();
                });
            });
        }
    }
};
</script>
