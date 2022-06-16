import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/auth";

export default function LoginDialog({ show, closeDialog }) {
  // * UI STATE
  const [userId, setUserId] = useState("User ID");
  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const [password, setPassword] = useState("Password");
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // * Redux State
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(login({ userId, password }));
    setPassword("");
    setUserId("");
    closeDialog();
  };

  return (
    <>
      <Modal show={show} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner />}
          {!loading && (
            <Form>
              <Form.Control
                id="LoginUserIDInput"
                type="text"
                placeholder="Name"
                value={userId}
                name="userID"
                onChange={onUserIdChange}
              />
              <Form.Control
                id="LoginUserPasswordInput"
                type="password"
                placeholder="password"
                value={password}
                name="password"
                onChange={onPasswordChange}
              />
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
