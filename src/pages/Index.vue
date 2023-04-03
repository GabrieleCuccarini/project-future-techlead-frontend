<script>
import axios from "axios";

export default {
  name: 'Index',
  data() {
    return {
      backendUrl: 'http://localhost:8000',
      perfumes: [],
      currentPage: 1,
      itemsPerPage: 15
    }
  },
  computed: {
    // Calcola il numero di pagine necessarie per visualizzare tutti i risultati
    pageCount() {
      return Math.ceil(this.perfumes.length / this.itemsPerPage);
    },
    // Ottieni l'array di profumi da visualizzare sulla pagina corrente
    paginatedPerfumes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      console.log('funzione paginated perfumes', startIndex, endIndex);
      return this.perfumes.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchPerfumes() {
      axios.get(this.backendUrl + "/api/perfumes")
        .then((resp) => {
          this.perfumes = resp.data;
          console.log(this.perfumes);
        })
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1;
      }
    },
    // Vai alla pagina precedente
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    }
  },
  mounted() {
    this.fetchPerfumes();
  }
}
</script>

<template>
  <button class="btn btn-warning opacity-75 mx-3 mt-2">
      <a :href="'/'" class="text-decoration-none text-white">
        Back
      </a>
  </button>
  <div class="pagination mx-4">
    <button @click="previousPage" :disabled="currentPage === 1"> <i class="fa-solid fa-arrow-left"></i> </button>
    <!-- Loop attraverso i numeri di pagina e crea un pulsante per ognuno -->
    <div v-for="pageNumber in pageCount" :key="pageNumber">
      <button @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</button>
    </div>
    <button @click="nextPage" :disabled="currentPage === pageCount"> <i class="fa-solid fa-arrow-right"></i> </button>
  </div>
  <div>
    <div class="row justify-content-evenly m-4">
      <div class="col-xl-4 col-md-6 col-sm-9" v-for="perfume in paginatedPerfumes" :key="perfume.id">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-6" v-if="perfume.cover_img">
              <img :src="this.backendUrl + '/storage/' + perfume.cover_img" class="img-fluid asp-ratio rounded-start"
                alt="...">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">{{ perfume.id }} {{ perfume.name }}</h5>
                <p class="card-text"><b>Brand</b>:
                  <span v-if="perfume.brand_id == 1">Calvin Klein</span>
                  <span v-else-if="perfume.brand_id == 2">Armani</span>
                  <span v-else-if="perfume.brand_id == 3">Hermes</span>
                  <span v-else-if="perfume.brand_id == 4">Dolce&Gabbana</span>
                  <span v-else>PacoRabanne</span>
                </p>
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