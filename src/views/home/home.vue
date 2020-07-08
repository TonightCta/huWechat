<!-- 首页 -->
<template lang="html">
  <div class="home">
    <Search/>
    <Table/>
    <Swiper/>
    <StarList>
      <p>精选策略</p>
    </StarList>
  </div>
</template>

<script>
import Search from '@/components/search/search'
import Table from '@/components/table/table'
import Swiper from '@/components/swiper/swiper'
import StarList from '@/components/starList/starList'
import {mapState,mapMutations} from 'vuex'
import {getUser} from '@/assets/js/user.js'
// import {delCode} from '@/assets/js/.js'
// import VConsole from 'vconsole'
// let vConsole=new VConsole();
export default {
  components:{
    Search,Table,Swiper,StarList
  },
  created(){
    getUser()
    // if(window.localStorage.getItem('token')){
    //   getUser()
    // }
  },
  methods:{
    ...mapMutations(['userMes_fn','wxCode_fn','token_fn','sessionID_fn']),
  }
}
</script>

<style lang="scss" scoped>

</style>
