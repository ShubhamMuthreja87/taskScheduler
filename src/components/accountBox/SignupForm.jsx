import { Spinner, Text } from "@theme-ui/components";
import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user/userContext";
import classes from "./loginStyles.module.css";
import validator from "validator";
import { useForm } from "react-hook-form";
import { SIGNUP_API } from "../../constants/apiUrls";

const SignupForm = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const { signIn } = useContext(UserContext);

  const submitUser = async (data) => {
    try {
      const response = await axios.post(
        `${SIGNUP_API}`,

        {
          email: data.email,
          password: data.password,
          name: data.name,
          phoneNo: data.phoneNo,
          code: parseInt(data.otp, 10),
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if (response.data.code === "00" && response.data.user) {
          signIn(response.data.user);
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
  const signupUser = async (data) => {
    submitUser(data);
  };

  return (
    <>
      <form
        className={classes.signUpForm + " " + classes.form}
        onSubmit={(e) => {
          clearErrors("unknown");
          handleSubmit(signupUser)(e);
        }}
      >
        <h2 className={classes.title}>Sign up</h2>
        <div className={classes.inputField}>
          <i className="fas fa-user" />
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: "Please enter your name",
            })}
          />
        </div>

        {errors?.name && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.name.message}
          </Text>
        )}
        <div className={classes.inputField}>
          <i className="fas fa-envelope" />
          <input
            type="text"
            placeholder="Email"
            inputMode="email"
            {...register("email", {
              required: "Please enter an email",
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
          <i className="fas fa-phone-alt" />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Contact Number"
            maxLength={10}
            {...register("phoneNo", {
              required: "Please enter your phone no.",
              maxLength: {
                message: "Enter a valid phone No.",
                value: 10,
              },
              minLength: {
                message: "Enter a valid phone No.",
                value: 10,
              },
              pattern: {
                value: "[0-9]{10}",
                message: "Enter a valid phone no.",
              },
            })}
          />
        </div>

        {errors?.phoneNo && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.phoneNo.message}
          </Text>
        )}

        <div className={classes.inputField}>
          <i className="fas fa-lock" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 8,
                message: "Password must be of atleast 8 characters",
              },
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
        <button type="submit" className={classes.btn}>
          {isSubmitting && <Spinner size={16} color={"white"} sx={{ mr: 1 }} />}
          <span>Sign up</span>
        </button>
      </form>
    </>
  );
};

export default SignupForm;
