import { getSetting } from "../api/setting";
import { titleController } from "../utils";
//全局网站设置 像这种全局网站设置，因为可能任何组件都需要，所以要一开始就加载
export default {
    namespaced: true,
    state: {
        loading: false,
        data: [],
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async fetchSetting(ctx) {
            ctx.commit("setLoading", true);
            const resp = await getSetting();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
            if (resp.favicon) {
                // let link = document.querySelector("link[rel='shortcut icon']");
                // if(link){
                //     return
                // }
                // link = document.createElement("link");
                // link.rel = "shortcut icon";
                // link.type = "images/x-icon";
                // link.href = resp.favicon;
                // document.querySelector("head").appendChild(link);
                // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
                let link = document.querySelector("link[ref='shortcut icon']");
                if (link) {
                    return;
                }
                link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = resp.favicon;
                document.querySelector("head").appendChild(link);
                if(resp.siteTitle){
                    titleController.setSiteTitle(resp.siteTitle);
                }

            }
        }
    }
}