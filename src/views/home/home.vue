<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <!-- 账户信息 -->
         <Row :gutter="10">
            <Col span="24">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col span="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <div slot="title" class="todo-title">
                                <h3>维修信息</h3><span :style="{margin: '0 10px'}">记录时间：近30天</span> | <span :style="{margin: '0 10px'}">当前时间：{{currentTime}}</span> 
                            </div>
                            <div class="to-do-list-con">
                                <div class="todo-item finish">
                                    <div class="icon-ct">
                                        <img src="./wancheng.png" alt="">
                                    </div>
                                   <div class="num-ct">
                                         <p>已完成</p>
                                         <p class="num">2999</p>
                                     </div>
                                </div>
                                <div class="todo-item refuse">
                                    <div class="icon-ct">
                                        <img src="./bohui.png" alt="">
                                    </div>
                                    <div class="num-ct">
                                         <p>已驳回</p>
                                         <p class="num">2999</p>
                                     </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12" :style="{marginBottom: '10px'}">
                        <Card>
                           <div slot="title" class="todo-title">
                                <h3>待办事项</h3><span :style="{margin: '0 10px'}">实时更新</span> 
                            </div>
                            <div class="to-do-list-con">
                                <div class="todo-item verify">
                                    <div class="icon-ct">
                                        <img src="./shenhe.png" alt="">
                                     </div>
                                     <div class="num-ct">
                                         <p>待审核</p>
                                         <p class="num">2999</p>
                                     </div>
                                </div>
                                <div class="todo-item keeping">
                                    <div class="icon-ct">
                                        <img src="./weixiu.png" alt="">
                                    </div>
                                    <div class="num-ct">
                                         <p>待维修</p>
                                         <p class="num">2999</p>
                                     </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <div slot="title">
                    <ButtonGroup >
                        <Button :type="activeChartType==0?'primary':'default'" style="width:100px;"  @click="changeTabs(0)">已完成</Button>
                        <Button :type="activeChartType==1?'primary':'default'" style="width:100px;" @click="changeTabs(1)">待维修</Button>
                        <Button v-if="userName.userType==1" :type="activeChartType==2?'primary':'default'" style="width:100px;"  @click="changeTabs(2)">待审核</Button>
                    </ButtonGroup>
                </div>
                <div class="line-chart-con" style="height:300px;">
                    <service-requests :chartType="activeChartType" :days="activeDays"></service-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import visiteVolume from "./components/visiteVolume.vue";
import serviceRequests from "./components/serviceRequests.vue";
import agentRequests from "./components/agentRequests.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import transactionVolume from "./components/transactionVolume.vue";
import themeSwitchVue from "../main-components/theme-switch/theme-switch.vue";
import { getMenus } from "@/actions/sys";
export default {
  name: "home",
  data() {
    return {
      activeAgent: 7,
      activeVisite: 7,
      activeChartType: 0,
      activeDays: 7,
      userName: {},
      form: {},
      refund: {},
      merchantCheck: false,
      agentCheck: false,
      transactionRejective: false,
      rejective: false,
      form: {
        bankClassCode: "",
        provinceId: "",
        cityId: "",
        bankInfoCode: "",
        bankInfo: ""
      }
    };
  },
  computed:{
      currentTime(){
          return this.getCurrentTime();
      }
  },
  methods: {
    agentDate(item) {
      this.activeAgent = item;
    },
    visiteDate(item) {
      this.activeVisite = item;
    },
    changeTabs(activeTab) {
      this.activeChartType = activeTab;
      this.activeDays = 7;
    },
    changeDays(days) {
      this.activeDays = days;
    },
    check() {
      let accessMenu = [];
      getMenus().then(res => {
        res.data &&
          res.data.forEach(item => {
            accessMenu.push({ item });
          });
      });
    },
    getCurrentTime() {
      let myDate = new Date();
      let year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      let month=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
      let day=myDate.getDate(); //获取当前日(1-31)
      return year+'年'+month+'月'+day+'日'
    }
  },
  created() {
    let name = this.$store.state.user.userInfo;
    this.userName = name;
    this.check();
  },
  components: {
    visiteVolume,
    serviceRequests,
    agentRequests,
    dataSourcePie,
    transactionVolume
  }
};
</script>