<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style scoped>

h1 {
  text-align: center;
  color: #2c3e50;
}

</style>
