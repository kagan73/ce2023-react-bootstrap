import { Badge, Button, Card, Col, Modal, Stack } from "react-bootstrap";
import { ProductType } from "./ProductType";
import { useState } from "react";

export const ProductItem = ({ product }: { product: ProductType }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //const newPrice = product.price - product.price / product.discountPercentage;
  const newPrice =
    product.price - (product.price / 100) * product.discountPercentage;

  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          variant="top"
          height={180}
          src={product.thumbnail}
          className={"object-fit-contain"}
        />
        <Card.Body>
          <Card.Subtitle className="py-1">
            <Stack direction="horizontal">
              <div className="ms-auto"></div>
              <del className="text-danger">$ {product.price.toFixed(2)}</del>
              <small className="mx-1">
                <Badge pill bg="warning">
                  % {product.discountPercentage}
                </Badge>
              </small>
              <h3 className="text-success">$ {newPrice.toFixed(2)}</h3>
            </Stack>
          </Card.Subtitle>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Sepete Ekle
          </Button>
          <Card.Link className="ms-2" href="#">
            İncele
          </Card.Link>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tebrikler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Size özel seçtiğimiz ürünlerden <strong>1 Adet</strong>
          </p>
          <p>
            <strong>{product.title}</strong>
          </p>
          <p>Ürün sepete eklendi.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sepete Git
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};
