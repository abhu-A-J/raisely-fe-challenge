import React ,{useEffect, useState} from 'react';

/* Styling */
import "./index.scss";

/*Child Components */
import FormInput from "../FormInput";
import Button from "../Button";

/* Utilities */
import {validateName,validateEmail} from "../../utils/validation"

/* Main Component */
const SignUpForm=()=>{

	/* State for form data */
	const [formData,setFormData]=useState({
		firstName:'',
		lastName:'',
		email:'',
		password:''
	})

	/* State for form data error */
	const [formDataError,setFormDataError]=useState({
		firstNameError:false,
		lastNameError:false,
		emailError:false,
		passwordError:false
	})

	/* State for form data error message */
	const [formErrorMessage,setFormErrorMessage]=useState({
		firstNameMessage:"Oops! That doesn't seem right as first name.",
		lastNameMessage:"Oops! That doesn't seem right as last name.",
		emailMessage:"Oops! That doesn't seem right as an email.",
		passwordMessage:"Oops! Password cannot be empty!"
	})

	/* States for the component */
	const {firstName,lastName,email,password}=formData;
	const {firstNameError,lastNameError,emailError,passwordError}=formDataError;
	const {firstNameMessage,lastNameMessage,emailMessage,passwordMessage}=formErrorMessage;


	/* Handle Change Method */
	const handleChange=(e)=>{
		setFormData(prevState=>{
			const {name,value}=e.target;
			return {
				...prevState,
				[name]:value
			}
		})
	}

	/* Method to handle setting of Error */
	const setError=(dataField,errorStatus)=>{
		setFormDataError(prevState=>{
			return {
				...prevState,
				[dataField]:errorStatus
			}
		});
	}

	/* Method to handle setting of ErrorMessage */
	const setErrorMessage=(dataField,message)=>{
		setFormErrorMessage(prevState=>{
			return {
				...prevState,
				[dataField]:message
			}
		})
	}


	/* Effect to handle  on change validations for firstName */
	useEffect(()=>{
		if(firstName.length>=1){
			setError('firstNameError',!validateName(firstName));
			setErrorMessage('firstNameMessage',"Oops! That doesn't seem right as first name");
		}
		else{
			setError('firstNameError',false);
		}
	},[firstName]);

	/* Effect to handle  on change validations for lastName */
	useEffect(()=>{
		if(lastName.length>=1){
			setError('lastNameError',!validateName(lastName));
			setErrorMessage('lastNameMessage',"Oops! That doesn't seem right as last name");
		}
		else{
			setError('lastNameError',false);	
		}
		
	},[lastName]);

	/* Effect to handle  on change validations for email */
	useEffect(()=>{
		if(email.length>=1){
			setError('emailError',!validateEmail(email));
			setErrorMessage('emailMessage',"Oops! That doesn't seem right as an email.");
		}
		else{
			setError('emailError',false);
		}
	},[email])
	


	return (
		<div className="herobox__signup">
			<div className="form__container">
				<form action="" className="form">
					<FormInput
						type="text"
						label="First Name:"
						id="firstName"
						name="firstName"
						placeholder="Enter your first name"
						autoComplete="off"
						value={firstName}
						onChange={handleChange}
						hasError={firstNameError}
						errorMessage={firstNameMessage}
					/>

					<FormInput
						type="text"
						label="Last Name:"
						id="lastName"
						name="lastName"
						placeholder="Enter your last name"
						autoComplete="off"
						value={lastName}
						onChange={handleChange}
						hasError={lastNameError}
						errorMessage={lastNameMessage}
					/>

					<FormInput
						type="email"
						label="Email ID:"
						id="email"
						name="email"
						placeholder="Enter your email"
						autoComplete="off"
						value={email}
						onChange={handleChange}
						hasError={emailError}
						errorMessage={emailMessage}
					/>

					<FormInput
						type="password"
						label="Password:"
						id="password"
						name="password"
						placeholder="Enter your password"
						autoComplete="off"
						value={password}
						onChange={handleChange}
						hasError={passwordError}
						errorMessage={passwordMessage}
					/>
					<Button type="submit">Sign up</Button>
				</form>
			</div>
		</div>
	)
}

export default SignUpForm;