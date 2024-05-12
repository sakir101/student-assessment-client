export interface IMeta {
    limit: number;
    page: number;
    total: number;
}

export type ResponseSuccessType = {
    data: any,
    meta?: IMeta
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export type IInterest = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export type ISkill = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    SkillStudent: {
        interestId: string;
        status: string;
        studentId: string;
    }[];
};

export type IRelatedWork = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    RelatedWorksStudent: {
        interestId: string;
        description: string;
        studentId: string;
    }[];
};


export interface IFaculty {
    id: string;
    facultyId: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    institution: string;
    contactNum: string;
    profileImage: string;
    gender: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IStudent {
    id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    profileImage: string;
    gender: string;
    institution: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface FacultyInterest {
    interestId: string;
    facultyId: string;
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    solution: string | null;
    createdAt: string;
    updatedAt: string;
    facultyId: string;
    faculty: IFaculty;
    hint: string[];
}