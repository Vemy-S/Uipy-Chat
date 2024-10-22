import { create } from "zustand";
import type { User } from "../types";

type useSearchStore = {
    searchedUser: {
        user_id: number,
        username: string
    }
    getSearchUser: (user: User) => void,
    clearSearchedUser: () => void
}



export const useSearchStore = create<useSearchStore>((set)=> ({
    searchedUser: {
        user_id: 0,
        username: ''
    },
    getSearchUser: (user) => {
        if(!user) return
        console.log('Info user, getSearchUser', user)
        set({searchedUser: user})
    },
    clearSearchedUser: () => {
      set({searchedUser: {user_id: 0, username: ''}})  
    }
  
}))
