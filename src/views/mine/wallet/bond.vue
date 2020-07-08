<!-- 我的余额 -->
<template lang="html">
  <div class="wallet">
    <div class="balance">
      <!-- <p>账户余额
        <router-link to="/bankCard" tag="span">
          <img src="../../../assets/images/addCard.png" alt="">
        </router-link>
      </p> -->
      <p class="giveMoney">
        已缴纳保证金:¥&nbsp;{{userMes.strategy_balance}}
      </p>
      <p>
        <span>¥&nbsp;{{userMes.strategy_balance}}</span>
        <span>
          <button type="button" name="button" @click="tiXia=true">退款</button>
        </span>
      </p>
    </div>
    <p class="balanMes" v-if="false">
      <span>账单详情</span>
      <span @click="dateChoose=true">{{billDate}}
        <van-icon name="arrow-down" />
      </span>
    </p>
    <p class="noBill" v-if="noBill">暂无账单</p>
    <ul class="balanList" v-if="false">
      <li v-for="(balaMes,indexBal) in balanList" :key="indexBal">
        <p>{{balaMes.create_time}}&nbsp;&nbsp;&nbsp;<span>({{balaMes.remark}})</span></p>
        <p v-if="balaMes.type==1" style="color:#f60f0f;">+{{balaMes.amount}}</p>
        <p v-else style="color:#04cc45;">-{{balaMes.amount}}</p>
      </li>
    </ul>
    <div class="">
      <van-popup v-model="dateChoose" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="dateBlan"
          type="year-month"
          title="选择账单日"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="searBill"
        />
      </van-popup>
    </div>
    <!-- 退款 -->
    <div class="tixia">
      <van-overlay :show="tiXia" @click="tiXia = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="tiXia = false"/>
              退款
            </p>
            <p>当前可退款金额:&nbsp;{{userMes.strategy_balance}}元</p>
            <p>
              <input type="number" name="" value="" v-model="upBalanNum" placeholder="请输入退款金额">
            </p>
            <p style="marginTop:2rem;" class="pubIcon">
              <van-icon name="card" color="rgb(255,171,51)" />
              <el-select v-model="choiceCard" placeholder="银行卡" clearable size="mini">
                 <el-option
                   v-for="item in bankList"
                   :key="item.id"
                   :label="item.bank.substring(0,6)"
                   :value="item.bank.substring(0,6)">
                 </el-option>
               </el-select>
            </p>
            <p style="marginTop:2rem;" class="pubIcon" v-if="isHasPay">
              <van-icon name="alipay" color="rgb(17,157,238)"/>
              <el-select v-model="choicePay" placeholder="支付宝" clearable size="mini">
                 <el-option
                   v-for="item in cardList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.name">
                 </el-option>
               </el-select>
            </p>
            <p v-else class="addPayInp">
              <van-icon name="alipay" color="rgb(17,157,238)"/>
              <input type="text" name="" placeholder="支付宝" style="fontSize:1.4rem;" value="">
              <span class="addMask" @click="openAdd()" v-if="isOpen"></span>
              <span class="addMask" @click="closenAdd()" v-else></span>
              <span class="addPayText" ref="addPayText" @click="addPay=true;tiXia=false">
                添加支付宝
                <van-icon name="plus" />
              </span>
              <van-icon name="arrow-down" class="lastArrow" color="#C0C4CC"/>
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="turnBalan()">退款</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 退款成功 -->
    <div class="tixia">
      <van-overlay :show="tiXiaSucc" @click="tiXiaSucc = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:2rem;">
              <van-icon name="clear" color="#f5222d" @click="tiXiaSucc = false"/>
            </p>
            <van-icon name="passed" size="80"  color="#0588ff"/>
            <p style="paddingBottom:1rem;">退款成功</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 退款失败 -->
    <div class="tixia">
      <van-overlay :show="tiXiaErr" @click="tiXiaErr = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:2rem;">
              <van-icon name="clear" color="#f5222d" @click="tiXiaErr = false"/>
            </p>
            <van-icon name="close" size="80"  color="#f5222d"/>
            <p style="paddingBottom:1rem;">退款失败</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 确认退款至银行卡 -->
    <div class="">
      <div class="turnUp">
        <van-overlay :show="turnUp" @click="turnUp = false">
          <div class="wrapper" @click.stop>
            <div class="turnPay">
              <p class="payTitle">
                <van-icon name="clear" color="#f5222d" @click="turnUp = false"/>
                退款至银行卡
              </p>
              <p class="upMount">退款金额:<span>{{upBalanNum}}</span></p>
              <p class="upAddress">退款至:<span>{{backAddress}}</span></p>
              <p class="turnUpCard">
                <van-button color="#0588ff" @click="subUpBalan()">确认退款</van-button>
              </p>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
    <!-- 添加支付宝账号 -->
    <div class="">
      <div class="addPay">
        <van-overlay :show="addPay" @click="addPay = false">
          <div class="wrapper" @click.stop>
            <div class="turnPay">
              <p class="payTitle">
                <van-icon name="clear" color="#f5222d" @click="addPay = false"/>
                添加支付宝账号
              </p>
              <p class="upMount">&nbsp;&nbsp;&nbsp;姓名:
                <input type="text" name="" value="" placeholder="请输入您的姓名" v-model="apyName">
              </p>
              <p class="upAddress">支付宝:
                <input type="text" name="" value="" placeholder="请输入支付宝账号" v-model="apyNum">
              </p>
              <p class="turnUpCard">
                <van-button color="#0588ff" @click="turnPushApy">添加</van-button>
              </p>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
    <!-- <Back padding="10 10 60 10"/> -->
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'

import {getUser} from '@/assets/js/user.js'
export default {
  components:{
    Back
  },
  computed:{
    ...mapState(['userMes'])
  },
  data(){
    return{
      balanList:[],
      dateChoose:false,//日期选择器
      dateBlan:new Date(),
      maxDate:new Date(),
      minDate:new Date(2019,0,1),
      tiXia:false,//退款窗口
      tiXiaSucc:false,//退款成功
      tiXiaErr:false,//退款失败
      balance:null,//余额
      billDate:null,//账单日期
      billPage:1,//账单页码
      choicePay:null,//支付宝账号
      noBill:false,
      cardList:[],
      bankList:[],
      choiceCard:null,//选择银行卡
      turnUp:false,//确认退款
      upBalanNum:null,//退款金额
      cardID:null,//银行卡ID
      addPay:false,//添加支付宝
      isHasPay:false,
      cities: [{value: '添加支付宝',label: 'plus'}],
      AbvValue:null,//废弃
      isOpen:true,
      apyName:null,//支付宝姓名
      apyNum:null,//支付包账号
      backAddress:null,//退款至
      upType:null,//退款方式
    }
  },
  watch:{
    balanList(val,oldVal){
      if(val.length>0){
        this.noBill=false
      }else{
        this.noBill=true
      }
    }
  },
  created(){
    let data=new Date()
    let yrae=data.getFullYear();
    let mon=data.getMonth()+1;
    if(mon<10){
      mon='0'+mon
    };
    this.billDate=yrae+'-'+mon;
    this.getBlan();
    this.getBill();
    this.getCardList();
    if(this.userMes.zfb_account==''||this.userMes.zfb_account==null){
      this.isHasPay=false;
    }else{
      this.isHasPay=true;
      this.cardList.push({
        name:this.userMes.zfb_account,
        id:this.userMes.zfb_realname
      })
    }
  },
  methods:{
    formatter(type, val) {
      if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    getBlan(){//余额
      this.$axios.get(this.Uapi+'/user/item?item=balance',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.balance=res.data.data.value;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getBill(){//账单
      this.$axios.get(this.Uapi+'/user/bill?page='+this.billPage+'&limit=2&month='+this.billDate,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.balanList=res.data.data.list;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    searBill(cDate){//筛选账单
      let year=cDate.getFullYear();
      let mon=cDate.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      }
      this.billDate=year+'-'+mon;
      this.dateChoose=false;
      setTimeout(()=>{
        this.getBill()
      })
    },
    getCardList(){//获取银行卡列表
      this.$axios.post(this.Uapi+'/user/bank',{

      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.bankList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    turnBalan(){//退款至银行卡
      if(this.upBalanNum==''||this.upBalanNum==null){
        this.$toast('请输入退款金额')
      }else if(this.choiceCard!=null&&this.choiceCard!=''&&this.choicePay!=null&&this.choicePay!=''){
        this.$toast('当前仅支持一种退款方式')
      }else if(this.choiceCard!=null&&this.choiceCard!=''&&this.choicePay==null||this.choicePay==''){
        this.bankList.forEach((e)=>{
          if(this.choiceCard==e.realname){
            this.cardID=e.id;
          }
        });
        this.turnUp=true;
        this.tiXia=false;
        this.backAddress=this.choiceCard;
        this.upType=1;
      }else if(this.choiceCard==null||this.choiceCard==''&&this.choicePay!=null&&this.choicePay!=''){
        this.backAddress=this.choicePay;
        this.turnUp=true;
        this.tiXia=false;
        this.upType=2;
      }
    },
    subUpBalan(){//提交退款
      if(this.upType==1){
        this.$axios.post(this.Uapi+'/user/tixianbzj',{
          'type':1,
          'money':this.upBalanNum,
          'bank_id':this.cardID
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast('提交成功');
            this.cardID=null;
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.tiXiaSucc=true;
            this.turnUp=false;
            getUser()
          }else{
            this.turnUp=false;
            this.tiXiaErr=true;
            this.cardID=null;
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.turnUp=false;
          this.tiXiaErr=true;
          this.cardID=null;
          this.upBalanNum=null;
          this.choiceCard=null;
          this.choicePay=null;
          this.upType=null;
          this.$toast(this.errText)
        })
      }else{
        this.$axios.post(this.Uapi+'/user/tixianbzj',{
          'type':2,
          'realname':this.choicePay,
          'cardno':this.cardList[0].id
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast('提交成功');
            this.cardID=null;
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.tiXiaSucc=true;
            this.turnUp=false;
            getUser()
          }else{
            this.turnUp=false;
            this.tiXiaErr=true;
            this.cardID=null;
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.turnUp=false;
          this.tiXiaErr=true;
          this.cardID=null;
          this.upBalanNum=null;
          this.choiceCard=null;
          this.choicePay=null;
          this.upType=null;
          this.$toast(this.errText)
        })
      }

    },
    addPayJS(){
      // alert(1);
      this.tiXia=false;
      this.addPay=true;
      this.isHasPay=true;
      this.AbvValue=null;
    },
    openAdd(){
      this.$refs.addPayText.style.display='block';
      // this.$refs.addPayText.style.height='3rem';
      setTimeout(()=>{
        this.$refs.addPayText.style.opacity='1';
      })
      this.isOpen=false;
    },
    closenAdd(){
      // this.$refs.addPayText.style.height='0';
      this.$refs.addPayText.style.opacity='0';
      setTimeout(()=>{
        this.$refs.addPayText.style.display='none';
      },300)
      this.isOpen=true;
    },
    turnPushApy(){// 上传支付宝
      if(this.apyName==''||this.apyName==null){
        this.$toast('请输入姓名')
      }else if(this.apyNum==''||this.apyNum==null){
        this.$toast('请输支付宝账号')
      }else{
        this.$axios.put(this.Uapi+'/user/editinfo',{
          'zfb_realname':this.apyName,
          'zfb_account':this.apyNum,
        },{headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }}).then((res)=>{
          if(res.data.state==1){
            getUser();
            this.$toast('上传成功')
            this.addPay=false;
            this.isHasPay=true;
            this.cardList.push({
              name:res.data.data.zfb_account,
              id:res.data.data.zfb_realname
            })
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(this.errText)
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.wallet{
  width: 100%;
  .balance{
    width: 90%;
    margin:0 auto;
    margin-top: 1rem;
    padding: 1rem 1rem 2rem 1rem;
    background: linear-gradient(#44B3FF, #0588ff);
    border-radius: 10px;
    p:first-child{
      width: 100%;
      text-align: left;
      font-size: $fontTitle;
      color:white;
      font-weight: bold;
      position: relative;
      span{
        img{
          width: $iconSize;
          height: $iconSize;
          position: absolute;
          right:1rem;
          top:0;
          height: 2.5rem;
          width: 2.5rem;
        }
      }
    }
    .giveMoney{
      width: 100%;
      text-align: left;
      line-height: 3rem;
      font-size: $fontText;
      color:white;
      margin-top: 1rem;
      font-weight: bold;
    }
    p:last-child{
      width: 100%;
      display: flex;
      margin-top: 2rem;
      font-size: $fontTitle;
      color:white;
      font-weight: bold;
      span{
        width: 50%;
        text-align: left;
        font-size: 1.6rem;
      }
      span:last-child{
        text-align: right;
        button{
          height: 2rem;
          text-align: center;
          border-radius: 10px;
          color:$themeColor;
          font-weight: bold;
          width: 5rem;
          font-size: $fontText;
        }
      }
    }
  }
  .balanMes{
    width: 95%;
    margin:0 auto;
    text-align: left;
    display: flex;
    line-height: 3rem;
    span{
      width: 50%;
      font-size: $fontText;
    }
    span:last-child{
      text-align: right;
      color:#666;
      position: relative;
      box-sizing: border-box;
      padding-right: 1.8rem;
      i{
        position: absolute;
        font-size: 1.5rem;
        padding-top:2px;
        top:50%;
        margin-top: -11px;
        right:0;
      }
    }
  }
  .noBill{
    width: 95%;
    margin:0 auto;
    line-height: 4rem;
    border-radius: 10px;
    background: white;
    text-align: center;
    color:$moreColor;
    font-size: $fontText;
  }
  .balanList{
    width: 90%;
    margin:0 auto;
    padding: 1rem 1rem;
    background: white;
    border-radius: 10px;
    li{
      width:100%;
      display: flex;
      line-height: 3rem;
      font-size: $fontText;
      p{
        width: 45%;
        text-align: left;
      }
      p:first-child{
        width: 80%;
        span{
          font-size: $fontText;
          color:$moreColor;
        }
      }
      p:last-child{
        text-align: right;
      }
    }
  }
  .turnUp{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 30rem;
        padding: 1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: 3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.5rem;
            top:.5rem;
          }
        }
        p:nth-child(2){
          line-height: 3rem;
          font-size: 1.5rem;
          margin-top: 1rem;
        }
        p:nth-child(3){
          font-size: 1.5rem;
          margin-top: 1rem;
        }
        p:last-child{
          margin-top: 2rem;
          button{
            height: 3rem;
            font-size: $fontText;
            border-radius: 15px;
            width: $widthAll;
          }
        }
      }
    }
  }
  .tixia{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 30rem;
        padding: 1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        position: relative;
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: 3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.5rem;
            top:.5rem;
          }
        }
        .pubIcon{
          position: relative;
          i{
            position: absolute;
            font-size: $iconSize;
            z-index: 10;
            left: 6rem;
            top:50%;
            margin-top: -8px;
          }
        }
        .addPayInp{
          width: 100%;
          position: relative;
          margin-top: 1rem;
          i{
            position: absolute;
            font-size: $iconSize;
            z-index: 10;
            left: 6rem;
            top:50%;
            margin-top: -8px;
          }
          .lastArrow{
            right:1px;
            top:50%;
            margin-top: -7px;
            font-size: 1.4rem;
            text-align: right;
            left:18.7rem;
            width: 2rem;
          }
          .addMask{
            width: 100%;
            height: 3rem;
            position: absolute;
            // background: red;
            left: 0;
            opacity: 0;
          }
          input{
            width: $widthAll;
            height: 2.4rem;
            border-radius: 15px;
            border:1px solid;
            text-align: center;
            box-sizing: border-box;
            padding-right: 1.2rem;
          }
          .addPayText{
            width: 66%;
            border:1px solid #ccc;
            height: 3rem;
            position: absolute;
            left:50%;
            margin-left: -33%;
            top:3rem;
            background: white;
            z-index: 100;
            line-height: 3rem;
            box-shadow: 0px 0px 5px #ccc;
            border-radius: 5px;
            font-size: 1.3rem;
            transition: .5s all;
            opacity: 0;
            height: 3rem;
            display: none;
            color:#333;
            i{
              position: absolute;
              left:20%;
              font-size:1.3rem;
              top:50%;
              margin-top: -8px;
            }
          }
        }
        p:nth-child(2){
          line-height: 3rem;
          font-weight: bold;
          font-size: $fontText;
        }
        p:nth-child(3){
          width: 100%;
          font-size: $fontText;
          margin-top: 1rem;
          input{
            width: $widthAll;
            height: 3rem;
            border:1px solid #ccc;
            border-radius:15px;
            text-align: center;
          }
        }
        p:last-child{
          margin-top: 2rem;
          button{
            height: 3rem;
            font-size: $fontTitle;
            border-radius: 15px;
            width: $widthAll;
          }
        }
      }
    }
  }
  .addPay{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 30rem;
        padding: 1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: 3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.5rem;
            top:.5rem;
          }
        }
        .pubIcon{
          position: relative;
          i{
            position: absolute;
            font-size: $iconSize;
            z-index: 10;
            left: 6rem;
            top:50%;
            margin-top: -8px;
          }
        }
        p:nth-child(2){
          line-height: 3rem;
          margin-top: 1rem;
          // font-weight: bold;
          font-size: $fontText;
          margin-bottom: .5rem;
          input{
            width: 60%;
            height: 3rem;
            border:1px solid #ccc;
            border-radius:15px;
            text-align: center;
          }
        }
        p:nth-child(3){
          width: 100%;
          font-size: $fontText;
          // background: red;
          margin-top: 2rem;
          input{
            width: 60%;
            height: 3rem;
            border:1px solid #ccc;
            border-radius:15px;
            text-align: center;
          }
        }
        p:last-child{
          margin-top: 2rem;
          button{
            height: 3rem;
            font-size: $fontText;
            border-radius: 15px;
            width: $widthAll;
          }
        }
      }
    }
  }
}
</style>
