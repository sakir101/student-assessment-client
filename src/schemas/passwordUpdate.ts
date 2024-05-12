import * as yup from 'yup';

export const passUpdSchema = yup.object().shape({
    currentPass: yup.string().required("Current password is required"),
    newPass: yup.string().min(6).max(32).required("Password must be maximum 32 character and minimum 6 character"),
    confNewPass: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.newPass === value;
        })
        .min(6)
        .max(32)
        .required(),
})