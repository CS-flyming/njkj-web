<template>
    <Select v-bind="$attrs" v-model="currentValue" :disabled="currentDisable" clearable filterable :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getMechantSelectList } from "@/actions/selector";
export default {
    name: "merchant-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        disable: {
            type: Boolean,
            default: false
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
            getMechantSelectList({ value: query || "" }).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows.map(item => {
                        return {
                            value: item.id,
                            label: item.fullName
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
