import API from "./api"; // Import cái API bạn vừa sửa ở Bước 2

export const forgotPassword = async (email) => {
  // Vì baseURL đã có /api, ở đây ta gọi thêm /auth/forgotpassword
  const res = await API.post("/auth/forgotpassword", { email });
  return res.data;
};

export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

