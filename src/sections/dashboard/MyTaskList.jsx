/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "theme-ui";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../contexts/user/userContext";
import { GET_TASK_BY_USER_ID, MARK_AS_DONE } from "../../constants/apiUrls";
import { toast } from 'react-toastify';
import axios from "axios";
const styles = {
  container: {
    alignItems: "center",
    pt: "100px",
  },
  button: {
    color: "white",
    backgroundColor: "#43a047",
  },
};

const RowButton = ({ rowParams }) => {
  return (
    <Button sx={styles.button} onClick={() => markAsDone(rowParams.row.id)}>
      Mark Done
    </Button>
  );
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
    field: "description",
    headerName: "description",
    flex: 1,
  },
  {
    field: "deadLine",
    headerName: "Deadline",
    width: 200,
  },
  {
    field: "buffer",
    headerName: "Buffer (hrs)",
    width: 150,
  },
  {
    field: "length",
    headerName: "Length (hrs)",
    width: 200,
  },
  {
    field: "done",
    headerName: "Task Completed",
    width: 250,
  },
  {
    field: "active",
    headerName: "Task Active",
    width: 150,
  },
  {
    field: "active",
    headerName: "Mark Complete",
    flex: 1,
    disableClickEventBubbling: true,
    renderCell: (params) => <RowButton rowParams={params} />,
  },
];

const markAsDone = (taskId) => {
  console.log(taskId);
  const markTaskComplete = async (data) => {
    let api = MARK_AS_DONE;
    try {
      const url = `${api}`;
      const response = await axios.post(
        url,
        {
          taskId: taskId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.code === "00" && response.data.tasks) {
          toast.success("Task Completed !" ,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            progress: undefined,
            });
        }
        return;
      }
    } catch (err) {
     
      console.log(err);
    }
  };
  markTaskComplete()
};

const MyTaskList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { user, signOut, loading } = useContext(UserContext);
  const router = useRouter();
  const [fTasks, setFtasks] = useState([]);
  const idArr =[];
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, router, loading]);

  const getTaskByUserId = async (data) => {
    let api = GET_TASK_BY_USER_ID;
    try {
      setIsFetching(true);
      const url = `${api}`;
      const response = await axios.post(
        url,
        {
          userId: user?._id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.code === "00" && response.data.tasks) {
          setFtasks([...response.data.tasks]);
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
    getTaskByUserId();
  }, []);
  if (fTasks) {
    for (let i = 0; i < fTasks.length; i++) {
      idArr.push({...fTasks[i],id:fTasks[i]._id})
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
    </Box>
  );
};

export default MyTaskList;
