import './Header.scss'
import BookLogo from "../../Assets/education.svg";
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import Signup from '../Signup/Signup';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';


function Header() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [signupModalOpen, setSignupModalOpen] = React.useState(false);
    const token = localStorage.getItem('accessToken')
    // const [openModal, setOpenModal] = React.useState(false);
    // useEffect(()=>{
    //     fectchBooks()
    // },[])




    // const handleOpenModal = () => setOpenModal(true);
    // const handleCloseModal = () => setOpenModal(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openSignupModal = (event) => {
        setAnchorEl(null);
        setSignupModalOpen(true);
    };

    function handleAction(action){
        if (action==='logout'){
            setAnchorEl(null);
            localStorage.removeItem('accessToken')
        }
    }

    return (
        <>
            <div className="header-main-cnt">
                <div className="header-logo-search-main-cnt">
                    <div className='header-logo-main-cnt' onClick={() => navigate(`/dashboard/allbooks`)}>
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
                            {!token ?
                                <div className='header-profile-main-before-login-cnt'>
                                    <p id='header-profile-main-before-login-txt1'>Welcome</p>
                                    <p id='header-profile-main-before-login-txt2'>To access account and manage orders</p>
                                    <Button variant="outlined" id='header-profile-main-before-login-btn' onClick={openSignupModal}><p>LOGIN/SIGNUP</p></Button>
                                    <hr />
                                    <Button variant="text" id='header-profile-main-before-login-order-btn' onClick={() => navigate(`/dashboard/myorder`)}><ShoppingBagOutlinedIcon id='header-profile-main-before-login-order-btn-logo' /><p>My Orders</p></Button>
                                    <Button variant="text" id='header-profile-main-before-login-wish-btn' onClick={() => navigate(`/dashboard/wishlist`)}><FavoriteBorderOutlinedIcon id='header-profile-main-before-login-wish-btn-logo' /><p>Wishlist</p></Button>
                                </div> :
                                <div className='header-profile-main-before-login-cnt'>
                                    <p id='header-profile-main-after-login-txt1'>Hello</p>
                                    <Button variant="text" id='header-profile-main-before-login-wish-btn' onClick={() => navigate(`/dashboard/profile`)}><PermIdentityIcon id='header-profile-main-before-login-wish-btn-logo' /><p>Profile</p></Button>
                                    <Button variant="text" id='header-profile-main-before-login-order-btn' style={{marginTop:'0px'}} onClick={() => navigate(`/dashboard/myorder`)}><ShoppingBagOutlinedIcon id='header-profile-main-before-login-order-btn-logo' /><p>My Orders</p></Button>
                                    <Button variant="text" id='header-profile-main-before-login-wish-btn' onClick={() => navigate(`/dashboard/wishlist`)}><FavoriteBorderOutlinedIcon id='header-profile-main-before-login-wish-btn-logo' /><p>Wishlist</p></Button>
                                    <Button variant="outlined" id='header-profile-main-before-login-btn' onClick={()=> handleAction('logout')}><p>Logout</p></Button>

                                </div>}
                        </Menu>
                    </div>
                    <div className='header-opt-cart-cnt'>
                        <div className='header-opt-cart-inner-cnt' onClick={() => navigate(`/dashboard/cart`)}>
                            <ShoppingCartOutlinedIcon id="header-opt-cart-logo" />
                            <p>Cart</p>
                        </div>
                    </div>
                </div>
            </div>
            <Signup open={signupModalOpen} handleClose={() => setSignupModalOpen(false)} />
        </>
    )
}
export default Header;


