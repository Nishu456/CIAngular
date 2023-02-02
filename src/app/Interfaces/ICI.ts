export interface Iregister{
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface Ilogin{
    email: string,
    password: string
}

export interface IforgetPassword{
    email: string,
    clientURI: string
}

export interface Iuser{
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    employeeId?: string,
    departmentId?: number,
    countryId: number,
    cityId: number,
    profileSummary?: string,
    status: boolean
}

export interface ImissionData{
    missionId: number,
    missionTitle: string,
    missionType: string,
    startDate: string,
    endDate: string
}

export interface IthemeData{
    themeId: number,
    themeName: string,
    status: string
}

export interface IskillData{
    skillId: number,
    skillTitle: string,
    status: string
}