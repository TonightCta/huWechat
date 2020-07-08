<template lang="html">
  <div class="">
    <div class="conEcharts">
      <div class="" id="conEchartsTwo">

      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['weekEchMes'])
  },
  data(){
    return{
      week : {
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
    this.week.xAxis.data=this.weekEchMes.date.splice(0,2);
    this.weekEchMes.lists.forEach((e)=>{
      if(e>0){
        this.week.series[0].data.push(e)
      }else{
        this.week.series[1].data.push(e)
      }
    });
    let conEchartsTwo=this.$echarts.init(document.getElementById('conEchartsTwo'));
    conEchartsTwo.setOption(this.week)
  }
}
</script>

<style lang="scss" scoped>
.conEcharts{
  width: 95%;
  height: 20rem;
  position: relative;
  padding-bottom: 2rem;
  #conEchartsTwo{
    width: 100%;
    height: 25rem;
    margin-left: -2rem;
    margin-top: -5rem;
  }
}
</style>
