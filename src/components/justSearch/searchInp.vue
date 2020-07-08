<!-- 搜索框 -->
<template lang="html">
  <div class="onlySearch">
    <p class="searchInp">
      <van-field
        v-model="searchValue"
        right-icon="search"
        placeholder="输入你想要搜索的内容"
        :clearable="true"
        input-align="center"
        @input="starSearch()"
      />
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchValue:null,
    }
  },
  methods:{
    starSearch(){
      this.$emit('starSearch', false)
    }
  },
  watch:{
    searchValue(val){
      if(val==''||val==null){
        this.$emit('starSearch', true)
        this.$emit('searchMes', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.onlySearch{
  width: 100%;
  padding: 4rem 0;
  background: $themeColor;
  .searchInp{
    width: 90%;
    margin:0 auto;
  }
}
</style>
