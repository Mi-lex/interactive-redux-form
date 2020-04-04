export interface Auth {
	email: string
	password: string
}

export interface Register extends Auth {
	first_name: string
	second_name: string
	middle_name: string
	password_confirmation: string
}

export interface User {
	id: string
	first_name: string
	second_name: string
	middle_name: string
	email: string
}
