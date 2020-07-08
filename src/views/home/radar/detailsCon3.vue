<template lang="html">
  <div class="detailsCon3">
    <p class="con3Title">业绩
      <span>高风险</span>
    </p>
    <p class="con3Re">{{con3Mes.first_ann_date}}业绩报告</p>
    <p class="con3Re" v-if="con3Mes.summary">{{con3Mes.summary}}元 <span>{{con3Mes.type}}</span></p>
    <p class="con3Mes">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{con3Mes.change_reason}}
    </p>
  </div>
</template>

<script>
export default {
  props:['Code'],
  data(){
    return{
      con3Mes:{},
    }
  },
  created(){
    this.getCon3()
  },
  methods:{
    getCon3(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/achieve?code='+this.Code,{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.con3Mes=res.data.data;
          this.con3Mes.first_ann_date=this.con3Mes.first_ann_date.substring(0,4)+'-'+this.con3Mes.first_ann_date.substring(4,6)+'-'+this.con3Mes.first_ann_date.substring(6,8)
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
.detailsCon3{
  margin-top:1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 1rem;
  .con3Title{
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
      margin-top:-1.1rem;
    }
  }
  .con3Re{
    line-height: 2rem;
    font-size: $fontText;
    color:$moreColor;
    position: relative;
    span{
      font-size: $fontText;
      color:$warningColor;
      font-weight: bold;
      position: absolute;
      right:1rem;
    }
  }
  .con3Mes{
    margin-top: .5rem;
    box-sizing: border-box;
    padding-bottom: .5rem;
    text-align: justify;
    text-justify:justify;
    font-size: $fontText;
  }
}
</style>
