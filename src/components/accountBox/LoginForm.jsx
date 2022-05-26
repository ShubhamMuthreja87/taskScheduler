import axios from "axios";

import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user/userContext";
import classes from "./loginStyles.module.css";
import { useForm } from "react-hook-form";
import { Spinner, Text } from "@theme-ui/components";
import validator from "validator";
import { LOGIN_API_USER, LOGIN_API_MANAGER } from "../../constants/apiUrls";
import { toast } from 'react-toastify';

const LoginForm = ({}) => {
  const { signIn } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();
  const [userType, setUserType] = useState("User");

  function selectUserType(input) {
    setUserType(input.target.value);
  }

  const loginUser = async (data) => {
	  let api="";
	  userType==="User" ? api = LOGIN_API_USER : api = LOGIN_API_MANAGER
    try {
      const url = `${api}`;
      const response = await axios.post(
        url,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
	  if (response.status === 200) {
		if (response.data.code === "00" && response.data.user) {
		  signIn(response.data.user);
		  toast.success("Logged In !" ,{
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			progress: undefined,
			});
		} else {
		  setError("unknown", {
			message: response.data.message,
		  });
		}
		return;
	  } else {
		console.log(response);
		return;
	  }
    } catch (err) {
      if (err.response?.data?.error?.body?.details) {
        err.response?.data?.error?.body?.details?.forEach((e) => {
          setError(e.context.key, {
            message: e.message,
          });
        });
      } else if (err.response?.data?.message) {
        setError("unknown", {
          message: err.response?.data.message,
        });
      } else {
        setError("unknown", {
          message: err?.message || "An error occured",
        });
      }
    }
  };

  return (
    <>
      <form
        className={classes.signInForm + " " + classes.form}
        onSubmit={(e) => {
          clearErrors("unknown");
          handleSubmit(loginUser)(e);
        }}
      >
        <h2 className={classes.title}>{"Client "}Sign in </h2>
        <div>
          <label className={classes.labels}> I am a </label>
          <input
            type="radio"
            id="manager"
            name="userType"
            value="Manager"
            {...register("type")}
            onChange={selectUserType}
          />
          <label className={classes.labels} htmlFor="manager">
            {" "}
            Manager
          </label>
          <input
            type="radio"
            id="user"
            name="userType"
            value="User"
            defaultChecked
            {...register("type")}
            onChange={selectUserType}
          />
          <label className={classes.labels} htmlFor="user">
            {" "}
            User
          </label>
          <br />
        </div>
        <div className={classes.inputField}>
          <i className="fas fa-user" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Please enter your email",
              validate: (v) => validator.isEmail(v) || "Enter a valid email",
            })}
          />
        </div>
        {errors?.email && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.email.message}
          </Text>
        )}
        <div className={classes.inputField}>
          <i className="fas fa-lock" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please enter your password",
            })}
          />
        </div>
        {errors?.password && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.password.message}
          </Text>
        )}
        {errors?.unknown && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.unknown.message}
          </Text>
        )}

        <button
          type="submit"
          className={classes.btn + " " + classes.solid}
          style={{
            color: "black",
            fontWeight: "bold",
          }}
        >
          {isSubmitting && <Spinner size={16} color={"white"} sx={{ mr: 1 }} />}
          <span>Login</span>
        </button>
      </form>
    </>
  );
};

export default LoginForm;
