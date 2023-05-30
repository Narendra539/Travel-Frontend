import apiClient from "./services";

export default {
  getOrders() {
    return apiClient.get("orderhistory");
  },
  getOrdersOfUser() {
    return apiClient.get("/booked-by/"+id);
  },
  getOrder(id) {
    return apiClient.get("orderhistory/" + id);
  },
  addOrder(order) {
    return apiClient.post("orderhistory", order);
  },
  updateOrder(order) {
    return apiClient.put("orderhistory/" + order.id, order);
  },
  deleteOrder(orderId) {
    return apiClient.delete("orderhistory/" + orderId);
  },
};
