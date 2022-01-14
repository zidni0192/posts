import React from 'react'
import { AppBar, Button, Container, Dialog, FormControl, Grid, IconButton, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Transition from './transition'
export default function Form({ data, title, onAction }) {
    const navigate = useNavigate();

    const onClose = () => {
        navigate(-1)
    }

    const onSubmit = (evt) => {
        const formData = new FormData(evt.currentTarget);
        const tempData = data ? { ...data, title: formData.get('title'), body: formData.get('body') } : { id: new Date().getTime(), title: formData.get('title'), body: formData.get('body') }
        onAction(tempData)
        evt.preventDefault();
        onClose()
    }

    return (
        <Dialog
            fullScreen
            open={true}
            TransitionComponent={Transition}
        >
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            {title}
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Close">
                                <IconButton sx={{ p: 0, color: "#fff" }} onClick={onClose}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <form onSubmit={onSubmit}>
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <Grid xs={12} item>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                label="Title"
                                type="text"
                                name="title"
                                variant="standard"
                                defaultValue={data?.title || ""}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                label="Body"
                                multiline
                                rows={4}
                                name="body"
                                variant="standard"
                                defaultValue={data?.body || ""}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} container justifyContent="flex-end" item>
                        <Button type="submit" autoFocus sx={{ color: '#000', mt: 4 }}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    )
}
