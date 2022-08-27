import axios from "axios";

const URL = "http://localhost:5000/api";

export async function fetchAllUsers() {
  try {
    const response = await axios.get(URL + "/user/all");
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function isAdmin(email) {
  try {
    const response = await axios.post(URL + "/admin/check", {
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchUserData(email) {
  try {
    const response = await axios.post(URL + "/user/check", {
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
