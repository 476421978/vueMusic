<template>
  <div class="header" v-show="is_header">
    <div class="header-title">
      <!--三大区域-->
      <div class="header-main">
        <ul>
          <li><img src="../../../static/image/tickets.png"></li>
          <li><img src="../../../static/image/music.png"></li>
          <li><img src="../../../static/image/clouds.png"></li>
          <li><img src="../../../static/image/radios.png"></li>
          <li><img src="../../../static/image/search.png"></li>
        </ul>
      </div>
    </div>
    <!--三大router-->
    <div class="header-footer">
        <ul>
          <li @click="isShowChange(1)">
            <router-link to="/recommend">
              <span :class="{'select-active' : isShow===1}">推荐</span>
            </router-link>
          </li>
          <li @click="isShowChange(2)">
            <router-link to="/friends">
              <span :class="{'select-active' : isShow===2}">朋友</span>
            </router-link>
          </li>

          <li @click="isShowChange(3)">
            <router-link to="/radiostation">
              <span :class="{'select-active' : isShow===3}">电台</span>
            </router-link>
          </li>
        </ul>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import store from '../../vuex/store'
  export default{
    data(){
      return{
        isShow:1,
        header_show:''
      }
    },
    methods:{
      isShowChange(val){
        this.isShow=val;
      },
    },
    computed:{
      is_header(){
          return store.state.header_show
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  img
    width 25px
    height 25px
  .header
    background-color #d44439
    height 100px;
    z-index 1000;
    position absolute
    width 100%
    .header-main
      display flex
      ul
        margin-top 10px
        width 100%
        display flex
        justify-content space-between
        li
          margin-left 15px
          float left
          list-style none
          &:last-child
            margin-right 10px
          &:first-child
            margin-left 10px
    .header-footer
      width 100%
      height 61px
      ul
        display flex
        justify-content space-between
        width 100%
        height auto
        li
          line-height 61px
          text-align center
          float left
          list-style none
        li:first-child
          margin-left 20px
        li:last-child
          margin-right 20px
        a
          text-decoration none
          color: #f1f1f1
          font-size 15px
          .select-active
            border-bottom: 2px solid #f1f1f1
</style>
