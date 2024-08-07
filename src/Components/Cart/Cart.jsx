import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, emptyCart, increaseQuantity, removeQuantity } from "../../store/cartSlice";
import Button from '@mui/material/Button';
import "./Cart.scss"
import bookLogo from "../../Assets/book1.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlaceIcon from '@mui/icons-material/Place';
import Signup from "../Signup/Signup";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { placeOrderApi, removeCartListApi, updateCartListApi } from "../../Services/bookService";
import { toast } from 'react-toastify';
import orderPlaced from "../../Assets/orderPlaced.png"


function Cart() {
    const token = localStorage.getItem('accessToken') 
    const cartDetailsList = useSelector(store => store.allcartDetails.cartDetails);
    const [cartDetails, setCartDetails] = useState(cartDetailsList);
    const [cartCount, setCartCount] = useState(cartDetailsList.length);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState(false);
    const [orderDetails, setOrderDetails] = useState(false);
    const [cart, setCart] = useState(true)
    const [fullname, setFullname] = useState('')
    const [mobileNumber, setMobileNumber] = useState()
    const [address, setAdderss] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCartCount(cartDetailsList.length);
        setCartDetails(cartDetailsList);
    }, [cartDetailsList]);

    async function handleClick(action, book) {
        const updatedQuantity = action === 'decreaseQuantity' ? book.quantityToBuy - 1 : book.quantityToBuy + 1;

        if (action !== 'removeQuantity') {
            const bookToUpdate = { ...book, quantityToBuy: updatedQuantity };
            if (token) {
                await updateCartListApi(book.cartId, updatedQuantity);
            }
            action === 'decreaseQuantity' ? dispatch(decreaseQuantity(bookToUpdate)) : dispatch(increaseQuantity(bookToUpdate));
        } else {
            if (token) {
                await removeCartListApi(book.cartId);
            }
            dispatch(removeQuantity(book));
        }
    }

    async function handleCilick(action) {
        const orderAddress = {
            fullname: fullname,
            mobileNumber: mobileNumber,
            address: address,
            city: city,
            state: state
        }
        if (action === 'continue') {
            if (!orderAddress.fullname || !orderAddress.mobileNumber || !orderAddress.address || !orderAddress.city || !orderAddress.state) {
                toast.error("Please provide all required adress details")
            } else {
                setOrderDetails(true)
            }
        }

        if (action === 'checkout') {
            const orderList = cartDetailsList.map(book => ({
                product_id: book._id,
                product_name: book.bookName,
                product_quantity: book.quantityToBuy,
                product_price: book.discountPrice
            }))
            console.log({ orders: orderList }, orderAddress);
            const res = await placeOrderApi({ orders: orderList })
            if (res.data.message==="Order successfully placed!!!"){
                setCart(false)
                dispatch(emptyCart())
            }
        }
        if (action === "continueShopng"){
            setCart(true)
            navigate('/dashboard/allbooks')
        }
    }

    const openSignupModal = () => setSignupModalOpen(true);

    const handlePlaceOrder = () => {
        if (!token) {
            openSignupModal();
        } else {
            setCustomerDetails(true);
        }
    };


    return (
        <>
            {cart ? <>
                <div className="cart-main-cnt">
                    <div className="cart-name-sort-opt-main-cnt">
                        <div className="cart-total-count-main-cnt">
                            <p id="cart-book-text" onClick={() => navigate(`/dashboard/allbooks`)}>Home/</p>
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
                                        <span id="cart-quantity-btn">{book.quantityToBuy}</span>
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
                                    <input type="text" onChange={(e) => setFullname(e.target.value)} />
                                </div>
                                <div className="cart-address-details-customer-name-inp-cnt">
                                    <p>Mobile Number</p>
                                    <input type="text" onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className="cart-address-details-customer-address-main-cnt">
                                <div className="cart-address-details-customer-address-txt1-cnt">
                                    <p id="cart-address-details-customer-address-txt1 ">1.Work</p>
                                    <p id="cart-address-details-customer-address-txt2">Edit</p>
                                </div>
                                <div className="cart-address-details-customer-address-inner-cnt">
                                    <p>Address</p>
                                    <TextField id="outlined-multiline-flexible " multiline maxRows={4} onChange={(e) => setAdderss(e.target.value)} />
                                </div>
                                <div className="cart-address-details-customer-name-num-inp-cnt address-city-state-cnt">
                                    <div className="cart-address-details-customer-name-inp-cnt">
                                        <p>City/town</p>
                                        <input type="text" id="cart-address-details-customer-state-inp" onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className="cart-address-details-customer-name-inp-cnt">
                                        <p>State</p>
                                        <input type="text" id="cart-address-details-customer-state-inp" onChange={(e) => setState(e.target.value)} />
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
                                {!orderDetails && <Button variant="contained" id="cart-place-order-btn" onClick={() => handleCilick("continue")}>Continue</Button>
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
                                                <span id="cart-item-discountedPrice">Rs.{book.discountPrice * book.quantityToBuy}</span>
                                                <span id="cart-item-originalPrice">Rs.{book.price * book.quantityToBuy}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="cart-order-details-btn-cnt">
                                <Button variant="contained" id="cart-place-order-btn" onClick={() => handleCilick("checkout")}>CHECKOUT</Button>
                            </div>
                        </div>
                        :
                        <div className="cart-order-details-main-cnt">Order Summary</div>
                    }
                </div>
                <Signup open={signupModalOpen} handleClose={() => setSignupModalOpen(false)} />
            </>
                :
                <>
                    <div className="cart-order-img-main-cnt">
                        <img src={orderPlaced} alt="" />
                    </div>
                    <div className="cart-main-cnt order-main-cnt">
                        <div className="order-cnt-main-txt">
                            <p id="order-cnt-email-txt">Email us</p>
                            <p id="order-cnt-contact-txt">Contact us</p>
                            <p id="order-cnt-address-txt">Address</p>
                        </div>
                        <div className="order-cnt-main-txt-info-cnt">
                            <div className="order-cnt-main-txt-email-cnt">
                                <p>admin@bookstore.com</p>
                            </div>
                            <div className="order-cnt-main-txt-num-cnt">
                                <p>+91 8163475881</p>
                            </div>
                            <div className="order-cnt-main-txt-address-cnt">
                                <p>42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</p>
                            </div>
                        </div>
                        <div className="order-cnt-main-continue-btn-cnt">
                            <Button variant="contained" id="cart-place-order-btn" onClick={() => handleCilick("continueShopng")}>CONTINUE SHOPING</Button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Cart;




