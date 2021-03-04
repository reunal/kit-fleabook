<template>
  <div class="process-wrapper">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </div>
</template>

<script>
export default {
  name: "LoadingDialog",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.process-wrapper {
  position: absolute;
  z-index: 1000;
  text-align: center;
  width: 90%;
  margin-top: 3rem;
}
</style>