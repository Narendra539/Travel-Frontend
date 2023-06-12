import apiClient from "./services";

export default {
  addDay(day) {
    return apiClient.post("days", day);
  },
};