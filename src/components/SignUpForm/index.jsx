import React ,{useState} from 'react';

/* Styling */
import "./index.scss";

/*Child Components */
import FormInput from "../FormInput";

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
						hasError={true}
						errorMessage={firstNameMessage}
					/>
				</form>
			</div>
		</div>
	)
}

export default SignUpForm;