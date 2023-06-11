<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import FlightServices from "../services/FlightServices.js";
import { ref } from "vue";
import { getImageUrl } from "../global";
import Spinner from "../components/Spinner.vue";

const flight = ref({});
const loader = ref(true);
const router = useRouter();
const id = router.currentRoute.value.params.id

onMounted(async () => {
  await getFlight();
  loader.value = false;
});

async function getFlight() {
  await FlightServices.getFlight(id)
    .then((response) => {
      flight.value = response.data;
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
            <div class="row flight">
                <div class="col-md-12">
                    <h2>{{ flight.title }}</h2>
                    <h5 class="underline"> Flight Details </h5>
                     <p>Flight Name <strong> {{ flight.flight_name }}</strong></p>
                    <p>Flight Number <strong> {{ flight.flight_number }}</strong></p>
                    <p>Depature Place <strong> {{ flight.depature_place }}</strong></p>
                    <p>Time <strong> {{ flight.depature_time }}</strong></p>
                    <p>Arrival Place <strong> {{ flight.arrival_place }}</strong></p>
                    <p>Time <strong> {{ flight.arrival_time }}</strong></p>
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
.flight {
    margin-top:20px;
    padding:50px;
}
.underline {
  border-bottom: 2px solid black;;
}
</style>