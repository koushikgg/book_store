import "./Signup.scss"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import loginImg from "../../Assets/login-img.png"
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,

    p: 4,
};

function Signup({ open, handleClose }) {
    const [showLogin, setShowLogin] = useState(false)
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    async function handleClick(action){
        if (action==="signup"){
            let data = {
                "fullName": fullname,
                "email": email,
                "password": password,
                "phone": phoneNumber
              }
            await user
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id='header-profile-main-login-cnt'>
                    <div className='header-profile-main-login-img-cnt'>
                        <img src={loginImg} alt="" />
                        <p>ONLINE BOOK SHOPING</p>
                    </div>
                    <div className='header-profile-main-login-inp-main-cnt'>
                        <div className='header-profile-main-login-inp-txt-cnt'>
                            <p onClick={() => setShowLogin(true)} style={ showLogin ? {color: '#0A0102'} : {color: '#878787'} }>LOGIN</p>
                            <p onClick={() => setShowLogin(false)} style={ !showLogin ? {color: '#0A0102'} : {color: '#878787'} }>SIGNUP</p>
                        </div> 
                        {showLogin ?
                            <>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Email id</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Password</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" />
                                    <p id="header-profile-main-login-inp-pass-forgot-txt">Forgot Password?</p>
                                </div>
                                <Button variant="contained" id='header-profile-main-login-signup-cnt'>Login</Button>
                                <div className='header-profile-main-login-inp-txt-main-or-cnt'>
                                    <hr id="header-profile-main-login-line"/>
                                    <p>OR</p>
                                    <hr id="header-profile-main-login-line"/>
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-log-cnt'>
                                    <Button variant="contained" id='header-profile-main-login-facebook-cnt'>Facebook</Button>
                                    <Button variant="contained" id='header-profile-main-login-google-cnt'>Google</Button>
                                </div>
                            </>
                            : <>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Full Name</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Email id</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Password</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Mobile Number</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" />
                                </div>
                                <Button variant="contained" id='header-profile-main-login-signup-cnt' onClick={()=>handleClick('signup' )}>SIGNUP</Button>

                            </>}
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default Signup;