
<template>
    <div>
      <Card>
        <div slot="title" style='height:32px;line-height:32px;'>
            详情
        </div>
        <!-- <div  slot="extra" >
          <div v-if="showBtn">
              <Button type="success" @click="goApply">同意</Button>
              <Button type="error" @click="goResuse">驳回</Button>
          </div>
           
        </div> -->
        <div>
            <Row>
                <Col span="12" class="padding-20 base-info">
                    <p>使用单位：{{form.departName||'暂无'}}</p>
                    <p>所属区域：{{form.areaName||'暂无'}}</p>
                    <p>位置：{{form.place||'暂无'}}</p>
                    <p>物品名称：{{form.name||'暂无'}}</p>
                    <p>责任人：{{form.chargeUser||'暂无'}}</p>
                    <p>巡检人：{{form.patrolUser||'暂无'}}</p>
                    <p>备注：{{form.info||'暂无'}}</p>
                </Col>
            </Row>
        </div>
    </Card>
    <Card style="margin:10px 0;">
        <div slot="title" style='height:32px;line-height:32px;'>
            附件
        </div>
        <!-- <div  slot="extra" >
          <div v-if="showBtn">
              <Button type="success" @click="goApply">同意</Button>
              <Button type="error" @click="goResuse">驳回</Button>
          </div>
           
        </div> -->
        <div>
            <Row>
                <Col span="8" v-for="(item, index) in form.files" :key="index">
                  <a href="javascript:void(0);" @click="$downloadByForm('/down/'+item.id)">
                    {{item.name}}
                  </a>
                </Col>
            </Row>
        </div>
    </Card>
    </div>
    
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import departSelector from "components/depart-selector";
import { getParrolDetail } from "@/actions/depart";
export default {
  name: "check-detail",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    getAssetsDetail() {
      let { id } = this.$route.params;
      getParrolDetail(id).then(res => {
        this.form = res.data;
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
    }
  },
  activated() {
    this.getAssetsDetail();
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
  p {
    line-height: 1.8;
  }
}
.base-info-item {
  margin-right: 20px;
}
.model-center {
  text-align: center;
}
</style>

