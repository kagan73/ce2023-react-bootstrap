import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { ProductItem } from "./Product";
import { ProductType } from "./ProductType";

function ProductsShowCase() {
  const [products, setProducst] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        const loadedProducts: ProductType[] = json.products || [];
        const sorted = loadedProducts
          .sort((p1, p2) => {
            return p1.title.localeCompare(p2.title);
          })
          .reverse();
        return setProducst(sorted);
      });
  }, []);

  return products.length < 1 ? (
    <div>ürün bulunamadı </div>
  ) : (
    <Row xs={1} sm={2} md={3} className="g-1">
      {products.map((product, key) => (
        <ProductItem product={product} key={key} />
      ))}
    </Row>
  );
}

export default ProductsShowCase;
