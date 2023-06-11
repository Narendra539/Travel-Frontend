<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import PlaceServices from "../services/PlaceServices.js";
import { ref } from "vue";
import { getImageUrl } from "../global";
import Spinner from "../components/Spinner.vue";

const place = ref({});
const loader = ref(true);
const router = useRouter();
const id = router.currentRoute.value.params.id

onMounted(async () => {
  await getPlace();
  loader.value = false;
});

async function getPlace() {
  await PlaceServices.getPlace(id)
    .then((response) => {
      place.value = response.data;
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
            <div class="row place">
                <div class="col-md-12">
                    <img :src="getImageUrl(place.image_url)" class="image"/>
                </div>
                <div class="col-md-12">
                    <h2>{{ place.title }}</h2>
                    <h5 class="underline"> Description </h5>
                    <p class="col-md-12">{{ place.description }}</p>
                    <h5 class="underline"> Details </h5>
                    <p>Location <strong> {{ place.location }}</strong></p>
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
.place {
    margin-top:20px;
    padding:50px;
}
.underline {
  border-bottom: 2px solid black;;
}
</style>