<template>
  <div>
    <p id="helpTitle">예약 시 주의사항<br /></p>
    <p id="helpText">
      1. 책을 지정해서 사는 것이 아닌 선착 순으로 예약하는 방식입니다.<br />
      2. 예약시간이 이른 사람이 원하는 책을 골라서 결제를 합니다.<br />
      3. 결제가 완료되면 해당 재고에 판매완료가 표시됩니다.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelpArea",
};
</script>

<style scoped>
#helpTitle {
  font-family: SCMedium;
  font-size: min(5vw, 20px);
}
#helpText {
  font-size: min(3.5vw, 14px);
}
</style>