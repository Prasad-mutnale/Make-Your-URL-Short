import React from "react";
import "./Signin.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";

const Signin = () => {
  const [setUser, setUserdata] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  console.log({setUser});

  const setData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserdata((prev) => {
      return { ...prev, [name]: value };
    });
  };






  const handleSubmit = async(event)=>{
	event.preventDefault();

  if(setUser.username!="" && setUser.password!= "")
  {
    const result = await axios.post(
      'http://localhost:8001/user/signin',
		{email:setUser.username,password:setUser.password},
        ).then(response => {
            console.log("Success==> ", response.data.data);
            if(response.status=== 200)
            {
              localStorage.setItem("token", response.data.data)
              alert("Logged In successfully")
              navigate('/home');
            }
        })
        .catch(error => {
            console.log("Error===>", error.response.data.error);
            if(error.response.status!==200)
            {
              alert( error.response.data.error)
            }
        })
      }else{
        alert("Please enter all fields correctly");
        window.location.reload();
      }


        // console.log("Result=====>" ,res.data)
  }

  

  return (
    <>
      <main className="signin-main">
        <div className="main-container">
          <section  style={{border:"2px solid #5795FA"}}className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Sign In</h1>
              {/* <p className="text text-normal">New user? <span><a href="#" className="text text-links">Create an account</a></span> */}
              {/* </p> */}
              <p>Hello Again, Let's continue to track your sleep.</p>
            </div>
            <form name="signin" className="form">
              <div className="input-control">
                <label className="input-label" hidden>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="Email Id"
                  name="username"
                  value={setUser.username}
                  onChange={setData}
                  required
                />
              </div>
              <div className="input-control">
                <label className="input-label" hidden>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                  value={setUser.password}
                  onChange={setData}
                  required
                />
              </div>
              <div className="input-control">
                <a href="#" className="text text-links">
                  Forgot Password
                </a>
                <input
                  type="submit"
                  name="submit"
                  className="input-submit"
                  value="Sign In"
                  onClick={handleSubmit}
                  
                />
              </div>
            </form>
            <div className="striped">
              <span className="striped-line"></span>
              <span className="striped-text">Or</span>
              <span className="striped-line"></span>
            </div>
            <div className="method">
              <div className="method-control">
                <a href="/signup" className="method-action">
                  <span>Sign up</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Signin;
