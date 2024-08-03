import "./Signup.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import loginImg from "../../Assets/login-img.png"
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { userLoginApi, userSignUpApi } from "../../Services/userService";
import { toast } from 'react-toastify';
import { addToCartListApi, addToWishListApi, getWishlistItemsApi, getallCartDetailsApi, updateCartListApi } from "../../Services/bookService";
import { useDispatch, useSelector } from "react-redux";
import { addBooktoCart, updateQuantity } from "../../store/cartSlice";
import { addItemToWishList } from "../../store/wishListSlice";


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
    const cartDetails = useSelector(store => store.allcartDetails.cartDetails)
    const wishListDetails = useSelector(store => store.wishListDetails.wishListItems)
    const dispatch = useDispatch();
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
                "password": password
            }
            try {
                const res = await userLoginApi(data)
                localStorage.setItem('accessToken', res?.data?.result?.accessToken)
                const fetchedCartList = await getallCartDetailsApi()
                const fetchedWishList = await getWishlistItemsApi()
                console.log("cart",fetchedCartList);

                if (cartDetails.length !== 0 && fetchedCartList.length === 0) {
                    for (const item of cartDetails) {
                        await addToCartListApi(item._id);

                        const updatedFetchedCartList = await getallCartDetailsApi();
                        const matchingBook = updatedFetchedCartList.find(book => item._id === book.product_id._id);

                        if (matchingBook) {
                            dispatch(updateQuantity({ ...item, cartId: matchingBook._id }));
                            await updateCartListApi(matchingBook._id, item.quantityToBuy);
                        }
                    }
                }
                if (cartDetails.length === 0 && fetchedCartList.length !== 0) {
                    for (const item of fetchedCartList) {
                        dispatch(addBooktoCart({ ...item.product_id, cartId: item._id, }))
                        dispatch(updateQuantity({ ...item.product_id, cartId: item._id, quantityToBuy: item.quantityToBuy }))
                    }
                }
                if (cartDetails.length !== 0 && fetchedCartList.length !== 0) {
                    const cartList = new Map(cartDetails.map((item) => [item._id, item]))
                    const fetchcartList = new Map(fetchedCartList.map((item) => [item.product_id._id, item]))

                    for (const item of fetchedCartList) {
                        if (!cartList.has(item.product_id._id)) {
                            dispatch(addBooktoCart({ ...item.product_id, cartId: item._id, quantityToBuy: item.quantityToBuy }))
                            dispatch(updateQuantity({ ...item.product_id, cartId: item._id, quantityToBuy: item.quantityToBuy }))
                        }
                    }
                    for (const item of cartDetails) {
                        if (!fetchcartList.has(item._id)) {
                            await addToCartListApi(item._id);

                            const updatedFetchedCartList = await getallCartDetailsApi();
                            const matchingBook = updatedFetchedCartList.find(book => item._id === book.product_id._id);

                            if (matchingBook) {
                                dispatch(updateQuantity({ ...item, cartId: matchingBook._id }));
                                await updateCartListApi(matchingBook._id, item.quantityToBuy);
                            }
                        }

                    }
                    for (const [itemId, fetchData] of fetchcartList) {
                        if (cartList.has(itemId)) {
                            let cartItem = cartDetails.find(item => item._id === itemId)
                            if (cartItem.quantityToBuy !== fetchData.quantityToBuy) {
                                dispatch(updateQuantity({ ...cartItem, quantityToBuy: fetchData.quantityToBuy }))
                            }
                        }
                    }
                }

                if (wishListDetails.length !== 0 && fetchedWishList.length === 0) {
                    for (const item of wishListDetails) {
                        await addToWishListApi(item._id)
                        await updateCartListApi(item._id, item.quantityToBuy)
                    }
                }
                if (wishListDetails.length === 0 && fetchedWishList.length !== 0) {
                    for (const item of fetchedWishList) {
                        dispatch(addItemToWishList(item.product_id))
                    }
                }
                if (wishListDetails.length !== 0 && fetchedWishList.length !== 0) {
                    const wishList = new Map(wishListDetails.map((item) => [item._id, item]))
                    const fetchWishList = new Map(fetchedWishList.map((item) => [item.product_id._id, item.product_id]))

                    for (const item of fetchedWishList) {
                        if (!wishList.has(item.product_id._id)) {
                            dispatch(addItemToWishList(item.product_id))
                        }
                    }
                    for (const item of wishListDetails) {
                        if (!fetchWishList.has(item._id)) {
                            await addToWishListApi(item._id)
                        }
                    }

                }

                if (res.status === 200) {
                    handleClose()
                    toast.success("User Login Success")
                }
            } catch (error) {
                console.log(error);
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
                            <p onClick={() => setShowLogin(true)} style={{ color: showLogin ? '#0A0102' : '#878787', cursor: 'pointer' }}>LOGIN</p>
                            <p onClick={() => setShowLogin(false)} style={{ color: !showLogin ? '#0A0102' : '#878787', cursor: 'pointer' }}>SIGNUP</p>
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