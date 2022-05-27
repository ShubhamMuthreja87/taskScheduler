import React, { useRef, useState } from "react";

import Image from "next/image";
import { Container, Box, Heading, Text, Button } from "theme-ui";
import BannerImage from "../assets/taskbg.jpg";
import Link from "next/link";

const BANNER_DATA = {
  title: "Task Scheduler Demo",
  text: "Welcome to a demo of task scheduler, please create an account if you don't have one. You can choose to be either a manager or an employee. Employee needs to select a manager in order to create an account. Manager needs to approve the employee in the team before any tasks can be alloted.",
  button: {
    link: "#",
    label: "Login",
  },
  bannerImage: BannerImage,
};

// const swipeStyle = {
// 	color: 'white',
// 	backgroundColor: 'black',
// 	fontSize: '64px',
// 	width: '100vh',
// 	height: '100vh',
// 	display: 'Flex',
// 	justifyContent: 'center',
// 	alignItems: 'center'
// };

const Banner = () => {
  const { title, text, button, videoBtn, bannerImage } = BANNER_DATA;
  const handleClick = (e) => {
    e.preventDefault();
  };
  function loginClick() {}
  return (
    <React.Fragment>
      <Box as="section" id="home" sx={styles.section}>
        <Container sx={styles.container}>
          <Box sx={styles.content}>
            <Heading as="h1">{title}</Heading>
            <Text as="p">{text}</Text>
            <Box sx={styles.btnWrap}>
              <Link href="/login" path="/login">
                <Button id="track" sx={styles.btn} onClick={() => loginClick}>
                  {button.label}
                </Button>
              </Link>
            </Box>
          </Box>

          <Box sx={styles.sectionImage}>
            <Image
              src={bannerImage}
              alt="Banner Mockup"
              width={740}
              height={442}
            />
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Banner;

const styles = {
  section: {
    display: "block",
    scrollBehaviour: "smooth",
    backgroundColor: "background",
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    // pt: ["115px", null, null, "140px", "150px", "170px", "185px"],
    // pb: ["115px", null, null, "140px", "150px", "170px", "185px"],
  },
  container: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    pt: "200px",
    flexDirection: ["column", null, null, "row"],
  },
  content: {
    maxWidth: ["100%", null, null, "355px", "460px", "545px", null, "590px"],
    textAlign: ["center", null, null, "left"],
    h1: {
      fontSize: ["28px", "32px", null, "34px", "40px", "48px", "54px", "58px"],
      lineHeight: [1.4, null, null, 1.35],
      color: "heading",
      fontFamily: "archivo",
      letterSpacing: "-1.5px",
      fontWeight: "body",
      mx: ["0", null, null, "auto", "0"],
      // textAlign: "center",
    },
    p: {
      fontSize: ["15px", null, null, null, "16px", "17px"],
      lineHeight: [1.85, null, 1.9, null, 2, 2.47],
      color: "text",
      mt: [3, null, null, "18px"],
      pr: [0, null, null, null, null, null, null, "50px"],
    },
  },
  btnWrap: {
    display: "flex",
    alignItems: "center",
    mt: ["25px", null, null, "30px", "35px", "50px"],
    justifyContent: ["center", null, null, "center"],
  },
  btn: {
    backgroundColor: "text",
    borderRadius: "7px",
    lineHeight: 1,
    fontSize: ["13px", "14px", "15px"],
    padding: ["14px 20px 13px", "14px 25px 13px", "17px 30px 15px"],
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    textTransform: "uppercase",
    color: "background",
    transition: "all 300ms ease",
    "&:hover": {
      opacity: 0.8,
    },
  },

  sectionImage: {
    overflow: "hidden",
    perspective: "1px",
    borderRadius: "50px",
    mt: ["40px", null, null, 0],
    pl: [0, null, null, "30px", 0],
    display: "flex",
    justifyContent: "flex-end",

    position: "relative",
    right: ["auto", null, null, null, "-10px", "-50px", "-70px"],
    width: [
      null,
      null,
      null,
      "calc(100% - 355px)",
      "calc(100% - 460px)",
      "calc(100% - 545px)",
      null,
      "calc(100% - 590px)",
    ],
    height: ["100%", "500px"],
    textAlign: ["center", null],
  },
};
