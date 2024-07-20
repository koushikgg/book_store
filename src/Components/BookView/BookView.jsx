import React, { useEffect, useState } from "react";
import './BookView.scss'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addBooktoCart, decreaseQuantity, increaseQuantity } from "../../store/cartSlice";


function BookView() {
    // const { title, author, rating, image, originalPrice, discountedPrice, description } = book;
    const { bookid } = useParams();
    const dispatch = useDispatch();
    const cartDetails = useSelector(store => store.allcartDetails.cartDetails)
    console.log(cartDetails);
    const allBookDetails = useSelector(store => store.allbooksStore.allBooks)
    const bookInCart = cartDetails.find(book => book._id === bookid);
    const bookDetail = allBookDetails.find(book => book._id === bookid);
    
    const quantity = bookInCart ? bookInCart.quantity : 0;
    const [bookQuantity, setBookQuantity] = useState(quantity)
    useEffect(() => {
        setBookQuantity(quantity);
    }, [quantity]);



    function handleClick(action, data) {
        if (action === 'addbook') {
            setBookQuantity(1);
            const bookToAdd = bookInCart || { ...bookDetail, quantity: 1 };
            dispatch(addBooktoCart(bookToAdd));
        }
        if (action === 'decreaseQuantity') {
            setBookQuantity(bookQuantity - 1)
            const bookToAdd = bookInCart || { ...bookDetail, quantity: -1 };
            dispatch(decreaseQuantity(bookToAdd))
        }
        if (action === 'increaseQuantity') {
            setBookQuantity(bookQuantity + 1)
            const bookToAdd = bookInCart || { ...bookDetail, quantity: +1 };
            dispatch(increaseQuantity(bookToAdd))
        }
    }

    return (
        <>
            <div className="bookView">
                <div className="bookView__image">
                    <img src='' alt='' />
                </div>
                <div className="bookView__details">
                    <div className="bookView__title">
                        <a href="#">title</a>
                        <span className="bookView__author">{bookDetail.author}</span>
                    </div>
                    <div className="bookView__rating">
                        <span className="bookView__ratingStars">rating 20</span>
                    </div>
                    <div className="bookView__price">
                        <span className="bookView__originalPrice">Rs.{bookDetail.price}</span>
                        <span className="bookView__discountedPrice">Rs.{bookDetail.discountedPrice}</span>
                    </div>
                    <div className="bookView__description">
                        <p>{bookDetail.description}</p>
                    </div>
                    <div className="bookView__actions">
                        {bookQuantity === 0 ? (
                            <Button variant="contained" onClick={() => handleClick('addbook', bookDetail)}>ADD TO BAG</Button>

                        ) : (
                            <div className="bookView__quantityControl">
                                <button className="bookView__decrease" onClick={() => handleClick('decreaseQuantity', bookDetail)}><RemoveIcon /></button>
                                <span className="bookView__quantity">{bookQuantity}</span>
                                <button className="bookView__increase" onClick={() => handleClick('increaseQuantity', bookDetail)}><AddIcon /></button>
                            </div>
                        )}
                        <Button variant="contained"><FavoriteIcon />WISHLIST</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookView;


