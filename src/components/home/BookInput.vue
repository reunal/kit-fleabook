<template>
  <v-container>
    <v-text-field
      label="제목, 출판사, 저자 검색"
      v-model="search"
      solo
      clearable
      prepend-icon="mdi-cog"
      append-icon="mdi-magnify"
      @click:append="onSearch()"
      @keyup.enter="onSearch()"
      @click:clear="onClear()"
    >
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click="onFilter()">
              {{renderIcon()}}
            </v-icon>
          </template>
          {{renderTooltip()}}
        </v-tooltip>
      </template>
    </v-text-field>
  </v-container>
</template>

<script>
export default {
  model: {
    prop: "text",
    event: "eventData",
  },
  props: ["text"],
  data: () => ({
    search: "",
    filter: false,
  }),
  created() {
    this.search = this.text ? this.text : "";
  },
  methods: {
    onSearch() {
      sessionStorage.setItem("search", this.search);
      this.$emit("eventData", this.search);
    },
    onClear() {
      this.search = "";
      sessionStorage.setItem("search", "");
      this.onSearch();
    },
    onFilter(){
      this.filter = !this.filter
      this.$emit("filterEvent", this.filter)
    },
    renderTooltip() {
      return this.filter ? "모든 도서 보기" : "예약 가능한 도서만 보기";
    },
    renderIcon() {
      return this.filter ? "mdi-filter" : "mdi-filter-remove-outline";
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  padding: 0 20px 0 0;
  z-index: 1000;
  & > .v-input {
    max-width: 500px;
    margin: auto;
  }
}
</style>