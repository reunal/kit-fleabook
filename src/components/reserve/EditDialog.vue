<template>
  <v-row justify="center">
    <v-btn text icon large @click.stop="openPassword = true">
      <v-icon>mdi-pencil </v-icon>
    </v-btn>

    <v-dialog v-model="openPassword" max-width="500">
      <password-card :itemId="item.id" @gotoEdit="gotoEdit"></password-card>
    </v-dialog>

    <v-dialog v-model="openEdit" max-width="500" persistent>
      <edit-card :item="item" v-model="openEdit"></edit-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EditCard from './EditCard.vue';
import PasswordCard from './PasswordCard.vue';
export default {
  components: { EditCard, PasswordCard },
  props: ["item"],
  data: () => ({
    openPassword: false,
    openEdit: false
  }),
  methods: {
    gotoEdit() {
      this.openPassword = false;
      this.openEdit = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>