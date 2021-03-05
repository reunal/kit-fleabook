<template>
  <v-row justify="center">
    <v-btn v-if="!item.isSold" text icon large @click.stop="openPassword = true">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-dialog v-model="openPassword" max-width="500">
      <password-card :itemId="item.id" @gotoEdit="gotoEdit" />
    </v-dialog>

    <v-dialog v-model="openEdit" max-width="500" persistent>
      <edit-card :item="item" v-model="openEdit" @popUp="popUp" />
    </v-dialog>

    <v-dialog v-model="openPopup" max-width="500" persistent>
      <v-card class="popup">
        <v-card-title>
          <span class="font-weight-black mx-auto mt-5">{{ popUpMsg }}</span>
        </v-card-title>
         <v-card-actions>
            <v-btn text @click="closePopup" class="mx-auto mb-5"> 확인 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EditCard from "./EditCard.vue";
import PasswordCard from "./PasswordCard.vue";
export default {
  components: { EditCard, PasswordCard },
  props: ["item"],
  data: () => ({
    openPassword: false,
    openEdit: false,
    openPopup: false,
    popUpMsg: "",
  }),
  methods: {
    gotoEdit(text) {
      this.item["password"] = text;
      this.openPassword = false;
      this.openEdit = true;
    },
    popUp(text) {
      this.openEdit = false;
      this.openPopup = true;
      this.popUpMsg = text;
    },
    closePopup() {
      this.openPopup = false;
      window.location.reload();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>