<template>
  <v-app>
    <NavBar />
    <v-main class="grey lighten-3">
      <router-view :key="$route.fullPath"/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'App',

  components: {
    NavBar,
  }
};
</script>


<style lang="scss" scoped>
</style>