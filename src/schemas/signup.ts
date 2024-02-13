import * as yup from 'yup';

export const signupStudentSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).max(32).required("Password must be maximum 32 character and minimum 6 character"),
    confPassword: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
        })
        .min(6)
        .max(32)
        .required(),
    student: yup.object().shape({
        studentId: yup.string().required("Student ID is required"),
        firstName: yup.string().required("First name is required"),
        middleName: yup.string().optional(),
        lastName: yup.string().required("Last name is required"),
        gender: yup.string().required("Gender is required"),
        institution: yup.string().required("Institution is required"),
    }),
});
