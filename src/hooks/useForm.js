import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler ) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        e.preventDefault();
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    }

    const onSubmitfunc = (e) => {
        e.preventDefault();
        setValues(initialValues);
        onSubmitHandler(values);
    }

    const changeValues = (newValues) => {

        setValues(newValues);
    };

    return {
        values,
        changeHandler,
        onSubmitfunc,
        changeValues,
    };
}