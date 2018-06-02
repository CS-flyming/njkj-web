<style lang="less">

</style>

<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter"  label-position="right" :label-width="120" >
                <FormItem label="渠道名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="渠道编号" prop="code">
                    <Input v-model="filter.code"></Input>
                </FormItem>
                <FormItem label="所属客户经理" prop="accountManagerId">
                    <customer-manager-selector v-model="filter.accountManagerId"></customer-manager-selector>
                </FormItem>
                <FormItem label="审核状态" prop="auditState">
                    <agent-audit-state-selector v-model="filter.auditState" :filter="[10, 20]"></agent-audit-state-selector>
                </FormItem>
                <FormItem label="审核类型" prop="auditAction">
                    <agent-audit-type-selector v-model="filter.auditAction"></agent-audit-type-selector>
                </FormItem>
                <FormItem label="渠道类型" prop="types">
                    <agent-type-selector v-model="filter.types"></agent-type-selector>
                </FormItem>
                <FormItem label="所在省市" prop="cityId">
                    <area-selector gutter="0" :province-id.sync="filter.provinceId" :city-id.sync="filter.cityId" />
                </FormItem>
                <FormItem label="创建时间" prop="_dateRange">
                    <date-range-selector v-model="filter._dateRange" :start-date.sync="filter.beginDate" :end-date.sync="filter.endDate"></date-range-selector>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
        <Table :loading="loading" border stripe :columns="columns" :data="data"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
        <Modal
            v-model="firstCheckState"
            title="初审"
            :loading="modalLoading"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="firstCheckSubmit">
            <Form label-position="top" ref="firstFilterForm" :rules="firstFormRules" :model="firstCheckObj">
                <FormItem label="初审结果" prop="state">
                    <RadioGroup v-model="firstCheckObj.state">
                        <Radio label="1">通过</Radio>
                        <Radio label="2">拒绝</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="初审意见" prop="remark">
                    <Input v-model="firstCheckObj.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                <FormItem label="复审意见" prop="remark">
                    <Input v-model="checkObj.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import agentAuditStateSelector from "components/agent-audit-state-selector";
import agentTypeSelector from "components/agent-type-selector";
import dateRangeSelector from "components/date-range-selector";
import areaSelector from "components/area-selector";
import customerManagerSelector from "components/customer-manager-selector";
import agentAuditTypeSelector from "components/agent-audit-type-selector";
import pagination from "components/pagination";
import {
    getAgentCheckList,
    agentAuditCheckFirst,
    agentAuditCheckSecond,
    getAgentChannelNumber
} from "@/actions/agent";
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
    name: "agent-check",
    data() {
        return {
            arr: [],
            loading: false,
            firstCheckObj: {
                agentId: 0,
                state: "1",
                remark: ""
            },
            checkObj: {
                types: 1,
                agentId: 0,
                remark: "",
                state: "1",
                channelNumbers: []
            },
            defaultCheckObj: {},
            modalLoading: true,
            firstCheckState: false,
            secondCheckState: false,
            columns: [
                {
                    key: "name",
                    title: "渠道名称"
                    // width: 160,
                },
                {
                    key: "code",
                    title: "渠道编号"
                    // width: 100,
                },
                {
                    key: "typesDesc",
                    title: "渠道类型"
                    // width: 100,
                },
                {
                    key: "parentAgentName",
                    title: "所属渠道"
                    // width: 140,
                },
                {
                    key: "auditStateDesc",
                    title: "审核状态"
                    // width: 100,
                },
                {
                    key: "province",
                    title: "归属省"
                    // width: 100,
                },
                {
                    key: "city",
                    title: "归属市"
                    // width: 100,
                },
                {
                    key: "auditAction",
                    title: "审核类型"
                    // width: 100,
                },
                {
                    key: "accountManagerName",
                    title: "所属客户经理"
                    // width: 120,
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
                                                name: "agent-detail",
                                                params: {
                                                    id: params.row.id
                                                },
                                                query: {
                                                    from: "agent-check"
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
                                            this.firstCheckObj.types = "1";
                                            this.firstCheckObj.agentId =
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
                                            // 浅拷贝 将源对象  拷贝到目标对象 然后赋值给
                                            this.checkObj.state = "1";
                                            this.checkObj.agentId =
                                                params.row.id;
                                            this.checkObj.types = 2;
                                            let channelNumberArr = [];
                                            this.checkObj.channelNumbers = [];
                                            getAgentChannelNumber(
                                                params.row.id
                                            ).then(res => {
                                                this.secondCheckState = true;
                                                res.data.forEach(item => {
                                                    if (item.channelType < 4) {
                                                        channelNumberArr.push(
                                                            item
                                                        );
                                                        if (
                                                            item.channelType ==
                                                            0
                                                        ) {
                                                            Object.assign(
                                                                channelNumberArr[0],
                                                                {
                                                                    name:
                                                                        "线下商户-渠道商编号"
                                                                }
                                                            );
                                                        } else if (
                                                            item.channelType ==
                                                            1
                                                        ) {
                                                            Object.assign(
                                                                channelNumberArr[1],
                                                                {
                                                                    name:
                                                                        "线上商户-渠道商编号"
                                                                }
                                                            );
                                                        } else if (
                                                            item.channelType ==
                                                            2
                                                        ) {
                                                            Object.assign(
                                                                channelNumberArr[2],
                                                                {
                                                                    name:
                                                                        "公益商户-渠道商编号"
                                                                }
                                                            );
                                                        } else if (
                                                            item.channelType ==
                                                            3
                                                        ) {
                                                            Object.assign(
                                                                channelNumberArr[3],
                                                                {
                                                                    name:
                                                                        "民生商户-渠道商编号"
                                                                }
                                                            );
                                                        }
                                                    }
                                                });
                                                this.arr = channelNumberArr;
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
                code: "",
                beginDate: "",
                endDate: "",
                accountManagerId: "",
                auditState: "",
                auditAction: "",
                types: "",
                cityId: "",
                provinceId: ""
            },
            data: [],
            total: 0,
            firstFormRules: defaultRules,
            secondFormRules: defaultRules
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getAgentCheckList(this.filter).then(res => {
                this.loading = false;
                this.data = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        firstCheckSubmit() {
            this.$refs.firstFilterForm.validate(valid => {
                if (valid) {
                    let formData = this.firstCheckObj;
                    agentAuditCheckFirst(formData).then(
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
                            this.secondCheckState = false;
                            this.modalLoading = false;
                            this.loadData();
                            this.$refs.filterForm.resetFields();
                            this.arr.forEach(element => {
                                element.channelNumber = "";
                            });
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
        agentAuditStateSelector,
        dateRangeSelector,
        pagination,
        customerManagerSelector,
        areaSelector,
        agentAuditTypeSelector,
        agentTypeSelector
    },
    watch: {
        "checkObj.state"(val) {
            if (val == "2") {
                defaultRules.remark.required = true;
            } else {
                defaultRules.remark.required = false;
            }
        },
        "firstCheckObj.state"(val) {
            if (val == "2") {
                defaultRules.remark.required = true;
            } else {
                defaultRules.remark.required = false;
            }
        }
    }
};
</script>