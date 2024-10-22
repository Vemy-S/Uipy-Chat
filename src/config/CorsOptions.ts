import { CorsOptions } from "cors"

export const corsOption: CorsOptions = {
    origin(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('CORS'))
        }
    },
    credentials: true
}