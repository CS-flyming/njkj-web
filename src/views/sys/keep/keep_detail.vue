
<template>
    <Card>
        <div slot="title" style='height:32px;line-height:32px;'>
            详情
        </div>
        <div  slot="extra" v-if="form.status!=3">
            <Button type="success" @click="goApply">同意</Button>
            <Button type="error" @click="goResuse">驳回</Button>
        </div>
        <div>
            <div class="base-info">
                <div>
                    <span class="base-info-item">维修申请单号：<span>{{form.code}}</span></span>
                    <span class="base-info-item">所属区域：<span>{{form.areaDesc}}</span></span>
                    <span class="base-info-item">状态：<span>{{form.statusDesc}}</span></span>
                </div>
                <div style="margin-top:20px;">
                    <Icon type="checkmark-circled" color="#20be5f"></Icon>
                    <span class="base-info-item">{{form.departIdName}}</span>
                    <span class="base-info-item">提交报修维修单</span>
                    <span class="base-info-item">{{form.createTime}}</span>
                </div>
                 <div style="margin-top:20px;"  v-if="form.status==3">
                    <Icon type="close-circled" color="#f36042"></Icon>
                    <span class="base-info-item">{{form.verifyUser||'未知'}}</span>
                    <span class="base-info-item">驳回了该申请单</span>
                    <span class="base-info-item">{{form.verifyTime}}</span>
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
                    <TabPane label="维修历史" name="name3">{{form.info||'暂无'}}</TabPane>
                </template>
                <template v-else>
                     <TabPane label="驳回原因" name="name2">{{form.reason||'暂无'}}</TabPane>
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
    </Card>
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import departSelector from "components/depart-selector";
import { getKeepUserSelect, shKeepVerify } from "@/actions/depart";
export default {
  name: "keep-detail",
  data() {
    return {
      loading: false,
      modal1: false,
      modal2:false,
      bhbz:'',
      keepUserId: "",
      keepUserArr: [],
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
  methods: {
    getAssetsDetail() {
      let { item } = this.$route.query;
      this.form = JSON.parse(item);
      console.log(this.form);
    },
    applyCancel(){
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
    applyOk() {
      let { id } = this.$route.params;
      let { from } = this.$route.query;
      if (this.keepUserId) {
        shKeepVerify({
          id,
          code: "1",
          keepUserId: this.keepUserId
        }).then(
          res => {
            this.loading = false;
            this.$lf.message("安排维修人员成功", "success");
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
</style>

