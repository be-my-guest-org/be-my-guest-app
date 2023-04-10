import axios from "axios";
import { Item } from "../models/models";
import EnvVars from "../dev_env";

class EventDataService {
  serverUrl: string = EnvVars.serverUrl;

  async getSum(add1: number, add2: number) {
    console.log("🚀 ~ add1 e 2", add1, add2)
    return (await axios.get(EnvVars.serverUrl)).data;
  }

  async loggaNelLoggerDeiPoveri(what: any) {
    console.log("🚀 ~ what", what);
    return (await axios.get("https://webhook.site/83cd7f14-9efa-4367-b0d6-922db5871d8e?url=" + what));
  }

  getAll() {
    return axios.get("/events");
  }

  get(id: string) {
    return axios.get(`/events/${id}`);
  }

  create(data: Item) {
    return axios.post("/events", data);
  }

  update(id: string, data: Item) {
    return axios.put(`/events/${id}`, data);
  }

  delete(id: string) {
    return axios.delete(`/events/${id}`);
  }

  deleteAll() {
    return axios.delete(`/events`);
  }

  findByTitle(title: string) {
    return axios.get(`/events?title=${title}`);
  }
}

export default new EventDataService();