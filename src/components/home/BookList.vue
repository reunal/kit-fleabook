<template>
    <div class="wrapper">
        <p v-for="item in list" v-bind:key="item"> 
            {{item}}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: ['test1', 'test2']
        }
    }
}
</script>

<style>
.wrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
}
p {
    flex: 1;
}
</style>
