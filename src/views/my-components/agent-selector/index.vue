<template>
    <Select ref="select" v-bind="$attrs" :disabled="currentDisable" v-model="currentValue" clearable filterable :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
import { getAgentSelectList } from "@/actions/selector";
export default {
    name: "agent-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        disable: {
            type: Boolean,
            default: false
        },
        auditState: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            currentDisable: this.disable,
            data: []
        };
    },
    created() {
        this.search();
    },
    methods: {
        search(query) {
            this.loading = true;
            getAgentSelectList({
                value: query || "",
                auditState: this.auditState || "21"
            }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        };
                    });
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        disable(val) {
            this.currentDisable = val;
        }
    }
};
</script>
