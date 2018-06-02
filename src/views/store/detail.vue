<style lang="less">

</style>

<template>
    <Card>
        <p slot="title">
            门店详情
        </p>
        <Form 
            style="max-width:800px;" 
            :model="form" 
            :label-width="120" 
            label-position="right">
            <FormItem label="所属商户：">
                <span>{{form.merchantName||'无'}}</span>
                <!-- <merchant-selector v-model="form.merchantId" :disable="true"></merchant-selector>                 -->
            </FormItem>
            <FormItem label="所属业务员：" >
                 <span>{{form.salesManName||'无'}}</span>
                <!-- <salesman-selector  v-model="form.salesManId" :agent-id="form.merchantId"></salesman-selector> -->
            </FormItem>
            <FormItem label="所属客户经理：">
                <span>{{form.accountManagerName||'无'}}</span>
                <!-- <customer-manager-selector  v-model="form.accountManagerId"></customer-manager-selector> -->
            </FormItem>
             <FormItem label="上级门店：">
                 <span>{{form.parentName||'无'}}</span>
                <!-- <store-selector v-model="form.parentId" :merchant-id="form.merchantId" ></store-selector>                           -->
            </FormItem>
            <FormItem label="门店名称：" >
                <span>{{form.fullName||'无'}}</span>
                <!-- <Input  v-model="form.fullName"></Input> -->
            </FormItem>
            <FormItem label="门店简称：">
                <span>{{form.name||'无'}}</span>
                <!-- <Input  v-model="form.name"></Input> -->
            </FormItem>
            <FormItem label="联系人名称：" >
                <span>{{form.contactName||'无'}}</span>
                <!-- <Input  v-model="form.contactName"></Input> -->
            </FormItem>
            <FormItem label="联系人手机：" >
                <span>{{form.contactPhone||'无'}}</span>
                <!-- <Input  v-model="form.contactPhone"></Input> -->
            </FormItem>
            <FormItem label="联系人邮箱："  >
                <span>{{form.contactEmail||'无'}}</span>
                <!-- <Input  v-model="form.contactEmail"></Input> -->
            </FormItem>
            <FormItem label="联系人身份证：" >
                <span>{{form.contactCertificateNo||'无'}}</span>
                <!-- <Input  v-model="form.contactCertificateNo"></Input> -->
            </FormItem>
            <FormItem label="客服电话：" >
                <span>{{form.servicePhone||'无'}}</span>
                <!-- <Input  v-model="form.servicePhone"></Input> -->
            </FormItem>
            <FormItem label="门店地址：">
                <span>{{form.provinceName&&(form.provinceName+"，")}}</span><span>{{form.cityName&&(form.cityName+"，")}}</span><span>{{form.address}}</span>
                <!-- <Row>
                    <Col span="12">
                        <FormItem>
                            <area-selector  :province-id.sync="form.provinceId" :city-id.sync="form.cityId"></area-selector>
                        </FormItem>
                    </Col>
                    <Col span="12" class-name="padding-left-10">
                        <FormItem >
                            <Input v-model="form.address" placeholder="请输入详细地址"/>
                        </FormItem>
                    </Col>
                </Row> -->
            </FormItem>
            <FormItem v-if="shouldSecondCheck">
                <Button type="primary" @click="secondCheckState = true">复审</Button>
            </FormItem>
        </Form>
        <Modal
            v-model="secondCheckState"
            title="复审"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="secondCheckSubmit">
            <Form label-position="top" :model="checkObj" :rules="ruleSecondCheck"  ref="secondModalCheckForm">
                <FormItem label="复审结果" prop="state">
                    <RadioGroup v-model="checkObj.state">
                        <Radio label="2">通过</Radio>
                        <Radio label="3">拒绝</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="初审意见">
                    <Input v-model="checkObj.firstNote" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="复审意见">
                    <Input v-model="checkObj.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
import areaSelector from "components/area-selector";
import merchantSelector from "components/merchant-selector";
import storeSelector from "components/store-selector";
import salesmanSelector from "components/salesman-selector";
import customerManagerSelector from "components/customer-manager-selector";
import settleCycleSelector from "components/settle-cycle-selector";
import settleAccountTypeSelector from "components/settle-account-type-selector";
import {
    getMerchantStoreDetail,
    checkMerchantStoreAuditSecond
} from "@/actions/store";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "store-add",
    data() {
        return {
            checkObj: {
                storeId: 0,
                firstNote: "",
                note: "",
                state: "2"
            },
            form: {
                merchantId: "",
                fullName: "",
                name: "",
                servicePhone: "",
                provinceId: "", // 省份ID
                cityId: "", // 城市ID
                address: "",
                contactName: "",
                contactPhone: "",
                contactEmail: "",
                contactCertificateNo: "",
                parentId: "",
                accountManagerId: "",
                salesManId: ""
            },
            secondCheckState: false,
            shouldSecondCheck: false,
            modalLoading: false,
            ruleSecondCheck: {
                state: [
                    {
                        required: true,
                        message: "请选择复审结果",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        getMerchantStoreDetail() {
            let { id } = this.$route.params;
            if (this.form.id !== id) {
                getMerchantStoreDetail(id).then(res => {
                    this.form = res.data;
                });
            }
        },
        secondCheckSubmit() {
            this.$refs.secondModalCheckForm.validate(valid => {
                if (valid) {
                    let formData = this.checkObj;
                    checkMerchantStoreAuditSecond(formData).then(
                        res => {
                            this.$lf.message("复审成功", "success");
                            this.secondCheckState = false;
                            closeCurrentErrPage(this, this.$route.query.from);
                        },
                        err => {
                            this.modalLoading = false;
                        }
                    );
                } else {
                    this.modalLoading = false;
                }
            });
        }
    },
    activated() {
        if (this.$route.query.from == "store-check") {
            this.shouldSecondCheck = true;
            this.checkObj.storeId = this.$route.params.id;
        } else {
            this.shouldSecondCheck = false;
        }
        this.getMerchantStoreDetail();
    },
    components: {
        areaSelector,
        merchantSelector,
        storeSelector,
        salesmanSelector,
        customerManagerSelector,
        settleCycleSelector,
        settleAccountTypeSelector
    }
};
</script>
