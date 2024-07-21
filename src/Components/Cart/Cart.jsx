import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity, removeQuantity } from "../../store/cartSlice";
import Button from '@mui/material/Button';
import "./Cart.scss"
import bookLogo from "../../Assets/book1.png"


function Cart() {
    const cartDetails = useSelector(store => store.allcartDetails.cartDetails)
    const allBookDetails = useSelector(store => store.allbooksStore.allBooks)
    const [cartCount, setCartCount] = useState(0)
    const dispatch = useDispatch();

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

    return (
        <>
            <div className="cart-main-cnt">
                <div className="cart-name-sort-opt-main-cnt">
                    <div className="cart-total-count-main-cnt">
                        <p id="cart-book-text">Home/</p>
                        <p id="cart-total-count">My Cart</p>
                    </div>
                </div>
                <div className="cart-container-inner-cnt">
                    <div className="cart-header-main-cnt">
                        <h1 className="cart-title">My Cart ({cartCount})</h1>
                        <p className="cart-location">Use current location</p>
                    </div>
                    {cartDetails?.map((book, key) =>
                        <div key={key} className="cart-items-main-cnt">
                            <div className="cart-items-main-info-cnt">
                                <div className="cart-items-main-info-img-cnt">
                                    <img src={bookLogo} alt="" />
                                </div>
                                <div className="cart-items-main-info-txt-cnt">
                                    <p id="cart-book-name-btn">{cartDetails.bookName}Dont make Me Think</p>
                                    <p id="cart-book-author-btn">{cartDetails.author}Koushik</p>
                                    <div className="cart-item-details">
                                        <span id="cart-item-discountedPrice">Rs.1500{cartDetails.discountedPrice}</span>
                                        <span id="cart-item-originalPrice">Rs.2000{cartDetails.price}</span>
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
                        <Button variant="contained" id="cart-place-order-btn" >PLACE ORDER</Button>
                    </div>
                </div>
                <div className="cart-address-details-main-cnt">Address Details</div>
                <div className="cart-order-details-main-cnt">Order Summary</div>
            </div>
        </>
    )
}

export default Cart;

