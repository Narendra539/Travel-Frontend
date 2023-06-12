<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import PlanServices from "../services/PlanServices.js";
import Spinner from "../components/Spinner.vue";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const plan = ref({
  title: "",
  description: "",
  image_url: "",
  place_to: "",
  start_date: "",
  end_date: "",
});
const isSpinner = ref(false);

onMounted(async () => {

});

function closeSnackBar() {
  snackbar.value.value = false;
}

async function addPlan() {
  if(plan.value.title === "") {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "Title is empty!";
  }
  else if(plan.value.description === "") {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "Description is empty!";
  }
  else if(plan.value.place_to === "") {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "Destination is empty!";
  }
  else if(plan.value.start_date === "") {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "Start date is empty!";
  }
  else if(plan.value.end_date === "") {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "End date is empty!";
  }
  else if(plan.value.image_url === "") {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "Image Url is empty!";
  }
  else {
    isSpinner.value = true
    await PlanServices.addPlan({ ...plan.value, category_id: 1})
        .then((response) => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Itenarary created successfully!";
            isSpinner.value = false
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
            isSpinner.value = false
        });
  }
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <div style="display:flex;" class="heading">
          <v-card-title class="headline mb-2">Add Itenarary </v-card-title>
          <v-btn variant="flat" color="primary" class="add" href="/travel-frontend/addplanday">Add Day</v-btn>
        </div>
        <Spinner v-if="isSpinner" />
        <v-card-text v-else>
          <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control form-control-lg" id="title" v-model="plan.title"/>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control form-control-lg" id="description" rows="5" v-model="plan.description"></textarea>
        </div>
          <div class="mb-3">
          <label for="start_date" class="form-label">Start Date</label>
          <input type="date" class="form-control form-control-lg" id="start_date" v-model="plan.start_date"/>
        </div>
        <div class="mb-3">
          <label for="end_date" class="form-label">End Date</label>
          <input type="date" class="form-control form-control-lg" id="end_date" v-model="plan.end_date"/>
        </div>
        <div class="mb-3">
          <label for="place_to" class="form-label">Destination</label>
          <input type="text" class="form-control form-control-lg" id="place_to" v-model="plan.place_to"/>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Image Path</label>
          <input type="text" class="form-control form-control-lg" id="image" v-model="plan.image_url"/>
        </div>     
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addPlan()">Add</v-btn>
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

<style scoped>
.add {
  margin-right: 20px;
  height: 40px;
  margin-top: 5px;
}
.heading {
    margin-top: 10px;
    justify-content: space-between;
}
</style>