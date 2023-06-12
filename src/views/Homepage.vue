<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getImageUrl } from "../global.js";
import PlaceServices from "../services/PlaceServices.js";
import HotelServices from "../services/HotelServices.js";
import { ref } from "vue";


const mostVisitedPlaces = ref([]);
const famousHotels = ref([]);
const start = ref('');
const end = ref('');
const spinner = ref(true);

onMounted(async () => {
    await getMostVisitedPlaces();
    await getMostVisitedHotels();
    spinner.value = false;   
});

async function getMostVisitedPlaces() {
  await PlaceServices.getMostVisitedPlaces()
    .then((response) => {
      mostVisitedPlaces.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getMostVisitedHotels() {
  await HotelServices.getFamousHotels()
    .then((response) => {
      famousHotels.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const searchPlan = () => {
  return '/travel-frontend/plans?start='+start.value.toString()+'&end='+end.value.toString()
}

</script>
<template>
        <div class="container from-to">
        <div class="row justify-content-center">
            <div class="col-xl-6 from-to-search">
                <div class="text-center text-white">
                    <h2 class="mb-5 title">Life is short, and the world is wide.</h2>
                    <div class="container" style="padding:10px;">
                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="date" class="form-control" id="departure" v-model="start">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="date" class="form-control" id="return" v-model="end">
                            </div>
                        </div>
                        <div class="col-md-12 search-button">
                            <div class="form-group col-md-6">
                            <a type="submit" class="btn" :href="searchPlan()">Search Now</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="col-xl-6 from-to-image" src="/home2.png"/>
        </div>
        </div><br/>
        
    <div class="container">
        <h2> Most Visited Places </h2>
        <div class="card-group">
        <div class="card" v-for="item in mostVisitedPlaces.slice(0,3)" :key="item.id">
            <a :href="['/travel-frontend/places/'+item.id]">
              <img class="card-img-top" :src="getImageUrl(item.image_url)" alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.description.slice(0,100) }}..</p>
              </div>
            </a>
        </div>
        </div>
    </div><br/><br/>

       <div class="container">
        <h2> Famous Hotels </h2>
        <div class="card-group">
        <div class="card" v-for="item in famousHotels.slice(0,3)" :key="item.id">
            <a :href="['/travel-frontend/hotels/'+item.id]">
              <img class="card-img-top" :src="getImageUrl(item.image_url)" alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">{{ item.location }}</p>
              </div>
            </a>
        </div>
        </div>
    </div><br/><br/>

</template>

<style scoped>

.btn {
  color:white;margin-top:25px;width:100%;background-color:#80162B;
}
.title {
    color: #555;
}
.search-button {
    display: flex;
    justify-content: center;
}
.from-to {
    background-color: white;
    /* padding: 50px; */
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.from-to-image {
    margin-right: -23px;
}
.from-to-search {
    padding: 50px;
}
.card-img-top {
  max-height: 300px ;
  max-width: 400px;
}
.card {
  max-width: 400px;
}
</style>