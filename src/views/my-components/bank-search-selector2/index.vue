<template>
    <div>
        <Select
            ref="select"
            v-model="currentValue"
            :label ="currentLabel"
            placeholder="输入关键字搜索"
            :disabled="currentDisable"
            filterable
            remote
            @on-change="handleChange"
            :remote-method="remoteMethod"
            :loading="loading">
            <Option v-for="(option, index) in data" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>

<script>
import { getBankInfoList } from "@/actions/selector";
export default {
    name: "bank-serach-selector2",
    props: {
        value: {
            type: String,
            default: ""
        },
        bankName: {
            type: String,
            default: ""
        },
        callback: Function,
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            currentLabel: this.bankName,
            currentDisable: this.disable,
            data: []
        };
    },
    methods: {
        remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                getBankInfoList({
                    name: query
                }).then(
                    res => {
                        this.loading = false;
                        this.data = res.data.rows.map(v => {
                            return {
                                value: v.id,
                                label: v.bankName,
                                item: v
                            };
                        });
                    },
                    err => {
                        this.loading = false;
                    }
                );
            } else {
                this.data = [];
            }
        },
        handleChange(val) {
            this.data.filter(v => {
                if (v.value === val) {
                    this.callback(v.item);
                }
            });
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        bankName(val) {
            this.currentLabel = val;
        },
        disable(val) {
            this.currentDisable = val;
        }
    }
};
</script>
