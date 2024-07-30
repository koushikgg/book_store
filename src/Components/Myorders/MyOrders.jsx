import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { deleteItemFromWishList } from "../../store/wishListSlice";
import { useEffect, useState } from "react";
import bookLogo from "../../Assets/book1.png"
import DeleteIcon from '@mui/icons-material/Delete';
import "./WishList.scss"
import { useNavigate } from "react-router-dom";

function MyOrders() {
    const wishListDetails = useSelector(store => store.wishListDetails.wishListItems)
    const [wishList, setWishList] = useState(wishListDetails)
    const [wishlistCount, setWishlistCount] = useState(wishList.length)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(wishListDetails);


    useEffect(() => {
        setWishList(wishListDetails)
        setWishlistCount(wishListDetails.length)
    }, [wishListDetails])

    function handleClick(action, data) {
        if (action === "deleteItemFromWishList") {
            const updatedList = wishList.filter(book => book._id !== data._id)
            setWishList(updatedList)
            dispatch(deleteItemFromWishList(data))
        }
    }

    return (
        <>
            <div className="wishlist-main-cnt">
                <div className="wishlist-name-sort-opt-main-cnt">
                    <div className="wishlist-total-count-main-cnt">
                        <p id="wishlist-book-text" onClick={() => navigate(`/dashboard/allbooks`)}>Home/</p>
                        <p id="wishlist-total-count">My Order</p>
                    </div>
                </div>
                <div className="wishlist-container-inner-cnt">
                    <div className="wishlist-header-main-cnt">
                        <h1 className="wishlist-title">My Wishlist({wishlistCount})</h1>
                    </div>
                    {wishListDetails?.map((book, key) =>
                        <div key={key} className="wishlist-items-main-cnt">
                            <div className="wishlist-items-main-info-cnt">
                                <div className="wishlist-items-main-info-img-cnt">
                                    <img src={bookLogo} alt="" />
                                </div>
                                <div className="wishlist-items-main-info-txt-cnt">
                                    <p id="wishlist-book-name-btn">{book.bookName}</p>
                                    <p id="wishlist-book-author-btn">{book.author}</p>
                                    <div className="wishlist-item-details">
                                        <span id="wishlist-item-discountedPrice">Rs.{book.discountPrice}</span>
                                        <span id="wishlist-item-originalPrice">Rs.{book.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="wishlist-items-main-quantity-cnt">
                                <p id="order-item-ordered-date">Order on the Jan</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default MyOrders;