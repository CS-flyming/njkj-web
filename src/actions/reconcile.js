import $axios from "../constants/constant";

/**
 * 获取对账统计
 * @param {*} params
 */
export function getSettleCheckingBatch(params) {
    return $axios.post("/settle/checking/batch", params);
}

/**
 * 对账长款查询
 * @param {*} params
 */
export function getSettleCheckingCashOver(params) {
    return $axios.post("settle/checking/cash/over", params);
}
/**
 * 对账短款查询
 * @param {*} params
 */
export function getSettleCheckingCashShort(params) {
    return $axios.post("settle/checking/cash/short", params);
}
/**
 * 对账平账查询
 * @param {*} params
 */
export function getSettleCheckingCashOk(params) {
    return $axios.post("settle/checking/cash/ok", params);
}
