import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, FormControl, MenuItem, TextField, Select, Typography } from '@mui/material';
import user from '../../api/user';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const result = await user.login(formData.get('userId'), formData.get('email'), formData.get('loginAs'))
    if (result) {
      localStorage.setItem('user', result)
      navigate('/', { replace: true })
    } else {

    }
  }
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1, marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <Grid item xs={12} sm container>
          <Typography variant="h6" sx={{ m: 1, fontWeight: 700 }} >
            Login
          </Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              label="UserId"
              name="userId"
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, my: 2 }}>
            <Select
              defaultChecked="Admin"
              defaultValue={1}
              label="Login as"
              name="loginAs"
              variant="standard"
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={0}>User</MenuItem>
            </Select>
          </FormControl>
          <Grid direction="row" justifyContent="flex-end" container>
            <Button sx={{ m: 1 }} variant="outlined" size="large" type='reset'>
              Cancel
            </Button>
            <Button sx={{ m: 1 }} variant="contained" size="large" type='submit'>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}