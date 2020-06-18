
import { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { PageTitle } from 'components/shared';
import { useMutate } from "restful-react";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState();
  const { mutate: resetPassword, loading, error } = useMutate({
    verb: 'POST',
    path: 'reset-password'
  });

  const onSubmit = e => {
    e.preventDefault();
    setSuccess();
    email && resetPassword({email}).then(_ => setSuccess('Check your email in order to reset password!'));
  }

  return (
    <div className="bwm-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <PageTitle text="Reset Password"/>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            { error &&
              <Alert variant="danger">
                {error?.data}
              </Alert>
            }
            { success &&
              <Alert variant="success">
                {success}
              </Alert>
            }
            <Button
              disabled={loading}
              variant="primary"
              type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}



export default ResetPassword;
