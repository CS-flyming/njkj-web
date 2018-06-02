import $axios from "../constants/constant";

/**
 *获取商户订单统计
 */
export function getMerchantDailyCharge(params) {
    return $axios.post("/settle/charge/daily/collect/merchant", params);
}

/**
 * 支付通道订单统计
 * @param {*} params
 */
export function getInstitutionDailyCharge(params) {
    return $axios.post("/settle/charge/daily/collect/institution", params);
}

/**
 * 平台日订单统计
 * @param {*} params
 */
export function getPlatformDailyCharge(params) {
    return $axios.post("/settle/charge/daily/collect/platform", params);
}

/**
 *代理商订单统计
 */
export function getAgentDailyCharge(params) {
    return $axios.post("/settle/charge/daily/collect/agent", params);
}
/**
 * 客户经理拓展数据统计
 * @param {*} params
 */
export function getCustomerManagerSettleDataList(params) {
    return $axios.post("/settle/data/collect/customer/manager/list", params);
}

/**
 * 客户经理拓展数据统计详情
 * @param {*} params
 */
export function getCustomerManagerSettleDataDetail(params) {
    return $axios.post(
        "/settle/data/collect/customer/manager/detail/list",
        params
    );
}

/**
 * 渠道分润统计
 * @param {*} params
 */
export function getAgentProfit(params) {
    return $axios.post("/settle/data/collect/agent/profit/list", params);
}

/**
 * 渠道分润统计详情
 * @param {*} params
 */
export function getAgentProfitDetail(params) {
    return $axios.post("/settle//data/collect//agent/profit/details", params);
}

/**
 *商户费用统计
 */
export function getMerchantFee(params) {
    return $axios.post("/settle/data/collect/merchant/fee/list", params);
}
/**
 * 商户费用统计详情
 */
export function getMerchantFeeDetail(params) {
    return $axios.post("/settle/data/collect/merchant/fee/details", params);
}

/**
 * 业务员拓展数据
 * @param {*} params
 */
export function getSalsmanDevelopCount(params) {
    return $axios.post("/settle/data/collect/salsman/develop/count", params);
}

/**
 * 业务员拓展数据详情
 * @param {*} params
 */
export function getSalsmanDevelopCountDetail(params) {
    return $axios.post(
        "/settle/data/collect/salsman/develop/detail/list",
        params
    );
}
