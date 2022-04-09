import {createLocalStore} from '../utils'

const authStore = createLocalStore({
    user: undefined,
    token: undefined
}, 'auth-cache');


export default authStore;