
<template>
    <Card>
        <div slot="title" style='height:32px;line-height:32px;'>
            详情
        </div>
        <div  slot="extra" >
          <div v-if="showBtn">
              <Button type="success" @click="goApply">同意</Button>
              <Button type="error" @click="goResuse">驳回</Button>
          </div>
          <div v-if="showBtn1">
              <Button type="success" @click="goApply1">完成</Button>
              <Button type="error" @click="goResuse">驳回</Button>
          </div>
          <div v-if="showBtn2">
              <Button type="success" @click="goApply2">添加评论</Button>
          </div>
        </div>
        <div>
            <div class="base-info">
                <div>
                    <span class="base-info-item">维修申请单号：<span>{{form.code}}</span></span>
                    <span class="base-info-item">所属区域：<span>{{form.areaDesc}}</span></span>
                    <span class="base-info-item">状态：<span>{{form.statusDesc}}</span></span>
                </div>
            </div>
            <Tabs value="name1">
                <TabPane label="基本信息" name="name1">
                    <Row>
                        <Col span="12" class="padding-20">
                            <p>名称：{{form.name||'暂无'}}</p>
                            <p>使用单位：{{form.departIdName||'暂无'}}</p>
                            <p>所属区域：{{form.areaDesc||'暂无'}}</p>
                            <p>物品价值：{{form.value||'暂无'}}</p>
                            <p>配发日期：{{form.toTime||'暂无'}}</p>
                            <p>所在位置：{{form.place||'暂无'}}</p>
                            <p>联系人：{{form.person||'暂无'}}</p>
                             <p>联系人电话：{{form.phone||'暂无'}}</p>
                            <p>状态：{{form.statusDesc||'暂无'}}</p>
                            <p>备注：{{form.bz||'暂无'}}</p>
                        </Col>
                        <Col span="12" class="padding-20">
                            <p>资产条形码</p>
                            <p><img :src="$ApiUrl+'/'+form.codeUrl" alt=""></p>
                        </Col>
                    </Row>
                </TabPane>
                <template v-if="form.status!=3">
                    <TabPane label="问题描述" name="name2">{{form.info||'暂无'}}</TabPane>
                    <TabPane label="维修历史" name="name3">
                      <div>
                        <div class="wx-item" v-for="(item, index) in history" :key="index">
                          <p style="padding:10px;">{{item}}</p>
                        </div>
                        <p style="padding:10px;" v-if="!history.length">暂无数据</p>
                      </div>
                      
                    </TabPane>
                    <TabPane label="维修动态" name="name4">
                      <div>
                        <div class="wx-item" v-for="(item, index) in dongtai" :key="index">
                          <p style="padding:5px;">
                            维修时间：{{item.keepTime}}
                          </p>
                          <p style="padding:5px;">
                            维修信息：{{item.info}}
                          </p>
                          <p style="padding:5px;">
                            维修人：{{item.keepUser}}
                          </p>
                          <div style="padding:5px;">
                            <p>附件：</p>
                              <Row>
                                  <Col span="8" v-for="(item2, index2) in item.files" :key="index2">
                                    <a href="javascript:void(0);" @click="$downloadByForm('/down/'+item2.id)">
                                      {{item2.name}}
                                    </a>
                                  </Col>
                              </Row>
                          </div>
                        </div>
                        <p style="padding:10px;" v-if="!dongtai.length">暂无数据</p>
                      </div>
                    </TabPane>
                  </template>
                <template v-if="form.status==2||form.status==3">
                     <TabPane label="驳回原因" name="name4">{{form.reason||'暂无'}}</TabPane>
                </template>
                 <template v-if="form.status==5">
                     <TabPane label="综合评价" name="name5">
                       <div style="padding:20px;">
                         <p>
                           评价满意度：{{form.remarkDesc||'暂无'}}
                         </p>
                         <p style="margin-top:10px;">
                           评价内容：{{form.remarkInfo||'暂无'}}
                         </p>
                       </div>
                     </TabPane>
                </template>
                
            </Tabs>
            
        </div>
        <Modal
            v-model="modal1"
            title="审核同意"
            @on-ok="applyOk">
            <div class="model-center">
                <div>
                    <Icon size="96" type="checkmark-circled" color="#66d661"></Icon>
                </div>
                <div style="color:#66d661;font-size:16px;">
                    审核通过，请选择维修人员进行维修
                </div>
                <div style="margin-top:20px;">
                    <Form 
                        :label-width="120" 
                        label-position="right">
                        <FormItem label="选择维修人员" required>
                            <Select  v-model="keepUserId" >
                                <Option v-for="item in keepUserArr" :key="item.id" :value="item.id" >{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="modal3"
            title="完成"
            @on-ok="applyOk">
            <div class="model-center">
                <div>
                    <Icon size="96" type="checkmark-circled" color="#66d661"></Icon>
                </div>
                <div style="color:#66d661;font-size:16px;">
                    维修单已完成！
                </div>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            title="审核驳回"
            @on-ok="applyCancel">
            <div class="model-center">
                <div>
                    <Icon size="96" type="close-circled" color="#f36042"></Icon>
                </div>
                <div style="color:#f36042;font-size:16px;">
                    您将驳回该申请，请填写驳回原因
                </div>
                <div style="margin-top:20px;">
                    <Input type="textarea" v-model="bhbz" :rows="4"/>
                </div>
            </div>
        </Modal>
         <Modal
            v-model="modal4"
            title="评价"
            @on-ok="applyOk2">
            <div class="model-center">
                <div>
                   <Icon size="96" type="checkmark-circled" color="#66d661"></Icon>
                </div>
                <div style="margin-top:20px;">
                   <RadioGroup v-model="plForm.remark">
                        <Radio label="1">满意</Radio>
                        <Radio label="2">一般</Radio>
                        <Radio label="0">不满意</Radio>
                    </RadioGroup>
                </div>
                <div style="margin-top:20px;">
                    <Input type="textarea" v-model="plForm.remarkInfo" :rows="4"/>
                </div>
            </div>
        </Modal>
    </Card>
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import departSelector from "components/depart-selector";
import {
  getKeepUserSelect,
  shKeepVerify,
  getKeepDetail,
  subKeepRemark
} from "@/actions/depart";

export default {
  name: "keep-detail",
  data() {
    return {
      loading: false,
      modal1: false,
      modal2: false,
      bhbz: "",
      userType: "",
      // showBtn: false,
      keepUserId: "",
      keepUserArr: [],
      dongtai: [],
      history: [],
      modal3: false,
      modal4: false,
      bhbz: "",
      userType: "",
      keepUserId: "",
      keepUserArr: [],
      plForm: {
        remark: "1",
        remarkInfo: ""
      },
      form: {
        name: "",
        departId: "",
        areaId: "0",
        value: "",
        toTime: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入物品名称",
            trigger: "blur"
          }
        ],
        departId: [
          {
            required: true,
            message: "请选择使用单位",
            trigger: "blur"
          }
        ],
        areaId: [
          {
            required: true,
            message: "请选择所属区域",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择资产状态",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    showBtn() {
      let userType =
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.userTypes;
      return this.form.status == "0" && userType == "0";
    },
    showBtn1() {
      let userType =
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.userTypes;
      return this.form.status == "1" && userType == "0";
    },
    showBtn2() {
      let userType =
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.userTypes;
      return this.form.status == "5" && userType == "1";
    }
  },
  methods: {
    getAssetsDetail() {
      let { id } = this.$route.params;
      getKeepDetail(id).then(res => {
        this.form = res.data.keep;
        this.dongtai = res.data.dongtai;
        this.history = res.data.history;
      });
    },
    applyCancel() {
      let { id } = this.$route.params;
      let { from } = this.$route.query;
      if (this.bhbz) {
        shKeepVerify({
          id,
          code: "0",
          reason: this.bhbz
        }).then(
          res => {
            this.loading = false;
            this.$lf.message("驳回成功", "success");
            closeCurrentErrPage(this, from);
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.$lf.message("请填写驳回原因", "error");
      }
    },
    applyOk2() {
      let { id } = this.$route.params;
      let { from } = this.$route.query;
      subKeepRemark({ id, ...this.plForm }).then(
        res => {
          this.loading = false;
          this.plForm.remark = "1";
          this.plForm.remarkInfo = "";
          this.$lf.message("操作成功", "success");
          closeCurrentErrPage(this, from);
        },
        () => {
          this.loading = false;
          this.plForm.remark = "1";
          this.plForm.remarkInfo = "";
        }
      );
    },
    applyOk() {
      let { id } = this.$route.params;
      let { from } = this.$route.query;
      let status = this.form.status;
      if (status == 1 || this.keepUserId) {
        shKeepVerify({
          id,
          code: "1",
          keepUserId: this.keepUserId
        }).then(
          res => {
            this.loading = false;
            this.$lf.message("操作成功", "success");
            closeCurrentErrPage(this, from);
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.$lf.message("请选择维修人员", "error");
      }
    },
    goApply() {
      this.modal1 = true;
    },
    goApply1() {
      this.modal3 = true;
    },
    goApply2() {
      this.modal4 = true;
    },
    goResuse() {
      this.modal2 = true;
    }
  },
  activated() {
    this.getAssetsDetail();
    getKeepUserSelect().then(res => {
      this.keepUserArr = res.data;
    });
  },
  components: {
    departSelector
  }
};
</script>
<style lang="less">
.padding-20 {
  padding: 20px;
}
.base-info {
  padding: 20px;
  background-color: aliceblue;
}
.base-info-item {
  margin-right: 20px;
}
.model-center {
  text-align: center;
}
.wx-item {
  box-shadow: inset 0px 0px 18px 0px #003f8047;
  margin-top: 20px;
}
</style>

