<script>
import axios from "axios";

export default {
    name: 'Filter',
    data() {
        return {
            backendUrl: 'http://localhost:8000',
            perfumes: [],
            brands: [],
            selectedBrands: [],
            filteredPerfumes: []
        }
    },
    methods: {
        fetchBrands() {
            axios.get(this.backendUrl + "/api/brands")
                .then((resp) => {
                    this.brands = resp.data;
                    console.log(this.brands)
                });
        },
        fetchPerfumes() {
            axios.get("http://127.0.0.1:8000/api/perfumes").then((resp) => {
                this.perfumes = resp.data;
                console.log(this.perfumes)
            });
        },
        filterPerfumes() {
            let filteredPerfumes = [];
            this.perfumes.forEach((perfume) => {
                if (this.selectedBrands.includes(perfume.brand_id)) {
                    filteredPerfumes.push(perfume);
                }
            });
            return filteredPerfumes;
        }
    },
    watch: {
        selectedBrands: function () {
            this.filteredPerfumes = this.filterPerfumes();
            console.log(this.selectedBrands)
        },
    },
    computed: {
        filteredPerfumes() {
            console.log(this.selectedBrands[0], this.selectedBrands.length)
            return this.filterPerfumes();
        },
    },
    mounted() {
        this.fetchBrands();
        this.fetchPerfumes();
    }
}
</script>

<template>
    <button class="btn btn-warning opacity-75 mt-2 mx-4">
        <a :href="'/'" class="text-decoration-none text-white">
            Back
        </a>
    </button>
<div class="container-fluid mx-4">

    <!-- AREA BRAND CON CHECKBOX -->
    <div class="mb-3">
        <div class="container bg-container">
            <div class="gap-3 d-flex flex-wrap justify-content-evenly">
                <div v-for="(brand, index) in brands" :key="index">
                    <input type="checkbox" :id="'brand-' + index" :value="brand.id" v-model="selectedBrands">
                    <label :for="'brand-' + index">
                        <h4 class="mx-1">{{ brand.name }}</h4>
                    </label>
                </div>
            </div>
        </div>
    </div>

    <!-- AREA PROFUMI FILTRATI -->
    <div v-if="selectedBrands.length > 0" class="my-2 mx-3 orange">
        <h2>Here are the results of your search</h2>
        <small>The results include all fragrances belonging to the selected brands:
            <span class="mx-1" v-for="brand in selectedBrands">
                <span v-if="brand == 1">Calvin Klein</span>
                <span v-else-if="brand == 2">Armani</span>
                <span v-else-if="brand == 3">Hermes</span>
                <span v-else-if="brand == 4">Dolce&Gabbana</span>
                <span v-else-if="brand == 5">PacoRabanne</span>
            </span>
        </small>
    </div>
    <div class="row d-flex justify-content-center mx-4 gy-2 gx-5">
            <div class="card mb-3 col-sm-8 col-md-6 col-lg-4 col-xl-3" v-for="(perfume, index) in filteredPerfumes"
                :key="index">
                <div class="row g-0">
                    <div class="col-6" v-if="perfume.cover_img">
                        <img :src="this.backendUrl + '/storage/' + perfume.cover_img"
                            class="img-fluid asp-ratio rounded-start" alt="...">
                    </div>
                    <div class="col-6">
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
    <!-- <div class="card mb-3 mx-2 border-orange" style="max-width: 540px;" v-for="singlePerfume in filteredPerfumes"
                                                :key="singlePerfume.id">
                                                <div class="row g-0 p-0 justify-content-center">
                                                    <div class="col-md-5 p-0"> 
                                                        <img :src="this.backendUrl + '/storage/' + singlePerfume.cover_img" class="img-fluid rounded" alt="..."
                                                            v-if="singlePerfume.cover_img">
                                                    </div>
                                                    <div class="col-md-7">
                                                        <div class="card-body">
                                                            <h5 class="card-title fs-2 orange">{{ singlePerfume.name }}</h5>
                                                            <h6 class="mt-3">Categorie:</h6>
                                                            <span class="badge rounded-pill text-bg-success me-1" v-for="brand_id in restaurant.brands"
                                                                :key="brand_id.id"> {{ brand_id.name + " " }} </span>
                                                            <h6 class="mt-3">Indirizzo:</h6>
                                                            <p class="card-text">{{ restaurant.address }}</p>
                                                            <a :href="'/perfumes/' + restaurant.id"
                                                                class="text-decoration-none bg-light-orange p-1 w-50"><small>Menu</small></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>-->
</template>


<style scoped lang="scss">
@use '../styles/main.scss';
</style>

<!-- filterBrandPush($brand) {
    //     if (this.filterBrand.length === this.brands.length) {
    //         console.log(this.filterBrand, this.brands)
    //         this.filterBrand = [];
    //         this.filteredPerfumes = [];
    //     }

    //     if (!this.filterBrand.includes($brand)) {
    //         this.filterBrand.push($brand);
    //         this.filteredPerfumes = [];
    //         this.filterBrand.forEach(element => {

    //             axios.get("http://127.0.0.1:8000/api/perfumes/brands/" + element)
    //                 .then((resp) => {
    //                     resp.data.perfumes.forEach(restaurant => {
    //                         if (this.filteredPerfumes.some(r => r.id === restaurant.id)) {
    //                             return;
    //                         } else {
    //                             this.filteredPerfumes.push(restaurant);
    //                         }
    //                     });
    //                 });
    //         });
    //     } else {
    //         this.filterBrand.splice(this.filterBrand.indexOf($brand), 1);
    //         this.filteredPerfumes = [];
    //         this.filterBrand.forEach(element => {

    //             axios.get("http://127.0.0.1:8000/api/perfumes/brands/" + element)
    //                 .then((resp) => {
    //                     resp.data.perfumes.forEach(restaurant => {
    //                         if (this.filteredPerfumes.some(r => r.id === restaurant.id)) {
    //                             return;

    //                         } else {
    //                             this.filteredPerfumes.push(restaurant);
    //                         }
    //                     });
    //                 });
    //         });
    //     }
    // },

    // search() {
    //     setTimeout(() => {
    //         if (this.filters.length === 0) {
    //             this.filteredPerfumes = this.perfumes;
    //         } else {
    //             this.filteredPerfumes = [];
    //             this.perfumes.forEach((restaurant) => {
    //                 this.filters.forEach((filtro) => {
    //                     restaurant.brands.forEach((brand_id) => {
    //                         if (
    //                             filtro == brand_id.pivot.brand_id &&
    //                             !this.filteredPerfumes.some(
    //                                 (filteredRestaurant) =>
    //                                     filteredRestaurant.id === restaurant.id
    //                             )
    //                         ) {
    //                             this.filteredPerfumes.push(restaurant);
    //                         }
    //                     });
    //                 });
    //             });
    //         }
    //     }, 100);
    // } -->