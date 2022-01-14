import React, { useEffect, useState } from 'react'
import { Button, Card, Dialog, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import Transition from '../../components/transition'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import api from '../../api/post'

export default function Edit() {
    const navigate = useNavigate();
    const post = useSelector(state => state.post.data)
    const params = useParams()
    const [data, setData] = useState({})
    const [comments, setComments] = useState([])

    const onChangeParams = () => {
        if (params?.id) {
            setData(post.find(item => Number(item.id) === Number(params.id)))
        }
    }

    const onClose = () => {
        navigate(-1)
    }

    const fetchComments = async () => {
        if (params?.id) {
            let tempComments = await api.getComments(params.id)
            if (tempComments) {
                return setComments(tempComments)
            }
        }
    }

    useEffect(() => {
        onChangeParams()
        fetchComments()
    }, [params])

    return (
        <Dialog
            fullScreen
            open={true}
            TransitionComponent={Transition}
        >
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid xs={12} item sx={{ mb: 5 }}>
                    <Typography variant="h3" component="h3">{data?.title}</Typography>
                </Grid>
                <Grid xs={12} item>
                    <Typography variant="p" component="p">{data?.body}</Typography>
                </Grid>
                <Grid xs={12} item sx={{ mt: 5 }}>
                    <Typography sx={{ bgcolor: "#eee", p: 2, fontWeight: '700', borderTop: '1px solid' }}>
                        Comments
                    </Typography>
                    <Card variant="outlined">
                        <List>
                            {comments.length > 0 && comments.map((item, index) => (
                                <>
                                    <ListItem alignItems="flex-start" key={index}>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={
                                                <React.Fragment>
                                                    {item.body}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    {comments.length !== index + 1 && (<Divider variant="inset" component="li" sx={{ m: 0 }} />)}
                                </>
                            ))}
                        </List>
                    </Card>
                </Grid>
                <Grid xs={12} container justifyContent="flex-end" item>
                    <Button type="submit" autoFocus sx={{ color: '#000', mt: 4 }} onClick={onClose}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        </Dialog >
    )
}
