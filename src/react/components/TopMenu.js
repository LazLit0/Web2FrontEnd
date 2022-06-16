import { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";
import LoginDialog from "./LoginDialog";
export default function TopMenu() {
  const [show, setShow] = useState(false);
  const openDialog = () => setShow(true);
  const closeDialog = () => setShow(false);
  const { isLoggedIn, userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Web II</Navbar.Brand>
        <Navbar.Toggle />

        {isLoggedIn && (
          <>
            <Navbar.Text>
              <strong>logged in as:</strong> {userName}
            </Navbar.Text>
          </>
        )}
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {!isLoggedIn && (
              <Button
                id="OpenLoginDialogButton"
                variant="primary"
                onClick={openDialog}
              >
                Login
              </Button>
            )}
            {isLoggedIn && (
              <Button
                id="LogoutButton"
                variant="primary"
                onClick={() => dispatch(logout())}
              >
                logout
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
        <LoginDialog show={show} closeDialog={closeDialog} />
      </Container>
    </Navbar>
  );
}
