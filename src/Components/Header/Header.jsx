import './Header.scss'
import BookLogo from "../../Assets/education.svg";
import loginImg from "../../Assets/login-img.png"
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import  React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getAllBooksApi } from '../../Services/bookService';
import { useDispatch } from 'react-redux';
import { getAllBooks } from '../../store/bookListSlice';
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,

    p: 4,
};

function Header() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const openModal = Boolean(anchorE2);
    const dispatch = useDispatch();
    // const [openModal, setOpenModal] = React.useState(false);
    useEffect(()=>{
        fectchBooks()
    },[])

    async function fectchBooks(){
        // const res= await getAllBooksApi();
        // const list = res?.data?.result
        const bookList = [
            {
              _id: '1',
              bookName: 'The Great Gatsby',
              author: 'F. Scott Fitzgerald',
              quantity: 5,
              discountPrice: 200,
              price: 300,
              booklogo: 'path/to/gatsby.jpg'
            },
            {
              _id: '2',
              bookName: '1984',
              author: 'George Orwell',
              quantity: 8,
              discountPrice: 150,
              price: 250,
              booklogo: 'path/to/1984.jpg'
            },
            {
              _id: '3',
              bookName: 'To Kill a Mockingbird',
              author: 'Harper Lee',
              quantity: 7,
              discountPrice: 180,
              price: 280,
              booklogo: 'path/to/mockingbird.jpg'
            },
            {
              _id: '4',
              bookName: 'Pride and Prejudice',
              author: 'Jane Austen',
              quantity: 6,
              discountPrice: 220,
              price: 320,
              booklogo: 'path/to/pride.jpg'
            },
            {
              _id: '5',
              bookName: 'The Catcher in the Rye',
              author: 'J.D. Salinger',
              quantity: 9,
              discountPrice: 170,
              price: 270,
              booklogo: 'path/to/catcher.jpg'
            },
            {
              _id: '6',
              bookName: 'The Hobbit',
              author: 'J.R.R. Tolkien',
              quantity: 4,
              discountPrice: 230,
              price: 330,
              booklogo: 'path/to/hobbit.jpg'
            },
            {
              _id: '7',
              bookName: 'Moby-Dick',
              author: 'Herman Melville',
              quantity: 3,
              discountPrice: 210,
              price: 310,
              booklogo: 'path/to/mobydick.jpg'
            },
            {
              _id: '8',
              bookName: 'War and Peace',
              author: 'Leo Tolstoy',
              quantity: 2,
              discountPrice: 250,
              price: 350,
              booklogo: 'path/to/warandpeace.jpg'
            },
            {
              _id: '9',
              bookName: 'The Odyssey',
              author: 'Homer',
              quantity: 10,
              discountPrice: 160,
              price: 260,
              booklogo: 'path/to/odyssey.jpg'
            },
            {
              _id: '10',
              bookName: 'The Divine Comedy',
              author: 'Dante Alighieri',
              quantity: 1,
              discountPrice: 240,
              price: 340,
              booklogo: 'path/to/divinecomedy.jpg'
            }
          ];
          
        // console.log(list);
        dispatch(getAllBooks(bookList))
    }

    const handleClickModal = (event) => {
        setAnchorE2(event.currentTarget);
    }
    const handleCloseModal = () => {
        setAnchorE2(null);
    };
    // const handleOpenModal = () => setOpenModal(true);
    // const handleCloseModal = () => setOpenModal(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <div className="header-main-cnt">
                <div className="header-logo-search-main-cnt">
                    <div className='header-logo-main-cnt' onClick={()=>navigate(`/dashboard`)}>
                        <img src={BookLogo} alt="" />
                        <p>Bookstore</p>
                    </div>
                    <div className='header-search-main-cnt'>
                        <SearchIcon id='header-seacrh-logo' />
                        <input type="text" placeholder='Search...' />
                    </div>
                </div>
                <div className="header-opt-main-cnt">
                    <div className='header-opt-acct-cnt'>
                        <div className='header-opt-acct-inner-cnt' onClick={handleClick}>
                            <PersonOutlineOutlinedIcon id="header-opt-acct-logo" />
                            <p>Account</p>
                        </div>
                        <Menu
                            id="header-profile-main-cnt"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <div className='header-profile-main-before-login-cnt'>
                                <p id='header-profile-main-before-login-txt1'>Welcome</p>
                                <p id='header-profile-main-before-login-txt2'>To access account and manage orders</p>
                                <Button variant="outlined" id='header-profile-main-before-login-btn' onClick={handleClickModal}><p>LOGIN/SIGNUP</p></Button>
                                <hr />
                                <Button variant="text" id='header-profile-main-before-login-order-btn' ><ShoppingBagOutlinedIcon id='header-profile-main-before-login-order-btn-logo' /><p>My Orders</p></Button>
                                <Button variant="text" id='header-profile-main-before-login-wish-btn' onClick={()=>navigate(`/dashboard/wishlist`)}><FavoriteBorderOutlinedIcon id='header-profile-main-before-login-wish-btn-logo' /><p>Wishlist</p></Button>
                            </div>
                        </Menu>
                    </div>
                    <div className='header-opt-cart-cnt'>
                        <div className='header-opt-cart-inner-cnt' onClick={()=>navigate(`/dashboard/cart`)}>
                            <ShoppingCartOutlinedIcon id="header-opt-cart-logo" />
                            <p>Cart</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                anchorEl={anchorE2}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id='header-profile-main-login-cnt'>
                    <div className='header-profile-main-login-img-cnt'>
                        <img src={loginImg} alt="" />
                        <p>ONLINE BOOK SHOPING</p>
                    </div>
                    <div className='header-profile-main-login-inp-main-cnt'>
                        <div className='header-profile-main-login-inp-txt-cnt'>
                            <p>LOGIN</p>
                            <p>SIGNUP</p>
                        </div>
                        <div className='header-profile-main-login-inp-txt-main-cnt'>
                            <p>Full Name</p>
                            <input id="header-profile-main-login-inp-cnt" type="text" />
                        </div>
                        <div className='header-profile-main-login-inp-txt-main-cnt'>
                            <p>Email id</p>
                            <input id="header-profile-main-login-inp-cnt" type="text" />
                        </div>
                        <div className='header-profile-main-login-inp-txt-main-cnt'>
                            <p>Password</p>
                            <input id="header-profile-main-login-inp-cnt" type="text" />
                        </div>
                        <div className='header-profile-main-login-inp-txt-main-cnt'>
                            <p>Mobile Number</p>
                            <input id="header-profile-main-login-inp-cnt" type="text" />
                        </div>
                        <Button variant="contained">SIGNUP</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default Header;


