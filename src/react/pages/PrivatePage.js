import React from "react";
import { Container } from "react-bootstrap";
import UserInfo from "../components/UserInfo";

export default function PrivatePage() {
  return (
    <Container
      className="page-content"
      id="PrivatePage"
      style={{ background: "white" }}
    >
      <h1>Private Page</h1>
      <UserInfo/>
    </Container>
  );
}
