/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "theme-ui";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../contexts/user/userContext";
import { GET_USER_BY_MANAGER_ID } from "../../constants/apiUrls";

import axios from "axios";

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
    </Box>
  );
};

export default TeamMembers;
