import React from 'react';

/* Styling */
import './index.scss';


const Footer=()=>{
	return (
		<footer>
			<div className="footer">
				<p>
					The project is made with <span role="img">❤️</span> by 
					<a href="https://abhushan.live" target="_blank" rel="noreferrer noopener" className='profile-link'> 
						Abhushan A. Joshi.
					</a>	
				</p>	
			</div>
		</footer>
	)
}

export default Footer;