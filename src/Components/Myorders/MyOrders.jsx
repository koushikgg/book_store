import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import bookLogo from "../../Assets/book1.png"
import { useNavigate } from "react-router-dom";
import './MyOrders.scss'

function MyOrders() {
    const myOrderListDetails = useSelector(store => store.booksMyOrderDetails.myOrderListItems)
    const [myOrderList, setMyOrderList] = useState(myOrderListDetails)
    const navigate = useNavigate()


    useEffect(() => {
        setMyOrderList(myOrderListDetails)
    }, [myOrderListDetails])


    return (
        <>

            <div className="wishlist-main-cnt">
                <div className="wishlist-name-sort-opt-main-cnt">
                    <div className="wishlist-total-count-main-cnt">
                        <p id="wishlist-book-text" onClick={() => navigate(`/dashboard/allbooks`)}>Home/</p>
                        <p id="wishlist-total-count">My Order</p>
                    </div>
                </div>
                {(myOrderList.length !== 0) ?
                    <div className="wishlist-container-inner-cnt">
                        {myOrderList?.map((book, key) =>
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

                    </div> :
                    <>
                        <div className="order-cnt-no-order-cnt">
                            <p>No Orders Placed Yet</p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default MyOrders;