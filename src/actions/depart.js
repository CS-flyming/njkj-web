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

/**
 * 新增修改部门
 * @param {*} params
 */
export function addOrUpdateDepart(params) {
  return $axios.post("/depart/add", params);
}

/**
 * 资产列表
 * @param {*} params
 */
export function getAssetsList(params) {
  return $axios.post("/assests/list", params);
}

/**
 * 保存资产
 * @param {*} params
 */
export function addOrUpdateAssets(params) {
  return $axios.post("/assests/save", params);
}

/**
 * 删除资产
 * @param {*} id
 */
export function deleteAssetsById(id) {
  return $axios.post(`/assests/delete/${id}`);
}

/**
 * 报废资产
 * @param {*} id
 */
export function loseAssetsById(id) {
  return $axios.post(`/assests/lose/${id}`);
}

/**
 * 获取我申请的维修单
 * @param {*} params
 */
export function getKeepMyList(params) {
  return $axios.post("/keep/my/list", params);
}

/**
 * 维修人员
 * @param {*} params
 */
export function getKeepUserSelect(params) {
  return $axios.post("/keep/user/select", params);
}

/**
 * 待审核列表
 * @param {*} params
 */
export function getVerifyList(params) {
  return $axios.post("/keep/verify/list", params);
}

/**
 * 保存资产
 * @param {*} params
 */
export function addOrUpdateKeep(params) {
  return $axios.post("/keep/add", params);
}

/**
 * 维修申请待审核
 * @param {*} params
 */
export function getKeepApplyVerify(params) {
  return $axios.post("/keep/apply/verify", params);
}

/**
 * 维修申请拒绝
 * @param {*} params
 */
export function getKeepApplyRefuse(params) {
  return $axios.post("/keep/apply/refuse", params);
}

/**
 * 维修审核待审核
 * @param {*} params
 */
export function getKeepAdminVerify(params) {
  return $axios.post("/keep/admin/verify", params);
}

/**
 * 维修审核已驳回
 * @param {*} params
 */
export function getKeepAdminRefuse(params) {
  return $axios.post("/keep/admin/refuse", params);
}

/**
 * 审核维修单
 * @param {*} params
 */
export function shKeepVerify(params) {
  return $axios.post("/keep/verify", params);
}

/**
 * 维修进度待维修
 * @param {*} params
 */
export function getSpeedKeeping(params) {
  return $axios.post("/keep/speed/keeping", params);
}

/**
 * 维修进度待维修
 * @param {*} params
 */
export function getSpeedFinishi(params) {
  return $axios.post("/keep/speed/finish", params);
}

/**
 * 自主巡检
 * @param {*} params
 */
export function getPatrolAutoList(params) {
  return $axios.post("/patrol/auto/list", params);
}

/**
 * 定期巡检
 * @param {*} params
 */
export function getPatrolTimeList(params) {
  return $axios.post("/patrol/time/list", params);
}

/**
 * 新增编辑异常记录
 * @param {*} type
 * @param {*} params
 */
export function addOrUpdateYichang(type, params) {
  return $axios.post(`/patrol/${type}/save`, params);
}

/**
 * 删除巡检
 * @param {*} id
 */
export function deletePatrol(id) {
  return $axios.post(`/patrol/delete/${id}`);
}

export function getParrolDetail(id) {
  return $axios.post(`/patrol/find/${id}`);
}

/**
 * 获取首页数据
 */
export function getIndexData(params) {
  return $axios.post("/data/chart", params);
}

/**
 * 删除
 * @param {*} id
 */
export function deleteKeep(id) {
  return $axios.post(`/keep/delete/${id}`);
}

/**
 * 详情
 */
export function getKeepDetail(id) {
  return $axios.post(`/keep/find/${id}`);
}
