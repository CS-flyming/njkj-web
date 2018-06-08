<template>        
    <div style="width:100%;height:100%;" id="service_requests">
        <div style="text-align: center;line-height:250px;">{{message}}</div>         
    </div>    
</template>

<script>
import echarts from "echarts";
export default {
  name: "serviceRequests",
  props: {
    chartType: "",
    days: "",
    chartData: {
      type: Array,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return [];
      }
    }
  },
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
    chartData: {
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
      let data = [],
        num = [];
      this.chartData &&
        this.chartData.forEach(element => {
          data.push(element.time);
          num.push(element.count);
        });
      this.echart(data, num);
    },
    echart(data, num) {
      let labels = ["交易金额", "交易笔数", "退款金额", "退款笔数"];
      this.$nextTick(() => {
        let serviceRequests = echarts.init(
          document.getElementById("service_requests")
        );
        serviceRequests.clear();
        const option = {
          noDataLoadingOption: {
            text: "暂无数据",
            effect: "bubble",
            effectOption: {
              effect: {
                n: 0
              }
            }
          },
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
              name: "维修数",
              type: "line",
              smooth: true,
              data: num
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
