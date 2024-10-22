import axios from "axios";

export const getSearchedUser = async (username: string) => {
    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/user/search?username=${username}`
            const result = await axios(url, {
                withCredentials: true
            })
            
          
            if(result.status === 200){
                return result.data
            }
            
    } catch (error) {
        console.log(error)
    }
}

