<template>
    <RadioGroup v-model="currentValue" @on-change="handleChange">
        <Radio :disabled="disabled||item.disabled" :label="item.value" v-for="item in data" :key="item.value">{{ item.label }}</Radio>
    </RadioGroup>
</template>

<script>
export default {
  name: "manager-role-selector",
  props: {
    value: {
      type: String
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
          label: "普通用户"
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
