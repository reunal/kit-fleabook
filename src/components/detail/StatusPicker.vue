<template>
  <v-select v-model="status" label="상태" :items="statusArr" />
</template>

<script>
const status = ["A", "B", "C"];
export default {
  props: ["rsvInfo"],
  data: function() {
    return this.rsvInfo;
  },

  methods: {
    setStatus() {
      status.map((item) => {
        this.statusArr.push(item);
      });
    },
  },

  mounted() {
    this.setStatus();
  },
};
</script>

<style></style>
