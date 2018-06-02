<style lang="less">
#previewQrcode {
    margin-bottom: 20px;
    display: inline-block;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
<template>
    <div>
        <Card class="filter-wrap">
            <Form @submit.native.prevent="handleFilter" :model="filter" ref="filterForm" label-position="right" :label-width="120" >
                <FormItem label="所属商户" prop="merchantId">
                    <merchant-selector v-model="filter.merchantId"></merchant-selector>
                </FormItem>
                <FormItem label="门店名称" prop="name">
                    <Input v-model="filter.name"></Input>
                </FormItem>
                <FormItem label="商户编号" prop="merchantCode">
                    <Input v-model="filter.merchantCode"></Input>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" html-type="submit">筛选</Button>
                </FormItem>
            </Form>
        </Card>
         <div class="data-control">
            <Button @click="handleBatchQrcode()">批量导出二维码</Button>
        </div>
        <Table :loading="loading" border stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
        <pagination :total="total" :limit.sync="filter.limit" :offset.sync="filter.offset" @on-load="loadData"></pagination>
        <Modal
            v-model="generateQrcodeState"
            title="制作二维码"
            :width="760"
            :loading="modalLoading"
            ok-text="确认生成并导出"
            cancel-text="关闭"
            @on-ok="handleExportQrcode"
            @on-cancel="handleModalCancel">
            <Form label-position="top">
                <Row>
                    <Col span="11">
                    <FormItem label="主体颜色">
                         <ColorPicker @on-active-change="activeChangePrimaryColor" recommend v-model="qrcode.qrColor.primaryColor" />
                    </FormItem>
                    <FormItem label="边框颜色">
                         <ColorPicker @on-active-change="activeChangeLineColor" recommend v-model="qrcode.qrColor.lineColor" />
                    </FormItem>
                    <FormItem label="二维码LOGO">
                        <Upload :action="upload.serviceUrl"
                            :headers="upload.headers"
                            :show-upload-list="false"
                            :name="upload.name"
                            :with-credentials="true"
                            :accept="upload.accept"
                            :on-success="handleUploadSuccess"
                            :on-error="handleUploadError"
                            :before-upload="handleBeforeUpload"
                            >
                            <Button type="ghost" icon="ios-cloud-upload-outline">选择文件..</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="支付方式展示">
                        <CheckboxGroup v-model="qrcode.payType">
                            <Checkbox label="wechat">微信支付</Checkbox>
                            <Checkbox label="alipay">支付宝支付</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    </Col>
                    <Col span="13">
                        <div id="previewQrcode">
                            <dl class="store-qrcode-card">
                                <dt :style="{ 'background-color': qrcode.qrColor.primaryColor }">扫码付款</dt>
                                <dd>
                                    <div class="icons">
                                        <i class="icons__wechat" v-if="qrcode.payType.includes('wechat')"></i>
                                        <i class="icons__alipay" v-if="qrcode.payType.includes('alipay')"></i>
                                    </div>
                                    <div class="qrcode__wrap" :style="{ 'border-color': qrcode.qrColor.lineColor }">
                                        <div class="before" :style="{ 'border-color': qrcode.qrColor.primaryColor}"></div>
                                        <div class="after" :style="{ 'border-color': qrcode.qrColor.primaryColor}"></div>
                                        <div class="qrcode" :style="{ 'background-image': `url(${qrcode._base64})`}">
                                            <img class="qrcode__logo" :src="qrcode._base64Logo" v-show="qrcode._base64Logo" />
                                        </div>
                                    </div>
                                    <h1 :style="{ 'color': qrcode.qrColor.primaryColor}" v-html="qrcode.fullName"></h1>
                                    <h3 :style="{ 'color': qrcode.qrColor.primaryColor}" v-html="qrcode.code"></h3>
                                </dd>
                            </dl>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>


<script>
import pagination from "components/pagination";
import merchantSelector from "components/merchant-selector";
import html2canvas from "html2canvas";
import jrQrcode from "jr-qrcode";
import { uploadConfig, uploadImage } from "@/constants/constant";
import {
    getStoreQrcodeList,
    getStoreQrcodeUrl,
    getStoreQrcodeContent,
    saveStoreQrcode
} from "@/actions/store";
let defaultQrColor = {
    primaryColor: "#004691",
    lineColor: "#a9d3fd"
};
export default {
    name: "store-qrcode",
    data() {
        return {
            loading: false,

            qrcode: {
                qrColor: defaultQrColor,
                logo: "",
                payType: ["wechat", "alipay"],
                storeId: "",
                code: "",
                fullName: "",
                data: null,
                _base64: "",
                _base64Logo: ""
            },
            defaultQrcode: {},
            generateQrcodeState: false,
            modalLoading: true,
            upload: uploadConfig,
            columns: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    key: "merchantName",
                    title: "商户名称",
                    width: 150
                },
                {
                    key: "merchantCode",
                    title: "商户编号"
                },
                {
                    key: "fullName",
                    title: "门店名称"
                },
                {
                    key: "qrcodeDesc",
                    title: "二维码状态"
                },
                {
                    type: "action",
                    title: "操作",
                    width: 220,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            getStoreQrcodeUrl({
                                                storeId: params.row.id
                                            }).then(res => {
                                                if (
                                                    res.data &&
                                                    res.data.qrcodeUrl
                                                ) {
                                                    let filename =
                                                        new Date().getTime() +
                                                        ".png";
                                                    let a = document.createElement(
                                                        "a"
                                                    );
                                                    a.href = res.data.qrcodeUrl;
                                                    a.setAttribute(
                                                        "download",
                                                        filename
                                                    );
                                                    document.body.appendChild(
                                                        a
                                                    );
                                                    if (document.all) {
                                                        a.click();
                                                    } else {
                                                        // 解决 Chrome 安全兼容性
                                                        var o = document.createEvent(
                                                            "MouseEvent"
                                                        );
                                                        o.initEvent(
                                                            "click",
                                                            false,
                                                            false
                                                        );
                                                        a.dispatchEvent(o);
                                                    }
                                                    document.body.removeChild(
                                                        a
                                                    );
                                                    // document.body.removeChild(wrap);
                                                } else {
                                                    this.$lf.message(
                                                        "请先点击『制作二维码』",
                                                        "error"
                                                    );
                                                }
                                            });
                                        }
                                    }
                                },
                                "导出二维码"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.qrcode = Object.assign(
                                                {},
                                                this.defaultQrcode
                                            );
                                            this.qrcode.storeId = params.row.id;
                                            this.qrcode.code = params.row.code;
                                            this.qrcode.fullName =
                                                params.row.fullName;
                                            getStoreQrcodeUrl({
                                                storeId: params.row.id
                                            }).then(res => {
                                                if (
                                                    res.data &&
                                                    res.data.qrcodeUrl
                                                ) {
                                                    this.qrcode.logo =
                                                        res.data.logUrl;
                                                }
                                            });
                                            getStoreQrcodeContent({
                                                storeId: params.row.id
                                            }).then(res => {
                                                this.generateQrcodeState = true;
                                                this.qrcode.data = res.data;
                                            });
                                        }
                                    }
                                },
                                "制作二维码"
                            )
                        ]);
                    }
                }
            ],
            filter: {
                limit: 10,
                offset: 0,
                name: "",
                merchantCode: "",
                auditState: 2,
                merchantId: ""
            },
            data: [],
            total: 0,
            selectedSelection: []
        };
    },
    methods: {
        activeChangePrimaryColor(val) {
            this.qrcode.qrColor.primaryColor = val;
        },
        activeChangeLineColor(val) {
            this.qrcode.qrColor.lineColor = val;
        },
        init() {
            this.defaultQrcode = this.qrcode;
        },
        handleModalCancel() {
            this.qrcode.qrColor = defaultQrColor;
        },
        loadData() {
            this.loading = true;
            getStoreQrcodeList(this.filter).then(
                res => {
                    this.loading = false;
                    this.data = res.data.rows;
                    this.total = res.data.total;
                },
                err => {
                    this.loading = false;
                }
            );
        },
        handleFilter() {
            this.filter.offset = 0;
            this.loadData();
        },
        handleBeforeUpload(file) {
            this.$Spin.show({
                render: h => {
                    return h("div", [
                        h("Icon", {
                            class: "demo-spin-icon-load",
                            props: {
                                type: "load-c",
                                size: 18
                            }
                        }),
                        h("div", "正在上传..")
                    ]);
                }
            });
            return true;
        },
        handleUploadSuccess(json) {
            this.$Spin.hide();
            if (json.result) {
                this.qrcode.logo = json.data.publicUrl;
            } else {
                this.$lf.alert.error(json.message);
            }
        },
        handleUploadError(error, json) {
            this.$Spin.hide();
            this.$lf.alert.error(json.message);
        },
        handleExportQrcode() {
            let qrcodeDom = document.querySelector("#previewQrcode");
            html2canvas(qrcodeDom, {
                allowTaint: true
            }).then(canvas => {
                this.modalLoading = false;
                canvas.toBlob(blob => {
                    this.modalLoading = true;
                    let formData = new FormData();
                    formData.append("file", blob, "qrcode.png");
                    uploadImage(formData).then(
                        res => {
                            this.saveQrcode(res.data.publicUrl);
                        },
                        err => {
                            this.modalLoading = false;
                        }
                    );
                });
            });
        },
        saveQrcode(qrcodeUrl) {
            saveStoreQrcode({
                qrcodeUrl: qrcodeUrl,
                logUrl: this.qrcode.logo,
                storeId: this.qrcode.storeId,
                operatorId: ""
            }).then(
                res => {
                    let a = document.createElement("a");
                    a.href = qrcodeUrl;
                    a.setAttribute("download", "qrcode.png");
                    a.innerText = "点击下载";
                    document.body.appendChild(a);
                    if (document.all) {
                        a.click();
                    } else {
                        // 解决 Chrome 安全兼容性
                        var o = document.createEvent("MouseEvent");
                        o.initEvent("click", false, false);
                        a.dispatchEvent(o);
                    }
                    document.body.removeChild(a);
                },
                err => {
                    this.modalLoading = false;
                }
            );
        },
        handleBatchQrcode(selection) {
            let ids = this.selectedSelection.map(item => {
                return item.id;
            });
            if (ids.length == 0) {
                this.$lf.message("正在导出全部");
            }
            this.$util.downloadExcel("merchant/store/batch/qrcode", {
                ids
            });
        },
        handleSelect(selection) {
            this.selectedSelection = selection;
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        "qrcode.data"(val) {
            this.qrcode._base64 = jrQrcode.getQrBase64(this.qrcode.data, {
                padding: 10, // 二维码四边空白（默认为10px）
                width: 168, // 二维码图片宽度
                height: 168, // 二维码图片高度
                correctLevel: QRErrorCorrectLevel.M
            });
        },
        "qrcode.logo"(val) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                var canvas = document.createElement("CANVAS");
                var ctx = canvas.getContext("2d");
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                this.qrcode._base64Logo = dataURL;
                canvas = null;
            };
            img.src = val;
        }
    },
    components: {
        pagination,
        merchantSelector
    }
};
</script>
