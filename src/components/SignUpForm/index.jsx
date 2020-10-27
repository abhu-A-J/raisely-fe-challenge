import React ,{useEffect, useState} from 'react';
import { useAlert } from 'react-alert'

/* Styling */
import "./index.scss";

/*Child Components */
import FormInput from "../FormInput";
import Button from "../Button";

/* Utilities */
import {validateName,validateEmail} from "../../utils/validation";

/* API Method */
import verifyEmailStatus from "../../api/verifyEmail";
import signupUsers from "../../api/signupUser";

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


	/* State for email Verification */
	const [validating,setValidatingStatus]=useState(false);
	const [emailTaken,setEmailTaken]=useState(false);
	
	/* Destructured States for the component */
	const {firstName,lastName,email,password}=formData;
	const {firstNameError,lastNameError,emailError,passwordError}=formDataError;
	const {firstNameMessage,lastNameMessage,emailMessage,passwordMessage}=formErrorMessage;

	/* Alert Component */
	const alert=useAlert();
	
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

	/* Method to handle form Submit */
	const handleSubmit=(e)=>{
		e.preventDefault();
		
		/* Check for empty fields */
		if(firstName.trim().length===0){
			setError('firstNameError',true);
			setErrorMessage('firstNameMessage','First Name cannot be empty.')
			return ;
		}
	
		if(lastName.trim().length===0){
			setErrorMessage('lastNameMessage','Last Name cannot be empty.')
			setError('lastNameError',true);
			return ;
		}
		
		if(email.trim().length===0){
			setError('emailError',true);
			setErrorMessage('emailMessage','Email cannot be empty.')
			return ;
		}
		
		if(password.trim().length===0){
			setError('passwordError',true);
			setErrorMessage('passwordMessage','Password cannot be just spaces or empty.')
			return;
		}

		/* All validations are successful : Submission */
		async function postData(){
			const status=await signupUsers({firstName,lastName,email,password});
			if(status==='OK'){
				alert.success('User Signed Up...');
				setFormData({
					email:'',
					firstName:'',
					lastName:'',
					password:''
				})
			}
			else{
				alert.error('Oops! Something is broken, come back later!!');
				setFormData({
					email:'',
					firstName:'',
					lastName:'',
					password:''
				})
			}
		}
		postData();
		

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
		const isEmailValid=validateEmail(email);
		if(email.length>=1){
			setError('emailError',!isEmailValid);
			setErrorMessage('emailMessage',"Oops! That doesn't seem right as an email.");

			if(isEmailValid){
				setValidatingStatus(true);
				async function checkEmail(){
					const result= await verifyEmailStatus(email);
					const status=result.data.status;
					setValidatingStatus(false);
					if(status==='EXISTS'){
						setError('emailError',true);
						setErrorMessage('emailMessage','The email is already taken');
						setEmailTaken(true);
					}else{
						setEmailTaken(false);
					}
				}
				checkEmail();	
			}
		}
		else{
			setError('emailError',false);
		}
	},[email])
	
	/* Effect to handle on change validations for email */
	useEffect(()=>{
		if(password.length>=1){
			if(password.trim().length===0){
				setError('passwordError',true);
				setErrorMessage('passwordMessage','Oops! Password cannot be just empty spaces!')
			}
			else{
				setError('passwordError',false);
			}
		}
		else{
			setError('passwordError',false);
		}
		
		
		
	},[password])

	return (
		<div className="herobox__signup">
			<div className="form__container">
				<form action="" className="form" onSubmit={handleSubmit}>
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
						showLoader={validating}
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
					<Button type="submit" disabled={validating || emailTaken}>Sign up</Button>
				</form>
			</div>
		</div>
	)
}

export default SignUpForm;