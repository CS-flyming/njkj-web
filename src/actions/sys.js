/**
 * 系统相关请求
 */
import $axios from "../constants/constant";

/**
 * 登录
 * @param {*} params
 */
export function login(params) {
    return $axios.post("/root/login", params);
}

/**
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃
 *　　┃　　　┃
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 * 操作员相关action
 */

/**
 * 重置操作员密码
 * @param {*} managerId
 */
export function resetManagerPwdById(managerId) {
    return $axios.post(`/sys/manager/password/reset/${managerId}`);
}

/**
 * 删除操作员
 * @param {*} managerId
 */
export function deleteManagerById(managerId) {
    return $axios.post(`/sys/manager/delete/${managerId}`);
}
/**
 * 获取登录角色菜单
 */
export function getMenus() {
    return $axios.post("/root/menu");
}

/**
 * 获取操作员
 * @param {*} params
 */
export function getManagers(params) {
    return $axios.post("/root/user/list", params);
}

/**
 * 增加或编辑操作员
 * @param {*} params
 */
export function addOrUpdateManager(params) {
    let url = "";
    // if (params.id) {
    //     url = "/sys/manager/update";
    // } else {
    url = "/root/user/add";
    // }
    return $axios.post(url, params);
}

/**
 * 获取操作员信息
 * @param {*} id
 */
export function getManagerDetail(id) {
    return $axios.post(`/sys/manager/detail/${id}`);
}

/**
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃
 *　　┃　　　┃
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 * 菜单相关action
 */

/**
 * 获取系统菜单列表
 */
export function getSysMenuList(params) {
    return $axios.post("/sys/menu/list", params);
}

/**
 * 添加或编辑系统菜单
 */
export function addOrUpdateMenu(params) {
    let url = "";
    if (params.id) {
        url = "/sys/menu/update";
    } else {
        url = "/sys/menu/add";
    }
    return $axios.post(url, params);
}
/**
 * 获取菜单信息
 * @param {*} id
 */
export function getMenuDetail(id) {
    return $axios.post(`/sys/menu/detail/${id}`);
}

export function deleteMenuById(menuId) {
    return $axios.post(`/sys/menu/delete/${menuId}`);
}

/**
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃
 *　　┃　　　┃
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 * 角色相关action
 */

/**
 * 获取系统角色列表
 */
export function getSysRoleList(params) {
    return $axios.post("/sys/role/list", params);
}

/**
 * 新增编辑角色
 * @param {*} params
 */
export function addOrUpdateRole(params) {
    let url = "";
    if (params.id) {
        url = "/sys/role/update";
    } else {
        url = "/sys/role/add";
    }
    return $axios.post(url, params);
}

/**
 * 获取角色信息
 * @param {*} id
 */
export function getRoleDetail(id) {
    return $axios.post(`/sys/role/detail/${id}`);
}

/**
 * 删除角色
 * @param {*} roleId
 */
export function deleteRoleById(roleId) {
    return $axios.post(`/sys/role/delete/${roleId}`);
}
