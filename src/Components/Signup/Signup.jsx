import "./Signup.scss"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import loginImg from "../../Assets/login-img.png"
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { userLoginApi, userSignUpApi } from "../../Services/userService";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";



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
    const navigate = useNavigate()

    async function handleClick(action) {
        if (action === "signup") {
            const data = {
                "fullName": fullname,
                "email": email,
                "password": password,
                "phone": phoneNumber
            }
            try {
                const res = await userSignUpApi(data)
                if (res.status === 200) {
                    handleClose()
                    toast.success("User Registered SuccessFully")
                }
            } catch (error) {
                toast.error("Something Went Wrong")
            }
        }
        if (action === "login") {
            const data = {
                "email": email,
                "password": password            }
            try {
                const res = await userLoginApi(data)
                localStorage.setItem('token', res?.data?.result?.accessToken)
                if (res.status === 200) {
                    handleClose()
                    toast.success("User Login Success")
                }
            } catch (error) {
                toast.error("Something Went Wrong")
            }
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
                            <p onClick={() => setShowLogin(true)} style={{ color: showLogin ? '#0A0102' : '#878787',cursor: 'pointer'}}>LOGIN</p>
                            <p onClick={() => setShowLogin(false)} style={{ color: !showLogin ? '#0A0102' : '#878787',cursor: 'pointer'}}>SIGNUP</p>
                        </div>
                        {showLogin ?
                            <>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Email id</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Password</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" onChange={(e) => setPasword(e.target.value)} />
                                    <p id="header-profile-main-login-inp-pass-forgot-txt">Forgot Password?</p>
                                </div>
                                <Button variant="contained" id='header-profile-main-login-signup-cnt' onClick={() => handleClick('login')}>Login</Button>
                                <div className='header-profile-main-login-inp-txt-main-or-cnt'>
                                    <hr id="header-profile-main-login-line" />
                                    <p>OR</p>
                                    <hr id="header-profile-main-login-line" />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-log-cnt'>
                                    <Button variant="contained" id='header-profile-main-login-facebook-cnt'>Facebook</Button>
                                    <Button variant="contained" id='header-profile-main-login-google-cnt'>Google</Button>
                                </div>
                            </>
                            : <>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Full Name</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" onChange={(e) => { setFullname(e.target.value) }} />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Email id</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Password</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" onChange={(e) => { setPasword(e.target.value) }} />
                                </div>
                                <div className='header-profile-main-login-inp-txt-main-cnt'>
                                    <p>Mobile Number</p>
                                    <input id="header-profile-main-login-inp-cnt" type="text" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                </div>
                                <Button variant="contained" id='header-profile-main-login-signup-cnt' onClick={() => handleClick('signup')}>SIGNUP</Button>

                            </>}
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default Signup;