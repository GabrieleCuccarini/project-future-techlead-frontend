<script>
import axios from "axios";
import { store } from "./store";
import TheHeader from './components/TheHeader.vue';
import TheMain from "./components/TheMain.vue";
import TheFooter from "./components/TheFooter.vue";
// import {routerView} from "vue-router";

export default {
components: { TheHeader , TheFooter },
  data() {
    return {store}
  }
}
</script>

<template>
  <TheHeader></TheHeader>
  
  <div class="vh-100">
    <router-view></router-view>
    <TheFooter></TheFooter>
  </div>

</template>

<style lang="scss">
@use 'styles/main.scss';
</style>
