import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import UserStore from "./userStore"
import commonStore from "./commonStore"
import ModalStore from "./modalStore"

interface Store {
    activityStore : ActivityStore
    userStore: UserStore
    commonStore: commonStore
    modalStore: ModalStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new commonStore(),
    modalStore: new ModalStore()
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}