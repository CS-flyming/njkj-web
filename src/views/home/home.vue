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
                                <h3>维修信息</h3><span :style="{margin: '0 10px'}">记录时间：最近{{filter.day}}天</span> | <span :style="{margin: '0 10px'}">当前时间：{{currentTime}}</span> 
                            </div>
                            <div class="to-do-list-con">
                                <div class="todo-item finish">
                                    <div class="icon-ct">
                                        <img src="./wancheng.png" alt="">
                                    </div>
                                   <div class="num-ct">
                                         <p>已完成</p>
                                         <p class="num">{{chartData.finish}}</p>
                                     </div>
                                </div>
                                <div class="todo-item refuse">
                                    <div class="icon-ct">
                                        <img src="./bohui.png" alt="">
                                    </div>
                                    <div class="num-ct">
                                         <p>已驳回</p>
                                         <p class="num">{{chartData.refuse}}</p>
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
                                         <p class="num">{{chartData.verify}}</p>
                                     </div>
                                </div>
                                <div class="todo-item keeping">
                                    <div class="icon-ct">
                                        <img src="./weixiu.png" alt="">
                                    </div>
                                    <div class="num-ct">
                                         <p>待维修</p>
                                         <p class="num">{{chartData.keeping}}</p>
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
                        <Button :type="filter.status==2?'primary':'default'" style="width:100px;"  @click="changeTabs(2)">已完成</Button>
                        <Button :type="filter.status==1?'primary':'default'" style="width:100px;" @click="changeTabs(1)">待维修</Button>
                        <Button v-if="userName.userTypes=='0'" :type="filter.status==0?'primary':'default'" style="width:100px;"  @click="changeTabs(0)">待审核</Button>
                    </ButtonGroup>
                </div>
                <div>
                    <Row style="border-bottom:1px solid #e5e5e5;padding:10px 0;">
                        <Col span="4">
                            <Select  v-model="filter.day">
                                <Option value="30" >最近30天</Option>
                                <Option value="7" >最近7天</Option>
                            </Select>
                        </Col>
                        <Col span="4">
                            <Select  v-model="filter.areaId" placeholder="维修区域">
                                <Option value="" >全部维修区域</Option>
                                <Option value="0" >办公区</Option>
                                <Option value="1" >生活区</Option>
                            </Select>
                        </Col>
                        <Col span="4">
                            <departSelector v-model="filter.departId"></departSelector>
                        </Col>
                    </Row>
                </div>
                <div class="line-chart-con" style="height:300px;">
                    <Row>
                        <Col span="18" style="height:300px;">
                            <service-requests  v-bind:chartData="chartDataRows"></service-requests>
                        </Col>
                        <Col span="6" style="height:300px;">
                            <div style="padding:50px 0 0;">
                                <p>历史维修量：</p>
                                <h1>{{chartData.total}}</h1>
                                <p style="margin-top:5px">时间：最近{{filter.day}}天</p>
                                <p style="margin-top:5px">维修区域：{{chartData.areaName||'全部维修区域'}}</p>
                                <p style="margin-top:5px">单位：{{chartData.departName||'全部单位'}}</p>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import serviceRequests from "./components/serviceRequests.vue";
import departSelector from "components/depart-selector";
import { getMenus } from "@/actions/sys";
import { getIndexData } from "@/actions/depart";
export default {
  name: "home",
  data() {
    return {
      chartData: {
        refuse: 0,
        finish: 0,
        verify: 4,
        total: 0,
        keeping: 0
      },
      chartDataRows: [],
      filter: {
        areaId: "",
        departId: "",
        status: "2",
        day: "30"
      }
    };
  },
  computed: {
    currentTime() {
      return this.getCurrentTime();
    }
  },
  methods: {
    changeTabs(activeTab) {
      this.filter.status = activeTab;
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
      let month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let day = myDate.getDate(); //获取当前日(1-31)
      return year + "年" + month + "月" + day + "日";
    },
    getIndexData() {
      getIndexData(this.filter).then(res => {
        this.chartData = res.data;
        this.chartDataRows = res.data.rows;
      });
    }
  },
  created() {
    let name = this.$store.state.user.userInfo;
    this.userName = name;
    this.check();
    this.getIndexData();
  },
  components: {
    serviceRequests,
    departSelector
  },
  watch: {
    filter: {
      handler: function(val, oldVal) {
        this.$nextTick(() => {
          this.getIndexData();
        });
      },
      // 深度观察
      deep: true
    }
  }
};
</script>