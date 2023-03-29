<script>
import axios from "axios";
import TheJumbo from "../components/TheJumbo.vue";

export default{
    components: { TheJumbo},
    name: "home", 
    data(){
        return{
            backendUrl : 'http://localhost:8000',
        }
    }
}
</script>

<template>
    <TheJumbo/>
</template>

<style scoped lang="scss">
@use '../styles/main.scss';
</style>
