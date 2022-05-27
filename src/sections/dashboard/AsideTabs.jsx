/* eslint-disable react/jsx-key */
import { useEffect, useState, useContext } from "react";
import { Box, Flex, Heading, IconButton, Image } from "theme-ui";
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media";
import { UserContext } from "../../contexts/user/userContext";
import { useRouter } from "next/dist/client/router";

const styles = {
  section: {
    position: "relative",
    mt: ["8vmin", "8vmin", "8vmin", "20vmin"],
    width: "100%",
  },
  imgBox: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    mr: 10,
    overflow: "hidden",
  },
  name: {
    color: "secondary",
    fontSize: ["1.6em", "1.6em", "2em", "1.5em", "1.8em"],
    fontFamily: "circular",
  },
  accountType: {
    color: "black",
    fontSize: ["1em", "1em", "1em", "1em"],
    fontFamily: "roboto",
    fontWeight: 300,
  },
  tabsContainer: {
    mt: [0, 0, 0, 20],
    position: ["absolute", "absolute", "absolute", "static"],
    width: ["90%", "90%", "90%", "100%"],
    borderRadius: [10, 10, 10, 0],
    overflow: ["hidden", "hidden", "hidden", "unset"],
    backgroundColor: ["white", "white", "white", "transparent"],
    zIndex: 2,
    boxShadow: [
      "6px 9px 20px rgba(0 0 0 / .2)",
      "6px 9px 20px rgba(0 0 0 / .2)",
      "6px 9px 20px rgba(0 0 0 / .2)",
      "none",
    ],
    left: 0,
    right: 0,
    mx: "auto",
  },
  tab: {
    py: 15,
    px: [20, 20, 20, 20, 40],
    alignItems: "center",
    cursor: "pointer",
  },
  title: {
    fontSize: [20, 20, 20, 20, 25],
    fontWeight: 300,
    fontColor: "#000",
    ml: 10,
  },
  rotateIcon: {
    transform: "rotate(180deg)",
  },
};

const AsideTabs = ({ data: { tabs }, selectedTab, setSelectedTab }) => {
    const router = useRouter();
    const { user, signOut, loading } = useContext(UserContext);
    useEffect(() => {
		if (!loading && !user) {
			router.replace("/login");
		}
	}, [user, router, loading]);

  const [showTabs, setShowTabs] = useState(false);
  const breakpoint = useBreakpointIndex();

  const selectTabsProps = {
    tabs,
    selectedTab,
    setShowTabs,
    showTabs,
  };

  const onTabClick = (title) => {
    setSelectedTab(title);
    setShowTabs((boolState) => !boolState);
  };

  return (
    <Box sx={styles.section}>
      {useResponsiveValue([
        <SelectTab {...selectTabsProps} />,
        <SelectTab {...selectTabsProps} />,
        <SelectTab {...selectTabsProps} />,
        <Flex pl={[20, 20, 20, 20, 40]}>
          <Box sx={styles.imgBox}>
            <Image src="/img/man.png" alt="profile image" />
          </Box>
          <Flex
            sx={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Heading sx={styles.name}> Hello {user?.name} </Heading>
          </Flex>
        </Flex>,
      ])}
      <Box
        sx={{
          ...styles.tabsContainer,
          display: breakpoint <= 2 ? (showTabs ? "block" : "none") : "block",
        }}
      >
        {tabs.map((tab, index) => {
          return (
            <Flex
              key={index + tab.title}
              sx={{
                ...styles.tab,
                backgroundColor:
                  selectedTab === tab.title ? "#c8e6c9" : "transparent",
              }}
              onClick={() => onTabClick(tab.title)}
            >
              <Heading
                sx={{
                  ...styles.title,
                  color: selectedTab === tab.title ? "#512da8" : "black",
                }}
              >
                {tab.title}
              </Heading>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

const SelectTab = ({ tabs, selectedTab, setShowTabs, showTabs }) => {
  return (
    <Flex sx={{ justifyContent: "space-between", alignItems: "center", p: 20 }}>
      <Flex sx={{ ...styles.tab, px: 0, py: 0 }}>
        <Heading sx={{ ...styles.title, fontSize: "1.6em" }}>
          {tabs.title}
        </Heading>
      </Flex>
      <IconButton onClick={() => setShowTabs((boolState) => !boolState)}>
        <Image
          src="/img/arrowDown.svg"
          alt="Arrow Down"
          sx={{
            height: 50,
            transition: ".2s",
            transform: showTabs ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </IconButton>
    </Flex>
  );
};

export default AsideTabs;
