import axios from "./axios";
import { getHeaders, uploadHeaders } from "./axios";

export const addCompany = (data) =>
  axios.post("/api/dataManager/company", data, uploadHeaders());

export const getCompany = (page, query) =>
  axios.get(`/api/dataManager/company/${page}?page=${page}&query=${query}`, getHeaders());

export const editCompany = (id, data) =>
  axios.put(`/api/dataManager/company/${id}`, data, uploadHeaders());

export const deleteCompany = (id) =>
  axios.delete(`/api/dataManager/company/${id}`, getHeaders());