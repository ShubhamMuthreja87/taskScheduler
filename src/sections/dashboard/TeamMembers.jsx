/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "theme-ui";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../contexts/user/userContext";
import { GET_USER_BY_MANAGER_ID, CREATE_TASK } from "../../constants/apiUrls";
import { toast } from "react-toastify";
import { Spinner, Text } from "@theme-ui/components";
import axios from "axios";
import classes from "./loginStyles.module.css";
import validator from "validator";
import { useForm } from "react-hook-form";

const styles = {
  container: {
    pt: "100px",
  },
};

const columns = [
  {
    field: "_id",
    headerName: "UniqueId",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "email",
    flex: 1,
  },
  {
    field: "phoneNo",
    headerName: "Phone Number",
    width: 200,
  },
  {
    field: "workHrs",
    headerName: "Working Hours",
    width: 150,
  },
];

const TeamMembers = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const createTask = async (data) => {
    let api = CREATE_TASK;
    try {
      const response = await axios.post(
        `${api}`,
        {
          email: data.email,
          password: data.password,
          name: data.name,
          phoneNo: data.phoneNo,
          managerId: data.managerId,
          workHrs: data.workHrs,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if (response.data.code === "00" && response.data.user) {
          signIn(response.data.user);
          toast.success("Account Created !", {
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
  };

  const [isFetching, setIsFetching] = useState(false);
  const { user, signOut, loading } = useContext(UserContext);
  const router = useRouter();
  const [fusers, setFusers] = useState([]);
  const idArr = [];
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, router, loading]);

  const getUsersByManagerId = async (data) => {
    let api = GET_USER_BY_MANAGER_ID;
    try {
      setIsFetching(true);
      const url = `${api}`;
      const response = await axios.post(
        url,
        {
          managerId: user?._id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.code === "00" && response.data.users) {
          setFusers([...response.data.users]);
          setIsFetching(false);
        }
        return;
      }
    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getUsersByManagerId();
  }, []);
  if (fusers) {
    for (let i = 0; i < fusers.length; i++) {
      idArr.push({ ...fusers[i], id: fusers[i]._id });
    }
  }
  return (
    <Box sx={styles.container}>
      <DataGrid
        loading={isFetching}
        rows={idArr}
        columns={columns}
        autoHeight
        autoPageSize
      />
      <form
        className={classes.signUpForm + " " + classes.form}
        onSubmit={(e) => {
          clearErrors("unknown");
          handleSubmit(signupUser)(e);
        }}
      >
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
    </Box>
  );
};

export default TeamMembers;
