<style lang="less">
.merchant-add-step {
    margin-bottom: 20px;
}
.ivu-steps {
    .ivu-steps-item {
        padding: 10px 0;
        .ivu-steps-tail {
            top: 23px;
        }
    }
}
.form-group-title {
    margin-bottom: 20px;
    text-align: center;
}
.photo-preview {
    margin-top: 10px;
    position: relative;
    display: table;
    .btn-remove {
        z-index: 1;
        cursor: pointer;
        position: absolute;
        top: -8px;
        right: -8px;
        color: #000;
    }
}
.modalWidth {
    width: 700px !important;
}
.model {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background: rgba(55, 55, 55, 0.6);
    padding: 100px 100px 100px 400px;
}
</style>

<template>
    <Card>
        <p slot="title">
            {{ type==='add'?"商户资料录入":"商户资料编辑" }}
        </p>
        <Steps :current="current" class="merchant-add-step">
            <Step title="基本信息" @click.native="step(0)" :style="{ cursor: isEdit ? 'pointer' : 'default' }"></Step>
            <Step title="结算信息" @click.native="step(1)" :style="{ cursor: isEdit ? 'pointer' : 'default' }"></Step>
            <Step title="费率信息" @click.native="step(2)" :style="{ cursor: isEdit ? 'pointer' : 'default' }"></Step>
            <Step title="附件上传" @click.native="step(3)" :style="{ cursor: isEdit ? 'pointer' : 'default' }"></Step>
        </Steps>
        <Form v-show="current === 0" style="max-width: 800px;" ref="zeroForm"  @submit.prevent.native="stepZeroSubmit" :model="form" :label-width="140" label-position="right" :rules="rules">
            <FormItem label="所属渠道" prop="agentId">
                <agent-selector  v-model="form.agentId" ></agent-selector>
            </FormItem>
            <FormItem label="经营类别" prop="businessTypeId"  v-show="form.agentId">
                <business-type-selector  v-model="form.businessTypeId" :agentId="form.agentId"></business-type-selector>
            </FormItem>
             <FormItem label="所属业务员">
                <salesman-selector  v-model="form.salesmanId" :agentId="form.agentId"></salesman-selector>
            </FormItem>
            <FormItem label="所属客户经理" prop="accountManagerId">
                <customer-manager-selector  v-model="form.accountManagerId"></customer-manager-selector>
            </FormItem>
            <FormItem label="商户名称" prop="fullName" >
                <Input v-model="form.fullName" placeholder="商户名称"></Input>
            </FormItem>
            <FormItem label="商户简称" prop="name">
                <Input  v-model="form.name" placeholder="商户简称"></Input>
            </FormItem>
            <FormItem label="商户类别" prop="types">
                <merchant-type-selector v-model="form.types"></merchant-type-selector>
            </FormItem>
             <FormItem label="经营类目" prop="businessCategoryId">
                <business-category-selector :selectArr.sync="selectArr" :callback="selectBussinessCategory"></business-category-selector>
            </FormItem>
            <FormItem label="法人姓名" prop="license.legalName">
                <Input  v-model="form.license.legalName" placeholder="法人姓名"></Input>
            </FormItem>
            <FormItem label="法人身份证" prop="license.legalIdcard">
                <Input  v-model="form.license.legalIdcard" placeholder="法人身份证"></Input>
            </FormItem>
            <FormItem label="联系人姓名" prop="contactName" >
                <Input v-model="form.contactName" placeholder="联系人姓名"></Input>
            </FormItem>
            <FormItem label="联系人手机" prop="contactPhone">
                <Input v-model="form.contactPhone" placeholder="联系人手机"></Input>
            </FormItem>
            <FormItem label="联系人邮箱" prop="contactEmail">
                <Input v-model="form.contactEmail" placeholder="联系人邮箱"></Input>
            </FormItem>
            <FormItem label="联系人证件类型" prop="contactCertificateType" >
                <id-type-selector v-model="form.contactCertificateType"></id-type-selector>
            </FormItem>
            <FormItem label="证件号码" prop="contactCertificateNo">
                <Input  v-model="form.contactCertificateNo" placeholder="证件号码"></Input>
            </FormItem>
            <FormItem label="客服电话" prop="servicePhone" >
                <Input  v-model="form.servicePhone" placeholder="客服电话"></Input>
            </FormItem>
            <FormItem label="商户地址" props="cityId" :required="true">
                <Row>
                    <Col span="12">
                    <FormItem prop="cityId">
                        <area-selector  :province-id.sync="form.provinceId" :city-id.sync="form.cityId" />
                    </FormItem>
                    </Col>
                    <Col span="12" class-name="padding-left-10">
                    <FormItem prop="address">
                        <Input  v-model="form.address" placeholder="请输入详细地址"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="是否用渠道公众号" >
                <Checkbox  v-model="form.hasOfficialAccount">是</Checkbox>
            </FormItem>
            <FormItem label="公众号APPID" v-if="form.hasOfficialAccount === false">
                <Input  v-model="form.subAppId"></Input>
                <p>说明：该公众号需为已通过微信认证的服务号，且其认证主体需与商户企业主体一致</p>
            </FormItem>
            <FormItem label="JS API支付授权目录"  v-if="form.hasOfficialAccount === false">
                <!-- <Input :readonly="readOnly||merchantIsEdit" v-model="form.jsAPIPath"></Input> -->
                {{form.jsAPIPath}}
                <p>说明：该公众号需为已通过微信认证的服务号，且其认证主体需与商户企业主体一致</p>
            </FormItem>
            <FormItem label="Appsecret"  v-if="form.hasOfficialAccount === false" >
                <Input  v-model="form.subAppSecret"></Input>
                <p>说明：为上面填写公众号的secretkey</p>
            </FormItem>
            <FormItem>
                <Button type="primary" html-type="submit">下一步</Button>
            </FormItem> 
        </Form>
        <div v-show="current === 1">
            <Form style="max-width: 800px;" ref="firstForm" method="post" @submit.prevent.native="stepFirstSubmit" :model="form" :label-width="120" label-position="right" :rules="rules">
                <h3 class="form-group-title">结算信息</h3>
                <FormItem label="结算账号标志" prop="settleAccount.accountType" :required="true">
                    <settle-account-type-selector :disabled="readOnly||merchantIsEdit" v-model="form.settleAccount.accountType"></settle-account-type-selector>
                </FormItem>
                <FormItem label="是否行内账号" prop="settleAccount.isOwnBank" :required="true">
                    <settle-is-own-bank-selector :disabled="readOnly||merchantIsEdit" v-model="form.settleAccount.isOwnBank"></settle-is-own-bank-selector>
                </FormItem>
                <FormItem label="开户银行" prop="settleAccount.bankName" :required="true">
                    <!-- <Input :readonly="readOnly||merchantIsEdit" v-model="form.settleAccount.bankName"></Input>                     -->
                    <!-- <bank-search-selector v-model="form.settleAccount.bankName" :disabled="readOnly||merchantIsEdit"></bank-search-selector> -->
                    <bankSearchSelector2 :callback="selectBankInfo" v-model="form.settleAccount.bankId" :bankName="form.feeSettleAccount.bankName">
                    </bankSearchSelector2>
                </FormItem>
                <FormItem label="银行账号" prop="settleAccount.bankAccountId" :required="true">
                    <Input :readonly="readOnly||merchantIsEdit" v-model="form.settleAccount.bankAccountId"></Input>
                </FormItem>
                <FormItem label="开户名称" prop="settleAccount.name" :required="true">
                    <Input :readonly="readOnly||merchantIsEdit" v-model="form.settleAccount.name"></Input>
                </FormItem>
                <FormItem label="商户结算模式" prop="settleAccount.model" :required="true">
                    <settle-model-selector :disabled="readOnly||merchantIsEdit" v-model="form.settleAccount.model"></settle-model-selector>
                </FormItem>
                <FormItem label="商户结算周期" prop="settleAccount.cycle" :required="true">
                    <settle-cycle-selector :disabled="readOnly||merchantIsEdit" v-model="form.settleAccount.cycle"></settle-cycle-selector>
                </FormItem>
                <FormItem label="联行号" prop="settleAccount.interBankId" :required="true">
                    <Input :readonly="readOnly||merchantIsEdit" v-model="form.settleAccount.interBankId"></Input>
                </FormItem>
                <FormItem>
                    <Button v-if="type!=='show'" type="primary" @click="syncInfo">同步信息</Button>
                </FormItem>
                <h3 class="form-group-title">手续费扣除信息</h3>
                <FormItem label="手续费扣出账号" prop="feeSettleAccount.bankAccountId" :required="true">
                    <Input :readonly="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.bankAccountId"></Input>
                </FormItem>
                <FormItem label="开户名称" prop="feeSettleAccount.name" :required="true">
                    <Input :readonly="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.name"></Input>
                </FormItem>
                <FormItem label="是否行内账号" prop="feeSettleAccount.isOwnBank" :required="true">
                    <settle-is-own-bank-selector :disabled="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.isOwnBank"></settle-is-own-bank-selector>
                </FormItem>
                <FormItem label="开户银行" prop="feeSettleAccount.bankName" :required="true">
                    <!-- <Input :readonly="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.bankName"></Input>                     -->
                    <!-- <bank-search-selector v-model="form.feeSettleAccount.bankName" :disabled="readOnly||merchantIsEdit"></bank-search-selector>                   -->
                    <bankSearchSelector2 :callback="selectBankInfo2" v-model="form.feeSettleAccount.bankId" :bankName="form.feeSettleAccount.bankName">
                    </bankSearchSelector2>
                </FormItem>
                <FormItem label="手续费账号标志" prop="feeSettleAccount.accountType" :required="true">
                    <settle-account-type-selector :disabled="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.accountType"></settle-account-type-selector>
                </FormItem>
                <FormItem label="手续费结算周期" prop="feeSettleAccount.cycle" :required="true">
                    <settle-cycle-selector :disabled="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.cycle"></settle-cycle-selector>
                </FormItem>
                <FormItem label="联行号" prop="feeSettleAccount.interBankId"  :required="true">
                    <Input :readonly="readOnly||merchantIsEdit" v-model="form.feeSettleAccount.interBankId"></Input>
                </FormItem>
                <FormItem v-if="!readOnly">
                    <Button type="ghost" @click="prev">上一步</Button>
                    <Button type="primary" html-type="submit">下一步</Button>
                </FormItem>
            </Form>
        </div>
    </Card>

</template>

<script>
import { uploadConfig } from "@/constants/constant";
import {
    valideCertificateNo,
    validePhone,
    valideEmail
} from "@/constants/validate";
import agentSelector from "components/agent-selector";
import businessTypeSelector from "components/business-type-selector";
import salesmanSelector from "components/salesman-selector";
import customerManagerSelector from "components/customer-manager-selector";
import merchantTypeSelector from "components/merchant-type-selector";
import businessCategorySelector from "components/business-category-selector";
import idTypeSelector from "components/id-type-selector";
import areaSelector from "components/area-selector";
import settleModelSelector from "components/settle-model-selector";
import settleCycleSelector from "components/settle-cycle-selector";
import settleAccountTypeSelector from "components/settle-account-type-selector";
import settleIsOwnBankSelector from "components/settle-is-own-bank-selector";
// import agentChannelSelector from 'components/agent-channel-selector';
import bankSearchSelector2 from "components/bank-search-selector2";
import imagePreview from "components/image-preview";
import { checkMerchantBasicInfo } from "@/actions/merchant";
let defaultForm = {
    _payType: [],
    fullName: "", // 全称
    name: "", // 简称
    types: "", // 商户类型， 1-个体， 2-企业
    salesmanId: "", // 业务员ID
    provinceId: "", // 省份ID
    cityId: "", // 城市ID
    contactName: "", // 联系人名称
    contactPhone: "", // 联系人手机号
    contactEmail: "", // 联系人email
    contactCertificateNo: "", // 联系人证件号
    contactCertificateType: "01", // 证件类型
    website: "", // 网址
    agentId: "", // 代理商ID
    agentName: "",
    servicePhone: "", // 客服电话
    businessTypeId: "", // 经营类别
    businessCategoryId: "", // 经营类目ID
    firstBusinessCategoryId: "", // 经营类目ID
    secondBusinessCategoryId: "", // 经营类目ID
    remark: "", // 备注
    faxNo: "", // 传真
    webBusiness: "", // 网上经营内容
    mcc: "", // mcc
    accountManagerId: "", // 客户经理ID
    address: "", // 商户地址
    settleAccount: {
        bankAccountId: "", // 结算账户编号
        model: "", // 结算模式，J-差额结算，Q-全额结算
        cycle: "", // 结算周期，0-秒到，1-天，2-星期，3-半月，4-月，5-季，6-半年，7-年
        accountType: "", // 账户类型，0-对公账户，1-借记卡
        bankName: "", // 开户行名称
        bankId: "", // 开户行ID
        name: "", // 账户名
        isOwnBank: "", // 是否本行， 0-本行， 1他行
        interBankId: "", // 结算账户的联行号， 他行必填
        bankClassCode: "", //银行行别代码
        provinceId: "", //银行省份
        cityId: "" //银行城市ID
    }, // 结算账户信息
    feeSettleAccount: {
        rate: "",
        bankAccountId: "", // 手续费结算银行帐号
        model: "", // 结算模式，J-差额结算，Q-全额结算
        cycle: "", // 结算周期，0-秒到，1-天，2-星期，3-半月，4-月，5-季，6-半年，7-年
        accountType: "", // 帐户类型，0-对公账户，1-借记卡
        bankId: "", // 开户行ID
        bankName: "", // 开户行名称
        name: "", // 账户名
        isOwnBank: "", // 是否本行， 0-本行， 1他行
        interBankId: "", // 结算账户的联行号， 他行必填
        bankClassCode: "", //银行行别代码
        provinceId: "", //银行省份
        cityId: "" //银行城市ID
    }, // 手续费结算账户信息
    institutionProduct: [],
    license: {
        licenseCode: "", // 营业执照
        frontPhoto: "", // 负责人身份证正面
        backPhoto: "", // 负责人身份证反面
        groupPhoto: "", // 工作人员与商户负责人合影
        storeInPhoto: "", // 门店内景图
        bankCardFrontPhoto: "", // 银行卡正面
        licenseNumber: "", // 营业执照编号
        legalName: "", //法人姓名
        legalIdcard: "" //法人身份证
    }, // 证照信息
    hasOfficialAccount: true, // 是否有公众号
    subAppId: "", // 商户公众号app id
    subAppSecret: "", // 商户公众号app secret
    jsAPIPath: "https://spdb.91xft.cn/webpay/", // js授权目录
    subscribeAppId: "" // 推荐关注的公众号app id
    // channelNumber: '',      // 渠道编码
};
export default {
    name: "merchant-add",
    data() {
        return {
            // 复审
            secondCheckState: false,
            checkObj: {
                merchantId: this.$route.params.id,
                firstNote: "",
                note: "",
                state: 2
            },
            modalLoading: true,
            // -------------
            name: "",
            merchantIs: false,
            loading: false,
            imagePreviewVisible: false,
            imagePreviewUrl: "",
            current: 0,
            institutionList: [],
            institutions: {},
            upload: uploadConfig,
            defaultForm: {},
            isRate: "",
            form: defaultForm,
            form2: {
                bankInfo: "",
                bankInfo2: ""
            },
            rules: {
                agentId: {
                    required: true,
                    message: "请选择渠道",
                    trigger: "change"
                },
                businessTypeId: {
                    required: true,
                    message: "请选择经营类别",
                    trigger: "change"
                },
                fullName: {
                    required: true,
                    message: "请输入商户名称",
                    trigger: "blur"
                },
                name: {
                    required: true,
                    message: "请输入商户简称",
                    trigger: "blur"
                },
                types: {
                    required: true,
                    message: "请选择商户类别",
                    trigger: "change"
                },
                businessCategoryId: {
                    required: true,
                    message: "请选择经营类别",
                    trigger: "change"
                },
                "license.legalName": {
                    required: true,
                    message: "请输入法人姓名",
                    trigger: "blur"
                },
                "license.legalIdcard": [
                    {
                        required: true,
                        message: "请输入法人身份证",
                        trigger: "blur"
                    },
                    { validator: valideCertificateNo, trigger: "blur" }
                ],
                contactName: {
                    required: true,
                    message: "请输入联系人姓名",
                    trigger: "blur"
                },
                contactPhone: [
                    {
                        required: true,
                        message: "请输入联系人手机",
                        trigger: "blur"
                    },
                    { validator: validePhone, trigger: "blur" }
                ],
                contactEmail: [
                    {
                        required: true,
                        message: "请输入联系人邮箱",
                        trigger: "blur"
                    },
                    { validator: valideEmail, trigger: "blur" }
                ],
                contactCertificateType: {
                    required: true,
                    message: "请选择联系人证件类型",
                    trigger: "change"
                },
                contactCertificateNo: {
                    required: true,
                    message: "请输入联系人证件号码",
                    trigger: "blur"
                },
                servicePhone: {
                    required: true,
                    message: "请输入客服号码",
                    trigger: "blur"
                },
                address: {
                    required: true,
                    message: "请输入详细地址",
                    trigger: "blur"
                }
            },
            ruleInline: {
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
    computed: {
        type() {
            let { id } = this.$route.params;
            return id ? "edit" : "add";
        },
        isEdit() {
            let { id } = this.$route.params;
            return !!id;
        },
        selectArr() {
            let form = this.form;
            return [
                form.firstBusinessCategoryId,
                form.secondBusinessCategoryId,
                form.businessCategoryId
            ];
        }
    },
    created() {},
    methods: {
        selectBussinessCategory(val) {
            this.form.firstBusinessCategoryId = val[0];
            this.form.secondBusinessCategoryId = val[1];
            this.form.businessCategoryId = val[2];
        },
        selectBankInfo(values, selectData) {
            this.form2 = {
                bankInfo: selectData[3].__value.split(",")
            };
            this.form.settleAccount.bankName = selectData[3].label;
            this.form.settleAccount.bankId = selectData[3].value;
            this.form.settleAccount.interBankId = selectData[3].bankNo;
            this.form.settleAccount.bankClassCode = selectData[0].value;
            this.form.settleAccount.provinceId = selectData[1].value;
            this.form.settleAccount.cityId = selectData[2].value;
        },
        selectBankInfo2(values, selectData) {
            this.form2 = {
                bankInfo2: selectData[3].__value.split(",")
            };
            this.form.feeSettleAccount.bankName = selectData[3].label;
            this.form.feeSettleAccount.interBankId = selectData[3].bankNo;
            this.form.feeSettleAccount.bankClassCode = selectData[0].value;
            this.form.feeSettleAccount.provinceId = selectData[1].value;
            this.form.feeSettleAccount.cityId = selectData[2].value;
        },
        syncInfo() {
            let { feeSettleAccount, settleAccount } = this.form;
            let obj = Object.assign({}, feeSettleAccount, settleAccount, true);
            this.form2.bankInfo2 = this.form2.bankInfo;
            this.form.feeSettleAccount = obj;
        },
        init() {
            this.current = parseInt(this.$route.query.step) || 0;
            if (this.isAdd) {
                this.institutions = {};
            } else if (this.form.id !== this.$route.params.id) {
                this.institutions = {};
                if (this.isEdit) {
                    this.$http
                        .post(`/merchant/detail/${this.$route.params.id}`)
                        .then(res => {
                            if (res.data.result) {
                                this.defaultForm._payType = [];
                                this.form = Object.assign(
                                    {},
                                    this.defaultForm,
                                    res.data.data
                                );
                                let {
                                    feeSettleAccount,
                                    settleAccount
                                } = this.form;
                                this.form2.bankInfo2 = [
                                    feeSettleAccount.bankClassCode,
                                    feeSettleAccount.provinceId,
                                    feeSettleAccount.cityId,
                                    feeSettleAccount.bankId
                                ];
                                this.form2.bankInfo = [
                                    settleAccount.bankClassCode,
                                    settleAccount.provinceId,
                                    settleAccount.cityId,
                                    settleAccount.bankId
                                ];
                                this.licenseCode = this.form.license.licenseCode;
                                this.frontPhoto = this.form.license.frontPhoto;
                                this.backPhoto = this.form.license.backPhoto;
                                this.groupPhoto = this.form.license.groupPhoto;
                                this.storeInPhoto = this.form.license.storeInPhoto;
                                this.bankCardFrontPhoto = this.form.license.bankCardFrontPhoto;
                                // this.isCropper(this.licenseCode);
                            }
                        });
                }
            }
        },
        handleRemoveUpload(e, photo) {
            e.stopPropagation();
            e.preventDefault();
            this.form.license[photo] = "";
        },
        handleBeforeUpload(file) {
            if (file.name.substring(file.name.length - 4) == "jpeg") {
                this.$lf.alert.error(
                    "请上传JPG、png的图片格式、暂不支持JPEG格式"
                );
                return false;
            } else {
                this.$Spin.show({
                    render: h => {
                        return h("div", [
                            h("Icon", {
                                class: "demo-spin-icon-load",
                                props: {
                                    type: "load-c",
                                    size: 18
                                }
                            }),
                            h("div", "正在上传..")
                        ]);
                    }
                });
                return true;
            }
        },
        handleLicenseCodeUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.form.license.licenseCode = json.data.publicUrl;
                console.log(this.form.license.licenseCode);
                this.$lf.message("上传成功", "success");
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleFrontPhotoUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.form.license.frontPhoto = json.data.publicUrl;
                this.$lf.message("上传成功", "success");
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleBackPhotoUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.form.license.backPhoto = json.data.publicUrl;
                this.$lf.message("上传成功", "success");
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleGroupPhotoUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.form.license.groupPhoto = json.data.publicUrl;
                this.$lf.message("上传成功", "success");
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleStoreInPhotoUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.form.license.storeInPhoto = json.data.publicUrl;
                this.$lf.message("上传成功", "success");
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleBankCardFrontPhotoUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.form.license.bankCardFrontPhoto = json.data.publicUrl;
                this.$lf.message("上传成功", "success");
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleUploadError(error, json) {
            this.$Spin.hide();
            this.$lf.alert.error(json.message);
        },
        getInstitutionProducts(id) {
            let flag = false;
            this.institutionList.forEach(element => {
                if (element.id === id && element.code === "ALIPAY") {
                    flag = true;
                }
            });
            if (this.form.agentId) {
                this.$http
                    .post(`/agent/institution/list`, {
                        agentId: this.form.agentId,
                        institutionId: id,
                        businessTypeId: flag ? "" : this.form.businessTypeId
                    })
                    .then(res => {
                        if (res.data.result) {
                            this.institutions[id] = res.data.data.rows.map(
                                item => {
                                    let findObj = this.form.institutionProduct.find(
                                        o => o.institutionProductId === item.id
                                    );
                                    return Object.assign(item, {
                                        institutionId: id,
                                        institutionProductId: item.id,
                                        checked: findObj ? true : false,
                                        rate: findObj ? findObj.rate : ""
                                    });
                                }
                            );
                            this.$forceUpdate();
                        }
                    });
            }
        },
        getInstitutionList() {
            return this.$http.post(`/meta/institution/list`).then(res => {
                if (res.data.result) {
                    this.institutionList = res.data.data.rows;
                }
            });
        },
        step(num, force) {
            if (this.isEdit || force || this.$route.query.force) {
                this.current = num;
                this.$router.push({
                    query: Object.assign({}, this.$route.query, {
                        step: this.current
                    })
                });
                document.querySelector(".single-page-con").scrollTop = 0;
            }
        },
        stepZeroSubmit(e) {
            this.$refs.zeroForm.validate(valid => {
                if (valid) {
                    let formData = this.form;
                    checkMerchantBasicInfo(formData).then(res => {
                        this.step(1, true);
                    });
                }
            });
        },
        async stepFirstSubmit(e) {
            let formData = this.form;
            let valid;
            this.rules = {};
            // this.isRate = formData.feeSettleAccount.rate;
            valid = await this.$http.post(`/merchant/check/settle`, formData);
            if (valid.data.result) {
                this.step(2, true);
            } else {
                this.$lf.alert.error(valid.data.message);
            }
        },
        async stepSecondSubmit(e) {
            this.form.institutionProduct = [];
            let insti = [];
            Object.entries(this.institutions).forEach(([key, products]) => {
                products.forEach((product, index) => {
                    if (product.checked) {
                        this.form.institutionProduct.push({
                            institutionProductId: product.id,
                            rate: product.rate
                        });
                        insti.push(product.rate);
                    }
                });
            }) || [];
            let num = 0;
            for (var i = 0; i < insti.length; i++) {
                if (insti[i] == insti[i + 1]) {
                    num += 1;
                }
            }
            let valid;
            this.rules = {};
            let formData = this.form;
            if (formData.feeSettleAccount.rate == "" || undefined || null) {
                this.$lf.alert.error("商户手续费率不能为空");
            } else {
                valid = await this.$http.post(
                    `/merchant/check/institution/product`,
                    formData
                );
                if (
                    insti.length == num + 1 &&
                    insti[0] == formData.feeSettleAccount.rate
                ) {
                    if (valid.data.result) {
                        this.step(3, true);
                    } else {
                        this.$lf.alert.error(valid.data.message);
                    }
                } else {
                    this.$lf.alert.error("费率信息必须一致");
                }
            }
        },
        async stepThirdSubmit(e) {
            let formData = this.form;
            let valid;
            this.rules = {};
            this.loading = true;
            valid = await this.$http.post(`/merchant/check/license`, formData);
            if (valid.data.result) {
                if (this.isEdit) {
                    this.$http.post(`/merchant/update`, this.form).then(res => {
                        if (res.data.result) {
                            this.loading = false;
                            this.$lf.alert.success("保存成功", null, () => {
                                this.$router.push({
                                    name: "merchant-edit",
                                    params: {
                                        id: this.form.id
                                    }
                                });
                            });
                        } else {
                            this.loading = false;
                            this.$lf.alert.error(res.data.message);
                        }
                    });
                } else {
                    this.$http.post(`/merchant/add`, this.form).then(res => {
                        if (res.data.result) {
                            this.loading = false;
                            this.$lf.alert.success("保存成功", null, () => {
                                this.$router.push({
                                    name: "merchant-index"
                                });
                            });
                        } else {
                            this.loading = false;
                            this.$lf.alert.error(res.data.message);
                        }
                    });
                }
            } else {
                this.loading = false;
                this.$lf.alert.error(valid.data.message);
            }
        },
        prev() {
            this.$router.push({
                query: Object.assign({}, this.$route.query, {
                    step: --this.current
                })
            });
        },
        // 复审
        firstNote() {
            this.$http
                .post(`/merchant/audit/first/${this.$route.params.id}`)
                .then(res => {
                    if (res.data.result && res.data.data) {
                        this.checkObj.firstNote = res.data.data.note;
                    }
                });
        },
        secondCheckSubmit() {
            this.$refs["secondModalCheckForm"].validate(valid => {
                if (valid) {
                    let formData = this.checkObj;
                    this.$http
                        .post(`/merchant/audit/second`, formData)
                        .then(res => {
                            if (res.data.result) {
                                this.$lf.message("复审成功", "success");
                                this.secondCheckState = false;
                            } else {
                                this.modalLoading = false;
                                this.$lf.alert.error(
                                    res.data.message,
                                    null,
                                    () => {
                                        this.modalLoading = true;
                                    }
                                );
                            }
                        });
                } else {
                    this.modalLoading = false;
                }
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        let { id } = from.params;
        if (id) {
            this.$store.commit("saveCacheEditMerchant", this.form);
        } else {
            this.$store.commit("saveCacheAddMerchant", this.form);
        }
        next();
    },
    watch: {
        $route() {
            this.current = parseInt(this.$route.query.step) || 0;
        },
        payType(val, oldVal) {
            let addId = val.filter(x => !oldVal.includes(x));
            if (oldVal && oldVal.length > 0) {
                let removeId = oldVal.filter(x => !val.includes(x));
                removeId.forEach(id => {
                    delete this.institutions[id];
                    this.form.institutionProduct = this.form.institutionProduct.filter(
                        item => {
                            return item.institutionId !== id;
                        }
                    );
                });
            }
            addId.forEach(id => {
                this.getInstitutionProducts(id);
            });
        },
        // 切换渠道商，重置默认支付方式
        "form.agentId"(val, oldVal) {
            this.form._payType = [];
            this.form.institutionProduct.forEach(item => {
                this.form._payType.push(item.institutionId);
            });
        },
        // 录入新商户时，默认全选支付方式
        current(val) {
            if (val === 2 && this.isAdd) {
                this.form._payType = [];
                this.institutionList.forEach(item => {
                    if (!this.form._payType.includes(item.id)) {
                        this.form._payType.push(item.id);
                    }
                });
            }
        }
    },
    components: {
        merchantTypeSelector,
        idTypeSelector,
        businessTypeSelector,
        businessCategorySelector,
        agentSelector,
        salesmanSelector,
        // salesmanTwoSelector,
        customerManagerSelector,
        areaSelector,
        settleModelSelector,
        settleCycleSelector,
        settleAccountTypeSelector,
        settleIsOwnBankSelector,
        bankSearchSelector2,
        imagePreview
        // agentChannelSelector,
    }
};
</script>
