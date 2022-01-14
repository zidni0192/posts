import React from 'react'
import { useDispatch } from 'react-redux'
import Form from '../../components/form'
import { insertData } from '../../redux/reducers/post'

export default function Create() {
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(insertData(data))
    }
    return (
        <Form title="Create Post" onAction={onSubmit} />
    )
}
