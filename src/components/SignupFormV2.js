import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useAddSignUpFormMutation } from '../store/apis/signUpFormApi';
import { changeFirstName, changeLastName, changeEmail } from '../store';
import ResetForm from './ResetForm';

function SignupFormV2() {
    const dispatch = useDispatch();
    const [addForm, addFormResults] = useAddSignUpFormMutation();

    const handleFirstNameChange = (event, handleChange) => {
        dispatch(changeFirstName(event.target.value));
        handleChange(event);
    };
    const handleLastNameChange = (event, handleChange) => {
        dispatch(changeLastName(event.target.value));
        handleChange(event);
    };
    const handleEmailChange = (event, handleChange) => {
        dispatch(changeEmail(event.target.value));
        handleChange(event);
    };

    console.log('RENDER ');

    const signUpFormSchema = Yup.object().shape({
        firstName: Yup.string().required('Firstname required'),
        lastName: Yup.string().required('Lastname required'),
        email: Yup.string().required('Email required').email('Invalid email address'),
    });

    return (
        <div className="signup-form-wrapper">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                // validate={(values) => {
                //     let errors = {};

                //     if (!values.firstName) {
                //         errors.firstName = 'Firstname required';
                //     }

                //     if (!values.lastName) {
                //         errors.lastName = 'Lastname required';
                //     }

                //     if (!values.email) {
                //         errors.email = 'Email required';
                //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                //         errors.email = 'Invalid email address';
                //     }

                //     return errors;
                // }}
                validationSchema={signUpFormSchema}
                onSubmit={(values, actions) => {
                    addForm(values);
                }}
            >
                {({ isValid, dirty, isSubmitting, handleChange, values }) => (
                    <Form className="signup-form">
                        <div className="form-field">
                            <div className="form-item">
                                <label>Name : </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    onChange={(event) => handleFirstNameChange(event, handleChange)}
                                />
                            </div>
                            <ErrorMessage name="firstName" component="div" className="field-error" />
                        </div>
                        <div className="form-field">
                            <div className="form-item">
                                <label>Surname : </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    onChange={(event) => handleLastNameChange(event, handleChange)}
                                />
                            </div>
                            <ErrorMessage name="lastName" component="div" className="field-error" />
                        </div>
                        <div className="form-field">
                            <div className="form-item">
                                <label>Email : </label>
                                <Field
                                    type="email"
                                    name="email"
                                    onChange={(event) => handleEmailChange(event, handleChange)}
                                />
                            </div>
                            <ErrorMessage name="email" component="div" className="field-error" />
                        </div>
                        <div className="form-submit">
                            <button type="submit" disabled={!(isValid && dirty) || addFormResults.isLoading}>
                                Send Form
                            </button>
                        </div>
                        <ResetForm value={addFormResults.isSuccess} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignupFormV2;
