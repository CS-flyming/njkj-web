
<template>
    <Card>
        <p slot="title">
            编辑资产
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
            <FormItem label="物品名称" prop="name" >
                <Input v-model="form.name" placeholder="物品名称"  />
            </FormItem>
            <FormItem label="使用单位" prop="departId">
                <departSelector v-model="form.departId"></departSelector>
            </FormItem>
            <FormItem label="所属区域" prop="areaId" >
                <Select  v-model="form.areaId" >
                    <Option value="0" >办公区</Option>
                    <Option value="1" >生活区</Option>
                </Select>
            </FormItem>
            <FormItem label="状态" prop="status" >
                <Select  v-model="form.status" >
                    <Option value="1" >使用中</Option>
                    <Option value="0" >报废</Option>
                </Select>
            </FormItem>
            <FormItem label="物品价值" >
                <Input v-model="form.value" placeholder="物品价值"  />
            </FormItem>
            <FormItem label="配发时间" >
                <DatePicker type="date" placeholder="配发时间" v-model="form.toTime"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import departSelector from "components/depart-selector";
import { addOrUpdateAssets } from "@/actions/depart";
export default {
  name: "keep-apply-edit",
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
