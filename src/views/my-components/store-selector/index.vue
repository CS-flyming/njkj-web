<template>
    <Select v-bind="$attrs" v-model="currentValue" clearable filterable remote :remote-method="search" :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { getMerchantStoreSelectList } from "@/actions/selector";
export default {
    name: "store-selector",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        merchantId: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            loading: false,
            currentValue: this.value,
            data: []
        };
    },
    methods: {
        search(query) {
            this.loading = true;
            getMerchantStoreSelectList({
                value: query || "",
                merchantId: this.merchantId,
                auditState: "2"
            }).then(
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
        merchantId: {
            immediate: true,
            handler(val, oldVal) {
                this.search(this.value);
            }
        }
    }
};
</script>
