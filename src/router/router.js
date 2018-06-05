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
      path: "sys/menu/add",
      title: "新增菜单",
      name: "sys-menu-add",
      component: () => import("@/views/sys/menu/add.vue")
    },
    {
      path: "sys/menu/:id(\\d+)/edit",
      title: "编辑菜单",
      name: "sys-menu-edit",
      component: () => import("@/views/sys/menu/edit.vue")
    },
    {
      path: "sys/role/add",
      title: "新增角色",
      name: "sys-role-add",
      component: () => import("@/views/sys/role/add.vue")
    },
    {
      path: "sys/role/:id(\\d+)/edit",
      title: "编辑角色",
      name: "sys-role-edit",
      component: () => import("@/views/sys/role/edit.vue")
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
      path: "keep/:id/detail",
      title: "维修单详情",
      name: "keep-detail",
      component: () => import("@/views/sys/keep/keep_detail.vue")
    },
    {
      path: "agent/manager/add",
      title: "新增业务员",
      name: "agent-manager-add",
      component: () => import("@/views/agent/manager/add.vue")
    },
    {
      path: "agent/manager/:id(\\d+)/edit",
      title: "编辑业务员",
      name: "agent-manager-edit",
      component: () => import("@/views/agent/manager/edit.vue")
    },
    {
      path: "reconcile/batch/detail",
      title: "对账批次明细查询",
      name: "reconcile-batch-detail",
      component: () => import("@/views/reconcile/batch/detail.vue")
    },
    {
      path: "settle/white/add",
      title: "新增白名单",
      name: "settle-white-add",
      component: () => import("@/views/settle/white/add.vue")
    },
    {
      path: "settle/collect/detail",
      title: "结算单明细查询",
      name: "settle-collect-detail",
      component: () => import("@/views/settle/collect/detail.vue")
    },
    {
      path: "settle/merchant/detail",
      title: "商户结算单明细查询",
      name: "settle-merchant-detail",
      component: () => import("@/views/settle/merchant/detail.vue")
    },
    {
      path: "settle/agent/detail",
      title: "渠道结算单明细查询",
      name: "settle-agent-detail",
      component: () => import("@/views/settle/agent/detail.vue")
    },
    {
      path: "merchant/:id(\\d+)/edit",
      title: "商户资料编辑",
      name: "merchant-edit",
      component: () => import("@/views/merchant/edit.vue")
    },
    {
      path: "merchant/:id(\\d+)",
      title: "商户资料详情",
      name: "merchant-detail",
      component: () => import("@/views/merchant/detail.vue")
    },
    {
      path: "agent/:id(\\d+)/edit",
      title: "渠道资料编辑",
      name: "agent-edit",
      component: () => import("@/views/agent/edit.vue")
    },
    {
      path: "agent/:id(\\d+)",
      title: "渠道资料详情",
      name: "agent-detail",
      component: () => import("@/views/agent/detail.vue")
    },
    {
      path: "store/:id(\\d+)/edit",
      title: "门店资料编辑",
      name: "store-edit",
      component: () => import("@/views/store/edit.vue")
    },
    {
      path: "store/:id(\\d+)",
      title: "门店资料详情",
      name: "store-detail",
      component: () => import("@/views/store/detail.vue")
    },
    {
      path: "marketing/customer/add",
      title: "新增客户经理",
      name: "marketing-customer-add",
      component: () => import("@/views/marketing/customer/add.vue")
    },
    {
      path: "marketing/customer/:id(\\d+)/edit",
      title: "客户经理编辑",
      name: "marketing-customer-edit",
      component: () => import("@/views/marketing/customer/edit.vue")
    }, //     component: resolve => { //     name: 'agent-manager-edit', //     title: '业务员管理编辑', //     path: 'agent/manager/edit', // {
    //         require(['@/views/agent/manager/edit.vue'], resolve);
    //     }
    // },
    {
      path: "agent/manager/role/detail",
      title: "管理员权限管理详情",
      name: "agent-manager-role-detail",
      component: () => import("@/views/agent/manager/role/detail.vue")
    },
    {
      path: "agent/manager/role/update",
      title: "修改管理员权限",
      name: "agent-manager-role-update",
      component: () => import("@/views/agent/manager/role/update.vue")
    },
    {
      path: "transaction/order/detail",
      title: "订单流水明细查询",
      name: "transaction-order-detail",
      component: () => import("@/views/transaction/order/detail.vue")
    },
    {
      path: "statictics/channel/detail",
      title: "渠道分润明细查询",
      name: "statictics-channel-detail",
      component: () => import("@/views/statictics/channel/detail.vue")
    },
    {
      path: "statictics-commercial-detail",
      title: "商户费用统计明细查询",
      name: "statictics-commercial-detail",
      component: () => import("@/views/statictics/commercial/detail.vue")
    },
    {
      path: "merchant-secret-detail",
      title: "商户密钥详情",
      name: "merchant-secret-detail",
      component: () => import("@/views/merchant/secret/detail.vue")
    },
    {
      path: "merchant-secret-edit",
      title: "编辑商户密钥",
      name: "merchant-secret-edit",
      component: () => import("@/views/merchant/secret/edit.vue")
    },
    {
      path: "merchant-wechat-detail",
      title: "商户微信配置详情",
      name: "merchant-wechat-detail",
      component: () => import("@/views/merchant/wechat/detail.vue")
    },
    {
      path: "merchant-wechat-edit",
      title: "编辑商户微信配置",
      name: "merchant-wechat-edit",
      component: () => import("@/views/merchant/wechat/edit.vue")
    },
    {
      path: "store-manager-edit",
      title: "编辑门店管理员",
      name: "store-manager-edit",
      component: () => import("@/views/store/manager/edit.vue")
    },
    {
      path: "store-manager-add",
      title: "新增门店管理员",
      name: "store-manager-add",
      component: () => import("@/views/store/manager/add.vue")
    },
    {
      path: "store-cashier-add",
      title: "新增收银员",
      name: "store-cashier-add",
      component: () => import("@/views/store/cashier/add.vue")
    },
    {
      path: "store-cashier-edit",
      title: "编辑收银员",
      name: "store-cashier-edit",
      component: () => import("@/views/store/cashier/edit.vue")
    },
    {
      path: "statictics-client-detail",
      title: "客户经理拓展数据统计详情",
      name: "statictics-client-detail",
      component: () => import("@/views/statictics/client/detail.vue")
    },
    {
      path: "statictics-salsman-detail",
      title: "业务员拓展数据统计详情",
      name: "statictics-salsman-detail",
      component: () => import("@/views/statictics/salsman/detail.vue")
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
      }
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
      }
    ]
  },
  {
    path: "/merchant",
    icon: "home",
    name: "merchant",
    title: "商户管理",
    component: Main,
    children: [
      {
        path: "index",
        title: "收单商户查询",
        name: "merchant-index",
        component: () => import("@/views/merchant/index.vue")
      },
      {
        path: "add",
        title: "商户资料录入",
        name: "merchant-add",
        component: () => import("@/views/merchant/add.vue")
      },
      {
        path: "check",
        title: "商户审核",
        name: "merchant-check",
        component: () => import("@/views/merchant/check.vue")
      },
      {
        path: "rejective",
        title: "审核拒绝商户",
        name: "merchant-rejective",
        component: () => import("@/views/merchant/rejective.vue")
      },
      {
        path: "wechat",
        title: "商户微信配置",
        name: "merchant-wechat",
        component: () => import("@/views/merchant/wechat/index.vue")
      },
      {
        path: "manager",
        title: "管理员权限管理",
        name: "merchant-manager",
        component: () => import("@/views/merchant/manager/index.vue")
      },
      {
        path: "secret",
        title: "商户密钥",
        name: "merchant-secret",
        component: () => import("@/views/merchant/secret/index.vue")
      }
    ]
  },
  {
    path: "/store",
    icon: "location",
    name: "store",
    title: "门店管理",
    component: Main,
    children: [
      {
        path: "index",
        title: "收单门店查询",
        name: "store-index",
        component: () => import("@/views/store/index.vue")
      },
      {
        path: "add",
        title: "门店资料录入",
        name: "store-add",
        component: () => import("@/views/store/add.vue")
      },
      {
        path: "check",
        title: "门店审核",
        name: "store-check",
        component: () => import("@/views/store/check.vue")
      },
      {
        path: "rejective",
        title: "审核拒绝门店",
        name: "store-rejective",
        component: () => import("@/views/store/rejective.vue")
      },
      {
        path: "manager",
        title: "门店管理",
        name: "store-manager",
        component: () => import("@/views/store/manager/index.vue")
      },
      {
        path: "cashier",
        title: "收银员管理",
        name: "store-cashier",
        component: () => import("@/views/store/cashier/index.vue")
      }
    ]
  },
  {
    path: "/agent",
    icon: "network",
    name: "agent",
    title: "渠道管理",
    component: Main,
    children: [
      {
        path: "index",
        title: "收单渠道查询",
        name: "agent-index",
        component: () => import("@/views/agent/index.vue")
      },
      {
        path: "add",
        title: "渠道资料录入",
        name: "agent-add",
        component: () => import("@/views/agent/add.vue")
      },
      {
        path: "check",
        title: "渠道审核",
        name: "agent-check",
        component: () => import("@/views/agent/check.vue")
      },
      {
        path: "rejective",
        title: "审核拒绝渠道",
        name: "agent-rejective",
        component: () => import("@/views/agent/rejective.vue")
      },
      {
        path: "manager",
        title: "业务员管理",
        name: "agent-manager",
        component: () => import("@/views/agent/manager/index.vue")
      },
      {
        path: "manager/role",
        title: "管理员权限管理",
        name: "agent-manager-role-index",
        component: () => import("@/views/agent/manager/role/index.vue")
      }
    ]
  },
  {
    path: "/store",
    icon: "qr-scanner",
    name: "qrcode",
    title: "收款二维码",
    component: Main,
    children: [
      {
        path: "qrcode",
        title: "收款二维码",
        name: "store-qrcode",
        component: () => import("@/views/store/qrcode.vue")
      }
    ]
  },
  {
    path: "/statictics",
    icon: "stats-bars",
    name: "statictics",
    title: "数据统计",
    component: Main,
    children: [
      {
        path: "index",
        title: "商户订单统计",
        name: "statictics-index",
        component: () => import("@/views/statictics/index.vue")
      },
      {
        path: "payment",
        title: "支付通道订单统计",
        name: "statictics-payment",
        component: () => import("@/views/statictics/payment.vue")
      },
      {
        path: "platform",
        title: "平台日订单统计",
        name: "statictics-platform",
        component: () => import("@/views/statictics/platform.vue")
      },
      {
        path: "agent",
        title: "代理商订单统计",
        name: "statictics-agent",
        component: () => import("@/views/statictics/agent.vue")
      },
      {
        path: "client",
        title: "客户经理拓展数据统计",
        name: "statictics-client-index",
        component: () => import("@/views/statictics/client/index.vue")
      },
      {
        path: "channel",
        title: "渠道分润统计",
        name: "statictics-channel-index",
        component: () => import("@/views/statictics/channel/index.vue")
      },
      {
        path: "commercial",
        title: "商户费用统计",
        name: "statictics-commercial-index",
        component: () => import("@/views/statictics/commercial/index.vue")
      },
      {
        path: "salsman",
        title: "业务员拓展数据统计",
        name: "statictics-salsman-index",
        component: resolve => {
          // { path: 'batch', title: '批量进件', name: 'merchant-batch', component: () => import('@/views/merchant/batch.vue') },
          require(["@/views/statictics/salsman/index.vue"], resolve);
        }
      }
    ]
  },
  {
    path: "/reconcile",
    icon: "chatboxes",
    name: "reconcile",
    title: "对账管理",
    component: Main,
    children: [
      {
        path: "batch",
        title: "对账批次查询",
        name: "reconcile-batch",
        component: () => import("@/views/reconcile/batch/index.vue")
      },
      {
        path: "over",
        title: "对账长款查询",
        name: "reconcile-over",
        component: () => import("@/views/reconcile/over.vue")
      },
      {
        path: "short",
        title: "对账短款查询",
        name: "reconcile-short",
        component: () => import("@/views/reconcile/short.vue")
      },
      {
        path: "flat",
        title: "对账平款查询",
        name: "reconcile-flat",
        component: () => import("@/views/reconcile/flat.vue")
      }
    ]
  },
  {
    path: "/transaction",
    icon: "social-yen",
    name: "transaction",
    title: "交易管理",
    component: Main,
    children: [
      {
        path: "order",
        title: "订单流水查询",
        name: "transaction-order",
        component: () => import("@/views/transaction/order/index.vue")
      },
      {
        path: "refund",
        title: "退款流水查询",
        name: "transaction-refund",
        component: () => import("@/views/transaction/refund/index.vue")
      },
      {
        path: "rejective",
        title: "退款审核",
        name: "transaction-rejective",
        component: () => import("@/views/transaction/rejective/index.vue")
      }
    ]
  },
  {
    path: "/settle",
    icon: "ios-cart-outline",
    name: "settle",
    title: "结算管理",
    component: Main,
    children: [
      {
        path: "white",
        title: "结算白名单",
        name: "settle-white",
        component: () => import("@/views/settle/white/index.vue")
      },
      {
        path: "collect",
        title: "结算单查询",
        name: "settle-collect",
        component: () => import("@/views/settle/collect/index.vue")
      },
      {
        path: "merchant",
        title: "商户结算单明细查询",
        name: "settle-merchant",
        component: () => import("@/views/settle/merchant/index.vue")
      },
      {
        path: "agent",
        title: "渠道结算单明细查询",
        name: "settle-agent",
        component: () => import("@/views/settle/agent/index.vue")
      },
      {
        path: "xft",
        title: "星富通结算明细查询",
        name: "settle-xft",
        component: () => import("@/views/settle/xft.vue")
      },
      {
        path: "merchant-daily",
        title: "商户日结明细查询",
        name: "settle-merchant-daily",
        component: () => import("@/views/settle/merchant/daily.vue")
      }
    ]
  },
  {
    path: "/scanner",
    icon: "ios-barcode-outline",
    name: "scanner",
    title: "扫码枪管理",
    component: Main,
    children: [
      {
        path: "index",
        title: "扫码枪收银",
        name: "scanner-index",
        component: () => import("@/views/scanner/index.vue")
      }
    ]
  },
  {
    path: "/marketing",
    icon: "person-stalker",
    name: "market",
    title: "营销管理",
    component: Main,
    children: [
      {
        path: "customer",
        title: "客户经理维护",
        name: "marketing-customer",
        component: () => import("@/views/marketing/customer/index.vue")
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
