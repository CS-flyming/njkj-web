import $axios from "../constants/constant";

/**
 * 商户管理相关actions
 */

/**
 * 获取收单商户列表
 */
export function getMerchantList(params) {
    return $axios.post("/merchant/list", params);
}

/**
 * 冻结，解冻商户
 */

export function freezeOrUnFreezeMerchant(type, params) {
    return $axios.post(`/merchant/${type}`, params);
}

/**
 * 重置商户密码
 * @param {*} params
 */
export function resetMerchantPassword(merchantId) {
    return $axios.post(`merchant/reset/password/${merchantId}`);
}

/**
 * 商户基本资料检测
 */
export function checkMerchantBasicInfo(params) {
    return $axios.post("/merchant/check/add/basic", params);
}

/**
 * 商户结算信息检测
 */
export function checkMerchantSettleInfo(params) {
    return $axios.post("/merchant/check/settle", params);
}

/**
 * 商户审核列表
 */
export function getCheckMerchantList(params) {
    return $axios.post("/merchant/audit/list", params);
}

/**
 * 商户初次审核
 */
export function merchantAuditFirst(params) {
    return $axios.post("/merchant/audit/first", params);
}
/**
 * 商户初次审核
 */
export function getMerchantAuditFirstInfo(id) {
    return $axios.post(`/merchant/audit/first/${id}`);
}
/**
 * 商户复审
 */
export function merchantAuditSecond(params) {
    return $axios.post("/merchant/audit/second", params);
}

/**
 * 审核拒绝商户列表
 */
export function getMerchantAuditRefuseList(params) {
    return $axios.post("/merchant/audit/refuse/list", params);
}

/**
 * 商户微信配置列表
 */
export function getMerchantInstitutionConfigList(params) {
    return $axios.post("/merchant/institution/config/list", params);
}

/**
 * 商户微信配置详情
 */
export function getMerchantInstitutionConfigDetail(id) {
    return $axios.post(`/merchant/institution/config/detail/${id}`);
}

/**
 * 商户微信配置更新
 */

export function updateMerchantInstitutionConfig(params) {
    return $axios.post("/merchant/institution/config/update", params);
}

/**
 * 商户管理员权限列表
 */
export function getMerchantManagerList(params) {
    return $axios.post("/merchant/manager/list", params);
}
/**
 * 商户秘钥列表
 * @param {*} params
 */
export function getMerchantSecretList(params) {
    return $axios.post("/merchant/app/info/list", params);
}

/**
 * 商户秘钥详情
 */
export function getMerchantSecretInfo(id) {
    return $axios.post(`/merchant/app/info/detail/${id}`);
}

/**
 * 更新商户秘钥
 */
export function updateMerchantSecretInfo(params) {
    return $axios.post("/merchant/app/info/update", params);
}

/**
 * 客户经理维护
 * @param {*} params
 */
export function getCustomerManagerList(params) {
    return $axios.post("/merchant/customer/manager/list", params);
}

/**
 * 删除客户经理
 * @param {*} id
 * @param {*} params
 */
export function deleteCustomerManager(id, params) {
    return $axios.post(`/merchant/customer/manager/delete/${id}`, params);
}

/**
 * 客户经理维护
 * @param {*} id
 * @param {*} params
 */
export function getCustomerManagerDetail(id, params) {
    return $axios.post(`/merchant/customer/manager/detail/${id}`, params);
}

/**
 * 新增or编辑客户经理维护
 * @param {*} params
 */
export function addOrUpdateCustomerManager(params) {
    let url = "";
    if (params.id) {
        url = "/merchant/customer/manager/update";
    } else {
        url = "/merchant/customer/manager/add";
    }
    return $axios.post(url, params);
}
