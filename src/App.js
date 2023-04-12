import SignupForm from './components/SignupForm';
import SignupFormV2 from './components/SignupFormV2';
import FormsList from './components/FormsList';
import TestForm from './components/TestForm';

export default function App() {
    return (
        <>
            <FormsList />
            <SignupFormV2 />
            {/* <TestForm /> */}
        </>
    );
}
