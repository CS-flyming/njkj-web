<style lang="less">
.form-group-title {
    margin-bottom: 20px;
    text-align: center;
}
</style>

<template>
    <Card>
        <p slot="title">
            新增渠道
        </p>
        <Form 
            style="max-width: 800px;" 
            ref="form" 
            method="post" 
            @submit.prevent.native="handleSubmit" 
            :model="form" 
            :label-width="140" 
            label-position="right"
            :rules="rules">
            <h3 class="form-group-title">基本信息</h3>
            <FormItem label="渠道名称" prop="name">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="所属渠道">
                <agent-selector  v-model="form.parentId" ></agent-selector>           
            </FormItem>
            <FormItem label="渠道地址" props="cityId" :required="true">
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
            <FormItem label="联系人姓名" prop="linkUser.name">
                <Input v-model="form.linkUser.name"></Input>
            </FormItem>
            <FormItem label="联系人手机" prop="linkUser.phone">
                <Input v-model="form.linkUser.phone"></Input>
            </FormItem>
            <FormItem label="联系人邮箱" prop="linkUser.email">
                <Input v-model="form.linkUser.email"></Input>
            </FormItem>
            <FormItem label="渠道类型" prop="types">
                <agent-type-selector  v-model="form.types"></agent-type-selector>
            </FormItem>
            <FormItem label="拓展业务员" prop="salesmanId">               
                <salesman-selector  v-model="form.salesmanId" :agent-id="form.parentId"></salesman-selector>
            </FormItem>
            <FormItem label="所属客户经理" prop="accountManagerId">
                <customer-manager-selector v-model="form.accountManagerId"></customer-manager-selector>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input  v-model="form.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="是否有公众号">
                <Checkbox  v-model="form.hasOfficialAccount">是</Checkbox>
            </FormItem>
            <template v-if="form.hasOfficialAccount === true">
                <FormItem label="公众号APPID" prop="appId">
                    <Input  v-model="form.appId"></Input>
                    <p>说明：该公众号需为已通过微信认证的服务号，且其认证主体需与商户企业主体一致</p>
                </FormItem>
                <FormItem label="JS API支付授权目录" prop="jsAPIPath">
                    <!-- <Input  v-model="form.jsAPIPath"></Input> -->
                    {{form.jsAPIPath}}
                    <p>说明：该公众号需为已通过微信认证的服务号，且其认证主体需与商户企业主体一致</p>
                </FormItem>
                <FormItem label="Appsecret" prop="appSecret">
                    <Input v-model="form.appSecret"></Input>
                    <p>说明：为上面填写公众号的secretkey</p>
                </FormItem>
            </template>
            
            <h3 class="form-group-title">结算信息录入</h3>
            <FormItem label="结算账号标志" prop="settleAccount.types">
                <Select v-model="form.settleAccount.types">
                    <Option value="01">对公</Option>
                    <Option value="00">对私</Option>
                </Select>
            </FormItem>
            
            <FormItem label="结算银行名称" prop="settleAccount.bankName">
                <!-- <Input  v-model="form.settleAccount.bankName"></Input>               -->
                <bank-search-selector2 :callback="selectBankInfo" v-model="form.settleAccount.bankId" :bankName="form.settleAccount.bankName"></bank-search-selector2>                
            </FormItem>
            <FormItem label="结算行号" prop="settleAccount.unionNo">
                <Input  v-model="form.settleAccount.unionNo"></Input>
            </FormItem>
            <FormItem label="结算账号" prop="settleAccount.bankCardNumber">
                <Input  v-model="form.settleAccount.bankCardNumber"></Input>
            </FormItem>
            <FormItem label="结算账户名称" prop="settleAccount.name">
                <Input  v-model="form.settleAccount.name"></Input>
            </FormItem>
            <h3 class="form-group-title">支付类型配置</h3>
            <FormItem label="请选择支付渠道" :required="true">
                <Tabs size="small" type="card">
                    <TabPane v-for="item in institutionList" :key="item.id" :label="item.name"> 
                        <ul v-for="(products, key) in institutions" :key="key" v-if="item.code === 'ALIPAY'" style="list-style: none;">
                            <li v-for="(product, index) in products" :key="index" v-if="key === item.id">
                                <Checkbox  v-model="product.checked">
                                    {{ product.name }}，费率（万分之） <Input　size="small"  v-model.trim="product.rate"></Input>
                                </Checkbox>
                            </li>
                        </ul>
                        <Tabs v-if="item.code === 'WECHAT'">
                            <TabPane size="small" v-for="channel in weChatChannelTypes" :key="channel.id" :label="channel.name">
                                <ul v-for="(products, key) in institutions" :key="key" style="list-style: none;">
                                    <li v-for="(product, index) in products" :key="index" v-if="key === item.id && product.channelType === channel.id">
                                        <Checkbox  v-model="product.checked">
                                            {{ product.name }}，费率（万分之） <Input　size="small"  v-model.trim="product.rate"></Input>
                                        </Checkbox>
                                    </li>
                                </ul>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            </FormItem>
            <FormItem>
                <Button type="primary" html-type="submit" :loading="loading">保存</Button>
            </FormItem>
        </Form>
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
    addOrUpdateAgent
} from "@/actions/agent";
import { validateData } from "./validate";
import { closeCurrentErrPage } from "@/constants/constant";
export default {
    name: "agent-add",
    data() {
        return {
            arr: [],
            // -------------
            agentIs: false,
            loading: false,
            institutionList: [],
            institutions: {},
            weChatChannelTypes: [],
            defaultForm: {},
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
            rules: validateData
        };
    },
    activated() {
        this.init();
    },
    methods: {
        selectBankInfo(values) {
            this.form.settleAccount.bankName = values.bankName;
            this.form.settleAccount.bankId = values.id;
            this.form.settleAccount.unionNo = values.bankNo;
            this.form.settleAccount.bankClassCode = values.bankClassCode;
            this.form.settleAccount.provinceId = values.provinceId;
            this.form.settleAccount.cityId = values.cityId;
        },
        init() {
            this.institutions = {};
            this.weChatChannelTypes = [];
            this.getWeChatChannelType();
            this.getInstitutionList();
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
        handleSubmit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.institutionProduct = [];
                    Object.entries(this.institutions).forEach(
                        ([key, products]) => {
                            products.forEach((product, index) => {
                                if (product.checked) {
                                    this.form.institutionProduct.push({
                                        institutionProductId: product.id,
                                        rate: product.rate,
                                        channelType: product.channelType,
                                        model: "1" // "1","按费率收取手续费"; "2","按定额收取手续费"
                                    });
                                }
                            });
                        }
                    ) || [];
                    let formData = this.form;
                    if (!formData.institutionProduct.length) {
                        this.$lf.message("请选择支付渠道", "error");
                        return;
                    }
                    this.loading = true;
                    addOrUpdateAgent(formData).then(
                        res => {
                            this.loading = false;
                            this.$lf.message("保存成功", "success");
                            closeCurrentErrPage(this, "agent-index");
                        },
                        err => {
                            this.loading = false;
                        }
                    );
                }
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
