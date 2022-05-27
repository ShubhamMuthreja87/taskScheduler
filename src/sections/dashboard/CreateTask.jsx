/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner, Text } from "@theme-ui/components";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user/userContext";
// import classes from "./loginStyles.module.css";
import validator from "validator";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { CREATE_TASK, GET_USER_BY_MANAGER_ID } from "../../constants/apiUrls";

const CreateTask = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const { user, signOut, loading } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, router, loading]);

  const [userList, setUserList] = useState([]);

  const getUsersByManagerId = async (data) => {
    let api = GET_USER_BY_MANAGER_ID;
    try {
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
          setUserList([...response.data.users]);
        }
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsersByManagerId();
  }, []);

  const submitTask = async (data) => {
    let api = CREATE_TASK;
    try {
      const response = await axios.post(
        `${api}`,
        {
          name: data.name,
          description: data.description,
          userId: data.userId,
          managerId: user?._id,
          deadLine:data.deadLine,
          buffer: data.buffer,
          length:data.length
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if (response.data.code === "00" && response.data.user) {
          signIn(response.data.user);
          toast.success("Task Created !", {
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
  const createTask = async (data) => {
    submitTask(data);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          clearErrors("unknown");
          handleSubmit(createTask)(e);
        }}
      >
        <h2>Create Task</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Please enter task name",
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
        <div>
          <input
            type="text"
            placeholder="Description"
            inputMode="textField"
            {...register("description", {
              required: "Please enter a description",
            })}
          />
        </div>

        {errors?.description && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.description.message}
          </Text>
        )}

        <div>
          <input
            type="date"
            inputMode="date"
            {...register("deadLine", {
              required: "Please select a date.",
            })}
          />
        </div>

        {errors?.deadLine && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.deadLine.message}
          </Text>
        )}

        <div>
          <input
            type="text"
            placeholder="Buffer Time"
            inputMode="numeric"
            {...register("buffer", {
              required: "Please add buffer time for the task",
              max: {
                value: 84,
                message: "only 84 hours for buffer with length of task",
              },
              valueAsNumber: true,
            })}
          />
        </div>

        {errors?.buffer && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.buffer.message}
          </Text>
        )}
        <div>
          <input
            type="text"
            placeholder="Length of task"
            inputMode="numeric"
            {...register("length", {
              required: "Please add length of the task",
              max: {
                value: 84,
                message: "only 84 hours with buffer in a week",
              },
              valueAsNumber: true,
            })}
          />
        </div>

        {errors?.length && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.length.message}
          </Text>
        )}
        <div>
          <label htmlFor="user">
            Choose a Team member to assign task to :{" "}
          </label>

          <select
            name="user"
            {...register("userId", {
              required: "Please select a user",
            })}
          >
            {userList.map((user, index) => {
              return (
                <option key={index} value={user._id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>

        {errors?.unknown && (
          <Text
            style={{
              color: "red",
            }}
          >
            {errors.unknown.message}
          </Text>
        )}
        <button type="submit">
          {isSubmitting && <Spinner size={16} color={"white"} sx={{ mr: 1 }} />}
          <span>Create Task</span>
        </button>
      </form>
    </>
  );
};

export default CreateTask;
