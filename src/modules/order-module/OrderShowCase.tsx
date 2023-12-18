import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";

function OrderContainer() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <h1>Sipariş bilgileri</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Alıcı Adı Soyadı</Form.Label>
          <Form.Control type="text" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Must be entered valid name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>E-posta adresi</Form.Label>
          <Form.Control type="email" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Must be entered valid email address
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cep telefonu</Form.Label>
          <Form.Control type="phone" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adres</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Hediye paketi notu</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Stack direction="horizontal" className="mt-2">
          <Button variant="info">Paylaş</Button>
          <Button variant="danger">Sepeti Boşalt</Button>
          <Button variant="primary ms-auto" type="submit">
            Ödeme yap
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default OrderContainer;
