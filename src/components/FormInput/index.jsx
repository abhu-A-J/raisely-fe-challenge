import React from 'react';

/* Styling */
import "./index.scss";

/* Assets */
import errorIcon from "../../assets/icon-error.svg";

/* Child Components */
import Loader from "../Loader";


const FormInput=(props) =>{
	const {label,id,hasError,errorMessage,showLoader,...otherProps}=props;
	
	return (
		<div className="input__group">
			<label htmlFor={id} className='input__label'>{label}</label>
			<input  id={id} {...otherProps} className={`input__value ${hasError ? 'error' :''}`} disabled={showLoader}/>
				{
					showLoader && <Loader/>
				}
				<img src={errorIcon} alt="Error Icon" className={`input__error-icon ${!hasError ?'hide':''}` }/>
		  	<p className={`validation-error ${!hasError ? 'hide' :''} ` }>{errorMessage}</p>	
		</div>
	)
	}

	export default FormInput;