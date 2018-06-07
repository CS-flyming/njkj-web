<template>
    <CheckboxGroup v-model="currentValue" size="small" @on-change="handleChange">
        <Checkbox :disabled="disabled||item.disabled" :label="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup>
</template>

<script>
export default {
    name: "manager-role-selector",
    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
        },
        name: "",
        disabled: {
            type: Boolean,
            default: false
        }
    },
    inheritAttrs: false,
    data() {
        return {
            currentValue: this.value,
            data: [
                {
                    value: "0",
                    label: "管理员"
                },
                {
                    value: "1",
                    label: "普通用户",
                    disabled: true
                },
                {
                    value: "2",
                    label: "首长"
                },
                {
                    value: "3",
                    label: "检修人员"
                }
            ]
        };
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
