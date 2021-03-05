<template>
  <div>
    <v-parallax
      height="300"
      src="https://i.ytimg.com/vi/IdMIqWnRpLg/maxresdefault.jpg"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="big-title font-weight-black">KIT</h1>
          <h4 class="subheading">Kumoh National Institute of Technology.</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-parallax
      src="https://images.unsplash.com/photo-1536237880829-dd441c249e0d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1280&bri=-5&con=-35"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="font-weight-black mb-4">Introduce</h1>
          <h4 class="subheading">중고도서 예약 관리 시스템에 관한 설명을 아주 장황하게 적어도 된다.</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-parallax
      src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1280&bri=-10&con=-35"
      class="background"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="font-weight-black mb-4">Developer</h1>
          <h4 class="subheading">컴퓨터소프트웨어공학과</h4>
          <h4 class="subheading">16' 김평안</h4>
          <h4 class="subheading">17' 조우성</h4>
          <h4 class="subheading">19' 이준재</h4>

          <h1 class="headline- font-weight-black mb-4">.</h1>
          <h4 class="subheading">컴퓨터공학과</h4>
          <h4 class="subheading">16' 김도현</h4>
          <h4 class="subheading">16' 권익주</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-parallax
      height="200"
      src="https://i.ytimg.com/vi/IdMIqWnRpLg/maxresdefault.jpg"
    ></v-parallax>
  </div>
</template>

<script>
export default {};
</script>





<style lang="scss" scoped>
.big-title {
  font-size: 4rem;
}
.background {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>