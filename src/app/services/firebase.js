import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgKCrvyxpGa5k77O8NjREB7efCN_MZ6lI",
  authDomain: "code-ae2ab.firebaseapp.com",
  projectId: "code-ae2ab",
  storageBucket: "code-ae2ab.appspot.com",
  messagingSenderId: "527515741466",
  appId: "1:527515741466:web:2ace2c0bd75562eaa3d0a3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export function singUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      // TODO create user at server;
      return user;
    })
    .catch((error) => {
      console.log("error ", error.code, ": ", error.message);
      return null;
    });
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

/*export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);
  console.log("user is: ", currentUser?.email);
  return currentUser;
}*/
