import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity, removeQuantity } from "../../store/cartSlice";
import Button from '@mui/material/Button';
import "./Cart.scss"
import bookLogo from "../../Assets/book1.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PlaceIcon from '@mui/icons-material/Place';
import Signup from "../Signup/Signup";
import { useNavigate } from "react-router-dom";


function Cart() {
    const token = localStorage.getItem('accessToken');
    const cartDetails = useSelector(store => store.allcartDetails.cartDetails)
    const allBookDetails = useSelector(store => store.allbooksStore.allBooks)
    const [cartCount, setCartCount] = useState(0)
    const [signupModalOpen, setSignupModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    console.log(cartDetails);

    useEffect(() => {
        setCartCount(cartDetails.length)
    }, [cartDetails])
    function handleClick(action, book) {
        // if (action === 'addbook') {
        //     setBookQuantity(1);
        //     const bookToAdd = bookInCart || { ...bookDetail, quantity: 1 };
        //     dispatch(addBooktoCart(bookToAdd));
        // }
        if (action === 'decreaseQuantity') {
            const bookToAdd = { ...book, quantity: -1 };
            dispatch(decreaseQuantity(bookToAdd))
        }
        if (action === 'increaseQuantity') {
            const bookToAdd = { ...book, quantity: +1 };
            dispatch(increaseQuantity(bookToAdd))
        }
        if (action === 'removeQuantity') {
            dispatch(removeQuantity(book))
        }
    }
    const openSignupModal = (event) => {
        setSignupModalOpen(true);
    };
    function handlePlaceOrder(){
        if (!token){
            openSignupModal();
            return;
        }
    }

    return (
        <>
            <div className="cart-main-cnt">
                <div className="cart-name-sort-opt-main-cnt">
                    <div className="cart-total-count-main-cnt">
                        <p id="cart-book-text" onClick={()=>navigate(`/dashboard`)}>Home/</p>
                        <p id="cart-total-count">My Cart</p>
                    </div>
                </div>
                <div className="cart-container-inner-cnt">
                    <div className="cart-header-main-cnt">
                        <h1 className="cart-title">My Cart ({cartCount})</h1>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small" id="demo-select-small-label-cart">
                            <InputLabel id="demo-select-small-label"><PlaceIcon id="demo-select-small-label-location-logo" /> Use Current Location</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Sort by relevance  "
                            >
                                <MenuItem value={10}>Bengaluru</MenuItem>
                                <MenuItem value={20}>chelur</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {cartDetails?.map((book, key) =>
                        <div key={key} className="cart-items-main-cnt">
                            <div className="cart-items-main-info-cnt">
                                <div className="cart-items-main-info-img-cnt">
                                    <img src={bookLogo} alt="" />
                                </div>
                                <div className="cart-items-main-info-txt-cnt">
                                    <p id="cart-book-name-btn">{book.bookName}</p>
                                    <p id="cart-book-author-btn">{book.author}</p>
                                    <div className="cart-item-details">
                                        <span id="cart-item-discountedPrice">Rs.{book.discountPrice}</span>
                                        <span id="cart-item-originalPrice">Rs.{book.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-items-main-quantity-cnt">
                                <div className="cart-quantityControl-ctn">
                                    <button id="cart-decrease-btn" onClick={() => handleClick('decreaseQuantity', book)}><RemoveIcon /></button>
                                    <span id="cart-quantity-btn">{book.quantity}</span>
                                    <button id="cart-increase-btn" onClick={() => handleClick('increaseQuantity', book)}><AddIcon /></button>
                                </div>
                                <Button variant="contained" onClick={() => handleClick('removeQuantity', book)} id="cart-remove-btn">Remove</Button>
                            </div>
                        </div>
                    )}
                    <div className="cart-actions-main-cnt">
                        <Button variant="contained" id="cart-place-order-btn" onClick={()=>handlePlaceOrder()}>PLACE ORDER</Button>
                    </div>
                </div>
                <div className="cart-address-details-main-cnt">Address Details</div>
                <div className="cart-order-details-main-cnt">Order Summary</div>
            </div>
            <Signup open={signupModalOpen} handleClose={() => setSignupModalOpen(false)} />
        </>
    )
}

export default Cart;

