import { ThemeProvider } from "theme-ui";
import theme from "./../../theme";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "../../components/accountBox/LoginForm";
import SignupForm from "../../components/accountBox/SignupForm";
import img1 from "../../assets/img/log.svg";
import img2 from "../../assets/img/register.svg";
import classes from "./loginStyles.module.css";
import Head from "next/head";
function AccountBox() {


	const [active, setActive] = useState(false);

	const signInClick = () => {
		setActive(false);
	};
	const signUpClick = () => {
		setActive(true);
	};
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>
					{active ? "Signup" : "Login"} - Task Scheduler
				</title>
			</Head>
			<div
				className={
					active
						? classes.container + " " + classes.signUpMode
						: classes.container
				}
			>
				<Link href="/">
					<a
						style={{
							position: "absolute",
							top: 20,
							right: 40,
							fontSize: "40px",
							zIndex: 20,
							color: "white",
							"&:hover": {
								color: "black",
								cursor: "pointer",
							},
						}}
					>
						<i className="fas fa-arrow-left" />
					</a>
				</Link>
				<div className={classes.formsContainer}>
					<div className={classes.signinSignup}>
						{/* Sign in */}
						<LoginForm isActive={!active} />
						{/* Sign up*/}
						<SignupForm isActive={active} />
					</div>
				</div>

				<div className={classes.panelsContainer}>
					<div className={classes.panel + " " + classes.leftPanel}>
						<div className={classes.content}>
							<h3>New here ?</h3>
							<p>
								Fill a simple form and if you are a normal user ask the selected manager to approve you in the team.
							</p>
							<button
								className={
									classes.btn + " " + classes.transparent
								}
								onClick={signUpClick}
							>
								Sign up
							</button>
						</div>
						< Image src={img1} className={classes.image} alt="" />
					</div>
					<div className={classes.panel + " " + classes.rightPanel}>
						<div className={classes.content}>
							<h3>One of us ?</h3>
							<p>
								Login using the credentials you made and see the tasks for you
							</p>
							<button
								className={
									classes.btn + " " + classes.transparent
								}
								onClick={signInClick}
							>
								Sign in
							</button>
						</div>
						<Image src={img2} className={classes.image} alt="" />
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default AccountBox;
