import api from "./api";

export const eventService = {
  async createEvent(payload) {
    const { data } = await api.post("/organizer/events", payload);
    return data.data;
  },

  async updateEvent(id, payload) {
    const { data } = await api.patch(`/organizer/events/${id}`, payload);
    return data.data;
  },

  async getOrganizerEvent(id) {
    const { data } = await api.get(`/organizer/events/${id}`);
    return data.data;
  },

  async submitEvent(id) {
    const { data } = await api.post(`/organizer/events/${id}/submit`);
    return data.data;
  },

  async uploadImage(file) {
    const form = new FormData();
    form.append('image', file);
    const { data } = await api.post('/organizer/media', form);
    return data.data.url;
  },

  async getMyEvents(params = {}) {
    const { data } = await api.get("/organizer/events", { params });
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

  async reviewEvent(id, action, note = '') {
    const { data } = await api.post(`/admin/events/${id}/${action}`, { note });
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
