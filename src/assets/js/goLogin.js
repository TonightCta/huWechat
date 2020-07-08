// 微信登录
import Vue from 'vue'
import Axios from 'axios'
import {Toast} from 'vant'
import { UrlSearch } from './getCode.js'
import { GetUrlKey } from './getShare.js';
import store from "./store.js";
let errText='服务器错误，请检查网络或稍后再试'
let Uapi = '/dev';
// let Uapi = '/api';
let Get = new UrlSearch();
export function getToken(){//获取token
  if(!window.localStorage.getItem('token')){
    let U=null;
    if(GetUrlKey('share_code',window.location.href)){
      U=Uapi+'/user/login?code='+Get.code+'&share_code='+GetUrlKey('share_code',window.location.href)+'&scene=wechat'
    }else{
      U=Uapi+'/user/login?code='+Get.code+'&scene=wechat'
    }
    Axios.get(U,{
      headers:{
        'v':'v2'
      }
    }).then((res)=>{
      if(res.data.state==1){
        window.localStorage.setItem('token',res.data.data.token)
        window.localStorage.setItem('sessionID',res.data.data.sessionid);
        Vue.prototype.baseToken = window.localStorage.getItem('token');
        Vue.prototype.baseID = window.localStorage.getItem('sessionID');
        getUser()
      }else{
        let auth_url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+"&redirect_uri=http://m.dahujing.com/test/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        window.location.replace(auth_url);
        window.localStorage.clear('token')
        window.localStorage.clear('sessionID');
      }
    }).catch((err)=>{
      Toast('Code登录错误')
    })
  }else{
    getUser();
    Vue.prototype.baseToken = window.localStorage.getItem('token');
    Vue.prototype.baseID = window.localStorage.getItem('sessionID');
  }
};
export function getUser(){//获取用户信息
  if(!window.localStorage.getItem('user')){
    Axios.get(Uapi+'/user/read',{//域名登录
      headers:{
        'Authorization':window.localStorage.getItem('token'),
        'SessionId':window.localStorage.getItem('sessionID'),
        'v':'v2'
      }
    }).then((res)=>{
      if(res.data.state==1){
        store.commit('userMes_fn',res.data.data);
        window.localStorage.setItem('user',true);
        window.localStorage.setItem('shareCode',res.data.data.share_code);
      }else{
        Toast(res.data.msg)
      }
    }).catch((err)=>{
      window.localStorage.clear('token')
      window.localStorage.clear('sessionID');
      goLogin();
    })
  }
};
export function goLogin(){//微信登录
  if(Get.code){

    getToken()

  }else{

    if(GetUrlKey('share_code',window.location.href)){
      // alert();
      Axios.post(Uapi+'/user/index/wxconfig').then((res)=>{
        let wxConfig=JSON.parse(res.data.data);
        let auth_url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+"&redirect_uri=http://m.dahujing.com/test/?share_code="+GetUrlKey('share_code',window.location.href)+"&response_type=code&scope=snsapi_userinfo&state=STATE#"+GetUrlKey('path',window.location.href)+"&a=wechat_redirect";
        window.location.replace(auth_url);
      }).catch((err)=>{
        Toast('微信配置错误')
      })
    }else{
      Axios.post(Uapi+'/user/index/wxconfig').then((res)=>{
        let wxConfig=JSON.parse(res.data.data);
        let auth_url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+"&redirect_uri=http://m.dahujing.com/test/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        window.location.replace(auth_url);
      }).catch((err)=>{
        Toast('微信配置错误')
      })
    }

  }
};
