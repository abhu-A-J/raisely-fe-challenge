import React from 'react';

/* Styling */
import "./index.scss";

const Button =({children,...otherProps})=>{
	return (
		<div className="btn__group">
			<button {...otherProps} className="btn-submit">{children}</button>
		</div>
	)
}

export default Button;