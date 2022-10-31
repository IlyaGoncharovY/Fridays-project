import {AppBar, LinearProgress, TextField} from "@mui/material"
import s from "./Pack.module.scss"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../../bll/hook/hook";
import {deleteListTC, editListTC} from "../../../../../../bll/reducers/listsReducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import {PATH} from "../../../../../../App";
import {setCardsPackID} from "../../../../../../bll/reducers/cardsReducer";
import SchoolIcon from "@mui/icons-material/School";

type PackType = {
    packID: string
    userID: string
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
}

export const Pack = (props: PackType) => {

    const isLogin = useAppSelector(state => state.login.isLoggedIn)
    const userID = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.auth.status)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState("")

    useEffect(() => {dispatch(setCardsPackID(props.packID))},[])

    const editHandler = () => {
        setIsEdit(true)
        setTitle(props.name)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTitleHandler = () => {
        if (title.trim().length === 0 || title.length > 20) {
            return alert('Please enter correct field: Name')
        } else {
            dispatch(editListTC(props.packID, title))
            setIsEdit(false)
        }
    }
    // const onKeyboardAddTitle = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (title.trim().length === 0 || title.length > 20) {
    //         return alert('Please enter correct field: Name')
    //     }
    //     if (event.key === "Enter") {
    //            dispatch(editListTC(props.packID, title))
    //            setIsEdit(false)
    //     }
    // }

    const deleteHandler = () => {
        dispatch(deleteListTC(props.packID))
    }

    const navigateToCard = () => {
        navigate(`${PATH.CARD}/` + props.packID)
        dispatch(setCardsPackID(props.packID))
    }

    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            {status === 'loading'
                ? <AppBar><LinearProgress/></AppBar>
                : <tr>
                    <th className={s.title}>
                        {isEdit
                            ? <TextField
                                value={title}
                                variant={"standard"}
                                onChange={onChangeHandler}
                                onBlur={addTitleHandler}
                                autoFocus
                            />
                            : <div onClick={navigateToCard}>{props.name}</div>
                        }
                    </th>
                    <th>{props.cards}</th>
                    <th>{props.lastUpdated}</th>
                    <th>{props.userName}</th>
                    <th className={s.icon}>
                        <SchoolIcon className={s.schoolIcon}/>
                        {userID === props.userID && <EditIcon onClick={editHandler} className={s.editIcon}/>}
                        {userID === props.userID && <DeleteIcon onClick={deleteHandler} className={s.deleteIcon}/>}
                    </th>
                </tr>}
        </>
    )
}
