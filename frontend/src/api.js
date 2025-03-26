import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllCards = () => axios.get(`${API_URL}/get-all-cards`);
export const getCardById = (id) => axios.get(`${API_URL}/get-card/${id}`);
export const addCard = (card) => axios.post(`${API_URL}/add-card`, card);
export const updateCard = (id, card) => axios.put(`${API_URL}/update-card/${id}`, card);
export const pupdateCard = (id, card) => axios.patch(`${API_URL}/pupdate-card/${id}`, card);
export const deleteCard = (id) => axios.delete(`${API_URL}/delete-card/${id}`);