import {
    valideCertificateNo,
    validePhone,
    valideEmail
} from "@/constants/validate";
export let validateData = {
    name: {
        required: true,
        message: "请输入渠道名称",
        trigger: "blur"
    },
    address: {
        required: true,
        message: "请输入详细地址",
        trigger: "blur"
    },
    "linkUser.name": {
        required: true,
        message: "请输入联系人姓名",
        trigger: "blur"
    },
    "linkUser.phone": [
        {
            required: true,
            message: "请输入联系人手机",
            trigger: "blur"
        },
        { validator: validePhone, trigger: "blur" }
    ],
    "linkUser.email": [
        {
            required: true,
            message: "请输入联系人邮箱",
            trigger: "blur"
        },
        { validator: valideEmail, trigger: "blur" }
    ],
    types: {
        required: true,
        message: "请选择渠道类型",
        trigger: "change"
    },
    appId: {
        required: false,
        message: "请输入公众号APPID",
        trigger: "blur"
    },
    jsAPIPath: {
        required: false,
        message: "请输入JS API支付授权目录",
        trigger: "blur"
    },
    appSecret: {
        required: false,
        message: "请输入Appsecret",
        trigger: "blur"
    },
    "settleAccount.types": {
        required: true,
        message: "请选择结算账号标志",
        trigger: "change"
    },
    "settleAccount.bankName": {
        required: true,
        message: "请选择结算银行名称",
        trigger: "change"
    },
    "settleAccount.unionNo": {
        required: true,
        message: "请输入结算行号",
        trigger: "blur"
    },
    "settleAccount.bankCardNumber": {
        required: true,
        message: "请输入结算账号",
        trigger: "blur"
    },
    "settleAccount.name": {
        required: true,
        message: "请输入结算账户名称",
        trigger: "blur"
    }
};
