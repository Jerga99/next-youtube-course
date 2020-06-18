
import { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { PageTitle } from 'components/shared';
import { useMutate } from "restful-react";
import { useRouter } from 'next/router';

const ResetPasswordConfirmation = () => {
  const router = useRouter();
  const { hash } = router.query
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState();
  const { mutate: resetPassword, loading, error } = useMutate({
    verb: 'POST',
    path: 'reset-password/confirmation'
  });

  const onSubmit = e => {
    e.preventDefault();
    setSuccess();
    password && resetPassword({password, hash}).then(_ => setSuccess('Your password has been succesfuly changed!'));
  }

  return (
    <div className="bwm-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <PageTitle text="Reset Password"/>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter new password" />
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



export default ResetPasswordConfirmation;
