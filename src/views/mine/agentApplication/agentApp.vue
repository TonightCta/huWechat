<!-- 代理申请 -->
<template lang="html">
  <div class="agentApp">
    <div class="appMask">

    </div>
    <div class="oneStar one">
      <p>一星代理</p>
      <p>享受佣金:12%</p>
      <p>代理费用:3000RAM</p>
      <p>可发展客户</p>
    </div>
    <div class="oneStar two">
      <p>二星代理</p>
      <p>享受佣金:14%</p>
      <p>代理费用:6000RAM</p>
      <p>可发展代理商</p>
    </div>
    <div class="oneStar three">
      <p>三星代理</p>
      <p>享受佣金:16%</p>
      <p>代理费用:10000RAM</p>
      <p>可发展代理商</p>
    </div>
    <div class="oneStar four">
      <p>四星代理</p>
      <p>享受佣金:18%</p>
      <p>代理费用:30000RAM</p>
      <p>可发展代理商</p>
    </div>
    <div class="oneStar five">
      <p>五星代理</p>
      <p>享受佣金:20%</p>
      <p>代理费用:50000RAM</p>
      <p>可发展代理商</p>
    </div>
    <div class="agentBox">
      <van-button color="#0588FF" @click="tuenApp()">立即申请</van-button>
    </div>
    <!-- 手机认证 -->
    <van-popup v-model="phoneAuth" position="bottom" :style="{ height: '35%' }" round>
      <div class="phoneAuth">
        <p class="authTitle">
          <van-icon name="clear" color="#f5222d" @click="phoneAuth = false"/>
          手机认证
        </p>
        <p>
          <input type="number" name="" value="" placeholder="请输入手机号" v-model="bindMobile">
          <span v-if="Verification" @click="getCode()">获取验证码</span>
          <span v-else>({{timer}}s)</span>
        </p>
        <p>
          <input type="number" name="" value="" placeholder="输入验证码" v-model="bindCode">
          <span>收不到验证码？</span>
        </p>
        <p>
          <van-button color="#0588FF" @click="subBind()">立即认证</van-button>
        </p>
      </div>
    </van-popup>
    <!-- 认证失败 -->
    <van-popup v-model="authErr" position="bottom" :style="{ height: '35%' }" round>
      <div class="phoneAuth">
        <p class="authTitle">
          <van-icon name="clear" color="#f5222d" @click="authErr = false"/>
          手机认证
        </p>
        <p>
          <input type="number" name="" value="" placeholder="请输入手机号">
          <span>获取验证码</span>
        </p>
        <p>
          <input type="number" name="" value="" placeholder="输入验证码">
          <span>收不到验证码？</span>
        </p>
        <p>
          <van-button color="#f5222d" icon="clear">认证失败</van-button>
        </p>
      </div>
    </van-popup>
    <!-- 选择星级 -->
    <van-popup v-model="choiceStar" position="bottom" :style="{ height: '40%' }" round>
      <div class="choiceStar">
        <p class="choiceTitle">
          <van-icon name="clear" color="#f5222d" @click="choiceStar = false"/>
          选择星级
        </p>
        <p>
          <el-select v-model="starGar" placeholder="代理星级" size="mini">
             <el-option
               v-for="item in agentList"
               :key="item.value"
               :label="item.text"
               :value="item.text">
             </el-option>
           </el-select>
        </p>
        <p>
          <input type="text" v-model="agentMount" disabled="disabled" name="" value="">
        </p>
        <p>
          <van-button color="#0588FF" @click="openPay()">立即申请</van-button>
        </p>
      </div>
    </van-popup>
    <!-- 支付代理费 -->
    <van-popup v-model="payStar" position="bottom" :style="{ height: '40%' }" round>
      <div class="payStar">
        <p class="payTitle">
          <van-icon name="clear" color="#f5222d" @click="payStar = false"/>
          支付代理费
        </p>
        <p>¥{{agentMount}}</p>
        <p>收款方:厦门小蚜虫量化软件开发有限公司</p>
        <p>收款方:支付代表您已同意<router-link tag="span" to="/userAge" style="color:#0588ff;"><代理协议></router-link></p>
        <p>
          <van-button color="#0588FF" @click="starPay()">确认支付</van-button>
        </p>
      </div>
    </van-popup>
    <!-- 支付成功 -->
    <van-popup v-model="paySucc" position="bottom" :style="{ height: '35%' }" round>
      <div class="paySucc">
        <p class="payTitle">
          <van-icon name="clear" color="#f5222d" @click="paySucc = false"/>
        </p>
        <p>
          <van-icon name="passed" size="100" color="#0588ff" />
        </p>
        <p>恭喜您成为大虎鲸的代理商</p>
        <p>提示：退出此页面重进后就是您的个人代理页面啦</p>
      </div>
    </van-popup>
    <!-- 支付失败 -->
    <van-popup v-model="payErr" position="bottom" :style="{ height: '35%' }" round>
      <div class="payErr">
        <p class="payTitle">
          <van-icon name="clear" color="#f5222d" @click="payErr = false"/>
        </p>
        <p>
          <van-icon name="close" size="100" color="#f5222d" />
        </p>
        <p>支付失败</p>
        <p>
          <van-button color="#0588FF" @click="starPay()">重新支付</van-button>
        </p>
      </div>
    </van-popup>
    <Back padding="10 10 60 10" />
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
export default {
  data(){
    return{
      phoneAuth:false,
      authErr:false,
      choiceStar:false,
      agentNum:0,//代理等级
      agentMount:0,//代理费用
      agentList: [
        { text: '一星代理', value: 3000,num:1 },
        { text: '二星代理', value: 6000 ,num:2},
        { text: '三星代理', value: 10000 ,num:3},
        { text: '四星代理', value: 30000 ,num:4},
        { text: '五星代理', value: 50000 ,num:5},
      ],
      mountList:[
        { text: '3000', value: 0 },
        { text: '6000', value: 0 },
        { text: '10000', value: 0 },
        { text: '30000', value: 0 },
        { text: '50000', value: 0 },
      ],
      payStar:false,//支付代理费
      paySucc:false,//支付成功
      payErr:false,
      starGar:null,//代理等级
      starNum:null,//代理等级上传
      bindMobile:null,//绑定手机
      bindCode:null,//绑定验证码
      timer:60,
      Verification:true,//从新获取验证码
    }
  },
  components:{
    Back
  },
  watch:{
    starGar(val,oldVal){
      this.agentList.forEach((e)=>{
        if(val===e.text){
          this.agentMount=e.value
          this.starNum=e.num
        }
      })
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    console.log(this.userMes)
  },
  methods:{
    tuenApp(){//申请代理
      if(this.userMes.identity!=0){
        this.$toast('您已是大虎鲸代理，将为您跳转至代理中心')
        setTimeout(()=>{
          this.$router.push('/myCus')
        },1000)
      }else if(this.userMes.mobile!=''||this.userMes.mobile!=null){
        this.choiceStar=true;
      }else{
        this.phoneAuth=true;
      }
    },
    openPay(){//打开支付
      if(this.starGar==''||this.starGar==null){
        this.$toast('请先选择代理星级')
      }else{
        this.choiceStar=false;
        this.payStar=true;
      }
    },
    starPay(){//支付验证
      this.$axios.post(this.Uapi+'/user/index/wxconfig').then((res)=>{
        // console.log(res)
        if(res.data.state==1){
          let wxConfig=JSON.parse(res.data.data);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxConfig.appId, // 必填，公众号的唯一标识
            timestamp: wxConfig.timestamp * 1, // 必填，生成签名的时间戳
            nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
            signature: wxConfig.signature,// 必填，签名
            jsApiList: wxConfig.jsApiList // 必填，需要使用的JS接口列表
          });
          this.starWxPay()
        }
      });
    },
    starWxPay(){//统一下单
      this.$axios.post(this.Uapi+'/user/order',{
        'scene':'age',
        'level':this.starNum,
        'payed_type':'allinpay',
        'trade_type':'W02'
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'V':'v2'
        }
      }).then((res)=>{
        // console.log(res,'微信支付发起')
        let wxPay=res.data.data.wx_order;
        wx.chooseWXPay({
          appId:wxPay.appId,
          timestamp:wxPay.timeStamp,
          nonceStr:wxPay.nonceStr,
          package:wxPay.package,
          signType:wxPay.signType,
          paySign:wxPay.paySign,
          success:((res)=>{
            this.$toast('支付成功');
            this.paySucc=true;
            this.payStar=false;
            this.$toast('即将为您跳转至个人中心...');
            setTimeout(()=>{
              this.$router.push('/mine')
            },1000)
            getUser()
          }),
          cancel:((err)=>{
            this.$toast('取消支付')
          }),
          fail:((fall)=>{
            this.paySucc=true;
            this.payStar=false;
            this.$toast('购买失败，请重新创建订单')
          })
        });
        // wx.error((err)=>{
        //   alert('wx错误')
        // })
      })
    },
    getCode(){//获取验证码
      if(this.bindMobile==null||this.bindMobile==''){
        this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.bindMobile))){
        this.$toast('请输入正确的手机号码')
      }else{
        this.$axios.post(this.Uapi+'/user/sms',{
          'mobile':this.bindMobile,
          'event':'verifyMobile'
        },{
          headers:{
            'Authorization':this.baseToken,
            'v':'v2',
            'SessionId':this.baseID
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast('验证码已发送')
            this.Verification = false;
            let auth_timer = setInterval(()=>{
              this.timer--;
              if(this.timer<=0){
                this.Verification = true;
                this.timer=60;
                clearInterval(auth_timer)
              }
            },1000)
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(errText)
        })
      }
    },
    subBind(){//绑定手机
      let _html=this;
      if(_html.bindMobile==''||_html.bindMobile==null){
        _html.$toast('请输入手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(_html.bindMobile))){
        _html.$toast('请输入正确的手机号码')
      }else if(_html.bindCode==''||_html.bindCode==null){
        _html.$toast('请输入验证码')
      }else{
        _html.$axios.post(this.Uapi+'/user/bindMobile',{
            'mobile':_html.bindMobile,
            'sms_code':_html.bindCode
          },{
            headers:{
              'Authorization':_html.baseToken,
              'SessionId':_html.baseID,
              'v':'v2'
            }
            }).then((res)=>{
          if(res.data.state==1){
            _html.$toast('绑定成功,正在为您跳转支付...');
            setTimeout(()=>{
              _html.phAuth=false;
              _html.wePay=true;
            },1500)
          }else{
            _html.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _html.$toast(_html.errText);
        })
      }
    },
  }
}
</script>

<style lang="scss">
.agentApp{
  width: 100%;
  height: 110rem;
  background: url('../../../assets/images/agentBg.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top:25rem;
  .appMask{
    position: absolute;
    width: 5rem;
    height: 2rem;
    background: rgba(54,170,255,1);
    top:5rem;
    left: 0;
  }
  .oneStar{
    width: 40%;
    padding: 1rem;
    box-sizing: border-box;
    background: white;
    border-radius: 5px;
    border-top-left-radius: 0;
    p:first-child{
      font-size: $fontTitle;
      font-weight: bold;
      color:$themeColor;
    }
    p{
      font-size: $fontText;
    }
  }
  .one{
    margin-left: 2rem;
  }
  .two{
    margin-top: 5rem;
    margin-left: 20rem;
  }
  .three{
    margin-top: 5rem;
    margin-left: 2rem;
  }
  .four{
    margin-top: 5rem;
    margin-left: 20rem;
  }
  .five{
    margin-top: 5rem;
    margin-left: 2rem;
  }
  .agentBox{
    width: 100%;
    position: fixed;
    bottom:0;
    height: 5rem;
    background: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: border-box;
    padding-top: 1rem;
    text-align: center;
    button{
      width: 90%;
      height: 3rem;
      border-radius: 15px;
    }
  }
  .phoneAuth{
    text-align: center;
    .authTitle{
      width: 100%;
      position: relative;
      text-align: center;
      line-height: 4rem;
      font-size: $fontTitle;
      font-weight: bold;
      i{
        position: absolute;
        font-size: $iconSize;
        left:1rem;
        top:1rem;
      }
      margin-bottom: 1rem;
    }
    p{
      width: 80%;
      margin:0 auto;
      text-align: left;
      line-height: 5rem;
      input{
        height: 3rem;
        border:1px solid #ccc;
        border-radius: 15px;
        text-align: center;
      }
    }
    p:nth-child(2){
      input{
        width: 20rem;
      }
      span{
        background: $themeColor;
        height: 3rem;
        border-radius: 15px;
        padding: 0 10px;
        line-height: 3rem;
        color:white;
        margin-left: 1rem;
      }
    }
    p:nth-child(3){
      span{
        font-size: $fontText;
        box-sizing: border-box;
        padding-left: 1rem;
      }
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      button{
        width: 70%;
        height: 3rem;
        border-radius: 15px;
      }
    }
  }
  .choiceStar{
    text-align: center;
    .choiceTitle{
      width: 100%;
      position: relative;
      text-align: center;
      line-height: 4rem;
      font-size: $fontTitle;
      font-weight: bold;
      i{
        position: absolute;
        font-size: $iconSize;
        left:1rem;
        top:1rem;
      }
      margin-bottom: 1rem;
    }
    p:nth-child(2){
      width: 100%;
      line-height: 5rem;
      margin:0 auto;
      .el-input__inner{
        width: 28rem!important;
        height: 3rem!important;
        line-height: 3rem!important;
        font-size: 1.3rem;
      }
    }
    p:nth-child(3){
      margin-top: 2rem;
      margin-bottom: 2rem;
      width: 100%;
      margin:0 auto;
      input{
        height: 2.8rem;
        border-radius: 15px;
        border:1px solid #ccc;
        text-align: center;
        width: 28rem;
        font-size: 1.3rem;
      }
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: 3rem;
      button{
        width: 28rem;
        height: 3rem;
        border-radius: 15px;
      }
    }
  }
  .payStar{
    text-align: center;
    .payTitle{
      width: 100%;
      position: relative;
      text-align: center;
      line-height: 4rem;
      font-size: $fontTitle;
      font-weight: bold;
      i{
        position: absolute;
        font-size: $iconSize;
        left:1rem;
        top:1rem;
      }
      margin-bottom: 1rem;
    }
    p{
      font-size: $fontText;
    }
    p:nth-child(2){
      font-size: 1.8rem;
      font-weight: bold;
      color:$themeColor;
      line-height: 4rem;
    }
    p:nth-child(3){
      width: 70%;
      margin:0 auto;
      margin-top: 1rem;
      color:$moreColor;
      text-align: left;
    }
    p:nth-child(4){
      color:$moreColor;
      width: 70%;
      margin:0 auto;
      text-align: left;
      margin-top: 1rem;
      span{
        color:black;
      }
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: 3rem;
      button{
        width: 70%;
        height: 3rem;
        border-radius: 15px;
      }
    }
  }
  .paySucc{
    text-align: center;
    .payTitle{
      width: 100%;
      position: relative;
      text-align: center;
      i{
        position: absolute;
        font-size: $iconSize;
        left:1rem;
        top:1rem;
      }
      margin-bottom: 1rem;
    }
    p:nth-child(2){
      box-sizing: border-box;
      padding-top: 3rem;
    }
    p:nth-child(3){
      line-height: 4rem;
      font-weight: bold;
      font-size: $fontTitle;
    }
    p:last-child{
      color:$moreColor;
      font-size: $fontText;
    }
  }
  .payErr{
    text-align: center;
    .payTitle{
      width: 100%;
      position: relative;
      text-align: center;
      i{
        position: absolute;
        font-size: $iconSize;
        left:1rem;
        top:1rem;
      }
      margin-bottom: 1rem;
    }
    p:nth-child(2){
      box-sizing: border-box;
      padding-top: 3rem;
    }
    p:nth-child(3){
      line-height: 4rem;
      font-weight: bold;
      font-size: $fontTitle;
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      button{
        width: 70%;
        height: 3rem;
        border-radius: 15px;
      }
    }
  }
}
</style>
