import Vue from 'vue';
import Router from 'vue-router';
import Hello from "./pages/Hello";
import Home from "./pages/Home";
import NonFound from "./pages/NonFound";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/hello', component: Hello },
    { path: "*", component: NonFound }
  ]
});
