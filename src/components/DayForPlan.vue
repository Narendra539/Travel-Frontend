<script setup>
import { onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import PlanServices from "../services/PlanServices.js";
import { getImageUrl } from "../global.js";


const router = useRouter();
const dayInfo = ref({})
const day= props.day;

const props = defineProps({
  day: Number,
});

onMounted(async () => {
  await getDayDetails();
});

async function getDayDetails() {
  await PlanServices.getDays(router.currentRoute.value.params.id,day.id)
    .then((response) => {
      dayInfo.value = response.data;
      console.log("re",response.data)
    })
    .catch((error) => {
      console.log(error);
    });
}


</script>

<template>
  <v-container>
        <h3>Day {{ day.day_index}}</h3>
        <p> {{ day.description }} </p>
        <div v-if="Object.keys(dayInfo).length != 0">
        <h5 v-if="dayInfo.places?.length != 0" class="title" > Places </h5>
        <div v-for="place in dayInfo.places" :key="place.id" class="item">
          <img :src="getImageUrl(place.image_url)" class="image" width="150" height="150"/>
          <div class="details">
          <h5> {{ place.title }} </h5>
          <a class="btn btn-warning btn-sm" :href="['/travel-frontend/places/'+place.id]" > More Info </a>
          </div>
        </div>
            <h5 v-if="dayInfo.flights?.length != 0" class="title" > Flights </h5>
            <div v-for="flight in dayInfo.flights" :key="flight.id" class="item">
            <div class="details flight">
            <p> Flight Name - <strong>{{ flight.flight_name }}</strong> </p>
            <p> Flight Number - <strong>{{ flight.flight_number }}</strong> </p>
            <!--<p> Arrival Place - <strong>{{ flight.arrival_place }}</strong> </p> 
            <p> Arrival Time - <strong>{{ flight.arrival_time }}</strong> </p>
           <p> Depature Place - <strong>{{ flight.depature_place }}</strong> </p>
            <p> Depature Time - <strong>{{ flight.depature_time }}</strong> </p> -->
            <a class="btn btn-warning btn-sm" :href="['/travel-frontend/flights/'+flight.id]" > More Info </a>
            </div>
        </div>
            <h5 v-if="dayInfo.hotels?.length != 0" class="title" > Hotels </h5>
            <div v-for="hotel in dayInfo.hotels" :key="hotel.id" class="item">
            <img :src="getImageUrl(hotel.image_url)" class="image" width="150" height="150"/>
            <div class="details">
            <h5> {{ hotel.name }} </h5>
            <a class="btn btn-warning btn-sm" :href="['/travel-frontend/hotels/'+hotel.id]" > More Info </a>
            </div>
        </div>
        
        </div>
  </v-container>
</template>

<style scoped>

.container {
    background: white;
    padding-bottom: 30px;
}
.item {
  display: flex;
  margin-top: 10px;
}
.details {
  margin-left: 20px;
}
.image {
  border-radius: 5px;
}
.title {
  margin-top: 10px;
  border-bottom: 2px solid black;
}
.flight {
    border: 1px solid black;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
}
.btn-warning {
    color: white;
}
</style>
