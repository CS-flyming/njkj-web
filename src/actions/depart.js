/**
 * 部门actions
 */
import $axios from "../constants/constant";

/**
 * 获取部门列表
 * @param {*} params
 */
export function getDepartSelect(params) {
    return $axios.post("/depart/select", params);
}

/**
 * 获取部门列表
 * @param {*} params
 */
export function getDepartList(params) {
    return $axios.post("/depart/list", params);
}
