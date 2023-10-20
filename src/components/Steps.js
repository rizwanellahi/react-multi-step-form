import React from 'react';
import { Box, TextField } from '@mui/material';
import { Field } from 'formik';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';


const CustomField = ({ name, label, type }) => {
    return (
        <Box flexDirection={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ display: 'flex', flexFlow: 'column', margin: '0 auto', width: '100%', maxWidth: '500px', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%' }} >
                    <Typography variant="h6" component="h1" mb={4} textAlign={'center'}>
                        React Multi-Step Form (Formik + Yup + MUI)
                    </Typography>
                    <Box paddingBottom={2}>
                        <Field name={name}>
                            {
                                ({
                                    field,
                                    meta,
                                }) => (
                                    <div>
                                        <TextField
                                            fullWidth
                                            name={name}
                                            label={label}
                                            id={name}
                                            type={type}
                                            {...field}
                                        />
                                        {meta.touched && meta.error && (
                                            <div style={{ color: red[500], fontStyle: 'italic', fontSize: '0.8rem', marginTop: '4px' }}>{meta.error}</div>
                                        )}
                                    </div>
                                )
                            }
                        </Field >
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export const StepOne = () => {
    return <CustomField name="name" label="Name" type="text" />
}


export const StepTwo = () => {

    return <CustomField name="email" label="Email" type="text" />

}

export const StepThree = () => {
    return <CustomField name="dob" label="" type="date" />

}

export const StepFour = () => {
    return <CustomField name="password" label="Password" type="password" />

}