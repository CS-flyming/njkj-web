/**
 * 渠道相关actions
 */
import $axios from "../constants/constant";

/**
 * 获取渠道商列表
 */
export function getAgentList(params) {
    return $axios.post("/agent/list", params);
}

/**
 * 冻结，解冻渠道商
 */
export function disableOrEnableAgent(type, params) {
    return $axios.post(`/agent/${type}`, params);
}

/**
 * 重置渠道商密码
 */
export function resetAgentPwd(id) {
    return $axios.post(`/agent/reset/password/${id}`);
}

/**
 * 获取支付渠道
 */
export function getInstitutionList(params) {
    return $axios.post("/meta/institution/list", params);
}

/**
 * 支付渠道下面的类型
 */
export function getInstitutionProductList(params) {
    return $axios.post("/meta/institution/product/list", params);
}

/**
 * 获取支付渠道：如：线上线下。。。
 */
export function getChannelTypes(params) {
    return $axios.post("/meta/types/channel/type");
}

/**
 * 新增编辑渠道信息
 */
export function addOrUpdateAgent(params) {
    let url = "";
    if (params.agentId) {
        url = "/agent/update";
    } else {
        url = "/agent/add";
    }
    return $axios.post(url, params);
}

/**
 * 渠道审核列表
 */
export function getAgentCheckList(params) {
    return $axios.post("/agent/audit/list", params);
}

/**
 * 渠道初审
 */
export function agentAuditCheckFirst(params) {
    return $axios.post("/agent/audit/initial", params);
}
/**
 * 渠道复审
 */
export function agentAuditCheckSecond(params) {
    return $axios.post("/agent/audit/recheck", params);
}

/**
 *getAgentChannelNumber
 */
export function getAgentChannelNumber(id) {
    return $axios.post(`/agent/channel/number/0/${id}`);
}

/**
 *拒绝审核渠道列表
 */
export function getAgentAuditRefuseList(params) {
    return $axios.post("/agent/audit/refuse/list", params);
}

/**
 * 获取渠道详情
 * @param {*} id
 */
export function getAgentDetail(id) {
    return $axios.post(`/agent/detail/${id}`);
}

/**
 * 获取渠道商业务员列表
 * @param {*} params
 */
export function getAgentManagerList(params) {
    return $axios.post("/agent/manager/list", params);
}

/**
 * 新增更新业务员
 * @param {*} params
 */
export function addOrUpdateAgentManager(params) {
    let url = "";
    if (params.agentManagerId) {
        url = "/agent/manager/update";
    } else {
        url = "/agent/manager/add";
    }
    return $axios.post(url, params);
}

/**
 * 获取业务员详情
 */
export function getAgentManagerDetail(id) {
    return $axios.post(`/agent/manager/detail/${id}`);
}

/**
 * 启用停用业务员
 * @param {*} params
 */
export function disableOrEnableAgentManager(params) {
    return $axios.post("/agent/manager/disable/", params);
}

/**
 * 重置业务员密码
 */
export function resetAgentManagerPwd(id) {
    return $axios.post(`/agent/manager/reset/password/${id}`);
}

/**
 * 管理员权限配置
 */
export function getAgentManagerRoleList(params) {
    return $axios.post("/agent/manager/role", params);
}

/**
 * 获取管理员配置详情
 */
export function getAgentManagerRoleDetail(id) {
    return $axios.post(`/agent/manager/role/detail/${id}`);
}
