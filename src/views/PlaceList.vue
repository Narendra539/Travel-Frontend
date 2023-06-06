<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import PlaceServices from "../services/PlaceServices.js";
import { ref, watch } from "vue";
import Spinner from "../components/Spinner.vue";
import { getImageUrl } from "../global.js";


const search = ref("");
const places = ref([]);
const spinner = ref(true);
const backup = ref([]);
onMounted(async () => {
  await getPlaces();
  spinner.value = false;
});

async function getPlaces() {
  await PlaceServices.getPlaces()
    .then((response) => {
        backup.value = response.data;
        places.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function searchPlace(updatedValue) {
    const temp = backup.value
    const filteredPlaces = temp.filter((place) => {
        return (
        place.title.toLowerCase().includes(updatedValue.toLowerCase()) ||
        place.description.toLowerCase().includes(updatedValue.toLowerCase())
        );
    });
    places.value = filteredPlaces;
}

watch(search, (updatedValue) => {
 searchPlace(updatedValue)
});


</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
         <div style="display: flex; justify-content: center;">
            <h3>Places</h3>
        </div> <br/>
        <div style="display: flex; justify-content: center;">
        <input class="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" v-model="search"/>
        </div>
        <Spinner v-if="spinner" />
        <div class="row" v-else>
            <div class="card card-item" v-for="place in places" :key="place.id">
            <img :src="getImageUrl(place.image_url)" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">
                    <strong> {{ place.title }} </strong><br/>
                    {{ place.description.slice(0,100) }}
                </p>
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
    background-color: #80162B;
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