<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";

const router = useRouter();

const user = ref(null);
const title = ref("Travel Itenarary");
const logoURL = ref("");
const plan = ref("")

onMounted(() => {
  logoURL.value = ocLogo;
  user.value = JSON.parse(localStorage.getItem("user"));
});

function logout() {
  UserServices.logoutUser()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  localStorage.removeItem("user");
  user.value = null;
  router.push({ name: "login" });
}

const searchPlan = () => {
  return '/plans?key='+plan
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Itenary</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="./">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./plans">Plans</a>
      </li>
       <li class="nav-item">
        <a class="nav-link" href="./places">Places</a>
      </li>
      <li class="nav-item" v-if="user !== null">
        <a class="nav-link" href="/bookings">Bookings</a>
      </li>
       <!-- <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li> -->
    </ul>
    <form class="form-inline my-2 my-lg-0 search">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="plan">
      <a class="btn btn-search my-2 my-sm-0" type="submit" :href="searchPlan()">Search</a>
    </form>
    <a class="nav-link" href="./login" style="margin-right:20px" v-if="user === null">Login</a>
         <v-menu v-if="user !== null" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar class="mx-auto text-center" color="secondary" size="large">
              <span class="white--text font-weight-bold">{{
                `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="secondary">
                <span class="white--text text-h5">{{
                  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout()"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
  </div>
</nav>
</template>

<style scoped>
.search {
  display: flex;
  margin-right: 10px;
}
.navbar-brand {
  margin-left: 10px;
}
.btn-search {
  background-color: #80162B;
  color: white;
}
.navbar {
  background-color: white;
}
</style>