<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import HotelServices from "../services/HotelServices.js";
import { ref } from "vue";
import { getImageUrl } from "../global";
import Spinner from "../components/Spinner.vue";

const hotel = ref({});
const loader = ref(true);
const router = useRouter();
const id = router.currentRoute.value.params.id

onMounted(async () => {
  await getHotel();
  loader.value = false;
});

async function getHotel() {
  await HotelServices.getHotel(id)
    .then((response) => {
      hotel.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <v-container>
        <Spinner v-if="loader" />
        <div class="container col-md-12 elevation-5" v-else>
            <div class="row hotel">
                <div class="col-md-12">
                    <img :src="getImageUrl(hotel.image_url)" class="image"/>
                </div>
                <div class="col-md-12">
                    <h2>{{ hotel.name }}</h2>
                    <h5 class="underline"> Details </h5>
                    <p>Location <strong> {{ hotel.location }}</strong></p>
                </div>
            </div>
        </div>
  </v-container>
</template>

<style scoped>
.image {
    margin-bottom: 20px; 
    display: flex;
    justify-content: center;
    width: 500px;
    height: 300px;
}
.container {
    background: white;
    padding-bottom: 30px;
}
.hotel {
    margin-top:20px;
    padding:50px;
}
.underline {
  border-bottom: 2px solid black;;
}
</style>