import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity, removeQuantity } from "../../store/cartSlice";
import Button from '@mui/material/Button';


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
            <div className="cart-container">
                <div className="cart-header">
                    <h1 className="cart-title">My Cart ({cartCount})</h1>
                    <p className="cart-location">Use current location</p>
                </div>
                {cartDetails?.map((book, key) =>
                    <div key={key} className="cart-items">
                        <div className="cart-item">
                            <div className="cart-item-title">{book.bookName}</div>
                            <div className="cart-item-details">
                                <p className="cart-item-price">Rs. 1500</p>
                                <div className="bookView__quantityControl">
                                    <button className="bookView__decrease" onClick={() => handleClick('decreaseQuantity', book)}><RemoveIcon /></button>
                                    <span className="bookView__quantity">{book.quantity}</span>
                                    <button className="bookView__increase" onClick={() => handleClick('increaseQuantity', book)}><AddIcon /></button>
                                </div>
                                <Button variant="contained" onClick={() => handleClick('removeQuantity', book)}>Remove</Button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="cart-actions">
                    <Button variant="contained">PLACE ORDER</Button>
                </div>
                <div className="cart-sections">
                    <div className="cart-section-header">Address Details</div>
                    <div className="cart-section-header">Order Summary</div>
                </div>
            </div>
        </>
    )
}

export default Cart;

