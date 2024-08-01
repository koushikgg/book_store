import React, { useEffect, useState } from "react";
import './BookView.scss'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addBooktoCart, decreaseQuantity, increaseQuantity } from "../../store/cartSlice";
import { addItemToWishList } from "../../store/wishListSlice";
import bookLogo from "../../Assets/book1.png"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { addToCartListApi, addToWishListApi } from "../../Services/bookService";


function BookView() {
    // const { title, author, rating, image, originalPrice, discountedPrice, description } = book;
    const { bookid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartDetails = useSelector(store => store.allcartDetails.cartDetails)
    const wishListDetails = useSelector(store => store.wishListDetails.wishListItems)
    const allBookDetails = useSelector(store => store.allbooksStore.allBooks)
    const bookInCart = cartDetails.find(book => book._id === bookid);
    const bookExists = wishListDetails.some(book => book._id === bookid);
    const bookDetail = allBookDetails.find(book => book._id === bookid);
    const token = localStorage.getItem('token')

    const quantity = bookInCart ? bookInCart.quantityToBuy : 0;
    const [bookQuantity, setBookQuantity] = useState(quantity)
    const [addWish, setAddWish] = useState(false)
    useEffect(() => {
        setBookQuantity(quantity);
    }, [quantity]);
    
    useEffect(() => {
        if (bookExists) {
            setAddWish(true)
        } else {
            setAddWish(false)
        }
    }, [wishListDetails]);


    async function handleClick(action, data) {
        if (action === 'addbook') {
            setBookQuantity(1);
            if (token){
                await addToCartListApi(bookid, token)
            }
            const bookToAdd = bookInCart || { ...bookDetail, quantityToBuy: 1 };
            dispatch(addBooktoCart(bookToAdd));
        }
        if (action === 'decreaseQuantity') {
            setBookQuantity(bookQuantity - 1)
            const bookToAdd = bookInCart || { ...bookDetail, quantityToBuy: -1 };
            dispatch(decreaseQuantity(bookToAdd))
        }
        if (action === 'increaseQuantity') {
            setBookQuantity(bookQuantity + 1)
            const bookToAdd = bookInCart || { ...bookDetail, quantityToBuy: +1 };
            dispatch(increaseQuantity(bookToAdd))
        }
        if (action === 'addToWishList') {
            if (token){
                await addToWishListApi(bookid)
            }
            setAddWish(true)
            const bookToAdd = bookInCart || { ...bookDetail, quantityToBuy: +1 };
            dispatch(addItemToWishList(bookToAdd))
        }
    }

    return (
        <>
            <div className="bookview-main-cnt ">
                <div className="bookview-name-sort-opt-main-cnt">
                    <div className="bookview-total-count-main-cnt">
                        <p id="bookview-total-count" onClick={()=>navigate(`/dashboard`)}>Home/</p>
                        <p id="bookview-book-text">Book()</p>
                    </div>
                </div>
                <div className="bookView-inner-main-cnt">
                    <div className="bookView-image-main-cnt">
                        <div className="bookView-small-image-cnt">
                            <div className="bookView-small-image-inner-cnt" >
                                <img src={bookLogo} alt="" />
                            </div>
                            <div className="bookView-small-image-inner1-cnt">
                                <img src={bookLogo} alt="" />
                            </div>
                        </div>
                        <div className="bookView-main-image-cnt">
                            <div className="bookView-inner-main-image-cnt">
                                <img src={bookLogo} alt='' />
                            </div>
                            <div className="bookView-main-image-opt-cnt">
                                {bookQuantity <= 0 ? (
                                    <Button variant="contained" onClick={() => handleClick('addbook', bookDetail)} id="bookView-addtobag-btn">ADD TO BAG</Button>

                                ) : (
                                    <div className="bookView-quantityControl-ctn">
                                        <button id="bookView-decrease-btn" onClick={() => handleClick('decreaseQuantity', bookDetail)}><RemoveIcon /></button>
                                        <span id="bookView-quantity-btn">{bookQuantity}</span>
                                        <button id="bookView-increase-btn" onClick={() => handleClick('increaseQuantity', bookDetail)}><AddIcon /></button>
                                    </div>
                                )}
                                <Button variant="contained" onClick={() => handleClick('addToWishList', bookDetail)} id="bookView-wishlist-btn"><FavoriteIcon style={addWish ? { color: "red" } : { color: "white" }} />WISHLIST</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bookView-details-main-cnt">
                        <div className="bookView-details-title-main-cnt">
                            <a href="#" id="bookView-details-title">{bookDetail.bookName}</a>
                            <span className="bookView-details-author">{bookDetail.author}</span>
                            <span className="bookView__ratingStars">4.5 <StarOutlinedIcon id="bookView-details-star"/></span>
                            <div className="bookView-details-title-price-cnt">
                                <span className="bookView-details-discountedPrice">Rs.{bookDetail.discountPrice}</span>
                                <span className="bookView-details-originalPrice">Rs.{bookDetail.price}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="bookView-description-main-cnt">
                            <p id="bookView-details-book-title">*Book Details</p>
                            <p id="bookView-details-book-title-description">{bookDetail.description}Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus bookExists</p>
                        </div>
                        <hr />
                        <div className="bookView-customer-main-cnt">
                            <p id="bookView-customer-title-cnt">Customer Feedback</p>
                            <div className="bookView-customerfeedback-main-cnt">
                                <span>Overall rating</span>
                                <div className="bookView-customerrating-star-main-cnt">
                                    <StarBorderOutlinedIcon id='bookView-customerrating-star-cnt' />
                                    <StarBorderOutlinedIcon id='bookView-customerrating-star-cnt' />
                                    <StarBorderOutlinedIcon id='bookView-customerrating-star-cnt' />
                                    <StarBorderOutlinedIcon id='bookView-customerrating-star-cnt' />
                                    <StarBorderOutlinedIcon id='bookView-customerrating-star-cnt' />
                                </div >
                                <input type="text" placeholder="Write your review" />
                                <div className="bookView-rating-submit-btn-cnt">
                                    <Button variant="contained" id="bookView-rating-submit-btn">Submit</Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookView;


