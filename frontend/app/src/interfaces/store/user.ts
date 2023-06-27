
export interface IUser{
    id?: number
    username: string
    name: string
    is_active?: boolean
    employee_number: string
    department_name: string
    permission: "owner" | "admin" | "member"
}