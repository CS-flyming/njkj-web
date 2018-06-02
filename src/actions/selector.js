/**
 * 选择器相关请求
 */
import $axios from "../constants/constant";
const param = { limit: 9999, offset: 0 };

/**
 * 获取系统角色
 * @param {*} params
 */
export function getSysRoles(params = param) {
    return $axios.post("/sys/role/list", params);
}

/**
 * 获取系统菜单类别
 * @param {*} params
 */
export function getSysMenuTypes(params = param) {
    return $axios.post("/sys/menu/types", params);
}

/**
 * 获取可选父菜单
 * @param {*} params
 */
export function getSysMenuSelect(params = param) {
    return $axios.post("/sys/menu/select", params);
}

/**
 * 获取菜单树形数据
 * @param {*} params
 */
export function getSysMenuTree(roleid) {
    let url = "";
    if (roleid) {
        url = `/sys/menu/tree/${roleid}`;
    } else {
        url = `/sys/menu/tree`;
    }
    return $axios.post(url);
}

/**
 * 获取商户选择列表
 */
export function getMechantSelectList(params) {
    return $axios.post("/merchant/autocomplete", params);
}

/**
 * 获取客户经理选择列表
 */
export function getCustomerManagerSelectList(params) {
    return $axios.post("/sys/customer/manager/autocomplete", params);
}

/**
 * 获取业务员选择列表
 */
export function getAgentManagerSelectList(params) {
    return $axios.post("/agent/manager/autocomplete", params);
}

/**
 * 获取渠道选择列表
 */
export function getAgentSelectList(params) {
    return $axios.post("/agent/autocomplete", params);
}

/**
 * 获取商户冻结状态列表
 */
export function getMechantStatesSelectList(params) {
    return $axios.post("/meta/states/merchant", params);
}

/**
 * 获取经营类别列表
 */
export function getBusinessTypesSelectList(params) {
    return $axios.post("/meta/types/business", params);
}

/**
 * 获取商户类别列表
 */
export function getMerchantTypesSelectList(params) {
    return $axios.post("/meta/types/merchant", params);
}

/**
 *获取经营类目
 */
export function getBusinessCategorySelectList(value) {
    return $axios.post(`/meta/business/category/list/${value}`);
}

/**
 * 获取证件类别
 */
export function getCertificateTypes() {
    return $axios.post("/meta/types/certificate");
}

/**
 * 商户审核状态
 */

export function getMerchantAuditStates(params) {
    return $axios.post("/meta/states/merchant/audit");
}

/**
 * 获取门店状态列表
 */
export function getMerchantStatesList(params) {
    return $axios.post("/meta/states/merchant", params);
}

/**
 * 获取门店列表
 * @param {*} params
 */
export function getMerchantStoreSelectList(params) {
    return $axios.post("/merchant/store/autocomplete", params);
}

/**
 * 获取收银员所属门店列表
 */

export function getCashierMerchantStoreList(params) {
    return $axios.post("/merchant/store/autocomplete", params);
}

/**
 * 门店管理员门店列表
 */
export function getManagerMerchantStoreList(params) {
    return $axios.post("/merchant/store/autocomplete", params);
}

/**
 * 渠道类型列表
 */
export function getAgentTypesList(params) {
    return $axios.post("/meta/types/agent", params);
}

/**
 * 获取银行信息列表
 */
export function getBankInfoList(params) {
    return $axios.post("/meta/bankInfo/list", params);
}

/**
 * 获取渠道审核状态
 */
export function getAgentAuditStatesList(params) {
    return $axios.post("/meta/states/agent/audit", params);
}

/**
 * 获取支付渠道
 */
export function getPayChannels(params) {
    return $axios.post("/meta/institution/product/all");
}

/**
 * 获取交易状态
 */
export function getOrderChargeStatus(params) {
    return $axios.post("/meta/states/charge", params);
}

/**
 * 退款审核状态
 * @param {*} params
 */
export function getStatesRefundType(params) {
    return $axios.post("/meta/states/refund/type", params);
}

/**
 * 对账结果类型
 */
export function getCheckingBatchTypes(params) {
    return $axios.post("/meta/types/checking/batch", params);
}

/**
 * 对账文件状态
 * @param {*} params
 */
export function getCheckingBatchStates(params) {
    return $axios.post("/meta/states/checking/batch", params);
}

/**
 *获取付款类型
 */
export function getPayTypesList(params) {
    return $axios.post("/meta/types/pay", params);
}

/**
 * 获取结算状态
 * @param {*} params
 */
export function getSettleStatesList(params) {
    return $axios.post("/meta/states/settle", params);
}
