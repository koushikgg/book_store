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
import TextField from '@mui/material/TextField';



function Cart() {
    const token = localStorage.getItem('token');
    const cartDetails = useSelector(store => store.allcartDetails.cartDetails)
    const allBookDetails = useSelector(store => store.allbooksStore.allBooks)
    const [cartCount, setCartCount] = useState(0)
    const [signupModalOpen, setSignupModalOpen] = React.useState(false);
    const [customerDetails, setCustomerDetails] = useState(false)
    const [orderDetails, setOrderDetails] = useState(false)
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
    function handlePlaceOrder() {
        if (!token) {
            openSignupModal();
            return;
        } else {
            setCustomerDetails(true)
        }
    }

    return (
        <>
            <div className="cart-main-cnt">
                <div className="cart-name-sort-opt-main-cnt">
                    <div className="cart-total-count-main-cnt">
                        <p id="cart-book-text" onClick={() => navigate(`/dashboard`)}>Home/</p>
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
                        {!customerDetails && <Button variant="contained" id="cart-place-order-btn" onClick={() => handlePlaceOrder()}>PLACE ORDER</Button>
                        }
                    </div>
                </div>
                {customerDetails ?
                    <div className="cart-address-details-main1-cnt">
                        <div className="cart-address-details-customer-txt-btn-cnt">
                            <p>Customer Details</p>
                            <Button variant="outlined" id='cart-address-details-customer-btn' ><p>Add New Address</p></Button>
                        </div>
                        <div className="cart-address-details-customer-name-num-inp-cnt">
                            <div className="cart-address-details-customer-name-inp-cnt">
                                <p>Full Name</p>
                                <input type="text" />
                            </div>
                            <div className="cart-address-details-customer-name-inp-cnt">
                                <p>Mobile Number</p>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="cart-address-details-customer-address-main-cnt">
                            <div className="cart-address-details-customer-address-txt1-cnt">
                                <p id="cart-address-details-customer-address-txt1 ">1.Work</p>
                                <p id="cart-address-details-customer-address-txt2">Edit</p>
                            </div>
                            <div className="cart-address-details-customer-address-inner-cnt">
                                <p>Address</p>
                                <TextField id="outlined-multiline-flexible " multiline maxRows={4} />
                            </div>
                            <div className="cart-address-details-customer-name-num-inp-cnt address-city-state-cnt">
                                <div className="cart-address-details-customer-name-inp-cnt">
                                    <p>City/town</p>
                                    <input type="text" id="cart-address-details-customer-state-inp" />
                                </div>
                                <div className="cart-address-details-customer-name-inp-cnt">
                                    <p>State</p>
                                    <input type="text" id="cart-address-details-customer-state-inp" />
                                </div>
                            </div>
                        </div>
                        <div className="cart-address-details-customer-address-main-display-cnt">
                            <p>2.Home</p>
                            <div className="cart-address-details-customer-address-main-display-inner-cnt">
                                <p>Address</p>
                                <p id="address-display-txt">BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore</p>
                            </div>
                        </div>
                        <div className="cart-address-details-customer-address-last-btn-cnt">
                            {!orderDetails && <Button variant="contained" id="cart-place-order-btn" onClick={() => setOrderDetails(true)}>Continue</Button>
                            }
                        </div>
                    </div>
                    :
                    <div className="cart-address-details-main-cnt">Address Details</div>
                }
                {orderDetails ?
                    <div className="cart-order-details-main1-cnt">
                        <p id="cart-order-summery-main-txt">Order Summery</p>
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
                            </div>
                        )}
                        <div className="cart-order-details-btn-cnt">
                            <Button variant="contained" id="cart-place-order-btn" >CHECKOUT</Button>
                        </div>
                    </div>
                    :
                    <div className="cart-order-details-main-cnt">Order Summary</div>
                }
            </div>
            <Signup open={signupModalOpen} handleClose={() => setSignupModalOpen(false)} />
        </>
    )
}

export default Cart;

