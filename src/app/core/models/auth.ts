export interface User {
    name : string ;
    email : string ;
    id : string ;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserLoginResponse{
    message :string ;
    access_token :string ;
    user: string;
}

export interface UserRegister{
    message :string ;
}