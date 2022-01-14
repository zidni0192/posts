import React from 'react'
import Header from '../../components/header';
import ListPosts from '../../components/listPosts';
import { useSelector } from 'react-redux';
export default function Liked() {
    const data = useSelector((state) => state.post.liked)
    return (
        <React.Fragment>
            <Header title="Liked" />
            <ListPosts data={data} />
        </React.Fragment>
    )
}
