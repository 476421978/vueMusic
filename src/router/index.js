import Vue from 'vue'
import VueRouter from 'vue-router';

import recommend from '../components/recommend/recommend.vue'
import friends from '../components/friends/friends.vue'
import radio from '../components/radioStation/radiostation.vue'
import days from '../components/recommend/days/days.vue'
import play from '../components/play/play.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/recommend', component: recommend, },
  { path: '/friends', component: friends},
  {path:'/radiostation',component:radio},
  {path:'/days',component:days},
  {path:'/play',component:play},
];

const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});

export default router;
