import { useState, useEffect } from "react";
import api from "../api";
import NavbarR from "../components/NavbarR";
import Faq from "../components/Faq";
import FooterTop from "../components/FooterTop";
import FooterBottom from "../components/FooterBottom";
import Cta from "../components/Cta";

function Wallet() {
    const [wallet, setWallet] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("buy");
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [exchangeRates, setExchangeRates] = useState({});
    const [conversionAmount, setConversionAmount] = useState("");

    useEffect(() => {
        getWallet();
        getCurrencies();
        getExchangeRates();
    }, []);

    const getWallet = () => {
        api
            .get("/api/wallet/")
            .then((res) => res.data)
            .then((data) => {
                setWallet(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const getCurrencies = () => {
        api
            .get("/api/currencies/")
            .then((res) => res.data)
            .then((data) => {
                setCurrencies(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const getExchangeRates = () => {
      api
          .get("/api/exchange-rates/")
          .then((res) => res.data)
          .then((data) => {
              const rates = {};
              data.forEach(rate => {
                  rates[rate.currency_code] = rate.rate_to_usd;
              });
              setExchangeRates(rates);
              console.log(rates);
          })
          .catch((err) => alert(err));
  };

    const handleDeposit = () => {
        api
            .post("/api/wallet/deposit/", {
                currency_code: selectedCurrency,
                amount: parseFloat(amount),
            })
            .then(() => {
                alert("Deposit successful!");
                getWallet();
            })
            .catch((err) => alert(err));
    };

    const handleWithdraw = () => {
        api
            .post("/api/wallet/withdraw/", {
                currency_code: selectedCurrency,
                amount: parseFloat(amount),
            })
            .then(() => {
                alert("Withdrawal successful!");
                getWallet();
            })
            .catch((err) => alert(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transactionType === "buy") {
            handleDeposit();
        } else {
            handleWithdraw();
        }
    };

    const handleConvert = (e) => {
        e.preventDefault();
        api
            .post("/api/convert/", {
                source_currency_code: sourceCurrency,
                target_currency_code: targetCurrency,
                amount: parseFloat(conversionAmount),
            })
            .then(() => {
                alert("Conversion successful!");
                getWallet();
            })
            .catch((err) => alert(err));
    };

    return (
      <div>
        <header id="header" className="fixed-top ">
            <NavbarR />
        </header>
        <main id="main">
          <section id="wallet-balances" className="wallet-balances section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Wallet Balances</h2>
              </div>
              <div className="row" data-aos="zoom-in">
                <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center"></div>
                {wallet &&
                  wallet.balances.map((balance) => (
                    <div
                      key={balance.currency.code}
                      className="col-lg-1 col-md-4 col-6 d-flex align-items-center justify-content-center"
                    >
                      <div className="balance-item">
                        <img
                          src={`/img/clients/${balance.currency.code}.png`}
                          className="img-fluid"
                          alt={balance.currency.name}
                        />
                        <span>
                          {balance.currency.code}: {balance.amount}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>



            <section id="contact" className="contact">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>Buy / Sell</h2>
                </div>
                <div className="row">
                  <div className="col-lg-3 mt-lg-0 d-flex align-items-stretch"></div>

                  <div className="col-lg-6 mt-lg-0 d-flex align-items-stretch">
                    <form
                      onSubmit={handleSubmit}
                      method="post"
                      role="form"
                      className="php-email-form"
                    >
                      <div className="radio-inputs">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radio"
                            value="buy"
                            checked={transactionType === "buy"}
                            onChange={() => setTransactionType("buy")}
                          />
                          <span className="name">Buy</span>
                        </label>
                        <label className="radio">
                          <input
                            type="radio"
                            name="radio"
                            value="sell"
                            checked={transactionType === "sell"}
                            onChange={() => setTransactionType("sell")}
                          />
                          <span className="name">Sell</span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="currency">Currency:</label>
                        <select
                          className="form-control"
                          id="currency"
                          name="currency"
                          required
                          onChange={(e) => setSelectedCurrency(e.target.value)}
                          value={selectedCurrency}
                        >
                          <option value="">Select a currency</option>
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          required
                          onChange={(e) => setAmount(e.target.value)}
                          value={amount}
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        {transactionType === "buy" ? "Buy" : "Sell"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            

            <section id="wallet-balances" className="wallet-balances section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Wallet Exchange Rates</h2>
              </div>
              <div className="row" data-aos="zoom-in">
                <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center"></div>
                {wallet &&
                  wallet.balances.map((balance) => (
                    <div
                      key={balance.currency.code}
                      className="col-lg-1 col-md-4 col-6 d-flex align-items-center justify-content-center"
                    >
                      <div className="balance-item">
                        <img
                          src={`/img/clients/${balance.currency.code}.png`}
                          className="img-fluid"
                          alt={balance.currency.name}
                        />
                        <span>
                          {exchangeRates[balance.currency.code] && (
                                                <small>Rate: ${exchangeRates[balance.currency.code]}</small>
                                            )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>


            <section id="contact" className="contact">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>Convert Currency</h2>
                </div>
                <div className="row">
                  <div className="col-lg-3 mt-lg-0 d-flex align-items-stretch"></div>

                  <div className="col-lg-6 mt-lg-0 d-flex align-items-stretch">
                    <form onSubmit={handleConvert} className="php-email-form">
                    <div className="form-group">
                        <label htmlFor="sourceCurrency">Source Currency:</label>
                        <select
                        id="sourceCurrency"
                        name="sourceCurrency"
                        required
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        value={sourceCurrency}
                        className="form-control"
                        >
                        <option value="">Select a source currency</option>
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                            {currency.name}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="targetCurrency">Target Currency:</label>
                        <select
                        id="targetCurrency"
                        name="targetCurrency"
                        required
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        value={targetCurrency}
                        className="form-control"
                        >
                        <option value="">Select a target currency</option>
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                            {currency.name}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="conversionAmount">Amount of Source Currency:</label>
                        <input
                        type="number"
                        id="conversionAmount"
                        name="conversionAmount"
                        required
                        onChange={(e) => setConversionAmount(e.target.value)}
                        value={conversionAmount}
                        className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Convert
                    </button>
                    </form>
                </div>
            </div>
        </div>
        </section>
          <Faq />
        </main>
        <footer id="footer">
          <FooterTop />
          <FooterBottom />
        </footer>
      </div>
    );
}

export default Wallet;