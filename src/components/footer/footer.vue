<!-- 脚部 -->
<template lang="html">
  <div class="footerWapper">
    <ul>
      <router-link to="/" tag="li" :class="{active:color==1}" @click.native="color=1">
        <van-icon name="wap-home" size="20px"/>
        <br>
        <span>攻略</span>
      </router-link>
      <router-link to="/ai" tag="li">
        <span>AI</span>
      </router-link>
      <router-link to="/mine" tag="li" :class="{active:color==2}" @click.native="color=2">
        <van-icon name="smile" size="20px"/>
        <br>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      color:1,
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  color:$themeColor!important;
}
.footerWapper{
  width: 100%;
  height: 5rem;
  background: white;
  position: fixed;
  bottom:0;
  border-top: 1px solid #eee;
  left:0;
  // z-index: 88;
  ul{
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    padding-top: .5rem;
    li{
      width: 30%;
      text-align: center;
      cursor: pointer;
      font-size: 1.2rem;
      color:$moreColor;
      span{
        margin-top: -2px;
        font-size: $fontText;
      }
    }
    li:nth-child(2){
      position: absolute;
      width:6rem;
      height: 6rem;
      background: white;
      border-radius: 50%;
      line-height: 4rem;
      left:50%;
      margin-left: -3rem;
      top:-1rem;
      box-sizing: border-box;
      span{
        width: 4rem;
        height: 4rem;
        background: red;
        border-radius:50%;
        margin-top: .5rem;
        line-height: 4rem;
        font-size: 3rem;
        color:white;
        background: linear-gradient(#44B3FF,#0588ff);
        box-shadow: 0px 0px 10px #0588ff;
      }
    }
  }
}
</style>
