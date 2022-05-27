/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "theme-ui";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../contexts/user/userContext";
import { GET_UNAPPROVED_LIST, MARK_AS_APPROVED } from "../../constants/apiUrls";
import { toast } from "react-toastify";
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
    <Button sx={styles.button} onClick={() => markAsApproved(rowParams.row.id)}>
      Mark Approved
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
  {
    field: "active",
    headerName: "Mark Approved",
    flex: 1,
    disableClickEventBubbling: true,
    renderCell: (params) => <RowButton rowParams={params} />,
  },
];

const markAsApproved = (userId) => {
  console.log(userId);
  const markUserAsApproved = async (data) => {
    let api = MARK_AS_APPROVED;
    try {
      const url = `${api}`;
      const response = await axios.post(
        url,
        {
          userId
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.code === "00" && response.data.user) {
          toast.success("User Approved !", {
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
  markUserAsApproved();
};

const Approve = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { user, signOut, loading } = useContext(UserContext);
  const router = useRouter();
  const [fusers, setFusers] = useState([]);
  const idArr =[];
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, router, loading]);

  const getUsersByManagerId = async (data) => {
  let api = GET_UNAPPROVED_LIST;
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
    idArr.push({...fusers[i],id:fusers[i]._id})
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

export default Approve;
