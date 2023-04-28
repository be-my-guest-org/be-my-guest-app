import axios from "axios";
import { Event } from "../models/models";
import EnvVars from "../../dev_env";
import { axiosClient } from "./axiosClient";

class EventService {

  private token: string;

  constructor(token: string) {
    this.token = token;
  }

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
    return axiosClient(this.token).get("/events");
  }

  get(id: string) {
    return axios.get(`/events/${id}`);
  }

  create(data: Event) {
    return axios.post("/events", data);
  }

  update(id: string, data: Event) {
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

export default EventService;