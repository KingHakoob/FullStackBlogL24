import { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { getPublishedBlogItems } from "../Services/DataService";

const BlogPage = ({ setUser }) => {
  const [blogItems, setBlogItems] = useState([]);
  
  const getBlogItems = async () => {
    setBlogItems(await getPublishedBlogItems());
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  useEffect(() => {
    getBlogItems();

    if(localStorage.getItem('Token')) setUser(JSON.parse(localStorage.getItem('UserData')));
  }, [])
  
  
  return (
    <>
      <h1 className='text-center'>View Post Page</h1>
      <Container className='p-5'>
        <Row>
          <Col>
            {blogItems.map((item, index) => (
              <Container key={index}>
                    <Row className={index%2 == 1 && 'flex-row-reverse'}>
                        <Col md={6}>
                            <Row>
                              <Col className='d-flex justify-content-center' md={12}>
                                <h2 style={{ fontFamily:'Sanserif', borderStyle:'outset', borderRadius:'15px', padding:'15px' }}>{item.title}</h2>
                              </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col className='d-flex justify-content-center' md={6}>Publisher: {item.publisherName}</Col>
                                        <Col md={6}>Date: { formatDate(item.date) }</Col>
                                    </Row>
                                </Col>
                              <Col className='d-flex justify-content-center' md={12}><Image src={item.image} alt='item image' width='100%' height='100%' style={{ borderRadius:'5%'}} /></Col>
                            </Row>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center' md={6}>
                          <p style={{ fontSize:'26px' }}>{item.description}</p>
                        </Col>
                    </Row>
              </Container>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
