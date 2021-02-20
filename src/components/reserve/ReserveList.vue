<template>
  <div>
    <p> {{stdId}} </p>
  </div>
</template>

<script>
export default {
  model: {
    prop: "stdId"
  },
  props: ["stdId"],
  methods: {
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
</style>