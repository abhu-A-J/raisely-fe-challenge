import axios from 'axios'

/* Constants */
import {BASE_URL,CAMPAIGN_UUID} from '../constants/index';

/* Function to check status for validated email : EXISTS || OK  */
async function verifyEmailStatus(email){
	let result=null;

	try{
		const response=await axios.post(`${BASE_URL}/check-user`,{
				"campaignUuid": CAMPAIGN_UUID,
				"data": {
		 		"email": email,
			}
		});
		if(response.data){
			result=response.data;
		}
	}catch(err){
		result=err;
	}
	return result;
}

export default verifyEmailStatus;