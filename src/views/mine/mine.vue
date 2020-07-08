<!-- 个人中心 -->
<template lang="html">
  <div class="">
    <Header/>
    <Swiper/>
    <div class="mineStr">
      <p class="strTitle">
        <van-icon name="description" color="red"/>
        我的策略
      </p>
      <p class="isHasSatr" v-if="isHasSatr">暂无策略,快去购买吧</p>
      <ul v-else>
        <li v-for="(mineSMes,indexSMes) in mineStrList" :key="indexSMes">
          <p>{{mineSMes.content.name}}</p>
          <p>{{mineSMes.content.style}}</p>
          <p>配资金额:<span>{{mineSMes.investment_amount}}</span></p>
          <p>累计收益:<span>{{mineSMes.profit}}</span></p>
          <van-button color="linear-gradient( #44B3FF, #0588ff)" size="small" @click="bindBefore(indexSMes)" v-if="!mineSMes.account_info">绑定交易账号</van-button>
          <van-button color="linear-gradient( #44B3FF, #0588ff)" size="small" v-else>{{mineSMes.account_info.security}}</van-button>
        </li>
      </ul>
    </div>
    <StarList>
      <p>推荐策略</p>
    </StarList>
    <!-- 绑定交易账号 -->
    <div class="bindCus">
      <van-overlay :show="bindCus" @click="bindCus = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="bindCus = false"/>
              绑定交易账号
            </p>
            <div class="bingMes">
              <ul>
                <li>证券公司:</li>
                <li>账号:</li>
                <li>密码:</li>
              </ul>
              <ul>
                <li>
                  <el-select v-model="secuName" @change="turnSecu" placeholder="选择证券" filterable size="mini">
                    <el-option
                      name="sel"
                      v-for="item in secuList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                  <van-icon name="checked" v-if="secuName!=null&&secuName!=''"/>
                </li>
                <li>
                  <input type="number" name="" value="" v-model="secuNum" placeholder="请输入证券账号">
                  <van-icon name="checked"  v-if="secuNum!=null&&secuNum!=''"/>
                </li>
                <li>
                  <input type="password" name="" value="" v-model="secuPass" placeholder="请输入证券密码">
                  <van-icon name="checked" v-if="secuPass!=null&&secuPass!=''" />
                </li>
              </ul>
            </div>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="bindTurn()">绑定</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 绑定成功 -->
    <div class="bindSuccess">
      <van-overlay :show="bindSuccess" @click="bindSuccess = false">
        <div class="wrapper" @click.stop>
          <div class="paySuc">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="bindSuccess = false"/>
            </p>
            <p>
              <van-icon name="passed" />
              <br>
              <br>
              绑定成功
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import Header from './header/header'
import Swiper from '@/components/swiper/swiper'
import StarList from './mineStar'
import {mapMutations,mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
export default {
  components:{
    Header,Swiper,StarList
  },
  data(){
    return{
      mineStrList:[],
      bindCus:false,//绑定交易账号
      secuName:null,//证券名称
      secuNum:null,//证券账号
      secuPass:null,//证券密码
      secuID:null,//证券ID
      starID:null,
      secuList:[],
      isHasSatr:true,
      bindSuccess:false,//绑定成功
    }
  },
  computed:{
    ...mapState(['myStar','userMes'])
  },
  created(){
    this.getSecu();
    if(this.myStar.length>0){
      this.mineStrList=this.myStar;
    }else{
      this.getMyStar();
    }
  },
  watch:{
    mineStrList(val,oldVal){
      if(val.length>0){
        this.isHasSatr=false;
      }else{
        this.isHasSatr=true;
      }
    }
  },
  mounted(){

  },
  // beforeRouteEnter(to,form,next){
  //   if(window.localStorage.getItem('token')){
  //     getUser()
  //     next(vm=>{
  //       vm.getMyStar()
  //     })
  //   }else{
  //     next()
  //   }
  // },
  methods:{
    ...mapMutations(['myStar_fn','userMes_fn']),
    getMyStar(){//我的策略
      let _this=this;
      _this.$axios.get(_this.Uapi+'/user/strategy/mine',{
        headers:{
          'Authorization':_this.baseToken,
          'SessionId':_this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          _this.mineStrList=res.data.data.list;
          _this.myStar_fn(res.data.data.list);
        }else{
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$toast(_this.errText);
      })
    },
    turnSecu(value){//绑定证券ID
      for(let i in this.secuList){
        if(value===this.secuList[i].name){
          this.secuID=this.secuList[i].id;
        }
      }
    },
    bindBefore(index){//绑定交易账号
      this.starID=this.mineStrList[index].id;
      this.bindCus=true;
    },
    getSecu(){//获取证券列表
      this.$axios.get(this.Uapi+'/user/serurities',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.secuList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    bindTurn(){//绑定账号
      let _this=this;
      if(_this.secuID==null||_this.secuID==''){
        _this.$toast('请选择证券公司')
      }else if(_this.secuNum==null||_this.secuNum==''){
        _this.$toast('请输入证券账号')
      }else if(_this.secuPass==null||_this.secuPass==''){
        _this.$toast('请输入密码')
      }else{
        _this.$axios.post(this.Uapi+'/user/account',{
          'us_id':_this.starID,
          'sec_id':_this.secuID,
          'account':_this.secuNum,
          'pwd':_this.secuPass
        },{
          headers:{
            'Authorization':_this.baseToken,
            'SessionId':_this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            _this.bindCus=false;
            _this.bindSuccess=true;
            _this.getMyStar();
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast(_this.errText)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mineStr{
  .strTitle{
    width: 95%;
    margin:0 auto;
    text-align: left;
    line-height: 4rem;
    font-size: $fontTitle;
    position: relative;
    box-sizing: border-box;
    padding-left: 2rem;
    i{
      font-size: $iconSize;
      position: absolute;
      top:50%;
      left: 0;
      margin-top: -10px;
    }
  }
  .isHasSatr{
    width: 100%;
    text-align: center;
    line-height: 4rem;
    color:$moreColor;
    font-size: $fontText;
  }
  ul{
    width: 95%;
    margin:0 auto;
    li{
      padding: 1.5rem 1rem;
      background: white;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      position: relative;
      p{
        text-align: left;
        font-size: $fontText;
        margin-top:.5rem;
        span{
          color:red;
        }
      }
      button{
        position: absolute;
        right:2rem;
        bottom:1.8rem;
        border-radius: 5px;
        padding: 2px 20px;
      }
      p:first-child{
        font-size: 1.6rem;
        font-weight: bold;
      }
      p:nth-child(2){
        color:$moreColor;
      }
      p:nth-child(3){
        line-height: 3rem;
      }
      p:last-child{
        line-height: 3rem;
      }
    }
  }
}
.bindCus{
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
        margin-bottom: 1rem;
      }
      .bingMes{
        width: 95%;
        margin:0 auto;
        display: flex;
        // justify-content: space-between;
        ul{
          box-sizing: border-box;
          li{
            line-height: 5rem;
            font-size: $fontText;
          }
        }
        ul:first-child{
          li{
            text-align: right;
          }
        }
        ul:last-child{
          box-sizing: border-box;
          li{
            margin-left: .5rem;
            position: relative;
            input{
              height: 3rem;
              line-height: 3rem;
              border-radius: 15px;
              text-align: center;
              width: 100%;
              border-bottom: 1px solid #ccc;
            }
            i{
              color:$themeColor;
              font-size: $iconSize;
              position: absolute;
              right:-2.5rem;
              top:50%;
              margin-top: -10px;
            }
          }
        }
      }
      p:last-child{
        width: 100%;
        margin-top: 2rem;
        text-align: center;
        button{
          width: $widthAll;
          height: 3rem;
          border-radius: 15px;
        }
      }
    }
  }
}
.bindSuccess{
  text-align: center;
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .paySuc{
      width: 30rem;
      padding: 1rem;
      border-radius: 10px;
      background: white;
      margin:0 auto;
      .payTitle{
        width: 100%;
        position: relative;
        height: 3rem;
        font-size: $fontTitle;
        i{
          position: absolute;
          font-size: $iconSize;
          left:.5rem;
          top:.5rem;
        }
      }
      p:nth-child(2){
        font-size: $fontTitle;
        font-weight: bold;
        padding-bottom: 1rem;
        i{
          font-size: 90px;
          color:$themeColor;
        }
      }
    }
  }
}
</style>
