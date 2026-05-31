import api from "./api";

export const eventService = {
  async createEvent(payload) {
    const { data } = await api.post("/events", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  async getMyEvents(params = {}) {
    const { data } = await api.get("/my-events", { params });
    return data.data;
  },

  async getPublicEvents(params = {}) {
    const { data } = await api.get("/events", {
      params,
      skipAuth: true,
    });

    return data.data;
  },

  async getEvent(id) {
    const { data } = await api.get(`/events/${id}`, { skipAuth: true });
    return data.data;
  },

  async getAdminEvents(params = {}) {
    const { data } = await api.get("/admin/events", { params });
    return data.data;
  },

  async certifyEvent(id) {
    const { data } = await api.post(`/admin/events/${id}/certify`);
    return data;
  },

  async publishEvent(id) {
    const { data } = await api.post(`/admin/events/${id}/publish`);
    return data;
  },

  async rejectEvent(id) {
    const { data } = await api.post(`/admin/events/${id}/reject`);
    return data;
  },
};
