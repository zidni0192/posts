import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Form from '../../components/form'
import { updateData } from '../../redux/reducers/post'

export default function Edit() {
    const dispatch = useDispatch()
    const post = useSelector(state => state.post.data)
    const params = useParams()
    const [data, setData] = useState({})

    const onSubmit = (data) => {
        dispatch(updateData(data))
    }

    const onChangeParams = () => {
        if (params?.id) {
            setData(post.find(item => Number(item.id) === Number(params.id)))
        }
    }

    useEffect(() => {
        onChangeParams()
    }, [params])
    return (
        <Form title="Edit Post" onAction={onSubmit} data={data} />
    )
}
