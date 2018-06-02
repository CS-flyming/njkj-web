import $axios from "../constants/constant";
/**
 * 获取订单列表
 */
export function getSettleTransactionList(params) {
    return $axios.post("/settle/transaction/list", params);
}

/**
 * 获取订单详情
 */
export function getSettleTransactionOrderDetail(id) {
    return $axios.post(`settle/charge/detail/${id}`);
}

/**
 *获取退款流水列表
 */
export function getSettleTransactionRefundList(params) {
    return $axios.post("/settle/transaction/refund/list", params);
}

/**
 * 退款审核列表
 * @param {*} params
 */
export function getSettleTransactionRefundPendingList(params) {
    return $axios.post("/settle/transaction/refund/pending/list", params);
}

/**
 * 退款审核
 * @param {*} params
 */
export function auditSettleTransactionRefund(params) {
    return $axios.post("/settle/transaction/refund/audit", params);
}

/**
 * 获取结算白名单
 * @param {*} params
 */
export function getSettleWhitelist(params) {
    return $axios.post("/settle/checking/whitelist/list", params);
}

/**
 * 启用或禁用白名单
 * @param {*} type
 * @param {*} params
 */
export function disableOrEnableWhitelist(type, params) {
    return $axios.post(`/settle/checking/whitelist/${type}`, params);
}

/**
 * 新增or更新
 * @param {*} params
 */
export function addOrUpdateWhitelist(params) {
    let url = "";
    if (params.id) {
        url = "/settle/checking/whitelist/update";
    } else {
        url = "/settle/checking/whitelist/add";
    }
    return $axios.post(url, params);
}
/**
 *结算单查询
 */
export function getSettleStatementCollectList(params) {
    return $axios.post("/settle/statement/settle/collect", params);
}

/**
 * 结算单明细
 */
export function getSettleStatementCollectDetail(id, params) {
    return $axios.post(`/settle/checking/merchant/detail/${id}`, params);
}

/**
 * 商户结算单明细
 */
export function getSettleCheckingMerchant(params) {
    return $axios.post("/settle/checking/merchant", params);
}

/**
 * 商户结算单明细详情
 */
export function getSettleCheckingMerchantDetail(id, params) {
    return $axios.post(`/settle/checking/merchant/detail/${id}`, params);
}

/**
 * 商户日结查询
 */
export function getDailySettleCheckingMerchantList(params) {
    return $axios.post("/settle/checking/merchant/list", params);
}

/**
 * 渠道结算单查询
 */
export function getSettleCheckingAgent(params) {
    return $axios.post("/settle/checking/agent", params);
}

/**
 * 渠道结算单查询详细
 * @param {*} params
 */
export function getSettleCheckingAgentDetail(id, params) {
    return $axios.post(`/settle/checking/agent/detail/${id}`, params);
}

/**
 * 星富通结算单明细
 * @param {*} params
 */
export function getSettleCheckingXft(params) {
    return $axios.post("/settle/checking/xft", params);
}
