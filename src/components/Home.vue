<template>
    <div>
        <p v-for="item in list" v-bind:key="item"> 
            {{item}}
        </p>
    </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      list: ['test1', 'test2']
    }
  }
}
</script>

<style scoped>
p {
    text-align: center;
}
</style>
