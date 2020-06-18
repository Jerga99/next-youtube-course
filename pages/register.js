
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { PageTitle } from 'components/shared';
import { useForm } from 'react-hook-form';
import { useMutate } from 'restful-react';
import { useRouter } from 'next/router';

const Register = () => {
  const [info, setInfo] = useState();
  const { mutate: registerUser, loading, error } = useMutate({
    verb: 'POST',
    path: 'register'
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    setInfo();
    registerUser(data)
      .then(_ => setInfo('Please visit your email address and active your account'));
  }

  return (
    <div className="bwm-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <PageTitle text="Register"/>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                ref={register}
                name="username"
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={register}
                name="email"
                type="email"
                placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={register}
                name="password"
                type="password"
                placeholder="Password" />
            </Form.Group>
            { info &&
              <Alert variant="success">
                {info}
              </Alert>
            }
            { error &&
              <Alert variant="danger">
                {error?.data}
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



export default Register;
