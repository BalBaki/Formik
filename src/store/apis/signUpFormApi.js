import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const signUpFormApi = createApi({
    reducerPath: 'signUpForms',
    baseQuery: fetchBaseQuery({
        baseUrl: ' http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchSignUpForms: builder.query({
                providesTags: (result, error) => {
                    let tags = result.map((form) => {
                        return { type: 'Form', id: form.id };
                    });
                    tags.push({ type: 'SignUpForm' });

                    return tags;
                },
                query: () => {
                    return {
                        method: 'GET',
                        url: '/signUpForms',
                    };
                },
            }),
            addSignUpForm: builder.mutation({
                invalidatesTags: (result, error, form) => {
                    return [{ type: 'SignUpForm' }];
                },
                query: (form) => {
                    return {
                        method: 'POST',
                        url: '/signUpForms',
                        body: form,
                    };
                },
            }),
            removeSignUpForm: builder.mutation({
                invalidatesTags: (form) => {
                    return [{ type: 'Form', id: form.id }];
                },
                query: (form) => {
                    return {
                        method: 'DELETE',
                        url: `/signUpForms/${form.id}`,
                    };
                },
            }),
        };
    },
});

export const { useFetchSignUpFormsQuery, useAddSignUpFormMutation, useRemoveSignUpFormMutation } = signUpFormApi;
export const { addSignUpForm } = signUpFormApi.endpoints;
export { signUpFormApi };
