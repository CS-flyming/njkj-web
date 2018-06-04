
<template>
    <Card>
        <div slot="title" style='height:32px;line-height:32px;'>
            基本信息
        </div>
        <div  slot="extra" >
            <Button type="error" @click="goLoseAssets">报废</Button>
            <Button type="primary" @click="goAssetsEdit">编辑</Button>
        </div>
        <div>
            <Row>
                <Col span="12" class="padding-20">
                    <p>名称：{{form.name||'--'}}</p>
                    <p>使用单位：{{form.departName||'--'}}</p>
                    <p>所属区域：{{form.areaName||'--'}}</p>
                    <p>物品价值：{{form.value||'--'}}</p>
                    <p>配发日期：{{form.toTime||'--'}}</p>
                    <p>状态：{{form.statusDesc||'--'}}</p>
                    <p>备注：{{form.bz||'--'}}</p>
                </Col>
                <Col span="12" class="padding-20">
                    <p>资产条形码</p>
                    <p><img :src="$ApiUrl+'/'+form.codeUrl" alt=""></p>
                </Col>
            </Row>
            
        </div>
    </Card>
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import departSelector from "components/depart-selector";
import { addOrUpdateAssets, loseAssetsById } from "@/actions/depart";
export default {
  name: "assets-detail",
  data() {
    return {
      loading: false,
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
    },
    submit(e) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let formData = this.form;
          addOrUpdateAssets(formData).then(
            res => {
              this.loading = false;
              this.$lf.message("保存成功", "success");
              closeCurrentErrPage(this, "assets_list");
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    },
    goAssetsEdit() {
      this.$router.push({
        name: "assets-edit",
        params: {
          id: this.form.id
        },
        query: {
          item: JSON.stringify(this.form)
        }
      });
    },
    goLoseAssets() {
      this.$lf.confirm("是否确认报废该资产？", () => {
        loseAssetsById(this.form.id).then(res => {
          this.$lf.message("报废成功", "success");
          closeCurrentErrPage(this, "assets_list");
        });
      });
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
</style>

