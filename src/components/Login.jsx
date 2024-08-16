import React, { useEffect, useState } from "react";
import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../sevice/FirebaseService";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    fetchAPI_User();
  }, []);

  const fetchAPI_User = async () => {
    try {
      const API_user = await fetchDocuments("users");
      setUsers(API_user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);
  //Lấy dữ liệu người dùng nhập vào fomr login
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const pass = formData.get("pass");

    const user = users.find(
      (element) => element.email == email &&  bcrypt.compare(element.pass, pass)    
    );

    if (user) {
      navigation("/home/0");
    } else {
      alert("Login Faill");
    }
  };

  return (
    <div className=" m-auto text-center login">
      <form onSubmit={handleLogin}>
        <h1>
          <b>LOGIN</b>
        </h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="pass"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
        <button type="submit" class="btn btn-primary ms-3">
          <a
            href="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </a>
        </button>
      </form>
    </div>
  );
}

export default Login;
