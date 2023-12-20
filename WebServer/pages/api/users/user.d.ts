import { User } from "@/db/users/userTypes"

export type UserDbReponse = {
    success: boolean
}

export type ApiUserResponse = {
    success: boolean,
    error: error,
    user: User
}

export type ApiError = {
    type: number,
    message: string
}