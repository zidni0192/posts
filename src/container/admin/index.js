import React, { useEffect } from 'react'
import Header from '../../components/header';
import ListPosts from '../../components/listPosts';
import post from '../../api/post'
import { setData } from '../../redux/reducers/post'
import { useDispatch, useSelector } from 'react-redux';
export default function Home() {
    const data = useSelector((state) => state.post.data)
    const limit = 5
    const dispatch = useDispatch()

    const getDataPost = async () => {
        const posts = await post.getPosts(data.length / limit + 1, limit);
        if (posts) {
            dispatch(setData(posts))
        }
    }

    useEffect(() => {
        getDataPost()
    }, [])

    return (
        <React.Fragment>
            <Header title="Admin" />
            <ListPosts data={data}/>
        </React.Fragment>
    )
}
