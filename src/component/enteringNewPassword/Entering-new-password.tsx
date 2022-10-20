import React, {useState} from 'react';
import {Input} from '../common/input/Input'
import {Box, Button, Paper} from "@mui/material";
import {setNewPasswordTC} from "../../bll/reducers/recoveryPasswordReducer";
import {useAppDispatch, useAppSelector} from "../../bll/hook/hook";
import {NewPasswordType} from "../../api/regApi";
import {Navigate, useParams} from 'react-router-dom';
import {ErrorMessage} from "../SnackBar/Snackbar";
import style from '../Login/login.module.css'
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";

export const EnteringNewPassword = () => {
    const isPasswordInstalled = useAppSelector(state => state.recovery.isPasswordInstalled)
    const params = useParams()
    const dispatch = useAppDispatch()
    let [value, setValue] = useState('')
    const setPassword = (value: string) => {
        setValue(value)
    }
    const addPassword = () => {
        const data: NewPasswordType = {
            password: value,
            resetPasswordToken: params['*']
        }
        dispatch(setNewPasswordTC(data))
    }
    if (isPasswordInstalled) {

        return <Navigate to={'/login'}/>
    }
    return (
    <Grid container justifyContent={'center'}>
        <Grid item justifyContent={"center"}>
            <Paper elevation={3}>
                <Box className={style.box} component='div' sx={{
                    backgroundColor: 'white',
                    width: '300px',
                    padding: '40px'
                }}>
                    <FormGroup>
                    <h2 className={style.signIn}>Create new password</h2>
                    <Input placeholder='Password' type='password' value={value} setItem={setPassword}/>
                    <p>Create new password and we will send you further instructions to email</p>
                    <Button onClick={addPassword} variant="contained" style={{borderRadius: '50px'}} type='submit'>Create
                        new
                        password</Button>
                    <ErrorMessage/>
                    </FormGroup>
                </Box>
            </Paper>
        </Grid>
    </Grid>
    )
}



