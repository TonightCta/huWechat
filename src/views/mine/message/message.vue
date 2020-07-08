<!-- 消息通知 -->
<template lang="html">
  <div class="message">
    <van-pull-refresh v-model="messLoad" @refresh="onRefresh" style="paddingBottom:10rem;">
      <div class="messList" v-for="(messAge,indexAge) in messList" :key="indexAge">
        <p class="dateTitle">{{messAge.time}}</p>
        <ul>
          <li v-for="(entMes,indexEnt) in messAge.entList">
            <p>{{entMes.title}}</p>
            <p>{{entMes.context}}</p>
          </li>
        </ul>
      </div>
    </van-pull-refresh>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  components:{
    Back
  },
  data(){
    return{
      messList:[
        {
          time:'2020-06-18',
          entList:[
            {
              title:'系统通知',
              context:'您的账号已达到了系统规定的5%的分润点了，请自行前往账号进行提现'
            },
            {
              title:'系统通知',
              context:'您的账号已达到了系统规定的5%的分润点了，请自行前往账号进行提现'
            }
          ]
        },
        {
          time:'2020-05-06',
          entList:[
            {
              title:'系统通知',
              context:'您的账号已达到了系统规定的5%的分润点了，请自行前往账号进行提现'
            },
          ]
        },
      ],
      messLoad:false,//加载动画
    }
  },
  methods:{
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.messLoad = false;
      }, 1000);
    },
  }
}
</script>

<style lang="scss" scoped>
.message{
  width: 100%;
  padding-bottom: 10rem;
  .messList{

  }
  .dateTitle{
    width: 95%;
    margin:0 auto;
    line-height: 4rem;
    font-size: $fontTitle;
  }
  ul{
    width: 95%;
    margin:0 auto;
    li{
      width: 92%;
      margin:0 auto;
      padding: 1rem 1rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 5px #ccc;
      margin-bottom: 1rem;
      p{
        text-align: left;
        font-size: $fontText;
        // color:red;
      }
      p:first-child{
        font-size: $fontTitle;
        font-weight: bold;
        line-height: 3rem;
      }
      p:nth-child(2){
        color:#666;
      }
    }
    li:last-child{
      margin-bottom:0;
    }
  }
}
</style>
