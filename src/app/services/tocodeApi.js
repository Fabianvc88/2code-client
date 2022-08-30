import axios from "axios";

export const URL = "http://localhost:5000/api";

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

export async function fetchUserDataByEmail(email) {
  try {
    const response = await axios.post(URL + "/user/check", {
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id) {
  try {
    const response = await axios.get(URL + "/user/" + id);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function updateUserById(id, user) {
  try {
    const response = await axios.put(URL + "/user/" + id, user);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteUserById(id) {
  try {
    const response = await axios.delete(URL + "/user/" + id);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getUserSubmissions(id) {
  try {
    const response = await axios.get(URL + "/submission/all/" + id);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getAllActiveProblemsOrderByProperty(property) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/problem?property=" + property
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

/*export async function fetchAdminUserTable(){
    let user;
    try {
      user = await getUserDataFromDB(currentUser.email);
      setFirstname(user.firstname);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/problems",
        {
          id: user.id,
        }
      );
      setTableData(response.data);
    } catch (err) {
      console.error(err);
    }
  }
}*/
