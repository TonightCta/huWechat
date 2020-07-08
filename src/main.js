// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../static/publicStyle/index.css'
import store from './assets/js/store'
import router from './router'
import Echarts from 'echarts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { UrlSearch } from './assets/js/getCode.js'
import VueScroller from 'vue-scroller'
let Get = new UrlSearch();
import Axios from 'axios'
Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(VueScroller)
Vue.use(require('vue-wechat-title'));
Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
Vue.prototype.$axios = Axios;
Vue.prototype.$get = Get;
Vue.prototype.Uapi = '/dev';
// Vue.prototype.Uapi = '/api';
Vue.prototype.baseToken = 'b21d1c604b372a8b14b45620e3638a15';
Vue.prototype.baseID = '5cc4ec378a789435877eaac43799a159';
Vue.prototype.yetToken = '761eSV7bKH1LRnvMoQOg6+S5K4cfJ+hAhBSTDpp3HOMgMV0SpQ'
Vue.prototype.errText = '服务器错误，请检查网络或稍后再试'
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});
router.afterEach((to, from, next) => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100)
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
