<template>
    <Select v-bind="$attrs" v-model="currentValue" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getSettleStatesList } from "@/actions/selector";
export default {
    name: "settle-state-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            currentValue: this.value,
            data: []
        };
    },
    activated() {
        getSettleStatesList().then(res => {
            this.data = res.data.map(item => {
                return {
                    value: item.value,
                    label: item.desc
                };
            });
        });
    },
    methods: {
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
