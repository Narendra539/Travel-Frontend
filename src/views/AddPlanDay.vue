<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PlanServices from "../services/PlanServices.js";
import Spinner from "../components/Spinner.vue";
import DayServices from "../services/DayServices.js";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const day = ref({
  day_index: "",
  description: "",
  itenarary_id: "",
});
const plans = ref({});
const spinner = ref(true);
const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

onMounted(async () => {
  await getPlans();
  spinner.value = false;
});

function closeSnackBar() {
  snackbar.value.value = false;
}

async function getPlans() {
  await PlanServices.getPlans()
    .then((response) => {
      plans.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function addDay() {
  spinner.value = true;
  await DayServices.addDay(day.value)
    .then((response) => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Day created successfully!";
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

async function validateAndAddDay() {
  if (!day.value.day_index) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Please enter a day!";
    return;
  } else if(!day.value.itenarary_id) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Please select the Itenarary!";
    return;
  }

await addDay();
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Add Day </v-card-title>
        <Spinner v-if="spinner" />
        <v-card-text v-else>
          <div class="mb-3">
            <label for="title" class="form-label">Day</label>
            <input type="text" class="form-control form-control-lg" id="dayInput" v-model="day.day_index" placeholder="Enter Day" required>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control form-control-lg" id="description" rows="5" v-model="day.description"></textarea>
          </div>

          <div class="mb-3">
            <label for="cost" class="form-label">Itinerary</label>
            <select class="form-control form-control-lg" id="dropdown" v-model="day.itenarary_id">
              <option value="">select Itinerary</option>
              <option v-for="plan in plans" :key="plan.id" :value="plan.id"> {{plan.id}}.{{plan.title}}</option>
            </select>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="validateAndAddDay()">Add</v-btn>
        </v-card-actions>
      </v-card>
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
    </div>
  </v-container>
</template>
