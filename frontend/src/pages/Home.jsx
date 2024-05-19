import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function Home() {
    const [wallet, setWallet] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [conversionRate, setConversionRate] = useState("");
    const [conversionAmount, setConversionAmount] = useState("");

    useEffect(() => {
        getWallet();
        getCurrencies();
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

    const handleDeposit = (e) => {
        e.preventDefault();
        api
            .post("/api/wallet/deposit/", {
                currency_code: selectedCurrency,
                amount: parseFloat(amount)
            })
            .then(() => {
                alert("Deposit successful!");
                getWallet();
            })
            .catch((err) => alert(err));
    };

    const handleWithdraw = (e) => {
        e.preventDefault();
        api
            .post("/api/wallet/withdraw/", {
                currency_code: selectedCurrency,
                amount: parseFloat(amount)
            })
            .then(() => {
                alert("Withdrawal successful!");
                getWallet();
            })
            .catch((err) => alert(err));
    };

    const handleConvert = (e) => {
        e.preventDefault();
        api
            .post("/api/wallet/convert/", {
                source_currency_code: sourceCurrency,
                target_currency_code: targetCurrency,
                conversion_rate: parseFloat(conversionRate),
                amount: parseFloat(conversionAmount)
            })
            .then(() => {
                alert("Conversion successful!");
                getWallet();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h1>Home</h1>
            <div>
                <Navbar />
            </div>
            <div>
                <h2>Wallet Balances</h2>
                {wallet && wallet.balances.map((balance) => (
                    <div key={balance.currency.code}>
                        <span>{balance.currency.name}: {balance.amount}</span>
                    </div>
                ))}
            </div>
            <div>
                <h2>Deposit / Withdraw</h2>
                <form onSubmit={handleDeposit}>
                    <label htmlFor="currency">Currency:</label>
                    <select
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
                    <br />
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                    <br />
                    <button type="submit">Deposit</button>
                </form>
                <form onSubmit={handleWithdraw}>
                    <button type="submit">Withdraw</button>
                </form>
            </div>
            <div>
                <h2>Convert Currency</h2>
                <form onSubmit={handleConvert}>
                    <label htmlFor="sourceCurrency">Source Currency:</label>
                    <select
                        id="sourceCurrency"
                        name="sourceCurrency"
                        required
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        value={sourceCurrency}
                    >
                        <option value="">Select a source currency</option>
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label htmlFor="targetCurrency">Target Currency:</label>
                    <select
                        id="targetCurrency"
                        name="targetCurrency"
                        required
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        value={targetCurrency}
                    >
                        <option value="">Select a target currency</option>
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label htmlFor="conversionRate">Conversion Rate:</label>
                    <input
                        type="number"
                        step="0.0001"
                        id="conversionRate"
                        name="conversionRate"
                        required
                        onChange={(e) => setConversionRate(e.target.value)}
                        value={conversionRate}
                    />
                    <br />
                    <label htmlFor="conversionAmount">Amount:</label>
                    <input
                        type="number"
                        id="conversionAmount"
                        name="conversionAmount"
                        required
                        onChange={(e) => setConversionAmount(e.target.value)}
                        value={conversionAmount}
                    />
                    <br />
                    <button type="submit">Convert</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
