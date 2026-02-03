import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,

});

// --- PHẦN QUAN TRỌNG NHẤT: Tự động gắn Token ---
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Lấy token từ bộ nhớ
  if (token) {
    // Gắn vào Header: Authorization: Bearer <token>
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
// ----------------------------------------------

export default API;