// src/App.jsx
import React from "react"; 
// React kütüphanesini içe aktarıyoruz.

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
// react-router-dom'dan Router, Route ve Switch bileşenlerini içe aktarıyoruz.
// - Router: Yönlendirme işlemlerini yöneten ana bileşendir.
// - Route: URL'ye göre bileşenleri render eder.
// - Switch: Birden fazla Route olduğunda sadece birini aktif yapar.

import HomePage from "./HomePage"; 
import OrderForm from "./OrderForm"; 
import ConfirmationPage from "./ConfirmationPage"; 
// HomePage, OrderForm ve ConfirmationPage bileşenlerini içe aktarıyoruz. 
// Bunlar, uygulamanın farklı sayfalarını temsil eder.

import "./css/App.css"; 
// Stil dosyamızı içe aktarıyoruz. 

const App = () => {
  return (
    <Router>
      {/* Router, uygulamanın yönlendirme işlemlerini yöneten ana bileşendir. */}
      <Switch>
        {/* Switch, yalnızca bir Route'un aktif olmasını sağlar. */}
        <Route exact path="/" component={HomePage} />
        {/* Eğer URL '/' ise, HomePage bileşenini render eder. */}
        <Route path="/order" component={OrderForm} />
        {/* Eğer URL '/order' ise, OrderForm bileşenini render eder. */}
        <Route path="/confirmation" component={ConfirmationPage} />
        {/* Eğer URL '/confirmation' ise, ConfirmationPage bileşenini render eder. */}
      </Switch>
    </Router>
  );
};

export default App;
// App bileşenini dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir.
