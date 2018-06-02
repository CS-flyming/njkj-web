<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120">
                <FormItem label="商户名称" prop="merchantId">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="所属客户经理" prop="accountManagerId">
                    <customer-manager-selector v-model="filter.accountManagerId"></customer-manager-selector>
                </FormItem>
                <FormItem label="审核状态" prop="auditState">
                    <merchant-audit-state-selector v-model="filter.auditState" :filter="[-1, 1]"></merchant-audit-state-selector>
                </FormItem>
                <FormItem label="审核类型" prop="auditAction">
                    <merchant-audit-type-selector v-model="filter.auditAction"></merchant-audit-type-selector>
                </FormItem>
                <FormItem label="所在省市" prop="_area">
                    <area-selector gutter="0" v-model="filter._area" :province-id.sync="filter.provinceId" :city-id.sync="filter.cityId" />
                </FormItem>
                <FormItem label="创建时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
        <Modal
            v-model="firstCheckState"
            title="初审"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="firstCheckSubmit">
            <Form label-position="top" :model="firstCheckObj" :rules="ruleFirstCheck" ref="firstModalCheckForm">
                <FormItem label="初审结果" prop="state">
                    <RadioGroup v-model="firstCheckObj.state">
                        <Radio label="1">通过</Radio>
                        <Radio label="0">拒绝</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否补贴" prop="_isRate">
                    <RadioGroup v-model="firstCheckObj._isRate">
                        <Radio label="0">否</Radio>
                        <Radio label="1">是</Radio>
                    </RadioGroup>
                </FormItem>
                <template v-if="firstCheckObj._isRate === '1'">
                     <FormItem label="开户银行"  prop="bankName" >
                        <Input v-model="firstCheckObj.allowanceAccount.bankName"></Input>                    
                        <!-- <bank-search-selector v-model="checkObj.allowanceAccount.bankName"></bank-search-selector> -->
                    </FormItem>
                    <FormItem label="账户名" prop="name" >
                        <Input v-model="firstCheckObj.allowanceAccount.name"></Input>
                    </FormItem>
                    <FormItem label="补贴账号" prop="bankAccountId" v-if="firstCheckObj.state === 1">
                        <Input v-model="firstCheckObj.allowanceAccount.bankAccountId"></Input>
                    </FormItem>
                    <FormItem label="补贴费率(万分之)" prop="rate" >
                        <Input v-model="firstCheckObj.allowanceAccount.rate"></Input>
                    </FormItem>
                </template>
                 <FormItem label="初审意见">
                    <Input v-model="firstCheckObj.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
               
            </Form>
        </Modal>
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
    </div>
</template>

<script>
import merchantAuditStateSelector from "components/merchant-audit-state-selector";
import merchantTypeSelector from "components/merchant-type-selector";
import dateRangeSelector from "components/date-range-selector";
import areaSelector from "components/area-selector";
import merchantSelector from "components/merchant-selector";
import customerManagerSelector from "components/customer-manager-selector";
import bankSearchSelector from "components/bank-search-selector";
import merchantAuditTypeSelector from "components/merchant-audit-type-selector";
import pagination from "components/pagination";
import {
    getCheckMerchantList,
    merchantAuditFirst,
    merchantAuditSecond,
    getMerchantAuditFirstInfo
} from "@/actions/merchant";
export default {
    name: "merchant-check",
    data() {
        return {
            loading: false,
            firstCheckObj: {
                merchantId: 0,
                note: "",
                state: "1",
                _isRate: "0",
                allowanceAccount: {
                    bankName: "",
                    name: "",
                    bankAccountId: "",
                    rate: ""
                }
            },
            checkObj: {
                merchantId: 0,
                firstNote: "",
                note: "",
                state: "2"
            },
            defaultCheckObj: {},
            modalLoading: true,
            firstCheckState: false,
            secondCheckState: false,
            columns: [
                {
                    key: "fullName",
                    title: "商户名称"
                    // width: 140,
                },
                {
                    key: "agentName",
                    title: "所属渠道"
                    // width: 100,
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态"
                    // width: 100,
                },
                {
                    key: "provinceName",
                    title: "归属省"
                    // width: 100,
                },
                {
                    key: "cityName",
                    title: "归属市"
                    // width: 100,
                },
                {
                    key: "accountManagerName",
                    title: "所属客户经理"
                    // width: 120,
                },
                {
                    key: "auditAction",
                    title: "审核类型"
                    // width: 100,
                },
                {
                    key: "createTime",
                    title: "创建时间"
                    // width: 150,
                },
                {
                    type: "action",
                    title: "操作",
                    // fixed: 'right',
                    width: 180,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "merchant-detail",
                                                params: {
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.firstCheckState = true;
                                            this.firstCheckObj.state = "1";
                                            this.firstCheckObj.merchantId =
                                                params.row.id;
                                        }
                                    }
                                },
                                "初审"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.secondCheckState = true;
                                            this.checkObj.state = "2";
                                            this.checkObj.merchantId =
                                                params.row.id;
                                            getMerchantAuditFirstInfo(
                                                params.row.id
                                            ).then(res => {
                                                this.checkObj.firstNote =
                                                    res.data && res.data.note;
                                            });
                                        }
                                    }
                                },
                                "复审"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: "",
                _dateRange: ["", ""], // 下划线开头的参数不会作为 ajax 参数提交
                customerNo: "",
                beginDate: "",
                endDate: "",
                accountManagerId: "",
                auditState: "",
                auditAction: "",
                cityId: "",
                provinceId: "",
                _area: [],
                merchantId: ""
            },
            data: [],
            total: 0,
            ruleFirstCheck: {
                state: {
                    required: true,
                    message: "请选择初审结果",
                    trigger: "change"
                },
                _isRate: {
                    required: true,
                    message: "请选择是否补贴",
                    trigger: "change"
                },
                bankName: {
                    required: false,
                    message: "请填写开户银行",
                    trigger: "blur"
                },
                name: {
                    required: false,
                    message: "请填写账户名",
                    trigger: "blur"
                },
                bankAccountId: {
                    required: false,
                    message: "请填写补贴账号",
                    trigger: "blur"
                },
                rate: {
                    required: false,
                    message: "补贴费率(万分之)",
                    trigger: "blur"
                }
            },
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
        loadData() {
            this.loading = true;
            getCheckMerchantList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleSelect(selection) {
            console.log(selection);
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        reset() {
            this.$refs.filterForm.resetFields();
        },
        firstCheckSubmit() {
            this.$refs.firstModalCheckForm.validate(valid => {
                if (valid) {
                    let formData = this.firstCheckObj;
                    merchantAuditFirst(formData).then(
                        res => {
                            this.$lf.message("初审成功", "success");
                            this.firstCheckState = false;
                            this.loadData();
                        },
                        err => {
                            this.modalLoading = false;
                        }
                    );
                } else {
                    this.modalLoading = false;
                }
            });
        },
        secondCheckSubmit() {
            this.$refs.secondModalCheckForm.validate(valid => {
                if (valid) {
                    let formData = this.checkObj;
                    merchantAuditSecond(formData).then(
                        res => {
                            this.$lf.message("复审成功", "success");
                            this.secondCheckState = false;
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
    components: {
        merchantAuditStateSelector,
        dateRangeSelector,
        pagination,
        customerManagerSelector,
        areaSelector,
        merchantAuditTypeSelector,
        merchantTypeSelector,
        merchantSelector,
        bankSearchSelector
    },
    watch: {
        "firstCheckObj._isRate"(val) {
            if (val) {
                this.ruleFirstCheck.bankName.required = true;
                this.ruleFirstCheck.bankAccountId.required = true;
                this.ruleFirstCheck.name.required = true;
                this.ruleFirstCheck.rate.required = true;
            }
        }
    }
};
</script>
