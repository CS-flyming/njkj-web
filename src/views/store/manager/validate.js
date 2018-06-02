import { validePhone } from "@/constants/validate";
export let validateData = {
    name: {
        required: true,
        message: "请输入管理员姓名",
        trigger: "blur"
    },
    password: {
        required: true,
        message: "请输入密码",
        trigger: "blur"
    },
    storeId: {
        required: true,
        message: "请选择门店",
        trigger: "change"
    },
    phone: [
        {
            required: true,
            message: "请输入手机",
            trigger: "blur"
        },
        { validator: validePhone, trigger: "blur" }
    ],
    state: {
        required: true,
        message: "请选择是否启用",
        trigger: "change"
    },
    sex: {
        required: true,
        message: "请选择性别",
        trigger: "change"
    }
};
