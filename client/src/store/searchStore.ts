import { create } from "zustand";

type useSearchStore = {
    searchedUser: {
        user_id: number,
        username: string
    }
    getSearchUser: (user: any) => void,
    clearSearchedUser: () => void
}

export const useSearchStore = create<useSearchStore>((set)=> ({
    searchedUser: {
        user_id: 0,
        username: ''
    },
    getSearchUser: (user) => {
        if(!user) return
        set({searchedUser: user})
    },
    clearSearchedUser: () => {
      set({searchedUser: {user_id: 0, username: ''}})  
    }
  
}))
