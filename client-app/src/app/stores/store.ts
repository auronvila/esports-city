import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import UserStore from "./userStore"
import commonStore from "./commonStore"

interface Store {
    activityStore : ActivityStore
    userStore: UserStore
    commonStore: commonStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new commonStore(),
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}