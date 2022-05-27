import { useState , useEffect,useContext} from "react"
import { Box, Flex, Grid } from "theme-ui"
import AsideTabs from "./AsideTabs"
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../contexts/user/userContext";

import TeamMembers from "./TeamMembers";
import Tasks from "./Tasks";
import Approve from "./Approve";
import MyTaskList from "./MyTaskList";

const styles = {
    section: {
        // height: '1px', // Added this so that its immediate grid child adapts to its 100vh height.
        height: "100vh",
        width :"100vw",
        backgroundColor: "white"
    },
    grid: {
        width: "100%",
        height: "100%",
    },
    aside: {
        borderRight: [0, 0, 0, "2px solid"],
        borderColor: [null, null, null, "lightGray2"],
    }
}

const tabs = {
    tabs: [
        {
            title: "Team Members"
        }, 
        {
            
            title: "Tasks"
        }, 
        {
            
            title: "Add Task"
        },
        {
            
            title: "Add to team"
        },
    ],
}
const tabsUser ={
    tabs:[
        {
            title:"My Tasks"
        }
    ]
}

const Dashboard = () => {
  
   
    const { user, signOut, loading } = useContext(UserContext);
    const router = useRouter();
   
    useEffect(() => {
		if (!loading && !user) {
			router.replace("/login");
		}
	}, [user, router, loading]);

    const [selectedTab, setSelectedTab] = useState();
    return (
        <Box as="section" sx={styles.section}>
            <Grid columns={[0, 0, 0, "1fr 2.5fr"]} sx={styles.grid} gap={0}>
                <Flex as="aside" sx={styles.aside}>
                    <AsideTabs data={user?.userType==="user"?tabsUser:tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                </Flex>
                <Box px={[15, 15, 15, 40]} pb={40}>
              
                    {selectedTab === "Team Members" && <TeamMembers/>}
                    {selectedTab === "Tasks" && <Tasks/>}
                    {selectedTab === "Add to team" && <Approve/>}
                    {selectedTab === "My Tasks" && <MyTaskList/>}
                </Box>
            </Grid>
        </Box>
    )
}

export default Dashboard
