import React from 'react'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon, MoreVert, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function Header({ title }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useSelector((state) => state.user.data)
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectLiked = () => {
        navigate('/liked-posts')
    };

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('liked')
        handleClose()
        navigate('/login', { replace: true })
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, color: "#fff" }}>
                    {title}
                </Typography>
                <div>
                    {!Number(user.isAdmin) && (
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={redirectLiked}
                        >
                            <Favorite />
                        </IconButton>
                    )}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
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
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
