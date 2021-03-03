<template>
  <v-skeleton-loader
    class="skeleton"
    tile
    type="card-heading, list-item-two-line"
  />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.skeleton {
  max-width: 700px;
  margin: auto;
  margin-top: 1px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  & > :first-child {
    height: 40px;
  }
  & > :last-child {
    height: 64px;
  }
}
</style>