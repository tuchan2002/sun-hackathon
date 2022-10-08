// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import { useSelector } from "react-redux";
// import { BsQuestionCircleFill } from "react-icons/bs";
// import CardItem from "./CardItem";

// const question = {
//   content: "content quiz 123",
//   answers: ["ha noi", "nam dinh", "bac ninh", "hai phong"],
//   result: 0,
// };

// const QuizDetail = () => {
//   const { auth } = useSelector((state) => state);
//   console.log(auth);

//   return (
//     <>
//       <Card>
//         <Card.Header>Flashcard</Card.Header>
//         <Card.Body>
//           <Card.Title style={{ marginBottom: "36px" }}>
//             title of quiz
//           </Card.Title>
//           <Container>
//             <Row>
//               <Col>
//                 <span>
//                   <img
//                     src={auth.user.avatar}
//                     alt="avatar"
//                     style={{
//                       width: "36px",
//                       height: "36px",
//                       borderRadius: "100px",
//                       marginRight: "8px",
//                     }}
//                   />
//                   {auth.user.displayName}
//                 </span>
//               </Col>
//               <Col>
//                 <Button variant="primary">Learn</Button>{" "}
//                 <Button variant="info">Share</Button>{" "}
//                 <Button variant="primary">Edit</Button>{" "}
//                 <Button variant="danger">Delete</Button>{" "}
//               </Col>
//             </Row>
//           </Container>
//         </Card.Body>
//       </Card>
//       <Container style={{ marginTop: "16px" }}>
//         <h3>
//           {" "}
//           <BsQuestionCircleFill style={{ marginRight: "8px" }} />
//           30 Questions
//         </h3>
//       </Container>
//       <Container style={{ marginTop: "16px" }}>
//         <CardItem question={question}></CardItem>
//         <CardItem question={question}></CardItem>
//         <CardItem question={question}></CardItem>
//         <CardItem question={question}></CardItem>
//       </Container>
//     </>
//   );
// };

// export default QuizDetail;
