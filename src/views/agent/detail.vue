<style lang="less">
.form-group-title {
    margin-bottom: 20px;
    text-align: center;
}
</style>

<template>
    <Card>
        <p slot="title">
            渠道详情
        </p>
        <Form 
            style="max-width: 800px;" 
            :model="form" 
            :label-width="140" 
            label-position="right">
            <h3 class="form-group-title">基本信息</h3>
            <FormItem label="渠道名称" prop="name">
                <Input v-model="form.name" :disabled="readOnly"></Input>
            </FormItem>
            <FormItem label="所属渠道">
                <agent-selector  v-model="form.parentId" :disable="readOnly"></agent-selector>           
            </FormItem>
            <FormItem label="渠道地址" props="cityId" :required="true">
                <Row>
                    <Col span="12">
                        <FormItem prop="cityId">
                            <area-selector :disable="readOnly" :province-id.sync="form.provinceId" :city-id.sync="form.cityId" />
                        </FormItem>
                    </Col>
                    <Col span="12" class-name="padding-left-10">
                        <FormItem prop="address">
                            <Input :disabled="readOnly"  v-model="form.address" placeholder="请输入详细地址"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="联系人姓名" prop="linkUser.name">
                <Input v-model="form.linkUser.name" :disabled="readOnly"></Input>
            </FormItem>
            <FormItem label="联系人手机" prop="linkUser.phone">
                <Input v-model="form.linkUser.phone" :disabled="readOnly"></Input>
            </FormItem>
            <FormItem label="联系人邮箱" prop="linkUser.email">
                <Input v-model="form.linkUser.email" :disabled="readOnly"></Input>
            </FormItem>
            <FormItem label="渠道类型" prop="types">
                <agent-type-selector  v-model="form.types" :disable="readOnly"></agent-type-selector>
            </FormItem>
            <FormItem label="拓展业务员" prop="salesmanId">               
                <salesman-selector  v-model="form.salesmanId" :agent-id="form.parentId" :disable="readOnly"></salesman-selector>
            </FormItem>
            <FormItem label="所属客户经理" prop="accountManagerId">
                <customer-manager-selector v-model="form.accountManagerId" :disable="readOnly"></customer-manager-selector>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input :disabled="readOnly" v-model="form.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="是否有公众号">
                <Checkbox :disabled="readOnly" v-model="form.hasOfficialAccount">是</Checkbox>
            </FormItem>
            <template v-if="form.hasOfficialAccount === true">
                <FormItem label="公众号APPID" prop="appId">
                    <Input  v-model="form.appId" :disabled="readOnly"></Input>
                    <p>说明：该公众号需为已通过微信认证的服务号，且其认证主体需与商户企业主体一致</p>
                </FormItem>
                <FormItem label="JS API支付授权目录" prop="jsAPIPath">
                    <!-- <Input  v-model="form.jsAPIPath" :disabled="readOnly"></Input> -->
                    {{form.jsAPIPath}}
                    <p>说明：该公众号需为已通过微信认证的服务号，且其认证主体需与商户企业主体一致</p>
                </FormItem>
                <FormItem label="Appsecret" prop="appSecret">
                    <Input v-model="form.appSecret" :disabled="readOnly"></Input>
                    <p>说明：为上面填写公众号的secretkey</p>
                </FormItem>
            </template>
            
            <h3 class="form-group-title">结算信息录入</h3>
            <FormItem label="结算账号标志" prop="settleAccount.types">
                <Select v-model="form.settleAccount.types" :disabled="readOnly">
                    <Option value="01">对公</Option>
                    <Option value="00">对私</Option>
                </Select>
            </FormItem>
            
            <FormItem label="结算银行名称" prop="settleAccount.bankName">
                <!-- <Input  v-model="form.settleAccount.bankName"></Input>               -->
                <bank-search-selector2 :disable="readOnly" :callback="selectBankInfo" v-model="form.settleAccount.bankId" :bankName="form.settleAccount.bankName"></bank-search-selector2>                
            </FormItem>
            <FormItem label="结算行号" prop="settleAccount.unionNo">
                <Input  v-model="form.settleAccount.unionNo" :disabled="readOnly"></Input>
            </FormItem>
            <FormItem label="结算账号" prop="settleAccount.bankCardNumber">
                <Input  v-model="form.settleAccount.bankCardNumber" :disabled="readOnly"></Input>
            </FormItem>
            <FormItem label="结算账户名称" prop="settleAccount.name">
                <Input  v-model="form.settleAccount.name" :disabled="readOnly"></Input>
            </FormItem>
            <h3 class="form-group-title">支付类型配置</h3>
            <FormItem label="请选择支付渠道" :required="true">
                <Tabs size="small" type="card">
                    <TabPane v-for="item in institutionList" :key="item.id" :label="item.name"> 
                        <ul v-for="(products, key) in institutions" :key="key" v-if="item.code === 'ALIPAY'" style="list-style: none;">
                            <li v-for="(product, index) in products" :key="index" v-if="key === item.id">
                                <Checkbox  v-model="product.checked" :disabled="readOnly">
                                    {{ product.name }}，费率（万分之） <Input　size="small"  v-model.trim="product.rate"></Input>
                                </Checkbox>
                            </li>
                        </ul>
                        <Tabs v-if="item.code === 'WECHAT'">
                            <TabPane size="small" v-for="channel in weChatChannelTypes" :key="channel.id" :label="channel.name">
                                <ul v-for="(products, key) in institutions" :key="key" style="list-style: none;">
                                    <li v-for="(product, index) in products" :key="index" v-if="key === item.id && product.channelType === channel.id">
                                        <Checkbox  v-model="product.checked" :disabled="readOnly">
                                            {{ product.name }}，费率（万分之） <Input　size="small"  v-model.trim="product.rate"></Input>
                                        </Checkbox>
                                    </li>
                                </ul>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            </FormItem>
            <FormItem v-if="secondCheckStatus">
                <Button type="primary" :loading="loading" @click="secondCheckModal=true">复审</Button>
            </FormItem>
        </Form>
         <Modal
            v-model="secondCheckModal"
            title="复审"
            :loading="modalLoading"
            :mask-closable="false"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="secondCheckSubmit">
            <Form label-position="top" ref="filterForm" :rules="secondFormRules" :model="checkObj">
                <FormItem label="复审结果" prop="state">
                    <RadioGroup v-model="checkObj.state">
                        <Radio label="1">通过</Radio>
                        <Radio label="2">拒绝</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem  v-for="channel in arr" :label="channel.name" :key="channel.channelType" :required="checkObj.state === '1' ? true : false">
                    <Input value id='videoForm' v-model.trim="channel.channelNumber"></Input>
                </FormItem>
                <FormItem label="复审意见" :required="checkObj.state === '2' ? true : false">
                    <Input v-model="checkObj.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
import areaSelector from "components/area-selector";
import agentSelector from "components/agent-selector";
import agentsTwoSelector from "components/agents-two-selector";
import agentTypeSelector from "components/agent-type-selector";
import salesmanSelector from "components/salesman-selector";
import salesmanTwoSelector from "components/salesman-two-selector";
import bankSearchSelector2 from "components/bank-search-selector2";
import customerManagerSelector from "components/customer-manager-selector";
import settleIsOwnBankSelector from "components/settle-is-own-bank-selector";
import {
    getInstitutionList,
    getInstitutionProductList,
    getChannelTypes,
    addOrUpdateAgent,
    getAgentDetail,
    getAgentChannelNumber,
    agentAuditCheckSecond
} from "@/actions/agent";
import { validateData } from "./validate";
import { closeCurrentErrPage } from "@/constants/constant";
let defaultRules = {
    state: {
        required: true,
        message: "请选择审核结果",
        trigger: "change"
    },
    remark: {
        required: false,
        message: "请输入审核意见",
        trigger: "blur"
    }
};
export default {
    name: "agent-detail",
    data() {
        return {
            checkObj: {
                types: 1,
                agentId: 0,
                remark: "",
                state: "1",
                channelNumbers: []
            },
            arr: [],
            // -------------
            loading: false,
            institutionList: [],
            institutions: {},
            weChatChannelTypes: [],
            form: {
                parentId: "",
                name: "",
                provinceId: "", // 省份ID
                cityId: "", // 城市ID
                address: "",
                linkUser: {
                    name: "",
                    phone: "",
                    email: ""
                },
                types: "",
                remark: "",
                settleAccount: {
                    name: "",
                    isOwnBank: "",
                    bankCardNumber: "",
                    types: "00",
                    bankName: "",
                    provinceId: "",
                    cityId: "",
                    unionNo: ""
                },
                institutionProduct: [],
                salesmanId: "",
                accountManagerId: "",
                hasOfficialAccount: false, // 是否有公众号
                appId: "", // 商户公众号app id
                appSecret: "", // 商户公众号app secret
                jsAPIPath: "https://spdb.91xft.cn/webpay/" // js授权目录
            },
            rules: validateData,
            readOnly: false,
            secondCheckStatus: false,
            secondCheckModal: false,
            modalLoading: false,
            secondFormRules: defaultRules
        };
    },
    activated() {
        this.init();
        if (this.$route.query.from) {
            this.secondCheckStatus = true;
        } else {
            this.secondCheckStatus = false;
        }
        this.readOnly = true;
    },
    methods: {
        showSecondCheckModal() {
            // 浅拷贝 将源对象  拷贝到目标对象 然后赋值给
            let { id } = this.$route.params;
            this.checkObj.state = "1";
            this.checkObj.agentId = id;
            this.checkObj.types = 2;
            let channelNumberArr = [];
            this.checkObj.channelNumbers = [];
            getAgentChannelNumber(id).then(res => {
                res.data.forEach(item => {
                    if (item.channelType < 4) {
                        channelNumberArr.push(item);
                        if (item.channelType == 0) {
                            Object.assign(channelNumberArr[0], {
                                name: "线下商户-渠道商编号"
                            });
                        } else if (item.channelType == 1) {
                            Object.assign(channelNumberArr[1], {
                                name: "线上商户-渠道商编号"
                            });
                        } else if (item.channelType == 2) {
                            Object.assign(channelNumberArr[2], {
                                name: "公益商户-渠道商编号"
                            });
                        } else if (item.channelType == 3) {
                            Object.assign(channelNumberArr[3], {
                                name: "民生商户-渠道商编号"
                            });
                        }
                    }
                });
                this.arr = channelNumberArr;
            });
        },
        getAgentDetail() {
            let { id } = this.$route.params;
            if (this.form.id !== id) {
                getAgentDetail(id).then(res => {
                    this.form = res.data;
                });
            }
        },
        selectBankInfo(values) {
            this.form.settleAccount.bankName = values.bankName;
            this.form.settleAccount.bankId = values.id;
            this.form.settleAccount.unionNo = values.bankNo;
            this.form.settleAccount.bankClassCode = values.bankClassCode;
            this.form.settleAccount.provinceId = values.provinceId;
            this.form.settleAccount.cityId = values.cityId;
        },
        async init() {
            this.institutions = {};
            this.weChatChannelTypes = [];
            await this.getWeChatChannelType();
            await this.getInstitutionList();
            await this.getAgentDetail();
        },
        getWeChatChannelType() {
            getChannelTypes().then(res => {
                res.data.forEach(item => {
                    this.weChatChannelTypes.push({
                        id: item.value,
                        name: item.desc
                    });
                });
            });
        },
        // 选择支付渠道下面的类型
        getInstitutionProducts(id) {
            return getInstitutionProductList({ institutionId: id }).then(
                res => {
                    this.institutions[id] = [];
                    res.data.rows.forEach(item => {
                        if (item.institutionCode === "WECHAT") {
                            this.weChatChannelTypes.forEach(channel => {
                                let findObj = this.form.institutionProduct.find(
                                    o =>
                                        o.institutionProductId === item.id &&
                                        o.channelType === channel.id
                                );
                                this.institutions[id].push(
                                    Object.assign({}, item, {
                                        productId: id,
                                        checked: findObj ? true : false,
                                        rate: findObj ? findObj.rate : "",
                                        channelType: channel.id
                                    })
                                );
                            });
                        } else {
                            let findObj = this.form.institutionProduct.find(
                                o => o.institutionProductId === item.id
                            );
                            this.institutions[id].push(
                                Object.assign(item, {
                                    productId: id,
                                    checked: findObj ? true : false,
                                    rate: findObj ? findObj.rate : "",
                                    channelType: "4"
                                })
                            );
                        }
                    });
                    this.$forceUpdate();
                }
            );
        },
        // 得到支付渠道
        getInstitutionList() {
            getInstitutionList().then(res => {
                this.institutionList = res.data.rows;
                this.institutionList.forEach(item => {
                    this.getInstitutionProducts(item.id);
                });
            });
        },
        secondCheckSubmit() {
            this.$refs.filterForm.validate(valid => {
                if (valid) {
                    this.arr.forEach(element => {
                        this.checkObj.channelNumbers.push({
                            channelNumber: element.channelNumber,
                            channelType: element.channelType
                        });
                    });
                    agentAuditCheckSecond(this.checkObj).then(
                        res => {
                            this.$lf.message("复审成功", "success");
                            this.secondCheckModal = false;
                            this.arr = [];
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
    watch: {
        "form.hasOfficialAccount"(val) {
            if (val) {
                validateData.appId.required = true;
                validateData.jsAPIPath.required = true;
                validateData.appSecret.required = true;
            } else {
                validateData.appId.required = false;
                validateData.jsAPIPath.required = false;
                validateData.appSecret.required = false;
            }
        },
        "checkObj.state"(val) {
            if (val == "2") {
                defaultRules.remark.required = true;
            } else {
                defaultRules.remark.required = false;
            }
        },
        secondCheckModal(val) {
            if (val) {
                this.showSecondCheckModal();
            }
        }
    },
    components: {
        areaSelector,
        agentTypeSelector,
        salesmanSelector,
        salesmanTwoSelector,
        bankSearchSelector2,
        customerManagerSelector,
        agentSelector,
        agentsTwoSelector,
        settleIsOwnBankSelector
    }
};
</script>
