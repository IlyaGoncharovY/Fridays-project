import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const registartionAPI = {
    registration(userData: userDataType) {
        return instance.post<responseRegType>('auth/register', userData)
    },
	login<T = LoginDataType >(data : LoginDataType){
		return instance.post<T,AxiosResponse<T>,LoginDataType>('auth/login',data)
	},
	me(){
		return instance.post('auth/me',{})
	},
	logout(){
		return instance.delete('auth/me')
	}
}
export const profileAPI = {
	updateProfile(data: ProfileDataType){
		return instance.put('auth/me', data)
	},
	setProfile(){
		return instance.post('auth/me')
	}
}

export type userDataType = {
    email: string;
    password: string;
}
export type LoginDataType = {
	email: string;
	password: string;
	rememberMe? : boolean
}
export type ProfileDataType ={
	name: string
	avatar: string
}

export type responseRegType = {
	addedUser: ResponseRegTypeAddedUser;
	error?: string;
}
export type ResponseRegTypeAddedUser = {
	_id: string;
	email: string;
	rememberMe: boolean;
	isAdmin: boolean;
	name: string;
	verified: boolean;
	publicCardPacksCount: number;
	created: string;
	updated: string;
	__v: number;
}
export type ResponseLoginType = {
	_id: string;
	email: string;
	name: string;
	avatar?: string;
	publicCardPacksCount: number;
	created: string;
	updated: string;
	isAdmin: boolean;
	verified: boolean;
	rememberMe: boolean;
	error?: string;
}

