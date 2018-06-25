
<template>
    <Card>
        <p slot="title">
            维修申请单
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
            <FormItem label="物品编码" >
                <Input v-model="form.number" placeholder="物品编码"  />
            </FormItem>
            <FormItem label="物品名称" >
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
             <FormItem label="物品所在位置" >
                <Input v-model="form.place" placeholder="物品所在位置"  />
            </FormItem>
            <FormItem label="联系人">
                <Input v-model="form.person" placeholder="联系电话"  />
            </FormItem>
            <FormItem label="联系电话" prop="phone">
                <Input v-model="form.phone" placeholder="联系电话"  />
            </FormItem>
            <FormItem label="问题描述" prop="info">
                <Input v-model="form.info" type="textarea" placeholder="问题描述"  />
            </FormItem>
            <FormItem label="选择维修人员" v-if="userType==0" prop="keepUserId">
                <Select  v-model="form.keepUserId" >
                    <Option v-for="item in keepUserArr" :key="item.id" :value="item.id" >{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem >
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import { closeCurrentErrPage } from "@/constants/constant";
import departSelector from "components/depart-selector";
import { addOrUpdateKeep, getKeepUserSelect } from "@/actions/depart";
export default {
  name: "keep-apply-add",
  data() {
    return {
      loading: false,
      keepUserArr: [],
      form: {
        name: "",
        number: "",
        departId: "",
        place: "",
        areaId: "",
        person: "",
        phone: "",
        info: "",
        keepUserId: ""
      },
      rules: {
        info: [
          {
            required: true,
            message: "请输入问题描述",
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
        ],
        keepUserId: [
          {
            required: true,
            message: "请选择维修人员",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    userType() {
      return this.$store.state.user.userInfo.userTypes;
    }
  },
  methods: {
    submit(e) {
      let { name } = this.$route.query;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let formData = this.form;
          addOrUpdateKeep(formData).then(
            res => {
              this.loading = false;
              this.$lf.message("保存成功", "success");
              closeCurrentErrPage(this, name);
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    }
  },
  created() {
    getKeepUserSelect().then(res => {
      this.keepUserArr = res.data;
    });
  },
  components: {
    departSelector
  }
};
</script>
