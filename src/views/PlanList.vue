<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import PlanServices from "../services/PlanServices.js";
import { ref } from "vue";
import Spinner from "../components/Spinner.vue";
import { getImageUrl } from "../global.js";


const plans = ref([]);
const spinner = ref(true);

onMounted(async () => {
  await getPlans();
  spinner.value = false;
});

async function getPlans() {
  await PlanServices.getPlans()
    .then((response) => {
      plans.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getPlanUrl = (id)=>{
    return "/plan/"+id
}


</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
         <div style="display: flex; justify-content: center;">
            <h3>Plans</h3>
        </div> <br/>
            <Spinner v-if="spinner" />
            <div class="row" v-else>
                <div class="card card-item" v-for="plan in plans" :key="plan.id">
                <img :src="getImageUrl(plan.image_url)" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">{{ plan.description }}</p>
                </div>
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
a:hover {
    color:black;
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
</style>