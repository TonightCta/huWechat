<template lang="html">
  <div class="detailsCon4">
    <p class="con4Title">质押<span>高风险</span></p>
    <div class="con4Mes">
      <div class="" id="ecartsCon4">

      </div>
      <div class="">
        <p>
          <span style="background:#f60f0f;"></span>
          100%，约4.8亿股，已到平仓线
        </p>
        <p>
          <span style="background:#ff502e;"></span>
          0%，约0.0亿股，已到预警线
        </p>
        <p>
          <span style="background:#04CC45;"></span>
          0%，约0.0亿股，未触及预警线
        </p>
      </div>
    </div>
    <p style="marginBottom:1rem;fontSize:1.4rem;">总质押量{{pleMes.pledge_amount/100000000}}亿股，占质押股东总持股比例{{pleMes.pledge_ratio}}%。</p><!-- 占总股本比例43.97%。--></p>
    <!-- <p style="paddingBottom:1rem;fontSize:1.4rem;">质押比例过大，注意资金链风险。</p> -->
    <span style="width:110%;height:1rem;background:#eee;marginLeft:-2rem;"></span>
    <div class="con5" v-if="isSup">
      <p class="con5Title">监管询问<span>中风险</span></p>
      <p>近一年，公司涉及记监管层{{this.supMes.count}}起调查通知</p>
      <p v-if="isSupList">暂无数据</p>
      <ul v-else>
        <li v-for="con4MesCh in this.supMes.list">
          <p>{{con4MesCh.title}}</p>
          <p>{{con4MesCh.publish_date}}</p>
        </li>
      </ul>
      <p>
        <button @click="loadmoreSup()" :disabled="isSupList">点击加载更多</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:['Code'],
  data(){
    return{
      obaMes:{
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'left'
                },
                labelLine: {
                    show: false
                },
                data: [
                  {value: 1,itemStyle:{color:'#f60f0f'}},
                  {value: 0,itemStyle:{color:'#ff502e'}},
                  {value: 0,itemStyle:{color:'#04CC45'}},
                ]
            }
        ]
      },
      pleMes:{},
      supMes:{},
      supPage:1,
      isSup:true,
      isSupList:false,
    }
  },
  created(){
    this.getSup();
    this.getPle()
  },
  mounted(){
    let obaDom=this.$echarts.init(document.getElementById('ecartsCon4'));
    obaDom.setOption(this.obaMes)
  },
  methods:{
    getPle(){//获取质押
      this.$axios.get('http://api2.xiaoyachong.com/risk/pledge?code='+this.Code+'&type=2',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.pleMes=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getSup(){//获取监管询问
      this.$axios.get('http://api2.xiaoyachong.com/risk/supervise?code='+this.Code+'&page='+this.supPage+'&limit=10',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          if(res.data.data!=null){
            this.supMes=res.data.data;
            if(this.supMes.list.length<1){
              this.isSupList=true
            }
          }else{
            this.isSup=false;
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    loadmoreSup(){//查看更多
      this.supPage++;
      this.getSup()
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsCon4{
  margin-top:1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 1rem;
  .con4Title{
    width: 100%;
    line-height: 3rem;
    font-weight: bold;
    font-size: $fontTitle;
    position: relative;
    span{
      font-weight: normal;
      font-size: 1rem;
      padding: 0 5px;
      background: red;
      height: 2rem;
      line-height: 2rem;
      margin-left: .5rem;
      border-radius: 10px;
      color:white;
      background:$warningColor;
      position: absolute;
      left:3rem;
      top:50%;
      margin-top: -1.1rem;
    }
  }
  .con4Mes{
    width: 100%;
    display: flex;
    div{
      width: 50%;
      height: 15rem;
    }
    div:first-child{
      width: 40%;
    }
    div:last-child{
      width: 60%;
      box-sizing: border-box;
      padding-left: .5rem;
      padding-top: 2.5rem;
      p{
        line-height: 3rem;
        font-size: $fontText;
        span{
          width: 8px;
          height: 8px;
          background: red;
          border-radius: 50%;
          font-size: $fontText;
        }
      }
    }
  }
  .con5{
    // margin-top: 1rem;
    .con5Title{
      width: 100%;
      line-height: 3rem;
      font-weight: bold;
      font-size: $fontTitle;
      position: relative;
      span{
        font-weight: normal;
        font-size: 1rem;
        padding: 0 5px;
        background: red;
        height: 2rem;
        line-height: 2rem;
        margin-left: .5rem;
        border-radius: 10px;
        color:white;
        background:#ff502e;
        position: absolute;
        top:50%;
        margin-top: -1.1rem;
        left: 6.2rem;
      }
    }
    p:nth-child(2){
      line-height: 3rem;
      font-size: $fontText;
      border-bottom: 1px solid #eee;
    }
    p:nth-child(3){
      line-height: 4rem;
      font-size: $fontText;
      text-align: center;
      color:$moreColor;
    }
    ul{
      margin-top: 1rem;
      li{
        p{
          font-size: $fontText;
        }
        p:last-child{
          font-size: $fontText;
          color:$moreColor;
          text-align: left;
          margin-top: 0;
          padding: 0;
        }
      }
    }
    p:last-child{
      line-height: 4rem;
      text-align: center;
      margin-top: .5rem;
      padding-bottom: .5rem;
      button{
        width: 35%;
        height: 3rem;
        line-height: 3rem;
        border:1px solid #ccc;
        font-size: $fontText;
      }
    }
  }
}
</style>
