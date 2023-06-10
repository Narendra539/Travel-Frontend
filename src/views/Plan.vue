<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getImageUrl,getPlanUrl,getPlanEditUrl } from "../global.js";
import PlanServices from "../services/PlanServices.js";
import BookingServices from "../services/BookingServices.js";
import Spinner from "../components/Spinner.vue";
import DayForPlan from "../components/DayForPlan.vue";


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
const bookingUser = ref({
  first_name:"",
  last_name: "",
  mobile: ""
})
const bookingUsers = ref([])

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
        users: bookingUsers.value
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
         snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Itenarary is delete successfully!";
        router.push({ name: "home" });
        spinner.value = false;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      spinner.value = false;
    });
}

function closeSnackBar() {
  snackbar.value.value = false;
}

const addUser = () => {
  if(bookingUser.value.first_name === "" ) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "First Name is empty!";
  } 
  else if(bookingUser.value.last_name === "" ) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Last Name is empty!";
  } else {
    bookingUsers.value.push(bookingUser.value);
    console.log(bookingUsers.value);
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = "Added "+bookingUser.value.first_name+ " successfully";
    bookingUser.value = {
        first_name:"",
        last_name: "",
        mobile: ""
      }
  }
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
                    <p class="col-md-12">{{ plan.description }}</p>
                    <strong>This Plan starts from {{ plan.start_date.slice(0,10) }}, ends on {{ plan.end_date.slice(0,10) }}. </strong> <br/>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingModal"  v-if="user.isAdmin == 0">
                      Book now
                    </button>
                </div>
            </div>
            <div class="settings"  v-if="user?.isAdmin && user.isAdmin != 0">
                <a class="btn btn-warning button" :href="getPlanEditUrl(plan.id)">Edit</a>
                <button class="btn btn-primary button" @click="deletePlan()">
                    Delete
                </button>
            </div>
            <div v-for="(day,index) in plan.day" :key="index" class="days">
                <DayForPlan :day="day" />
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
    <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="bookingModalLabel">Enter Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="first_name" class="form-label">First Name</label>
              <input type="text" class="form-control form-control-lg" id="first_name" v-model="bookingUser.first_name" />
            </div>
            <div class="mb-3">
              <label for="last_name" class="form-label">Last Name</label>
              <input type="text" class="form-control form-control-lg" id="last_name" v-model="bookingUser.last_name" />
            </div>
              <div class="mb-3">
              <label for="mobile" class="form-label">Mobile Number</label>
              <input type="number" class="form-control form-control-lg" id="mobile" v-model="bookingUser.mobile"/>
            </div>
              <button type="button" class="btn btn-primary" @click="addUser()">Add User</button>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="bookPlanNow()">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
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