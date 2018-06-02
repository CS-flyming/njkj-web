import { validePhone } from "@/constants/validate";
export let validateData = {
    name: {
        required: true,
        message: "请输入收银员姓名",
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
    types: {
        required: true,
        message: "请选择收银员类型",
        trigger: "change"
    },
    sex: {
        required: true,
        message: "请选择收银员性别",
        trigger: "change"
    }
};
