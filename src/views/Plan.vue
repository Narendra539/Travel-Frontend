<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getImageUrl,getPlanUrl,getPlanEditUrl } from "../global.js";
import PlanServices from "../services/PlanServices.js";
import BookingServices from "../services/BookingServices.js";
import Spinner from "../components/Spinner.vue";


const router = useRouter();
const planId = router.currentRoute.value.params.id;
const user = ref(null);
const spinner = ref(true);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const plan = ref({})

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  await getPlan();
  spinner.value = false;
});
async function bookPlanNow() {
    spinner.value = true;
    await BookingServices.addBooking({
        user_id: user.value.id,
        itenarary_id: plan.value.id,
    })
    .then((response) => {
        spinner.value = false;
        snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Booking is done successfully!";
    })
    .catch((error) => {
        console.log(error);
        spinner.value = false;
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = error.response.data.message;
    });
}
async function getPlan() {
  await PlanServices.getPlan(planId)
    .then((response) => {
      plan.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function deletePlan() {
    spinner.value = true;
    await PlanServices.deletePlan(planId)
    .then((response) => {
        spinner.value = false;
    })
    .catch((error) => {
      console.log(error);
        spinner.value = false;
    });
}

function closeSnackBar() {
  snackbar.value.value = false;
}

</script>

<template>
  <v-container>
        <Spinner v-if="spinner" />
      <div class="col-md-12 container elevation-5" v-else>
            <div class="row plan">
                <div class="col-md-12 image">
                    <img :src="getImageUrl(plan.image_url)" class="image-tag"/>
                </div>
                <div class="col-md-12">
                    <h3 class="title">{{ plan.title }}</h3><p class="rating"> (Rating {{ plan.rating }})</p> <br/>
                    <p class="col-md-12">{{ plan.description }}</p>
                    <strong>This Plan starts from {{ plan.start_date.slice(0,10) }}, ends on {{ plan.end_date.slice(0,10) }}. </strong> <br/>
                    <button type="button" class="btn btn-success book-button" v-if="user != null" @click="bookPlanNow()" >Book Now</button>
                </div>
            </div>
            <div class="settings" v-if="user != null && user.role != 'customer'">
                <a class="btn btn-warning button" :href="getPlanEditUrl(plan.id)">Edit</a>
                <button class="btn btn-primary button" @click="deletePlan()">
                    Delete
                </button>
            </div>
            <div v-for="(day,index) in plan.day" :key="index" class="days">
                <div class="day">
                    <h5>Day-{{ day.day_index}}</h5>
                    <p> {{ day.description }} </p>
                </div>
            </div>

      </div>
       <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<style scoped>

.title,.rating {
    margin-bottom: 8px;
}
.container {
    background: white;
    padding-bottom: 30px;
}
.image {
    margin-bottom: 20px; 
    display: flex;
    justify-content: center;
}
.plan {
    margin-top:20px;
    padding:50px;
}
.image-tag {
    width:60%;max-height:500px;
}
.days {
  width:70%;
  margin-left: 55px;
}
.day {
  width: 100%;
}
.btn {
    color: white;
    background-color: #80162B;
}
.book-button {
    margin-top: 20px;
}
.settings {
    display:flex;
    align-content: flex-end;
    margin-left:auto;
    margin-left: 20px;
    margin-left: 50px;
    margin-bottom: 20px;
}
</style>