import {
    valideCertificateNo,
    validePhone,
    valideEmail
} from "@/constants/validate";
export let validateData = {
    merchantId: {
        required: true,
        message: "请选择商户",
        trigger: "change"
    },
    fullName: {
        required: true,
        message: "请输入门店名称",
        trigger: "blur"
    },
    name: {
        required: true,
        message: "请输入门店简称",
        trigger: "blur"
    },
    contactName: {
        required: true,
        message: "请输入联系人名称",
        trigger: "blur"
    },
    contactPhone: [
        {
            required: true,
            message: "请输入联系人手机",
            trigger: "blur"
        },
        { validator: validePhone, trigger: "blur" }
    ],
    contactEmail: [
        {
            required: true,
            message: "请输入联系人邮箱",
            trigger: "blur"
        },
        { validator: valideEmail, trigger: "blur" }
    ],
    contactCertificateNo: [
        {
            required: true,
            message: "请填写联系人身份证号",
            trigger: "blur"
        },
        { validator: valideCertificateNo, trigger: "blur" }
    ],
    servicePhone: {
        required: true,
        message: "请输入客服电话",
        trigger: "blur"
    },
    address: {
        required: true,
        message: "请输入详细地址",
        trigger: "blur"
    }
};
