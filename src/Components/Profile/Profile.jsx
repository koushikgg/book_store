import "./Profile.scss"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Profile() {
    return (
        <>
            <div className="allbooks-name-sort-opt-main-cnt">
                <div className="allbooks-total-count-main-cnt">
                    <p id="allbooks-total-count">Home/</p>
                    <p id="allbooks-book-text">Profile</p>
                </div>
            </div>
            <div className="profile-details-main-cnt">
                <div className="profile-personal-details-main-cnt">
                    <div className="profile-personal-details-txt-cnt">
                        <p id="profile-personal-details-txt1-cnt">Personal Details</p>
                        <p id="profile-personal-details-txt2-cnt"> Edit</p>
                    </div>
                    <div className="profile-personal-details-name-cnt">
                        <p id="profile-personal-details-label-txt-cnt">Full Name</p>
                        <input type="text" />
                    </div>
                    <div className="profile-personal-details-email-cnt">
                        <p id="profile-personal-details-label-txt-cnt">Email Id</p>
                        <input type="text" />
                    </div>
                    <div className="profile-personal-details-password-cnt">
                        <p id="profile-personal-details-label-txt-cnt">Password</p>
                        <input type="text" />
                    </div>
                    <div className="profile-personal-details-number-cnt">
                        <p id="profile-personal-details-label-txt-cnt">Mobile Number</p>
                        <input type="text" />
                    </div>
                </div>
                <div className="profile-address-details-main-cnt">
                    <div className="profile-address-details-txt-cnt">
                        <p id="profile-personal-details-txt1-cnt">Address Details</p>
                        <Button variant="outlined" id='profile-address-details-add-address-btn-cnt'><p>Add New Address</p></Button>
                    </div>
                    <div>
                        <div className="profile-personal-details-txt-cnt">
                            <p id="profile-personal-details-txt1-cnt">1.Work</p>
                            <p id="profile-personal-details-txt2-cnt"> Edit</p>
                        </div>
                        <div className="profile-personal-details-name-cnt">
                            <p id="profile-personal-details-label-txt-cnt">Full Name</p>
                            <TextField id="outlined-multiline-flexible" multiline maxRows={4} />
                        </div>
                        <div className="profile-address-details-state-city-cnt">
                            <div className="profile-address-details-city-cnt">
                                <p id="profile-personal-details-label-txt-cnt">city/town</p>
                                <input type="text" placeholder="city" />
                            </div>
                            <div className="profile-address-details-state-cnt">
                                <p id="profile-personal-details-label-txt-cnt">state</p>
                                <input type="text" placeholder="state" />
                            </div>

                        </div>
                        <div className="profile-address-details-radio-main-cnt">
                            <p id="profile-personal-details-label-txt-cnt">Type</p>
                            <div className="profile-address-details-radio-main-inner-cnt">
                                <div className="profile-address-details-radio-cnt">
                                    <input type="radio" id="home" name="address" className="address-type" value="home" />
                                    <label htmlFor="home">Home</label>
                                </div>
                                <div className="profile-address-details-radio-cnt">
                                    <input type="radio" id="work" name="address" className="address-type" value="work" />
                                    <label htmlFor="work">Work</label>
                                </div>
                                <div className="profile-address-details-radio-cnt">
                                    <input type="radio" id="others" name="address" className="address-type" value="others" />
                                    <label htmlFor="others">Others</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile