<style lang="less">

</style>
<template>
    <div>
        <Card class="filter-wrap">
            <Form 
            style="max-width: 600px;" 
            ref="zeroForm" 
            method="post" 
            @submit.prevent.native="submit" 
            :model="filter" 
            :label-width="200" 
            label-position="right">
            <FormItem label="温馨提示" style="min-width:50%;">
                <p>请用扫码枪扫描顾客微信/支付宝付款码，扫码枪扫描后请等待支付结果</p>
            </FormItem>
            <FormItem label="收款金额" style="min-width:80%;" prop="amount">
                <input v-model="filter.amount" placeholder="请输入付款金额" maxlength="7" :autofocus="autofocus" type="text" max="10000" style="width:100%;background:none;outline:none;border:0px;border-radius:4px;border:1px solid #dddee1;padding:4px 7px;height:32px;">              
            </FormItem>
            <FormItem label="付款码" style="min-width:80%;" prop="authCode">
                <Input id="elementId" v-model="filter.authCode" @on-enter="handleChange" :autofocus="authCode" placeholder="输入付款码也可以付款"></Input>
            </FormItem>
            <FormItem label="自动收银" prop="isScanner" style="min-width:80%;">
                <RadioGroup v-model="isScanner">
                    <Radio label="2">是</Radio>
                    <Radio label="1">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" html-type="submit" :loading="loading" v-if="isScanner==='1'">确认收款</Button>
                <Button type="primary" html-type="submit" :loading="loading" v-else disabled>确认收款</Button>                
            </FormItem>
        </Form>
        </Card>
    </div>
</template>
<script>
import { scannerPay } from "@/actions/store";
export default {
    name: "scanner-index",
    data() {
        return {
            loading: false,
            authCode: true,
            autofocus: true,
            isScanner: "2",
            filter: {
                amount: "",
                authCode: ""
            }
        };
    },
    methods: {
        init() {
            let that = this;
            document.onkeydown = function(event) {
                var keyCode = event.keyCode;
                if (keyCode == "13") {
                    var value = document.querySelector("#elementId");
                    if (that.isScanner == "1") {
                        event.preventDefault
                            ? event.preventDefault()
                            : (event.returnValue = false);
                    }
                }
            };
        },
        submit() {
            if (this.filter.amount.split("").length == 0) {
                this.$lf.message("请输入付款金额", "warning");
                return;
            }
            if (!/^[-]?[0-9]*\.?[0-9]+(eE?[0-9]+)?$/.test(this.filter.amount)) {
                this.$lf.message("请输入正确的金额", "warning");
                return false;
            }
            if (this.filter.amount.split("")[0] == ".") {
                this.$lf.message("请输入正确的金额", "warning");
                return false;
            }
            this.loading = true;
            scannerPay(this.filter).then(
                res => {
                    this.loading = false;
                    if (res.data.state == "00") {
                        this.$refs.zeroForm.resetFields();
                        this.authCode = false;
                        this.$lf.message("付款成功", "success");
                    } else {
                        this.$refs.zeroForm.resetFields();
                        this.autofocus = true;
                        this.$lf.message("付款失败", "warning");
                    }
                },
                () => {
                    this.loading = false;
                }
            );
        },
        handleChange(val) {
            // console.log(this.isScanner === "2");
            if (this.isScanner == "2") {
                this.submit();
            }
        }
    },
    created() {
        this.init();
    },
    components: {}
};
</script>

