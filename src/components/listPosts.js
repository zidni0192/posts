import React from 'react'
import { List, ListItem, ListItemText, Box, Grid, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, ListItemButton } from '@mui/material'
import { Favorite, MoreVert } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { removeData, setLiked, setUnliked } from '../redux/reducers/post'
import Transition from '../components/transition'
import { useNavigate } from 'react-router'
export default function ListPosts({ data }) {
    const liked = useSelector((state) => state.post.liked)
    const user = useSelector((state) => state.user.data)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenDialog = () => {
        handleMenuClose()
        setOpen(true);
    };

    const handleEdit = () => {
        navigate(`/admin/posts/${selectedData.id}/edit`)
    };

    const onLike = (item, isLiked) => {
        if (!isLiked) {
            dispatch(setLiked(item))
        } else {
            dispatch(setUnliked(item))
        }
    }

    const handleMenu = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedData(data[index])
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(removeData(selectedData.id))
        handleClose()
    };

    const handleView = (id) => {
        navigate(`/admin/posts/${id}`)
    }

    return (
        <>
            <List sx={{ bgcolor: 'background.paper' }} >
                {data ? liked && data.map((item, index) => {
                    const findIndexLiked = liked.findIndex(likedItem => Number(likedItem.id) === Number(item.id))
                    const isLiked = findIndexLiked >= 0
                    return (
                        <ListItem
                            alignItems="flex-start"
                            sx={{ p: 0, backgroundColor: index % 2 !== 0 ? '#fff' : '#eee' }}
                            key={`${item.title}-${index}`}
                            secondaryAction={
                                !Number(user.isAdmin) ? (
                                    <IconButton
                                        edge="end"
                                        aria-label="comments"
                                        sx={{ color: !isLiked ? '#fff' : '#a00', backgroundColor: '#ddd', mx: 2 }}
                                        onClick={() => { onLike(item, isLiked) }}
                                    >
                                        <Favorite />
                                    </IconButton>
                                ) : (
                                    <>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls={`menu-more${index}`}
                                            aria-haspopup="true"
                                            onClick={(evt) => handleMenu(evt, index)}
                                            color="inherit"
                                        >
                                            <MoreVert />
                                        </IconButton>
                                        <Menu
                                            id={`menu-more${index}`}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                            <MenuItem
                                                data-id={index}
                                                onClick={handleOpenDialog}
                                            >
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )
                            }
                        >
                            <ListItemButton onClick={() => handleView(item.id)} sx={{ px: 4 }}>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        <React.Fragment>
                                            {item.body}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                }) : (
                    <Box>
                        <Grid container justifyContent="center" sx={{ py: 4 }}>
                            Tidak ada data
                        </Grid>
                    </Box>
                )}
            </List >
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>no</Button>
                    <Button onClick={handleDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}