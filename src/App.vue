<template>
  <div id="app">
    <v-header></v-header>
    <router-view>
    </router-view>
<!--    <v-animation>
    </v-animation>-->
    <!--mini播放器-->
    <v-footer>
    </v-footer>

  </div>
</template>

<script>
import header from './components/header/header.vue'
import Aplayer from 'vue-aplayer'
import aShow from './components/tool/animation.vue'
import footer from './components/tool/footer.vue'
import store from './vuex/store'
  export default {
    name: 'App',
    data(){
      return{
        playShow:false
      }
    },
    components:{
      'v-header':header,
      'v-audio':Aplayer,
      'v-animation':aShow,
      'v-footer':footer
   },
    computed:{
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  *{
    padding:0;
    margin 0;
  }


</style>
