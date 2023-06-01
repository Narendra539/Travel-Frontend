<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";

const router = useRouter();

<<<<<<< HEAD
const user = ref(null);
const title = ref("Travel Itenarary");
const logoURL = ref("");
const plan = ref("")
=======
const mostVisitedPlaces = ref([]);
const famousHotels = ref([]);

const spinner = ref(true);
>>>>>>> 1cbffcedac42ed93082e4a4d45e0ff1551545b44

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

<<<<<<< HEAD
const searchPlan = () => {
  return '/plans?key='+plan
}
=======
async function getMostVisitedHotels() {
  await HotelServices.getFamousHotels()
    .then((response) => {
      famousHotels.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getGroup3() {
  await PlaceServices.getPlaces()
    .then((response) => {
      places.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

>>>>>>> 1cbffcedac42ed93082e4a4d45e0ff1551545b44
</script>

<template>
<<<<<<< HEAD
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Itenary</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
=======
        <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="home2.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="home3.png" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div><br/>
        <div class="container from-to">
        <div class="row justify-content-center">
            <div class="col-xl-6 from-to-search">
                <div class="text-center text-white">
                    <h2 class="mb-5 title">Life Is Short And The World Is Wide.</h2>
                    <div class="container" style="padding:10px;">
                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="text" class="form-control" id="from" placeholder="From">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="text" class="form-control" id="to" placeholder="To">
                            </div>
                        </div>
                        </div><br/>
                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="date" class="form-control" id="departure">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="date" class="form-control" id="return">
                            </div>
                        </div>
                        <div class="col-md-12 search-button">
                            <div class="form-group col-md-6">
                            <button type="submit" class="btn">Search Itinerary</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="col-xl-6 from-to-image" src="home2.png"/>
        </div>
        </div><br/>
        
    <div class="container">
        <h2> Most Visited Places </h2>
        <div class="card-group">
        <div class="card" v-for="item in mostVisitedPlaces.slice(0,3)" :key="item.id">
            <img class="card-img-top" :src="getImageUrl(item.image_url)" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
            </div>
            <div class="card-footer">
            <small class="text-muted">Last updated {{ item.updatedAt }}</small>
            </div>
        </div>
        </div>
    </div><br/><br/>
>>>>>>> 1cbffcedac42ed93082e4a4d45e0ff1551545b44

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/plans">Plans</a>
      </li>
       <li class="nav-item">
        <a class="nav-link" href="/places">Places</a>
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
      <a class="btn btn-search my-2 my-sm-0" type="submit">Search</a>
    </form>
    <a class="nav-link" href="/login" style="margin-right:20px" v-if="user === null">Login</a>
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