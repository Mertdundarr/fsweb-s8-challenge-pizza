// React ve gerekli kütüphaneler import ediliyor
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/OrderForm.css"; // Stil dosyası import ediliyor

// OrderForm bileşeni tanımlanıyor
const OrderForm = () => {
  const history = useHistory(); // Sayfa yönlendirmesi için kullanılıyor

  // State'ler tanımlanıyor
  const [size, setSize] = useState("medium"); // Pizza boyutu
  const [crust, setCrust] = useState("normal"); // Hamur kalınlığı
  const [toppings, setToppings] = useState([]); // Ek malzemeler
  const [note, setNote] = useState(""); // Sipariş notu
  const [quantity, setQuantity] = useState(1); // Sipariş adedi
  const [name, setName] = useState(""); // Kullanıcı adı

  const basePrice = 49.90; // Pizza temel fiyatı
  const toppingPrice = 5; // Her ek malzeme fiyatı

  // Ek malzeme seçimlerini yönetir
  const handleToppingChange = (topping) => {
    if (toppings.includes(topping)) {
      // Malzeme seçilmişse, kaldırır
      setToppings(toppings.filter(item => item !== topping));
    } else if (toppings.length < 10) {
      // Maksimum 10 malzeme sınırı
      setToppings([...toppings, topping]);
    }
  };

  // Toplam fiyatı hesaplar
  const calculateTotal = () => {
    const toppingsTotal = toppings.length * toppingPrice; // Ek malzeme toplamı
    return (basePrice + toppingsTotal) * quantity; // Temel fiyat ve adet ile çarpılır
  };

  // Form gönderimi için işlem
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    
    // Kullanıcı adı ve malzeme seçim doğrulamaları
    if (name.length < 3 || toppings.length < 4 || toppings.length > 10) {
      return; // Şartlar sağlanmazsa işlem yapılmaz
    }

    try {
      // API'ye sipariş gönderilir
      const response = await axios.post('https://reqres.in/api/pizza', {
        name,
        size,
        crust,
        toppings,
        note,
        quantity,
        total: calculateTotal()
      });
      console.log('Sipariş özeti:', response.data); // Yanıt konsola yazdırılır
      history.push("/confirmation"); // Onay sayfasına yönlendirme
    } catch (error) {
      console.error('Hata:', error); // Hata yakalanır ve konsola yazdırılır
    }
  };

  return (
    <div className="order-form">
      {/* Navbar */}
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

      {/* Başlık bölümü */}
      <div className="header-section">
        <h2>Pizzanızı Özelleştirin</h2>
        <p>En lezzetli pizzalar için doğru adrestesiniz. Dilediğiniz gibi özelleştirin!</p>
      </div>

      {/* Form konteyneri */}
      <div className="form-container">
        <h2>Pizza Siparişi</h2>
        <div className="rating">
          <span className="price">₺{basePrice}</span>
          <span className="rating-score">4.9</span>
          <span className="rating-count">(200)</span>
        </div>
        <p>Lezzetli pizzanızı özelleştirin</p>

        {/* Sipariş formu */}
        <form onSubmit={handleSubmit}>
          {/* Ad girişi */}
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

          {/* Boyut ve hamur seçimi */}
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

          {/* Ek malzemeler */}
          <div className="toppings-section">
            <h3>Ek Malzemeler</h3>
            <p>En az 4, en fazla 10 malzeme seçmelisiniz</p>
            <div className="toppings-grid">
              {[
                "Sucuk", "Sosis", "Jambon", "Pepperoni", "Mantar", "Zeytin", "Mısır", "Biber", "Soğan", "Domates", "Ananas", "Ton Balığı", "Kaşar", "Mozarella"
              ].map((topping) => (
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

          {/* Sipariş notu */}
          <div className="note-section">
            <h3>Sipariş Notu</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
            />
          </div>

          {/* Alt bölüm */}
          <div className="bottom-section">
            <div className="quantity-section">
              <h3>Adet</h3>
              <div className="quantity-controls">
                <button type="button" className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button type="button" className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Sipariş özeti */}
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
