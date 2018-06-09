
<template>
    <Card>
        <p slot="title">
            新增用户
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
            <FormItem label="登录名称" prop="name" >
                <Input v-model="form.name" placeholder="登录名称"  />
            </FormItem>
            <FormItem label="登录密码" prop="password" >
                <Input type="password" v-model="form.password" placeholder="请输入6-18位字符和字母组合的密码" ></Input>
            </FormItem>
            <FormItem label="确认密码" prop="_rePassword">
                <Input type="password" v-model="form._rePassword" placeholder="请再次输入密码" ></Input>
            </FormItem>
            <FormItem label="姓名" prop="realName" >
                <Input v-model="form.realName" placeholder="员工姓名"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone" >
                <Input v-model="form.phone" placeholder="手机号码"></Input>
            </FormItem>
            <!-- <FormItem label="身份证号" prop="certificateNo" >
                <Input v-model="form.certificateNo" placeholder="身份证号"></Input>
            </FormItem> -->
            <FormItem label="所属部门">
                <departSelector v-model="form.depatmentId"></departSelector>
            </FormItem>
            <FormItem label="所属角色" prop="types">
                <manager-role-selector v-model="form.types"></manager-role-selector>
            </FormItem>
            <FormItem label="详细信息">
                <Input type="textarea" v-model="form.info"/>
            </FormItem>
            <FormItem label="状态" prop="state" >
                <RadioGroup v-model="form.state">
                    <Radio label="2">冻结</Radio>
                    <Radio label="1">正常</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" html-type="submit">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import managerRoleSelector from "components/manager-role-selector";
import departSelector from "components/depart-selector";
import { addOrUpdateManager, getManagerDetail } from "@/actions/sys";
import { closeCurrentErrPage } from "@/constants/constant";
import { validateData } from "./validate";
let defaultForm = {
  userName: "",
  phone: "",
  password: "",
  _rePassword: "",
  name: "",
  certificateNo: "",
  state: 1,
  types: ""
};
export default {
  name: "sys-manager-add",
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        userName: "",
        phone: "",
        password: "",
        _rePassword: "",
        name: "",
        certificateNo: "",
        state: 1,
        types: "",
        departId: "",
        info: ""
      },
      rules: {
        ...validateData,
        _rePassword: [
          {
            required: true,
            message: "请填写确认密码",
            trigger: "blur"
          },
          { validator: valideRePassword, trigger: "blur" }
        ],
        types: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submit(e) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let formData = this.form;
          addOrUpdateManager(formData).then(
            res => {
              this.loading = false;
              this.$refs.form.resetFields();
              this.$lf.message("保存成功", "success");
              closeCurrentErrPage(this, "base_user");
            },
            () => {
              this.loading = false;
            }
          );
        } else {
          console.log(valid);
        }
      });
    }
  },
  components: {
    managerRoleSelector,
    departSelector
  }
};
</script>
