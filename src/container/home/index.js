import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import ListPosts from '../../components/listPosts';
import post from '../../api/post'
import { setData } from '../../redux/reducers/post'
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const { data, page } = useSelector((state) => state.post)
    const user = useSelector((state) => state.user.data)
    const limit = 15
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const getFirstDataPost = async () => {
        if (data?.length < 1) {
            getPost(1)
        }
    }

    const getPost = async (page) => {
        if (!user || !user.id || loading) return
        setLoading(true)
        const posts = await post.getPosts(page, limit);
        if (posts && posts?.length > 0) {
            dispatch(setData({ data: posts, page: Math.ceil((data.length + posts.length) / limit) }))
        }
        setLoading(false)
    }

    const handleInfiniteScroll = () => {
        document.addEventListener("scroll", () => {
            if (document.body.scrollHeight <= (window.innerHeight + window.scrollY)) {
                getPost(page + 1)
            }
        })
    }

    useEffect(() => {
        getFirstDataPost()
        handleInfiniteScroll()
    }, [])

    return (
        <React.Fragment>
            <Header title="Admin" />
            <ListPosts data={data} />
        </React.Fragment>
    )
}
