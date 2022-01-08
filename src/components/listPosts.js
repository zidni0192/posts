import React from 'react'
import { List, ListItem, ListItemText, Typography, Box, Grid, IconButton } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setLiked } from '../redux/reducers/post'

export default function ListPosts({ data }) {
    const liked = useSelector((state) => state.post.liked)
    const dispatch = useDispatch()

    const onLike = (item) => {
        
        let tempLiked = [item, ...liked]
        tempLiked = JSON.stringify(tempLiked)
        localStorage.setItem('liked', tempLiked)
        dispatch(setLiked(item))
    }
    return (
        <List sx={{ bgcolor: 'background.paper' }} >
            {data ? data.map((item, index) => {
                const findIndexLiked = liked.find(likedItem => likedItem.id === item.id)
                console.log(findIndexLiked);
                return (
                    <ListItem
                        alignItems="flex-start"
                        sx={{ px: 4, backgroundColor: index % 2 !== 0 ? '#fff' : '#eee' }}
                        key={index}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments" sx={{ color: findIndexLiked === -1||!findIndexLiked ? '#fff' : '#a00' }} onClick={() => { onLike(item) }}>
                                <Favorite />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={item.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {item.body}
                                </React.Fragment>
                            }
                        />

                    </ListItem>
                )
            }) : (
                <Box>
                    <Grid container justifyContent="center" sx={{ py: 4 }}>
                        Tidak ada data
                    </Grid>
                </Box>
            )}
        </List>
    )
}
