import React, { useEffect, useState } from "react";
import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../sevice/FirebaseService";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function Register(props) {
  const [users, setUsers] = useState([]);
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
  //navigation
  const navigation = useNavigate();
  //#region ADD USER
  const HandleRegister = async (e) => {
    e.preventDefault();
    //Lấy dữ liệu
    const formData = new FormData(e.target);
    const name = formData.get("name");
    console.log("name", name);
    const email = formData.get("email");
    console.log("email", email);
    const pass = formData.get("pass");
    console.log("pass", pass);
    const checkpass = formData.get("checkpass");
    
    const account = users.find(element => element.email == email);

    if(account) {
      alert("Gmail đã được sử dụng");
      return;
    }

    if (pass === checkpass) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);
      //Đổ dữ liệu vào firebase
      const newUser = {
        name: name,
        email: email,
        pass: hash,
      };
      await addDocument("users", newUser);
      navigation("/");
    } else {
      alert("nhập lại checkpass");
    }
  };
  return (
    <div className=" m-auto text-center login">
      <form onSubmit={HandleRegister}>
        <h1>
          <b>REGISTER</b>
        </h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Full name
          </label>
          <input
            type="texxt"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
          />
        </div>
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
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Check password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="checkpass"
          />
        </div>
        <button type="submit" class="btn btn-primary ms-3">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
