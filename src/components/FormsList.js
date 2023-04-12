import { useFetchSignUpFormsQuery } from '../store';
import FormItem from './FormItem';

export default function FormsList() {
    const { data, isLoading, error } = useFetchSignUpFormsQuery();

    let content;

    if (isLoading) {
        content = <div>Forms Are Loading...</div>;
    } else if (error) {
        content = <div>Error at Fecthing Forms...</div>;
    } else {
        content = data.map((form) => {
            return <FormItem form={form} key={form.id} />;
        });
    }

    return <div className="form-list">{content}</div>;
}
