import * as yup from 'yup';

export const createTaskSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().min(15).required("Description must be 15 character at least"),
})