import apiClient from "./services";

export default {
  getBookings() {
    return apiClient.get("bookings");
  },
  getBookingsOfUser(id) {
    return apiClient.get("bookings/user/"+id);
  },
  getBooking(id) {
    return apiClient.get("bookings/" + id);
  },
  addBooking(Booking) {
    return apiClient.post("bookings", Booking);
  },
  updateBooking(Booking) {
    return apiClient.put("bookings/" + Booking.id, Booking);
  },
  deleteBooking(BookingId) {
    return apiClient.delete("bookings/" + BookingId);
  },
};
