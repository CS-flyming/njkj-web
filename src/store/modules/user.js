import Cookies from "js-cookie";

const user = {
    state: {
        userInfo: ""
    },
    mutations: {
        saveUserInfo(state) {
            let user = Cookies.get("user");
            if (user) {
                state.userInfo = JSON.parse(user);
            }
        },
        logout(state, vm) {
            Cookies.remove("user");
            Cookies.remove("token");
            Cookies.remove("access");
            // Cookies.remove("refund")
            localStorage.removeItem("lf_user");
            localStorage.removeItem("lf_token");
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute("href", "");
            // 清空打开的页面等数据，但是保存主题数据
            let theme = "";
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default user;
