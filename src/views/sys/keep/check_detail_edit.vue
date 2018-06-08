
<template>
    <Card>
        <p slot="title">
            异常记录
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="form" 
            :label-width="120" 
            label-position="right"
            :rules="rules">
            <FormItem label="使用单位" prop="departId">
                <departSelector v-model="form.departId"></departSelector>
            </FormItem>
            <FormItem label="物品名称" prop="name">
                <Input v-model="form.name" placeholder="物品名称"  />
            </FormItem>
            <FormItem label="所属区域" prop="areaId" >
                <Select  v-model="form.areaId" >
                    <Option value="0" >办公区</Option>
                    <Option value="1" >生活区</Option>
                </Select>
            </FormItem>
             <FormItem label="物品所在位置" >
                <Input v-model="form.place" placeholder="物品所在位置"  />
            </FormItem>
            <FormItem label="责任人">
                <Input v-model="form.chargeUser" placeholder="责任人"  />
            </FormItem>
            <FormItem label="联系电话" prop="phone">
                <Input v-model="form.phone" placeholder="联系电话"  />
            </FormItem>
            <FormItem label="上传附件">
                <Upload 
                    ref="upload"
                    :action="upload.serviceUrl" 
                    :headers="upload.headers" 
                    name= "upload"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    multiple
                    >
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>

            </FormItem>
             <FormItem label="巡检人">
                <Input v-model="form.patrolUser" placeholder="巡检人"  />
            </FormItem>
            <FormItem label="具体信息" prop="info">
                <Input v-model="form.info" type="textarea" placeholder="具体信息"  />
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import { closeCurrentErrPage, uploadConfig } from "@/constants/constant";
import departSelector from "components/depart-selector";
import { addOrUpdateYichang, getParrolDetail } from "@/actions/depart";
export default {
  name: "check-detail-edit",
  data() {
    return {
      loading: false,
      upload: uploadConfig,
      form: {
        name: "",
        number: "",
        departId: "",
        place: "",
        areaId: "",
        patrolUser: "",
        chargeUser: "",
        phone: "",
        info: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入物品名称",
            trigger: "blur"
          }
        ],
        info: [
          {
            required: true,
            message: "请输入具体信息",
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
        phone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getAssetsDetail() {
      let { id } = this.$route.params;
      getParrolDetail(id).then(res => {
        this.form = res.data;
      });
    },
    handleSuccess(res, file) {
      console.log(res, file);
    },
    handleError(error, file, fileList) {
      this.$lf.message("上传出错", "error");
    },
    submit(e) {
      let { from } = this.$route.query;
      let type = name == "check_apply" ? "auto" : "time";
      this.$refs.form.validate(valid => {
        if (valid) {
          const fileList = this.$refs.upload.fileList;
          let wjIds = [];
          fileList &&
            fileList.forEach(el => {
              wjIds.push(el.response.data);
            });
          this.loading = true;
          let formData = this.form;
          formData.wjIds = wjIds || [];
          addOrUpdateYichang(type, formData).then(
            res => {
              this.loading = false;
              this.$lf.message("保存成功", "success");
              this.$refs.form.resetFields();
              closeCurrentErrPage(this, from);
            },
            () => {
              this.loading = false;
            }
          );
        }
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
