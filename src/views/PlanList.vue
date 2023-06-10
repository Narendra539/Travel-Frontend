<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import PlanServices from "../services/PlanServices.js";
import { ref } from "vue";
import Spinner from "../components/Spinner.vue";
import { getImageUrl,getPlanUrl } from "../global.js";


const router = useRouter();
const plans = ref([]);
const spinner = ref(true);
const key = ref(router.currentRoute.value.query.key);
const start = ref(router.currentRoute.value.query.start);
const end = ref(router.currentRoute.value.query.end);
const from = ref(router.currentRoute.value.query.from);
const to = ref(router.currentRoute.value.query.to);
const user = ref(null);

onMounted(async () => {
    user.value = JSON.parse(localStorage.getItem("user"));
    await getPlans();
    spinner.value = false;
});

async function getPlans() {
  await PlanServices.getPlans({ key:key.value,from:from.value,to:to.value,start:start.value,end:end.value})
    .then((response) => {
      plans.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
         <div style="display: flex; justify-content: center;">
            <h3>Itineraries</h3>
            <a class="btn btn-warning add" href="/travel-frontend/addplan" v-if="user?.isAdmin && user.isAdmin != 0">Add Itinerary</a>
        </div> <br/>
            <Spinner v-if="spinner" />
            <div class="row" v-else>
                <div class="card card-item" v-for="plan in plans" :key="plan.id">
                <a :href="getPlanUrl(plan.id)">
                    <img :src="getImageUrl(plan.image_url)" class="card-img-top" alt="..."/>
                    <div class="card-body">
                    <strong> {{ plan.title }} </strong><br/>
                    {{ plan.description.slice(0,100) }}                
                    </div>
                </a>
                </div>
            </div>
      </div><br/>
  </v-container>
</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-img {
    border-radius: 7px;
    margin-top: 10px;
}
.card-title {
    margin-top: 10px;
}
a {
    text-decoration: none;
    color: black;
}
.plan {
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

.add {
    margin-left:20px;
}
</style>