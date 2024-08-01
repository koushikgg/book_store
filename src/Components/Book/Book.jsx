import booklogo from '../../Assets/book1.png';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import './Book.scss'
import { useNavigate } from 'react-router-dom';



function Book({ bookDetails, key }) {
    const navigate = useNavigate();
    return (
        <>
            <div key={key} className="book-main-cnt" onClick={()=>navigate(`/dashboard/bookview/${bookDetails._id}`)}>
                <div className="book-img-main-cnt">
                    <img src={booklogo} alt="" />
                </div>
                <div className="book-details-main-cnt">
                    <p id='book-details-bookname'>{bookDetails.bookName}</p>
                    <p id='book-details-auther-name'>{bookDetails.author}</p>
                    <div className="book-details-rating-count-cnt">
                        <p id='book-details-bookrating'>4.5 <StarOutlinedIcon id='book-details-bookrating-star' /></p>
                        <p id='book-details-bookcount'>({bookDetails.quantity})</p>
                    </div>
                    <div className="book-details-price-cnt">
                        <p id='book-details-book-price'>Rs. {bookDetails.discountPrice}</p>
                        <p id='book-details-book-actual-price'>Rs{bookDetails.price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book;