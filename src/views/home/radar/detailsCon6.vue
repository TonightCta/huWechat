<template lang="html">
  <div class="detailsCon6">
    <p class="con6Title">诉讼仲裁<span>低风险</span></p>
    <p class="con6Title2">近两年，公司涉及{{lawMes.count}}起诉讼案件</p>
    <p v-if="isLawList" class="isLawList">暂无数据</p>
    <ul class="con6List" v-else>
      <li v-for="lawMesCH in lawMes.list">
        <p>{{lawMesCH.title}}</p>
        <p>{{lawMesCH.publish_date}}</p>
      </li>
    </ul>
    <span class="lineMask"></span>
    <p class="con6Title outLeft">股东减持计划<span style="background:#FF502E;">中风险</span></p>
    <p class="con6Title3">2018-11-02公布股份减持计划</p>
    <p class="con6Title4">2018-11-03至2019-05-26，计划减持不超过4348.300万股，占总股本的4%。</p>
    <p class="con6LoadMore">
      查看减持明细
      <van-icon name="arrow" />
    </p>
    <span class="lineMask"></span>
    <p class="con6Title outLeft">股东减持计划<span style="background:#FF502E;">中风险</span></p>
    <p style="fontSize:1.4rem;">近两年净利润连续亏损，存在退市风险。</p>
    <span class="lineMask"></span>
    <p class="con6Title outLeft">会计师审计意见<span style="background:#FF502E;left:11rem;">中风险</span></p>
    <p class="fontSize:1.4rem;">近两年净利润连续亏损，存在退市风险。</p>
  </div>
</template>

<script>
export default {
  props:['Code'],
  data(){
    return{
      lawMes:{},
      isLawList:false,
    }
  },
  created(){
    this.getLaw()
  },
  methods:{
    getLaw(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/lawsuit?code='+this.Code+'&page=1&limit=10',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.lawMes=res.data.data;
          if(this.lawMes.list.length<1){
            this.isLawList=true;
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsCon6{
  margin-top:1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 1rem;
  p{
    font-size: $fontText;
  }
  .con6Title{
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
      background:#04CC45;
      position: absolute;
      left:6.2rem;
      top:50%;
      margin-top: -1.1rem;
    }
  }
  .outLeft{
    span{
      left: 9.4rem;
    }
  }
  .con6Title2{
    font-size: $fontTitle;
    line-height: 3rem;
    border-bottom: 1px solid #eee;
    margin-top: 1rem;
  }
  .isLawList{
    width: 100%;
    text-align: center;
    line-height: 4rem;
    font-size: $fontText;
    color:$moreColor;
  }
  .con6List{
    width: 100%;
    li{
      padding-top: .5rem;
      border-bottom: 1px solid #eee;
      padding-bottom: .5rem;
      font-size: $fontText;
      p:last-child{
        line-height: 3rem;
        font-size: $fontText;
        color:$moreColor;
      }
    }
  }
  .lineMask{
    width: 110%;
    height: 1rem;
    background: #eee;
    margin-left: -5%;
  }
  .con6Title3{
    line-height: 3rem;
    font-size: $fontText;
  }
  .con6Title4{
    margin-bottom:1rem;
    font-size: $fontText;
  }
  .con6LoadMore{
    line-height: 3rem;
    font-size: $fontText;
    color:$moreColor;
    border-top: 1px solid #eee;
    position: relative;
    i{
      font-size: 1.5rem;
      position: absolute;
      top:50%;
      margin-top: -9px;
      right:1rem;
    }
  }
}
</style>
