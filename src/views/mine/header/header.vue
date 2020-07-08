<!-- 个人中心头部 -->
<template lang="html">
  <div class="headerCon">
    <div class="conPic">
      <router-link to="/mineEdit" tag="img" :src="userMes.avatar"></router-link>
      <!-- <img :src="" alt="" @click="goEdit()"> -->
      <div class="">
        <span>{{userMes.nickname}}</span>
        <br>
        <span>分享码:{{userMes.share_code}}</span>
      </div>
      <div class="">
        <van-icon name="share" @click="$toast('暂未开放')"  color="white"/>
        <span style="opacity:0;">12</span>
        <!-- <router-link to="/message" tag="span"> -->
          <van-icon name="bell" @click="$toast('敬请期待')" color="white"/>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="conTable">
      <ul>
        <router-link to="/myCus" tag="li">
          <van-icon name="user-o" />
          <br>
          代理中心
        </router-link>
        <router-link to="/agentApp" tag="li">
          <van-icon name="notes-o" />
          <br>
          申请代理
        </router-link>
        <router-link to="/wallet" tag="li">
          <van-icon name="paid" />
          <br>
          我的钱包
        </router-link>
        <router-link to="/order" tag="li">
          <van-icon name="records" />
          <br>
          我的订单
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  methods:{
    goEdit(){//编辑资料
      this.$router.push('/mineEdit')
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  methods:{
    shareWX(){
      this.$axios.post(this.Uapi+'/user/index/wxconfig',{
        'url':window.location.href
      }).then((res)=>{
        if(res.data.state==1){
          let wxConfig=JSON.parse(res.data.data);
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxConfig.appId, // 必填，公众号的唯一标识
            timestamp: wxConfig.timestamp * 1, // 必填，生成签名的时间戳
            nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
            signature: wxConfig.signature,// 必填，签名
            jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
          });
          let wxParam={
            title:'这是标题',
            desc:'大虎鲸',
            link:'http://m.dahujing.com/test/mine',
            type:'link'
          }
          wx.ready(()=>{
            wx.updateAppMessageShareData({
               title: wxParam.title,
               desc: wxParam.desc,
               link: wxParam.link,
               type: wxParam.type,
               imgUrl:'http://img.xiaoyachong.com/IMG_4080.JPG',
               success: (()=>{
                 Toast('分享成功')
               }),
               cancel: (()=>{
                 Toast('分享失败')
               })
            });
          })
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.headerCon{
  width: 100%;
  padding:2rem 2rem;
  background: $themeColor;
  box-sizing: border-box;
  .conPic{
    box-sizing: border-box;
    text-align: left;
    padding: 3rem 0;
    display: flex;
    // background: red;
    img{
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      border: 1px solid white;
    }
    div:nth-child(2){
      width: 50%;
      box-sizing: border-box;
      padding-left: 1rem;
      span{
        color:white;
        font-size: $fontTitle;
        line-height: 3rem;
      }
      span:first-child{
        font-weight: bold;
      }
    }
    div:last-child{
      height: 100%;
      width: 30%;
      text-align: right;
      line-height: 6rem;
      i{
        font-size: 2.2rem;
      }
      i:nth-child(2){
        margin-left:1rem;
      }
    }
  }
  .conTable{
    width: 100%;
    ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      li{
        width: 20%;
        color:white;
        text-align: center;
        font-size: $fontText;
        i{
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
