<template>
  <div>
    <v-dialog v-model="processRsv" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline"> 예약 진행 중 </v-card-title>
        <v-card-text>
          서버의 응답을 기다리고 있습니다<v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isRsvSuccess" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">
          {{ rsvResultTitle }}
        </v-card-title>

        <v-card-text>
          {{ rsvResultText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="closeBtn"> 닫기 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "RsvProgress",
  props: ["rsvInfo"],
  data: function () {
    return this.rsvInfo;
  },
  methods: {
    closeBtn() {
      this.isRsvSuccess = false;
      window.location.reload();
    },
  },
};
</script>

<style scoped>
</style>