import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home";
import NonFound from "./components/NonFound";

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/home/', component: Home },
    { path: "*", component: NonFound }
  ]
});
