import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

export default function TestForm() {
    const testSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Firstname Required'),
        lastName: Yup.string().min(5, 'Too Short').max(20, 'Too Long').required('Lastname Required'),
        email: Yup.string().email('Invalid email').required('Email required'),
        file: Yup.mixed()
            .required('File Required')
            .test('file-type', 'File type isnt PDF', (value) => value.type === 'application/pdf')
            .test('file-size', 'File Size is Too Big', (value) => value.size < 160000),
        //test içindeki fonksiyon true dönerse error basmaz. false dönerse error basar.
    });

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    file: undefined,
                }}
                validationSchema={testSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }, 2000);
                }}
            >
                {({ isValid, dirty, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstName">FirstName: </label>
                            <Field type="text" name="firstName"></Field>
                            <ErrorMessage name="firstName" component="div" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" />
                            <ErrorMessage name="lastName" component="div" />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="file">File : </label>
                            <Field
                                type="file"
                                name="file"
                                value={undefined}
                                onChange={(event) => {
                                    setFieldValue('file', event.target.files[0]);
                                }}
                            />
                            <ErrorMessage name="file" component="div" />
                        </div>

                        <button type="submit" disabled={!(isValid && dirty) || isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
