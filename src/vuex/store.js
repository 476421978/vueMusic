import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state={
  re_list:[],
  header_show:true,//头部
  footer_show:true,//迷你播放器
  isPlaying:false,//播放状态
  playTime:0,//当前歌曲的播放时间
  playId:null,//当前歌曲的Id
  playSong:{//当前播放的歌曲
    id:'',//歌曲ID
    title:'',//歌名
    author:'',//歌手
    url:'',//地址
    pic:'',//歌曲图片
    lrc:'',//歌词
  },
  listSongs:[],//播放列表,
};


//改变state 接受 state 作为其第一个参数
const mutations={
    addSongs(state,song){//添加歌曲到播放列表
      //要判断是否已经添加到播放列表中
      for(var i=0;i<state.listSongs.length;i++){
        if(song.id===state.listSongs[i].id){
          console.log("已存在歌曲");
          return
        }
      }
      state.listSongs.push(song);
    },
    selectSong(state,index){//切歌
      state.playSong = state.listSongs[index];
    },
    delectSong(state,index){//从播放列表中删除指定的歌曲
      state.listSongs.splice(index, 1)
    },
    nextSong(state,index){//下一首
      if(index+1>=state.listSongs.length){
        return
      }
      state.playSong = state.listSongs[index+1]
    },
    preSong(state,index){//上一首
      if(index-1<0){
        return
      }
      state.playSong = state.listSongs[index-1]
    },
    hideHeader(state){//显示/隐藏头部

    },
    hideFooter(state){//显示/隐藏 迷你播放器

    }
};

//获取state 接受 state 作为其第一个参数
const getters={
    getSongIndex(state,getters){//根据歌曲ID 获取歌曲在播放列表中的序号 方便上下首
      return function (id) {
        for(var i=0;i<state.listSongs.length;i++){
          if(id === state.listSongs[i].id){
            return i;
          }
        }
      }
    },
    getListSongs(state){//获取当前播放列表
      return state.listSongs
    },
    getUrl(state){//根据歌曲id 获取播放地址
      axios.get('/api/song/url?id=' + state.playSong.id).then(response=> {
        var mm = [];
        mm = response.data.data;
        state.playSong.url = mm[0].url;
      });
    },
    getLrc(state){//根据歌曲id 获取歌词
      axios.get('/api/lyric?id=' + state.playSong.id).then(response=> {
        var sLrc=[];
        sLrc = response.data.lrc;
        state.playSong.lrc = sLrc.lyric;
      });
    }
};

//vuex  实例化 Vuex.store
export default new Vuex.Store({
  state,
  mutations,
  getters
});
