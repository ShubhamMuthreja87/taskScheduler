/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner, Text } from "@theme-ui/components";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user/userContext";
import classes from "./loginStyles.module.css";
import validator from "validator";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import {
  SIGNUP_API_USER,
  SIGNUP_API_MANAGER,
  GET_MANAGER_LIST,
} from "../../constants/apiUrls";

const SignupForm = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const { signIn } = useContext(UserContext);

  const [userType, setUserType] = useState("User");
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    axios.get(GET_MANAGER_LIST).then((response) => {
      setManagerList([...response.data.managers]);
    });
  }, []);


  const submitUser = async (data) => {
    let api = "";
    if (userType === "User") {
      api = SIGNUP_API_USER;
      try {
        const response = await axios.post(
          `${api}`,
          {
            email: data.email,
            password: data.password,
            name: data.name,
            phoneNo: data.phoneNo,
            managerId:data.managerId,
            workHrs:data.workHrs
          },
          {
            withCredentials: true,
          }
        );
  
        if (response.status === 200) {
          if (response.data.code === "00" && response.data.user) {
            signIn(response.data.user);
            toast.success("Account Created !" ,{
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
    } else {
      api = SIGNUP_API_MANAGER;
      try {
        const response = await axios.post(
          `${api}`,
  
          {
            email: data.email,
            password: data.password,
            name: data.name,
            phoneNo: data.phoneNo
          },
          {
            withCredentials: true,
          }
        );
  
        if (response.status === 200) {
          if (response.data.code === "00" && response.data.user) {
            signIn(response.data.user);
            toast.success("Account Created !" ,{
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
    }
    try {
      const response = await axios.post(
        `${api}`,

        {
          email: data.email,
          password: data.password,
          name: data.name,
          phoneNo: data.phoneNo,
          managerId:data.managerId,
          workHrs:data.workHrs
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
  function selectUserType(input) {
    setUserType(input.target.value);
  }
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

        {userType === "Manager" ? (
          <></>
        ) : (
          <>
            <div className={classes.inputField}>
              <i className="fas fa-clock" />
              <input
                type="text"
                placeholder="Working Hours per week"
                inputMode="numeric"
                {...register("workHrs", {
                  required: "Please enter working hours per week",
                  max: {
                    value: 168,
                    message: "only 168 hours in a week",
                  },
                  valueAsNumber: true,
                })}
              />
            </div>

            {errors?.workHrs && (
              <Text
                style={{
                  color: "red",
                }}
              >
                {errors.workHrs.message}
              </Text>
            )}

            <div>
              <label className={classes.labels} htmlFor="manager">
                Choose a Manager :{" "}
              </label>

              <select
                name="manager"
                id="managerList"
                {...register("managerId", {
                  required: "Please select a manager",
                })}
              >
                {managerList.map((manager, index) => {
                
                  return (
                    <option
                      className={classes.labels}
                      key={index}
                      value={manager._id}
                    >
                      {manager.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
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
