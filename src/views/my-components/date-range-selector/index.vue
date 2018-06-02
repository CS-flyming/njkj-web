<template>
    <DatePicker v-bind="$attrs" type="datetimerange" :options="options" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择.." v-model="currentValue"></DatePicker>
</template>

<script>
import moment from "moment-mini";
export default {
    name: "date-range-selector",
    props: {
        value: {
            type: Array,
            default: ["", ""]
        },
        startDate: "",
        endDate: ""
    },
    data() {
        return {
            currentValue: this.value,
            data: [],
            options: {
                shortcuts: [
                    {
                        text: "今天",
                        value() {
                            return [
                                moment().format("YYYY-MM-DD HH:mm:ss"),
                                moment().format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    },
                    {
                        text: "昨天",
                        value() {
                            return [
                                moment()
                                    .subtract(1, "day")
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                moment()
                                    .subtract(1, "day")
                                    .format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    },
                    {
                        text: "近7天",
                        value() {
                            return [
                                moment()
                                    .subtract(7, "day")
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                moment().format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    },
                    {
                        text: "本周",
                        value() {
                            return [
                                moment()
                                    .weekday(1)
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                moment()
                                    .weekday(7)
                                    .format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    },
                    {
                        text: "上周",
                        value() {
                            return [
                                moment()
                                    .weekday(-6)
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                moment()
                                    .weekday(0)
                                    .format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    },
                    {
                        text: "本月",
                        value() {
                            return [
                                moment()
                                    .startOf("month")
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                moment()
                                    .endOf("month")
                                    .format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    },
                    {
                        text: "上个月",
                        value() {
                            return [
                                moment()
                                    .subtract(1, "month")
                                    .startOf("month")
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                moment()
                                    .subtract(1, "month")
                                    .endOf("month")
                                    .format("YYYY-MM-DD HH:mm:ss")
                            ];
                        }
                    }
                ]
            }
        };
    },
    activated() {},
    watch: {
        currentValue(val, oldVal) {
            if (val !== oldVal) {
                let flag = false,
                    endDate = "";
                if (val[1]) {
                    endDate = moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
                    flag = /00:00:00/.test(endDate);
                    endDate = flag && endDate.replace(/00:00:00/, "23:59:59");
                    val[1] = moment(endDate);
                }
                this.$emit("input", val);
                this.$emit(
                    "update:startDate",
                    val[0] ? moment(val[0]).format("YYYY-MM-DD HH:mm:ss") : ""
                );
                this.$emit("update:endDate", endDate);
            }
        },
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
