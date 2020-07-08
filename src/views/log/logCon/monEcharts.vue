<template lang="html">
  <div class="">
    <div class="conEcharts">
      <div class="" id="conEcharts">

      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['monEchMes'])
  },
  data(){
    return{
      month : {
        xAxis: {
            data: [],
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitArea: {show: false},
            axisLine:{show:false},
            axisTick:{show:false},
        },
        yAxis: {
            splitArea: {show: false},
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
            },
            position:"right",
            axisLine:{show:false},
            axisTick:{show:false},
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed'
                }
            }
        },
        series: [
            {
                name: 'bar1',
                type: 'bar',
                stack: 'one',
                itemStyle:{
                  color:'#04cc45'
                },
                data: []
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'two',
                data: [],
                itemStyle:{
                    color:'#f60f0f'
                }
            }
        ]
      },
    }
  },
  mounted(){
    this.month.xAxis.data=this.monEchMes.date.splice(5,10);
    this.monEchMes.lists.forEach((e)=>{
      if(e.pct_chg>0){
        this.month.series[0].data.push(e.pct_chg)
      }else{
        this.month.series[1].data.push(e.pct_chg)
      }
    });
    let conEcharts=this.$echarts.init(document.getElementById('conEcharts'));
    conEcharts.setOption(this.month)
  }
}
</script>

<style lang="scss" scoped>
.conEcharts{
  width: 95%;
  height: 20rem;
  position: relative;
  padding-bottom: 2rem;
  #conEcharts{
    width: 100%;
    height: 25rem;
    margin-left: -2rem;
    margin-top: -5rem;
  }
}
</style>
