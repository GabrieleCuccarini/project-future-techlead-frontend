<script>
import axios from "axios";

export default {
  name:'Index', 
  data() {
    return {
    backendUrl : 'http://localhost:8000',
    perfumes: [],
    }
  },
  methods: {
    fetchPerfumes() {
      axios.get(this.backendUrl + "/api/perfumes")
        .then((resp) => {
          this.perfumes = resp.data;
          console.log(this.perfumes);
        });
    }
  },
  mounted(){
    this.fetchPerfumes();
  }
}
</script>

<template>
  <div>
    <div class="row justify-content-evenly m-4">
      <div class="col-xl-4 col-md-6 col-sm-9" v-for="perfume in perfumes" :key="perfume.id">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-6" v-if="perfume.cover_img">
              <img :src="this.backendUrl + '/storage/' + perfume.cover_img" class="img-fluid asp-ratio rounded-start" alt="...">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">{{ perfume.id }} {{ perfume.name }}</h5>
                <p class="card-text"><b>Brand</b>: {{ perfume.brand }}</p>
                <p class="card-text"><b>Quantity</b>: {{ perfume.quantity }}</p>
                <p class="card-text"><b>Price: <span class='text-danger'>€{{ perfume.price }}</span></b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/main.scss';
</style>