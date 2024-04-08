const Wallet = () => {
  return (
    <>
      <div className="user-page-right-top-bar">
        <img
          src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
          alt="logo"
        />
        <p className="user-page-right-title">Wallet</p>
      </div>
      <p className="user-page-edit-profile-title wallet-title">
        My Wallet
        <span className="user-page-tagline">Set payment method</span>
      </p>

      <div className="user-page-wallet-desc">
        <div className="user-page-wallet-left">
          <span className="wallet-available">
            Available optibite wallet balance: Rs.
            <span className="wallet-available-amount"> 100.00</span>
          </span>
          <span className="wallet-earned">
            Earned: Rs. <span className="wallet-earned-amount">100.00</span>
          </span>
          <span className="wallet-redeem">
            Redem: Rs. <span className="wallet-redeem-amount">0.00</span>
          </span>

          <div className="walletButtons">
            <button className="wallet-loadwallet">Load Wallet</button>
            <button className="wallet-view-statement">View statement</button>
          </div>
          <div className="wallet-note-box">
            <p className="wallet-note">
              Note: Earn Sabjiwallet credit everytime you order any vegies from
              optibite. When you have enough credits, you can use them to pay
              for your order next time!
            </p>
          </div>
        </div>
        <div className="wallet-image">
          <img src="https://i.postimg.cc/02tNfdpF/wallet.png" alt="" />
        </div>
      </div>

      {/* <p className="user-page-wallet-tagline">Set payment method</p> */}
      {/* <div className="walletContainer">
        <div className="wallet-desc">
          <div className="walletTitle">
           
            <div className="walletTitleText">My Wallet</div>
            <div className="user-page-wallet-tagline">Set payment method</div>
          </div>
          <div className="wallet-desc-container">
            <p className="wallet-available">
              Available optibite wallet balance: Rs.
              <span className="wallet-available-amount"> 100.00</span>
            </p>
            <p className="wallet-earned">
              Earned: Rs. <span className="wallet-earned-amount">100.00</span>
            </p>
            <p className="wallet-redeem">
              Redem: Rs. <span className="wallet-redeem-amount">0.00</span>
            </p>
          </div>
          <div className="walletButtons">
            <button className="wallet-loadwallet">Load Wallet</button>
            <button className="wallet-view-statement">View statement</button>
          </div>
          <div className="wallet-note-box">
            <p className="wallet-note">
              Note: Earn Sabjiwallet credit everytime you order any vegies from
              optibite. When you have enough credits, you can use them to pay
              for your order next time!
            </p>
          </div>
        </div>
        <div className="wallet-image">
          <img src="https://i.postimg.cc/02tNfdpF/wallet.png" alt="" />
        </div>
      </div> */}
    </>
  );
};
export default Wallet;
