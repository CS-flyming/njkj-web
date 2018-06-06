import Main from "@/views/Main.vue";

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: "/login",
  name: "login",
  meta: {
    title: "Login - 登录"
  },
  component: () => import("@/views/login.vue")
};

export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {
    title: "404-页面不存在"
  },
  component: () => import("@/views/error-page/404.vue")
};

export const page403 = {
  path: "/403",
  meta: {
    title: "403-权限不足"
  },
  name: "error-403",
  component: () => import("@/views/error-page/403.vue")
};

export const page500 = {
  path: "/500",
  meta: {
    title: "500-服务端错误"
  },
  name: "error-500",
  component: () => import("@/views/error-page/500.vue")
};

export const preview = {
  path: "/preview",
  name: "preview",
  component: () => import("@/views/error-page/500.vue")
};

export const locking = {
  path: "/locking",
  name: "locking",
  component: () =>
    import("@/views/main-components/lockscreen/components/locking-page.vue")
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: "/",
  name: "otherRouter",
  redirect: "/home",
  component: Main,
  children: [
    {
      path: "home",
      title: "首页",
      name: "home_index",
      meta: { access: 1 },
      component: () => import("@/views/home/home.vue")
    },
    {
      path: "account/password",
      title: "修改密码",
      name: "account-password",
      meta: { access: 1 },
      component: () => import("@/views/account/password.vue")
    },
    {
      path: "sys/manager/add",
      title: "新增用户",
      name: "sys-manager-add",
      component: () => import("@/views/sys/manager/add.vue")
    },
    {
      path: "sys/manager/:id/edit",
      title: "编辑操作员",
      name: "sys-manager-edit",
      component: () => import("@/views/sys/manager/edit.vue")
    },
    {
      path: "base/base_dep/add",
      title: "新增部门",
      name: "base-dep-add",
      component: () => import("@/views/sys/depart/add.vue")
    },
    {
      path: "base/base_dep/:id/edit",
      title: "编辑部门",
      name: "base-dep-edit",
      component: () => import("@/views/sys/depart/edit.vue")
    },
    {
      path: "assets/add",
      title: "新增资产",
      name: "assets-add",
      component: () => import("@/views/sys/assets/add.vue")
    },
    {
      path: "assets/:id/edit",
      title: "编辑资产",
      name: "assets-edit",
      component: () => import("@/views/sys/assets/edit.vue")
    },
    {
      path: "keep_apply/add",
      title: "维修单申请",
      name: "keep-apply-add",
      component: () => import("@/views/sys/keep/add.vue")
    },
    {
      path: "keep_apply/:id/edit",
      title: "编辑维修单",
      name: "keep-apply-edit",
      component: () => import("@/views/sys/keep/edit.vue")
    },
    {
      path: "assets/:id/detail",
      title: "资产详情",
      name: "assets-detail",
      component: () => import("@/views/sys/assets/detail.vue")
    },
    {
      path: "check/add",
      title: "新增异常记录",
      name: "check-add",
      component: () => import("@/views/sys/keep/check_add.vue")
    },
    {
      path: "keep/:id/detail",
      title: "维修单详情",
      name: "keep-detail",
      component: () => import("@/views/sys/keep/keep_detail.vue")
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: "/base",
    icon: "ios-gear",
    name: "base",
    title: "系统管理",
    component: Main,
    children: [
      {
        path: "base_user",
        title: "用户管理",
        name: "base_user",
        component: () => import("@/views/sys/manager/index.vue")
      },
      {
        path: "base_dep",
        title: "部门管理",
        name: "base_dep",
        component: () => import("@/views/sys/depart/index.vue")
      }
    ]
  },
  {
    path: "/assets",
    icon: "ios-gear",
    name: "assets",
    title: "资产管理",
    component: Main,
    children: [
      {
        path: "list",
        title: "资产管理",
        name: "assets_list",
        component: () => import("@/views/sys/assets/index.vue")
      }
    ]
  },
  {
    path: "/keep_apply",
    icon: "ios-gear",
    name: "keep_apply",
    title: "维修申请",
    component: Main,
    children: [
      {
        path: "verify",
        title: "待审核",
        name: "keep_apply_verify",
        component: () => import("@/views/sys/keep/verify.vue")
      },
      {
        path: "refuse",
        title: "已驳回",
        name: "keep_apply_refuse",
        component: () => import("@/views/sys/keep/keep_apply_refuse.vue")
      },

    ]
  },
  {
    path: "/keep",
    icon: "ios-gear",
    name: "keep",
    title: "维修审核",
    component: Main,
    children: [
      {
        path: "verify",
        title: "待审核",
        name: "keep_verify",
        component: () => import("@/views/sys/keep/keep_verify.vue")
      },
      {
        path: "refuse",
        title: "已驳回",
        name: "keep_refuse",
        component: () => import("@/views/sys/keep/keep_refuse.vue")
      }

    ]
  },
  {
    path: "/keep_speed",
    icon: "ios-gear",
    name: "keep_speed",
    title: "维修审核",
    component: Main,
    children: [
      {
        path: "keep_speed_wait",
        title: "待维修",
        name: "keep_speed_wait",
        component: () => import("@/views/sys/keep/keep_speed_wait.vue")
      },
      {
        path: "keep_speed_finishi",
        title: "已完成",
        name: "keep_speed_finishi",
        component: () => import("@/views/sys/keep/keep_speed_finishi.vue")
      }
    ]
  },
  {
    path: "/check",
    icon: "ios-gear",
    name: "check",
    title: "巡检管理",
    component: Main,
    children: [
      {
        path: "check_apply",
        title: "自主巡检",
        name: "check_apply",
        component: () => import("@/views/sys/keep/check_apply.vue")
      },
      {
        path: "check_data",
        title: "定期巡检",
        name: "check_data",
        component: () => import("@/views/sys/keep/check_data.vue")
      }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  preview,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
];
