import { validePhone } from "@/constants/validate";
export let validateData = {
    name: {
        required: true,
        message: "请输入业务员名称",
        trigger: "blur"
    },
    agentId: {
        required: true,
        message: "请选择渠道",
        trigger: "blur"
    },
    sex: {
        required: true,
        message: "请选择性别",
        trigger: "change"
    },
    state: {
        required: true,
        message: "请选择是否启用",
        trigger: "change"
    },
    phone: [
        {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
        },
        { validator: validePhone, trigger: "blur" }
    ]
};
