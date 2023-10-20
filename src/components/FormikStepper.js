import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { StepOne, StepTwo, StepThree, StepFour } from './Steps';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Wizard = ({ children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = values => {
        setSnapshot(values);
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };

    const previous = values => {
        setSnapshot(values);
        setStepNumber(Math.max(stepNumber - 1, 0));
    };

    const handleSubmit = async (values, bag) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, bag);
        }
        if (isLastStep) {
            return onSubmit(values, bag);
        } else {
            typeof bag.setTouched === 'function' && bag.setTouched({});
            next(values);
        }
    };

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {(formik) => (
                <Form>
                    <Box sx={{ height: '100%' }}>

                        <Box>
                            <Box mt={10}>
                                {React.cloneElement(step, { next: handleSubmit, form: formik })}
                            </Box>
                            <Box sx={{ display: 'flex' }} justifyContent={{ xs: 'center' }} mt={4}>
                                {stepNumber > 0 && (
                                    <Box mr={4}>
                                        <Button onClick={() => previous(formik.values)} variant="contained">
                                            Back
                                        </Button>
                                    </Box>
                                )}
                                {stepNumber >= 0 && (
                                    <Button disabled={formik.isSubmitting} type="submit" variant="contained" endIcon={<ArrowRightAltIcon />}>{isLastStep ? 'Submit' : 'Continue'}</Button>
                                )}
                            </Box>
                        </Box>

                    </Box>
                </Form>
            )
            }
        </Formik >
    );
};

const WizardStep = ({ children, next, form }) => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { next, form })
        }
        return null;
    });
};

export const FormikStepper = (props) => {

    return (
        <Wizard
            initialValues={{
                name: "",
                email: "",
                dob: "",
                password: ""
            }}
            onSubmit={(values) => {
                sleep(300).then(() => window.alert(JSON.stringify(values, null, 2)));
                sleep(300).then(() => window.location.reload());
            }}

        >
            {/* STEP 1 */}
            <WizardStep validationSchema={yup.object({
                name: yup.string().required('Name is required'),
            })}>
                <StepOne />
            </WizardStep>

            {/* STEP 2 */}
            <WizardStep validationSchema={yup.object({
                email: yup.string().email().required('Email is required'),
            })}>
                <StepTwo />
            </WizardStep>

            {/* STEP 3 */}
            <WizardStep validationSchema={yup.object({
                dob: yup.date().required('Date of birth is required'),
            })}>
                <StepThree />
            </WizardStep>

            {/* STEP 4 */}
            <WizardStep validationSchema={
                yup.object().shape({
                    password: yup
                        .string()
                        .min(8, 'Password must be 8 characters long').required()
                })
            }>
                <StepFour />
            </WizardStep>
        </Wizard >

    )
}
