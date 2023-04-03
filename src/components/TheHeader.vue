<script>
export default {

  data() {
    return {
      
      Items: [
        {
           label: "Home",
           routeName: "home",
        },
        {
          label: "Shop",
          routeName: "Index",
        },
        {
          label: "Search by Filter",
          routeName: "Filter",
        }
      ],
    };
  },
}

</script>

<template>

  <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex introduction sticky-top px-2 col-sm-12"
    style="background-color: black;">
    <div class="container-fluid">
      <a :href="'/'" class="navbar-brand d-flex align-items-center me-3"><img src="/imgs/futuretechlead.jpg" alt=""
          class="logo"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="background-color: white;">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item animation" v-for="(item, index) in Items" :key="index">
            <!-- <a href="/perfumes" class="list-unstyled">Perfumes</a> -->
            <router-link :to="{ name: item.routeName }" class="nav-link nav-i text-white">
              {{ item.label }}
            </router-link>
          </li>

        </ul>
        <div class="d-flex">
          <div class="me-4">
            <ul class="list-unstyled">
              <li class="nav-item animation">
                
                  <a class="nav-link text-white" href="http://localhost:8000/login" role="button">Login</a>
                
              </li>
            </ul>
          </div>

          <div>
              <a class="nav-item text-white animation" href="http://localhost:8000/register" role="button">Register</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '../styles/main.scss';

.animation {
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.animation::before,
.animation::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  background-color: white;
  transition: all 0.3s ease-in-out;
}

.animation::before {
  left: 0;
}

.animation::after {
  right: 0;
}

.animation:hover::before,
.animation:hover::after {
  width: 50%;
}

.logo {
  object-fit: contain;
}
</style>