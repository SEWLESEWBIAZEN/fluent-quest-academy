import axios from 'axios'
export const BAKEND_URL = process.env.REACT_APP_API_URL


export const create_update_user = async()=>{
    return(
        await axios.post(`${BAKEND_URL}/create-user`,null, {
            headers:{
                authtoken:""
            }
        })
    )
}
