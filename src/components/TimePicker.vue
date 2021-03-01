<template>
  <v-dialog
    ref="dialogRef"
    v-model="timeModal"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        label="시간을 선택해주세요"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
        :disabled="isRsvDisable"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="timeModal"
      v-model="time"
      full-width
      format="24hr"
      min="10:00"
      max="18:00"
      :allowed-minutes="allowedMinutes"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="timeModal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="setTime"> OK </v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "TimePicker",
  props: ["isRsvDisable"],
  data: function () {
    return {
      timeModal: false,
      time: null,
    };
  },
  methods: {
    setTime: function () {
      this.$refs.dialogRef.save(this.time);
      this.$emit("getTime", this.time);
    },
    //timepicker 허용시간
    allowedMinutes: (minute) => minute % 5 == 0,
  },
};
</script>

<style scoped>
</style>