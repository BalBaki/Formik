import { GoTrashcan, GoCircleSlash } from 'react-icons/go';
import { useRemoveSignUpFormMutation } from '../store';

export default function FormItem({ form }) {
    const [removeForm, removeFormResults] = useRemoveSignUpFormMutation();

    const handleDeleteClick = () => {
        removeForm(form);
    };

    return (
        <div className="signup-item">
            <div>Name : {form.firstName}</div>
            <div>Surname : {form.lastName}</div>
            <div>Email : {form.email}</div>
            <button className="delete-form" onClick={handleDeleteClick} disabled={removeFormResults.isLoading}>
                {removeFormResults.isLoading ? <GoCircleSlash /> : <GoTrashcan />}
            </button>
        </div>
    );
}
