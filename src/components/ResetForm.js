import { useFormikContext } from 'formik';
import { useCallback, useEffect } from 'react';

export default function ResetForm({ value }) {
    const { resetForm } = useFormikContext();

    const reset = useCallback(() => {
        resetForm();
    }, [resetForm]);

    useEffect(() => {
        value && reset();
    }, [value, reset]);
}
