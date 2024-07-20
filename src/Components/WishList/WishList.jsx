import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { deleteItemFromWishList } from "../../store/wishListSlice";
import { useEffect, useState } from "react";


function Wishlist() {
    const wishListDetails = useSelector(store => store.wishListDetails.wishListItems)
    const [wishList, setWishList]= useState(wishListDetails)
    const wishlistCount = wishList.length
    const dispatch = useDispatch()
    console.log(wishListDetails);

    function handleClick(action, data) {
        if (action === "deleteItemFromWishList") {
            const updatedList =wishList.filter(book=>book._id!==data._id)
            setWishList(updatedList)
            dispatch(deleteItemFromWishList(data))
        }   
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-header">
                    <h1 className="cart-title">My Cart ({wishlistCount})</h1>
                    <p className="cart-location">Use current location</p>
                </div>
                {wishList?.map((book, key) =>
                    <div key={key} className="cart-items">
                        <div className="cart-item">
                            <div className="cart-item-title">{book.bookName}</div>
                            <div className="cart-item-details">
                                <p className="cart-item-price">Rs. 1500</p>
                                <Button variant="contained" onClick={() => handleClick('deleteItemFromWishList', book)}>Remove</Button>
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

export default Wishlist;