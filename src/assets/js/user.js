import Axios from 'axios';
import store from "./store.js";
import {Toast} from 'vant'
let errText='服务器错误，请检查网络或稍后再试'
export function getUser(){
  // let Uapi='/api';
  let Uapi='/dev';
  let baseToken='b21d1c604b372a8b14b45620e3638a15';
  let baseID='5cc4ec378a789435877eaac43799a159'
  // let baseToken=window.localStorage.getItem('token');
  // let baseID=window.localStorage.getItem('sessionID');
  Axios.get(Uapi+'/user/read',{//域名登录
    headers:{
      'Authorization':baseToken,
      'sessionId':baseID,
      'v':'v2'
    }
  }).then((res)=>{
    // alert(JSON.stringify(res.data.data))
    if(res.data.state==1){
      store.commit('userMes_fn',res.data.data)
    }else{
      Toast(res.data.msg)
    }
  }).catch((err)=>{
    Toast(errText)
  })
}
