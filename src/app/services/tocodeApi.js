import axios from "axios";

export const URL = "http://localhost:5000/api";

// user

export async function fetchAllUsers() {
  try {
    const response = await axios.get(URL + "/user/all");
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

// export async function fetcUserDataFromDB(email) {
//   try {
//     const response = await axios.post(URL + "/user/check", {
//       email,
//     });
//     return response.data;
//   } catch (err) {
//     console.log("Couldn't get user data");
//     throw err;
//     //return null;
//   }
// }

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

export async function getAllUserCreatedProblems(id) {
  try {
    const response = await axios.post(URL + "/user/problems", {
      id,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

// admin

//TODO when doing own authentication modify this function to authenticate admin
export async function checkIsAdmin(email, password) {
  try {
    const response = await axios.post(URL + "/admin/signin", {
      email,
      password,
    });
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

// problem

export async function createProblem(problem) {
  try {
    const res = await axios.post(URL + "/problem", problem);
    //console.log("received: ", res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function editProblem(problemid, problem) {
  try {
    const response = await axios.put(URL + "/problem/" + problemid, problem);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getAllActiveProblemsOrderByProperty(authorid, property) {
  try {
    const response = await axios.get(
      URL + "/problem?authorid=" + authorid + "&property=" + property
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getProblemData(problemid) {
  try {
    const response = await axios.get(URL + "/problem/" + problemid);
    return response.data;
  } catch (err) {
    throw err;
  }
}

// submission

export async function getUserSubmissions(id) {
  try {
    const response = await axios.get(URL + "/submission/all/" + id);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getLatestUserSubmissionData(problemId, email) {
  try {
    const response = await axios.post(URL + "/submission/data", {
      problemId,
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function submitCodeForEvaluation(
  code,
  problemId,
  language,
  email
) {
  try {
    const response = await axios.post(URL + "/submission/run", {
      code,
      problemId,
      language,
      email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

// authentication
export async function createNewUser(email, firstname, lastname, password) {
  try {
    const response = await axios.post(URL + "/authentication/signup", {
      email,
      firstname,
      lastname,
      password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function login(email, password) {
  try {
    const response = await axios.post(URL + "/authentication/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
/*export async function getProblemData(problemid) {
  try {
    const response = await axios.get(URL + "/problem/" + problemid);
    return response.data;
  } catch (err) {
    throw err;
  }
}*/

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
