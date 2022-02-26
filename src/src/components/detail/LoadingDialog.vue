<template>
  <div class="process-wrapper">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </div>
</template>

<script>
export default {
  name: "LoadingDialog",
};
</script>

<style lang="scss" scoped>
.process-wrapper {
  text-align: center;
  margin-top: 30%;
}
</style>