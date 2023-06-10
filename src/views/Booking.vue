<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import BookingServices from "../services/BookingServices.js";
import { ref } from "vue";
import Spinner from "../components/Spinner.vue";
import { getImageUrl,getPlanUrl } from "../global.js";


const bookings = ref([]);
const spinner = ref(true);
const user = ref(null);
onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  await getBookings();
  spinner.value = false;
});

async function getBookings() {
  await BookingServices.getBookingsOfUser(user.value.id)
    .then((res) => {
      bookings.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
<v-container>
  <div class="container" style="margin-top: 20px">
    <div style="display: flex; justify-content: center;">
      <h3>Bookings</h3>
    </div>
    <br/>
    <Spinner v-if="spinner" />
    <div class="col-md-12 container elevation-4 bookings" v-else>
      <div v-for="(booking,index) in bookings" :key="booking.id">
        <div class="booking">
          <h4> {{index+1}}. Booked On <strong> {{ booking.createdAt.slice(0,10) }} </strong></h4>
          <div class="users" v-if="booking.bookingDetails.length != 0">
            <h5> Users Detail </h5>
            <div class="underline" />
            <div v-for="(user,index) in booking.bookingDetails" :key="index">
              <strong> User {{ index+1 }} </strong>
              <ul>
              <li v-if="user.firstName">First Name: {{ user.firstName }}</li>
              <li v-if="user.lastName">Last Name: {{ user.lastName }}</li>
              <li v-if="user.mobile">Mobile: {{ user.mobile }}</li>
              </ul>
            </div>
          </div>
          <p><a class="btn btn-warning" :href="getPlanUrl(booking.itenararyId)">Get Itinerary information</a></p>
        </div>
      </div>
    </div>
  </div>
  <br/>
</v-container>

</template>

<style scoped>

.btn {
    color: white;
    background-color: #80162B;
}
.bookings {
  padding: 30px;
}
.booking {
  margin-top: 30px;
  width:100%;
  border-bottom: 1px solid black;
  padding:15px;
  margin-left: 20px;
}
.users{
  margin-top: 20px;
  margin-bottom: 20px;
}
.underline {
  border-bottom: 2px solid black;
  width: 40%;
  margin-bottom: 10px;
}
</style>