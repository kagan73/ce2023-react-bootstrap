import "./App.css";
import { Container } from "react-bootstrap";
import OrderContainer from "./modules/order-module/OrderShowCase";
import ProductsShowCase from "./modules/product-module/ProductsShowCase";
import { TodoContainer } from "./modules/todo-module/TodoContainer";

function App() {
  return (
    <Container className="bg-dark1" data-bs-theme="dark1">
      <TodoContainer />
      {/* <h1>Size özel ürünler</h1>
      <ProductsShowCase />
      <OrderContainer /> */}
    </Container>
  );
}

export default App;
