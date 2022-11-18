import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react';
import { Button, Grid, TextField } from '@mui/material';
import {Edit} from '@mui/icons-material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Platform() {

    const navigate = useNavigate();

    const [datas,setData] = useState([]);
    const [platformname,setPlatformname] = useState("");
    const [platformid,setPlatformid] = useState("");
    const [appname,setAppname] = useState("");
    const [website,setwebsite] = useState("");
    const [applicableage,setApplicableAge] = useState("");
    const [rating,setRating] = useState("");
    const [datasecurity,setDataSecurity] = useState("");
    const [insertState,setInsertState] = useState("");
    const [updateRow,setUpdateRow] = useState();
    const [open, setOpen] = useState(false);



    const [platformnamei,setPlatformnamei] = useState("");
    const [platformidi,setPlatformidi] = useState("");
    const [appnamei,setAppnamei] = useState("");
    const [websitei,setwebsitei] = useState("");
    const [applicableagei,setApplicableAgei] = useState("");
    const [ratingi,setRatingi] = useState("");
    const [datasecurityi,setDataSecurityi] = useState("");


    useEffect(() => {
        fetch('http://localhost:4920/platform')
        .then(res => res.json())
        .then(json => {
            setData(json);
        })
    },[,insertState])

    


  const handleClickOpen = (row) => {
    setPlatformnamei(row.name);
    setPlatformidi(row.platform_id);
    setAppnamei(row.app);
    setwebsitei(row.website);
    setApplicableAgei(row.applicable_age);
    setRatingi(row.rating);
    setDataSecurityi(row.data_security);
    setOpen(true);
  };

  const handleClose = () => {
    const dataf = {platformnamei,platformidi,appnamei,websitei,applicableagei,ratingi,datasecurityi};
    console.log(dataf);
    setOpen(false);
    const data = {
        "platform_id" :platformidi,
        "name" :platformnamei,
        "app":appnamei,
        "website":websitei,
        "applicable_age":applicableagei,
        "rating":ratingi,
        "data_secutrity": datasecurityi
    };
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:4920/updateusers', requestOptions ).then(res => res.json())
    .then(data => {
        setInsertState(data.message);
    })


  };

    const updatePermenet = (row) =>{
        
    }

    const deletePermenet = (id) => {
        // const requestOptions = {
        //     method: 'DELETE'
        // };
        // fetch(`http://localhost:4920/users/${id}`, requestOptions)
        // .then(res => res.json())
        // .then(data =>{
        //     console.log(data);
        // })
    }
    // app,website,applicable_age,rating,data_security

    const insertNewPlatform = () => {

        const data = {
            "platform_id" :platformid,
            "name" :platformname,
            "app":appname,
            "website":website,
            "applicable_age":applicableage,
            "rating":rating,
            "data_secutrity": datasecurity
        };
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4920/users', requestOptions ).then(res => res.json())
        .then(data => {
            setInsertState(data.message);
        })


        // setting up null to all the state
        setPlatformname("");
        setPlatformid("");
        setAppname("");
        setwebsite("");
        setApplicableAge("");
        setRating("");
        setDataSecurity("");
    }

  return (
    <>
        <Grid container style={{marginTop:'20px'}} direction="column">
            <Grid item xs = {12}>
                <Grid item xs = {2}>
                    <Button onClick={() => navigate("/")} variant="outlined">Back</Button>
                </Grid>
            </Grid>

            <Grid item xs = {5}> <h2> Add a new Platform </h2> </Grid>
            <Grid item xs = {12} spacing={2} 
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                className="customerTable"
            >
                <Grid item xs = {4} >
                    <TextField id="outlined-basic" label="Platform Name" variant="outlined" onChange={(e) => setPlatformname(e.target.value)} value={platformname} />
                </Grid>
                <Grid item xs = {4}>
                    <TextField id="outlined-basic" label="Platform Id" variant="outlined" onChange={(e) => setPlatformid(e.target.value)} value={platformid} />
                </Grid>
                <Grid item xs = {4}>
                    <TextField id="outlined-basic" label="App Name" variant="outlined" onChange={(e) => setAppname(e.target.value)} value={appname} />
                </Grid>
                <Grid item xs = {4}>
                    <TextField id="outlined-basic" label="Website Name" variant="outlined" onChange={(e) => setwebsite(e.target.value)}  value={website} />
                </Grid>
                <Grid item xs = {4}>
                    <TextField id="outlined-basic" label="Applicable Age" variant="outlined" onChange={(e) => setApplicableAge(e.target.value)} value={applicableage} />
                </Grid>
                <Grid item xs = {4}>
                    <TextField id="outlined-basic" label="Rating" variant="outlined" onChange={(e) => setRating(e.target.value)} value={rating} />
                </Grid>
                <Grid item xs = {12} direction="column" spacing={2}>
                    <Grid item xs = {6}>
                        <TextField id="outlined-basic" label="Data security" variant="outlined" onChange={(e) => setDataSecurity(e.target.value)} value={datasecurity} />
                    </Grid>
                    <Grid item xs = {6} spacing={2}>
                        <Button onClick={insertNewPlatform} variant="contained" style={{margin:"15px"}}>Submit</Button>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>

        <TableContainer component={Paper} className="customerTable" sx={{ boxShadow: 3 }}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Platform ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">App Name</TableCell>
                    <TableCell align="center">Website</TableCell>
                    <TableCell align="center">Applicable Age</TableCell>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Data Security</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {datas.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{row.platform_id}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.app}</TableCell>
                    <TableCell align="center">{row.website}</TableCell>
                    <TableCell align="center">{row.applicable_age}</TableCell>
                    <TableCell align="center">{row.rating}</TableCell>
                    <TableCell align="center">{row.data_security == true ? "Yes" : "No"}</TableCell>
                    <TableCell aligh="center"><Edit onClick={() => handleClickOpen(row)}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Platform</DialogTitle>
        <DialogContent>
          <DialogContentText className='popup'>
           Change the parameter that you want to change to database
          </DialogContentText>
        
        <Grid container direction="column" >
            <Grid item xs = {12} spacing={2} 
                container
                direction="row"
                
            >
            <Grid item xs = {3} >
                <TextField id="outlined-basic" label="Platform Name" variant="outlined" onChange={(e) => setPlatformnamei(e.target.value)} value={platformnamei} focused />
            </Grid>
            <Grid item xs = {3}>
                <TextField id="outlined-basic" label="Platform Id" variant="outlined" onChange={(e) => setPlatformidi(e.target.value)} value={platformidi} focused disabled />
            </Grid>
            <Grid item xs = {3}>
                <TextField id="outlined-basic" label="App Name" variant="outlined" onChange={(e) => setAppnamei(e.target.value)} value={appnamei} focused/>
            </Grid>
            <Grid item xs = {3}>
                <TextField id="outlined-basic" label="Website Name" variant="outlined" onChange={(e) => setwebsitei(e.target.value)}  value={websitei} focused />
            </Grid>
            <Grid item xs = {3}>
                <TextField id="outlined-basic" label="Applicable Age" variant="outlined" onChange={(e) => setApplicableAgei(e.target.value)} value={applicableagei} focused/>
            </Grid>
            <Grid item xs = {3}>
                <TextField id="outlined-basic" label="Rating" variant="outlined" onChange={(e) => setRatingi(e.target.value)} value={ratingi} focused/>
            </Grid>
            <Grid item xs = {3}>
                    <TextField id="outlined-basic" label="Data security" variant="outlined" onChange={(e) => setDataSecurityi(e.target.value)} value={datasecurityi} focused />
                </Grid>
            <Grid item xs = {12} direction="column" spacing={2}>
                <Grid conatainer item xs = {6} spacing={2}>
                    <Button onClick={handleClose} variant="contained" style={{margin:"15px"}}>Submit</Button>
                </Grid>
            </Grid>

            </Grid>

        </Grid>
        </DialogContent>
      </Dialog>


        
    
    </>
  )
}

export default Platform