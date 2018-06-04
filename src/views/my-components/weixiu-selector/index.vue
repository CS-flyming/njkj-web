<template>
    <Select ref="select" v-bind="$attrs" v-model="currentValue"  clearable filterable  :loading="loading" @on-change="handleChange">
        <Option :value="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
import { getKeepUserSelect } from "@/actions/depart";
export default {
  name: "weixiu-selector",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    keepUserId: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      currentValue: this.value,
      data: []
    };
  },
  created() {
    this.search();
  },
  methods: {
    search(query) {
      this.loading = true;
      getKeepUserSelect().then(res => {
        this.loading = false;
        this.data = res.data.map(
          item => {
            return {
              value: item.id,
              label: item.name
            };
          },
          err => {
            this.loading = false;
          }
        );
      });
    },
    handleChange(val) {
      this.$emit("input", val);
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    agentId(val) {
      this.search();
    },
    disable(val) {
      this.currentDisable = val;
    }
  }
};
</script>