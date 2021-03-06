import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import {goLogin,getToken} from '../assets/js/goLogin.js'
import { UrlSearch } from '../assets/js/getCode.js'
import {shareWX} from '../assets/js/share.js'
import { GetUrlKey } from '../assets/js/getShare.js';
import  store from '../assets/js/store.js'
import {getUser} from '../assets/js/user.js'
let Get = new UrlSearch();
Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Home',//首页
      component: resolve=>require(['@/views/home/home'],resolve),
      meta:{isAllSize:false,title:'大虎鲸AI智投'}
    },
    {
      path:'/ai',
      name:'Ai',//AI
      component:resolve=>require(['@/views/ai/ai'],resolve),
      meta:{isAllSize:true,title:'Ai技术选股'}
    },
    {
      path:'/w',
      name:'W',//趋势反转
      component:resolve=>require(['@/views/ai/W'],resolve),
      meta:{isAllSize:true,title:'W底趋势反转'}
    },
    {
      path:'/y',
      name:'Y',//突破压力位
      component:resolve=>require(['@/views/ai/Y'],resolve),
      meta:{isAllSize:true,title:'通道突破'}
    },
    {
      path:'/t',
      name:'T',//通道突破
      component:resolve=>require(['@/views/ai/t'],resolve),
      meta:{isAllSize:true,title:'突破压力位'}
    },
    {
      path:'/mine',
      name:'Mine',//个人中心
      component:resolve=>require(['@/views/mine/mine'],resolve),
      meta:{isAllSize:false,title:'个人中心'}
    },
    {
      path:'/order',
      name:'Order',//我的订单
      component:resolve=>require(['@/views/mine/order/order'],resolve),
      meta:{isAllSize:true,title:'我的订单'}
    },
    {
      path:'/myCus',
      name:'MyCus',//代理中心
      component:resolve=>require(['@/views/mine/myCus/myCus'],resolve),
      meta:{isAllSize:true,title:'代理中心'}
    },
    {
      path:'/wallet',
      name:'Wallet',//我的钱包
      component:resolve=>require(['@/views/mine/wallet/wallet'],resolve),
      meta:{isAllSize:true,title:'我的钱包'}
    },
    {
      path:'/message',
      name:'Message',//消息中心
      component:resolve=>require(['@/views/mine/message/message'],resolve),
      meta:{isAllSize:true,title:'消息通知'}
    },
    {
      path:'/bankCard',
      name:'BankVard',//银行卡
      component:resolve=>require(['@/views/mine/card/card'],resolve),
      meta:{isAllSize:true,title:'银行卡管理'}
    },
    {
      path:'/agentApp',
      name:'AgentApp',//代理申请
      component:resolve=>require(['@/views/mine/agentApplication/agentApp'],resolve),
      meta:{isAllSize:true,title:'申请代理'}
    },
    {
      path:'/starCon',
      name:'StarCon',//涨停策略
      component:resolve=>require(['@/views/starCon/starCon'],resolve),
      meta:{isAllSize:true,title:'量化交易复合策略-超短线'}
    },
    {
      path:'/signal',
      name:'SignAl',//多空信号,
      component:resolve=>require(['@/views/signal/signal'],resolve),
      meta:{isAllSize:true,title:'多空信号'}
    },
    {
      path:'/signalDetails',
      name:'SignalDetails',//多空信号详情
      component:resolve=>require(['@/views/signal/signalDetials'],resolve),
      meta:{isAllSize:true,title:'多空信号'}
    },
    {
      path:'/north',
      name:'North',//北上资金
      component:resolve=>require(['@/views/north/north'],resolve),
      meta:{isAllSize:true,title:'北上资金'}
    },
    {
      path:'/northDetails',
      name:'NorthDetails',//北上资金内页
      component:resolve=>require(['@/views/north/northDetails'],resolve),
      meta:{isAllSize:true,title:'北上资金'}
    },
    {
      path:'/logSearch',
      name:'LogSearch',//历史回顾
      component:resolve=>require(['@/views/log/logSearch'],resolve),
      meta:{isAllSize:true,title:'历史回顾'}
    },
    {
      path:'/logDetails',
      name:'LogDetails',//历史回顾详情
      component:resolve=>require(['@/views/log/logDetails'],resolve),
      meta:{isAllSize:true,title:'历史回顾-'}
    },
    {
      path:'/mineEdit',
      name:'MineEdit',//资料编辑
      component:resolve=>require(['@/views/mine/mineEdit'],resolve),
      meta:{isAllSize:true,title:'资料编辑'}
    },
    {
      path:'/radar',
      name:'Radar',//蚜虫扫雷
      component:resolve=>require(['@/views/home/radar/radar'],resolve),
      meta:{isAllSize:true,title:'蚜虫扫雷'}
    },
    {
      path:'/radarDetails',
      name:'RadarDetails',//蚜虫扫雷内页
      component:resolve=>require(['@/views/home/radar/radarDetails'],resolve),
      meta:{isAllSize:true,title:'蚜虫扫雷'}
    },
    {
      path:'/ful',
      name:'Ful',//涨停策略
      component:resolve=>require(['@/views/home/ful/ful'],resolve),
      meta:{isAllSize:true,title:'涨停策略'}
    },
    {
      path:'/fulDetails',
      name:'FulDetiails',//涨停内页
      component:resolve=>require(['@/views/home/ful/fulDetails'],resolve),
      meta:{isAllSize:true,title:'连续涨停预测'}
    },
    {
      path:'/fulDeLog',
      name:'FuDeLog',//涨停策略历史
      component:resolve=>require(['@/views/home/ful/fulDeLog'],resolve),
      meta:{isAllSize:true,title:'涨停策略-历史'}
    },
    {
      path:'/choosePer',//条件选股
      name:'ChoosePer',
      component:resolve=>require(['@/views/home/choosePer/choosePer'],resolve),
      meta:{isAllSize:true,title:'条件选股'}
    },
    {
      path:'/perDetails',
      name:'PerDetails',//选股详情
      component:resolve=>require(['@/views/home/choosePer/perDetails'],resolve),
      meta:{isAllSize:true,title:'选股详情'}
    },
    {
      path:'/perDetailsVip',
      name:'PerDetailsVip',//优选选股
      component:resolve=>require(['@/views/home/choosePer/perDetailsVip'],resolve),
      meta:{isAllSize:true,title:'选股详情'}
    },
    {
      path:'/vipList',
      name:'VipList',//优选详情
      component:resolve=>require(['@/views/home/choosePer/vipList'],resolve),
      meta:{isAllSize:true,title:'优选详情'}
    },
    {
      path:'/obaDe',
      name:'ObaDe',//详细财务报表
      component:resolve=>require(['@/views/home/radar/obaDe'],resolve),
      meta:{isAllSize:true,title:'详细财务报告'}
    },
    {
      path:'/delStor',//清除缓存,
      name:'delStor',
      component:resolve=>require(['@/views/delStorage'],resolve),
      meta:{isAllSize:true}
    },
    {
      path:'/userAge',//代理协议
      name:'UserAge',
      component:resolve=>require(['@/components/agent'],resolve),
      meta:{isAllSize:true,title:'代理协议'}
    },
    {
      path:'/userAgeTwo',//用户协议
      name:'UserAgeTwo',
      component:resolve=>require(['@/components/agentTwo'],resolve),
      meta:{isAllSize:true,title:'用户协议'}
    }
  ]
});
router.beforeEach((to,from,next)=>{
  NProgress.start();
  // if(window.localStorage.getItem('token')){
  //   getToken()
  //   next()
  // }else{
  //   goLogin()
  // }
  next()
});
router.afterEach((to,from)=>{
    NProgress.done();
    if(window.localStorage.getItem('token')){
      if(!store.state.userMes.mobile){
        getUser()
      }
    }
    let wxMes={};
    if(to.meta.title==='大虎鲸AI智投'){
      wxMes={
        title:to.meta.title,
        desc:'大虎鲸AI智能交易系统，让交易更简单，让投资更有价值',
        link:`http://m.dahujing.com/test/?share_code=${window.localStorage.getItem('shareCode')}&path=${to.path}/#${to.path}`,
        type:'link'
      };
    }else{
      let para={
        codeID:GetUrlKey('codeID',window.location.href),//
        code:GetUrlKey('code',window.location.href),//多空信号code
        rode:GetUrlKey('codeRadar',window.location.href),//多空信号code
        title:GetUrlKey('title',window.location.href),//多空信号
        id:GetUrlKey('id',window.location.href),//策略ID
        aid:GetUrlKey('aiT',window.location.href),
        log:GetUrlKey('log',window.location.href)
      }
      wxMes={
        title:'大虎鲸AI智投-'+to.meta.title,
        desc:'大虎鲸AI智能交易系统，让交易更简单，让投资更有价值',
        link:`http://m.dahujing.com/test/?share_code=${window.localStorage.getItem('shareCode')}&path=${to.path}&codeSign=${para.code}&strID=${para.id}&north=${para.codeID}&radar=${para.rode}&ai=${para.aid}&log=${para.log}&ac=1/#${to.path}`,
        type:'link'
      };
      // alert(JSON.stringify(wxMes))
    };
    shareWX(wxMes);
})
export default router;
