import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const obj = useSelector((state) => state.auth);
  const keys = Object.keys(obj);
  return (
    <>
      {keys.map((key) => (
        <ListGroup key={key} horizontal>
          <ListGroup.Item variant="primary">{key}</ListGroup.Item>
          <ListGroup.Item>{obj[key]}</ListGroup.Item>
        </ListGroup>
      ))}
    </>
  );
};

export default UserInfo;
