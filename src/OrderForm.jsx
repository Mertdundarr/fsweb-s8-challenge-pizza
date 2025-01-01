import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/OrderForm.css";

const OrderForm = () => {
  const history = useHistory();
  const [size, setSize] = useState("medium");
  const [crust, setCrust] = useState("normal");
  const [toppings, setToppings] = useState([]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");

  const basePrice = 49.90;
  const toppingPrice = 5;

  const handleToppingChange = (topping) => {
    if (toppings.includes(topping)) {
      setToppings(toppings.filter(item => item !== topping));
    } else if (toppings.length < 10) {
      setToppings([...toppings, topping]);
    }
  };

  const calculateTotal = () => {
    const toppingsTotal = toppings.length * toppingPrice;
    return (basePrice + toppingsTotal) * quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name.length < 3 || toppings.length < 4 || toppings.length > 10) {
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/pizza', {
        name,
        size,
        crust,
        toppings,
        note,
        quantity,
        total: calculateTotal()
      });
      console.log('Sipariş özeti:', response.data);
      history.push("/confirmation");
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div className="order-form">
      <nav className="navbar">
        <div className="nav-content">
          <h1>Teknolojik Yemekler</h1>
          <ul>
            <li><a href="/">Ana Sayfa</a></li>
            <li><a href="#options">Seçenekler</a></li>
            <li><a href="#create-order">Sipariş Oluştur</a></li>
          </ul>
        </div>
      </nav>

      <div className="header-section">
        <h2>Pizzanızı Özelleştirin</h2>
        <p>En lezzetli pizzalar için doğru adrestesiniz. Dilediğiniz gibi özelleştirin!</p>
      </div>

      <div className="form-container">
        <h2>Pizza Siparişi</h2>
        <div className="rating">
          <span className="price">₺{basePrice}</span>
          <span className="rating-score">4.9</span>
          <span className="rating-count">(200)</span>
        </div>
        <p>Lezzetli pizzanızı özelleştirin</p>

        <form onSubmit={handleSubmit}>
          <div className="name-section">
            <h3>Adınız</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={3}
              required
              placeholder="Adınız (en az 3 karakter)"
              className="crust-select"
            />
          </div>

          <div className="top-options">
            <div className="size-section">
              <h3>Boyut Seç</h3>
              <div className="radio-group">
                <label>
                  <input type="radio" name="size" value="small" checked={size === "small"} onChange={(e) => setSize(e.target.value)} />
                  Küçük
                </label>
                <label>
                  <input type="radio" name="size" value="medium" checked={size === "medium"} onChange={(e) => setSize(e.target.value)} />
                  Orta
                </label>
                <label>
                  <input type="radio" name="size" value="large" checked={size === "large"} onChange={(e) => setSize(e.target.value)} />
                  Büyük
                </label>
              </div>
            </div>

            <div className="crust-section">
              <h3>Hamurun Kalınlığını Seç</h3>
              <select 
                value={crust} 
                onChange={(e) => setCrust(e.target.value)}
                className="crust-select"
              >
                <option value="thin">İnce</option>
                <option value="normal">Normal</option>
                <option value="thick">Kalın</option>
              </select>
            </div>
          </div>

          <div className="toppings-section">
            <h3>Ek Malzemeler</h3>
            <p>En az 4, en fazla 10 malzeme seçmelisiniz</p>
            <div className="toppings-grid">
              {["Sucuk", "Sosis", "Jambon", "Pepperoni", "Mantar", "Zeytin", "Mısır", "Biber", "Soğan", "Domates", "Ananas", "Ton Balığı", "Kaşar", "Mozarella"].map((topping) => (
                <label key={topping} className="topping-item">
                  <input
                    type="checkbox"
                    checked={toppings.includes(topping)}
                    onChange={() => handleToppingChange(topping)}
                    disabled={!toppings.includes(topping) && toppings.length >= 10}
                  />
                  {topping}
                </label>
              ))}
            </div>
          </div>

          <div className="note-section">
              <h3>Sipariş Notu</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
              />
            </div>


          <div className="bottom-section">
            <div className="quantity-section">
              <h3>Adet</h3>
              <div className="quantity-controls">
                <button type="button" className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button type="button" className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

          
            <div className="order-summary">
              <div className="summary-item">
                <span>Seçimler:</span>
                <span>₺{calculateTotal() - basePrice * quantity}</span>
              </div>
              <div className="summary-item total">
                <span>Toplam:</span>
                <span>₺{calculateTotal()}</span>
              </div>
              <button 
                type="submit" 
                className="order-button"
                disabled={name.length < 3 || toppings.length < 4 || toppings.length > 10}
              >
                Siparişi Ver
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;