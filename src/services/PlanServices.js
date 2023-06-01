import apiClient from "./services";

export default {
  getPlans() {
    return apiClient.get("itenararies");
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
