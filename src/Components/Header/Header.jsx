import './Header.scss'
import BookLogo from "../../Assets/education.svg";
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


function Header() {
    return (
        <>
            <div className="header-main-cnt">
                <div className="header-logo-search-main-cnt">
                    <div className='header-logo-main-cnt'>
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
                        <div className='header-opt-acct-inner-cnt'>
                            <PersonOutlineOutlinedIcon id="header-opt-acct-logo"/>
                            <p>Account</p>
                        </div>
                    </div>
                    <div className='header-opt-cart-cnt'>
                        <div className='header-opt-cart-inner-cnt'>
                            <ShoppingCartOutlinedIcon id="header-opt-cart-logo" />
                            <p>Cart</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;