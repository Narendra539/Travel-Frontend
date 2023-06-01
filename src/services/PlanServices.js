import apiClient from "./services";

export default {
  getPlans(queryParams) {
    return apiClient.get("itenararies", {
      params: queryParams,
    });
  },
  getPlan(id) {
    return apiClient.get("itenararies/" + id);
  },
  addPlan(plan) {
    return apiClient.post("itenararies", plan);
  },
  updatePlan(plan) {
    return apiClient.put("itenararies/" + plan.id, plan);
  },
  deletePlan(planId) {
    return apiClient.delete("itenararies/" + planId);
  },
};