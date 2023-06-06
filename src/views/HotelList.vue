<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import HotelServices from "../services/HotelServices.js";
import { ref,watch } from "vue";
import Spinner from "../components/Spinner.vue";
import { getImageUrl } from "../global.js";


const hotels = ref([]);
const spinner = ref(true);
const backup = ref([])
const search = ref("");
onMounted(async () => {
  await getHotels();
  spinner.value = false;
});

async function getHotels() {
  await HotelServices.getHotels()
    .then((response) => {
        backup.value = response.data
        hotels.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function searchHotel(updatedValue) {
    console.log(updatedValue)
    const temp = backup.value
    const filteredHotels = temp.filter((hotel) => {
        return (
        hotel.name.toLowerCase().includes(updatedValue.toLowerCase()) ||
        hotel.location.toLowerCase().includes(updatedValue.toLowerCase())
        );
    });
    hotels.value = filteredHotels;
}

watch(search, (updatedValue) => {
 searchHotel(updatedValue)
});


</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
         <div style="display: flex; justify-content: center;">
            <h3>Hotels</h3>
        </div> <br/>
        <div style="display: flex; justify-content: center;">
        <input class="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" v-model="search"/>
        </div>
        <Spinner v-if="spinner" />
        <div class="row" v-else>
            <div class="card card-item" v-for="hotel in hotels" :key="hotel.id">
            <img :src="getImageUrl(hotel.image_url)" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-text">{{ hotel.name }}</h5>
                <p>Location - {{ hotel.location }}</p>
            </div>
            </div>
        </div>
      </div><br/>
  </v-container>
</template>

<style scoped>
.container {
    cursor: pointer;
}
.card-img {
    border-radius: 7px;
    margin-top: 10px;
}
.card-title {
    margin-top: 10px;
}
a:hover {
    color:black;
}
.place {
    cursor: pointer;
    margin-top: 20px;
}
.btn {
    color: white;
    background-color: #FE7A15;
}
.card-item {
    margin-left:20px;
    margin-top:30px;
    width: 22rem;
}
.search {
    width: 60%;
    align-content: center;
}
</style>