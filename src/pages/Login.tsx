import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { MessageResponse } from "../types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
const Login = () => {
  const [login] = useLoginMutation();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const Loginhandler = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        dob: date,
        gender,
        role: "user",
        _id: user.uid,
      });
      if ("data" in res && res.data) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Signin Failed");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={Loginhandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
