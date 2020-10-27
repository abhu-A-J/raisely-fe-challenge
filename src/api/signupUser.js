import axios from 'axios';

/* Constants */
import {BASE_URL,CAMPAIGN_UUID} from '../constants/index';


/* Function to signup user's form data */
async function signupUsers(userData){
	let result=null;
	console.log('User Data >>>',userData);

	try{
		const response=await axios.post(`${BASE_URL}/signup`,{
			"campaignUuid": CAMPAIGN_UUID,
			data:userData
		});

		console.log(response);
		if(response.data){
			result='OK';
		}
	}catch(err){
		console.log('ERROR>>>>',err.response)
		result='ERROR';
	}
	return result;
}

export default signupUsers;