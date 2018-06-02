import $axios from "../constants/constant";

/**
 * 获取门店列表
 */
export function getMerchantStoreList(params) {
    return $axios.post("/merchant/store/list", params);
}

/**
 * 冻结or解冻商户
 * @param {*} type
 * @param {*} params
 */
export function disableOrEnableMerchantStore(type, params) {
    return $axios.post(`/merchant/store/${type}`, params);
}

/**
 * 新增or更新门店
 * @param {*} params
 */
export function addOrUpdateMerchantStore(params) {
    let url = "";
    if (params.id) {
        url = "/merchant/store/update";
    } else {
        url = "/merchant/store/add";
    }
    return $axios.post(url, params);
}

/**
 * 获取门店详情
 * @param {*} storeId
 */
export function getMerchantStoreDetail(storeId) {
    return $axios.post(`/merchant/store/detail/${storeId}`);
}

/**
 * 获取门店审核列表
 * @param {*} params
 */
export function getMerchantStoreAuditList(params) {
    return $axios.post("/merchant/store/audit/list", params);
}

/**
 * 初审门店
 * @param {*} params
 */
export function checkMerchantStoreAuditFirst(params) {
    return $axios.post(`/merchant/store/audit/first`, params);
}

/**
 * 门店初次审核信息
 */
export function getMerchantStoreAuditFirstInfo(id) {
    return $axios.post(`/merchant/store/audit/first/${id}`);
}
/**
 * 复审门店
 * @param {*} params
 */
export function checkMerchantStoreAuditSecond(params) {
    return $axios.post(`/merchant/store/audit/second`, params);
}

/**
 * 门店审核拒绝列表
 */
export function getMerchantStoreAuditRefuseList(params) {
    return $axios.post("/merchant/store/audit/refuse/list", params);
}

/**
 * 收银员列表
 */
export function getMerchantStoreCashierList(params) {
    return $axios.post("/merchant/merchant/manager/list", params);
}

/**
 * 新增or更新收银员
 */
export function addOrUpdateMerchantStoreCashier(params) {
    let url = "";
    if (params.id) {
        url = "/merchant/merchant/manager/update";
    } else {
        url = "/merchant/merchant/manager/add";
    }
    return $axios.post(url, params);
}

/**
 * 收银员详情
 */
export function getCashierDetail(cashierId) {
    return $axios.post(`/merchant/merchant/manager/detail/${cashierId}`);
}

/**
 * 新增or更新门店管理员
 */
export function addOrUpdateMerchantStoreManager(params) {
    let url = "";
    if (params.id) {
        url = "/merchant/store/manager/update";
    } else {
        url = "/merchant/store/manager/add";
    }
    return $axios.post(url, params);
}

/**
 * 删除收银员
 */
export function deleteMerchantStoreCashier(id) {
    return $axios.post(`/merchant/merchant/manager/delete/${id}`);
}

/**
 * 门店管理员列表
 */
export function getMerchantStoreManagerList(params) {
    return $axios.post("/merchant/store/manager/list", params);
}
/**
 * 门店管理员详情
 */
export function getMerchantStoreManagerDetail(mId) {
    return $axios.post(`/merchant/store/manager/detail/${mId}`);
}

/**
 * 启用or禁用门店管理员
 */
export function disableOrEnableMerchantStoreManager(params) {
    return $axios.post("/merchant/store/manager/delete/", params);
}

/**
 * 保存二维码
 */
export function saveStoreQrcode(params) {
    return $axios.post("/merchant/store/qrcode/save", params);
}

/**
 * 获取二维码
 */
export function getStoreQrcodeUrl(params) {
    return $axios.post(`/merchant/store/qrcode`, params);
}
/**
 * 获取二维码内容
 */
export function getStoreQrcodeContent(params) {
    return $axios.post("/merchant/store/qrcode/content", params);
}

/**
 * 获取二维码列表
 */
export function getStoreQrcodeList(params) {
    return $axios.post("/merchant/store/list/qrcode", params);
}
/**
 * 扫码枪支付
 * @param {*} params
 */
export function scannerPay(params) {
    return $axios.post("/transaction/scanner/pay", params);
}
