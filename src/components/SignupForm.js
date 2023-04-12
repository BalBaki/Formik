import { useFormik } from 'formik';
import { useAddSignUpFormMutation } from '../store/apis/signUpFormApi';
import { useEffect } from 'react';

function SignupForm() {
    const [addForm, addFormResults] = useAddSignUpFormMutation();

    const validate = (values) => {
        let errors = {};

        if (!values.firstName) {
            errors.firstName = 'Firstname required';
        }

        if (!values.lastName) {
            errors.lastName = 'LastName required';
        }

        if (!values.email) {
            errors.email = 'Email required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validate,
        onSubmit: (values) => {
            addForm(values);
        },
    });

    useEffect(() => {
        addFormResults.isSuccess && formik.resetForm();
    }, [addFormResults.isSuccess]);

    return (
        <div className="signup-form-wrapper">
            <form className="signup-form" onSubmit={formik.handleSubmit}>
                <div className="form-field">
                    <div className="form-item">
                        <label>Firstname : </label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.firstName && <div className="field-error">{formik.errors.firstName}</div>}
                </div>
                <div className="form-field">
                    <div className="form-item">
                        <label>Lastname : </label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                    </div>
                    {formik.errors.lastName && <div className="field-error">{formik.errors.lastName}</div>}
                </div>
                <div className="form-field">
                    <div className="form-item">
                        <label>Email : </label>
                        <input type="email" name="email" {...formik.getFieldProps('email')} />
                    </div>
                    {formik.errors.email && <div className="field-error">{formik.errors.email}</div>}
                </div>
                <div className="form-submit">
                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || addFormResults.isLoading}>
                        Send Form
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
