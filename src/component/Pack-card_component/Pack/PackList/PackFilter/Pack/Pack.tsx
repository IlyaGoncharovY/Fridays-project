import {AppBar, LinearProgress, TextField} from "@mui/material"
import s from "./Pack.module.scss"
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../../common/hook/hook";
import React, {ChangeEvent, useEffect, useState} from "react";
import {setCards, setCardsPackID} from "../../../../../../bll/reducers/cardsReducer";
import SchoolIcon from "@mui/icons-material/School";
import {PacksModal} from "../../../../../../common/ModalWindow/PackModalWindow/PacksModal";
import {DeleteModal} from "../../../../../../common/ModalWindow/DeleteModal/DeleteModal";
import {deletePackTC, editPackTC} from "../../../../../../bll/reducers/packsReducer";
import {PATH} from "../../../../../../utils/path";
import IconButton from "@mui/material/IconButton";
import img from "../../../../../../common/assets/images/react.png"
import {transformImageInBase64} from "../../../../../../utils/transformImageInBase64";
import {EditAndDeleteIcon} from "../../../../../../common/EditAndDeleteIcon/EditAndDeleteIcon";

type PackType = {
    packID: string
    userID: string
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
    deckCover: string
}

export const Pack = (props: PackType) => {

    const userID = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.auth.status)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [title, setTitle] = useState(props.name)
    const [file,setFile] = useState("")
    // const [isImgBroken, setIsImgBroken] = useState(false)
    const [isChecked,setIsChecked] = useState(false)

    useEffect(() => {
        dispatch(setCardsPackID(props.packID))
    }, [])

    const openEdit = () => setIsEdit(true)
    const closeEdit = () => setIsEdit(false)

    const openDelete = () => setIsDelete(true)
    const closeDelete = () => setIsDelete(false)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const changeNamePack = () => {
        dispatch(editPackTC(props.packID, title,file,isChecked))
    }

    const schoolHandler = () => {
        dispatch(setCards([]))
        navigate(`${PATH.LEARN}/${props.packID}/${props.userID}/${props.name}`)
    }
    const deleteHandler = () => {
        dispatch(deletePackTC(props.packID))
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const navigateToCard = () => {
        navigate(`${PATH.CARD}/${props.packID}/${props.userID}/${props.name}`)
        dispatch(setCardsPackID(props.packID))
    }
    const getFile = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files  && event.currentTarget.files.length){
            transformImageInBase64(event.currentTarget.files[0],  (file: string)=>{
                setFile(file)
            })
        }
    }

    const PrivatePack = (event: ChangeEvent<HTMLInputElement>) => {
     setIsChecked(event.currentTarget.checked)
    }


    // const errorHandler = () => {
    //     setIsImgBroken(true)
    //         alert(`С вашей картинкой для колоды ${props.name}, что то не так! Попробуйте другую!`)
    // }


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
                                autoFocus
                            />
                            : <div className={s.imgContainer} onClick={navigateToCard}>
                                <img className={s.img}
                                     // src={ isImgBroken ? img : props.deckCover}
                                     src={props.deckCover || img   }
                                     alt="pack img"
                                     // onError={errorHandler}
                                 />
                                <span className={s.name}>{props.name}</span>
                            </div>
                        }
                    </th>
                    <th>{props.cards}</th>
                    <th>{props.lastUpdated}</th>
                    <th>{props.userName}</th>
                    <th className={s.icon}>
                        <IconButton disabled={props.cards === 0}>
                            <SchoolIcon onClick={schoolHandler} className={s.schoolIcon}/>
                        </IconButton>


                        {userID === props.userID &&
                            <EditAndDeleteIcon openEdit={openEdit} openDelete={openDelete}/>}
                    </th>
                </tr>}
            <PacksModal
                nameModal={"EDIT PACK"}
                open={isEdit}
                closeHandler={closeEdit}
                thunkCallBack={changeNamePack}
                onChange={onChangeTitleHandler}
                packID={props.packID}
                title={title}
                getFile={getFile}
                PrivatePack={PrivatePack}

            />
            <DeleteModal
                nameModal={"DELETE PACK"}
                open={isDelete}
                closeHandler={closeDelete}
                thunkCallBack={deleteHandler}
                packID={props.packID}
                name={props.name}
            />
        </>
    )
}
