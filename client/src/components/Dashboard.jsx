import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Accordion,
  ListGroup,
  Col,
  Spinner
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  addBlogItem,
  checkToken,
  getBlogItemsByUserId,
  updateBlogItem
} from "../Services/DataService";

const Dashboard = ({ isDarkMode, setUser }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState('');

  const [blogData, setBlogData] = useState({
    id: 0,
    tag: "",
    title: "",
    image: "",
    description: "",
    date: new Date(),
    category: "",
    isPublished: true,
    isDeleted: false,
  });
  
  const [blogItems, setBlogItems] = useState([]);

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (e, { id, title, description, category, tag, image }) => {
    setShow(true);

    if (e.target.textContent === "Add Blog Item") {
      setEdit(false);
    } else {
      setEdit(true);
    }
    setBlogData({
      ...blogData,
      id,
      title,
      description,
      category,
      tag,
      image
    });
  };


  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBlogData({
        ...blogData,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSavePost = async (publish) => {

    const post = {
      ...blogData,
      userId,
      publisherName: username,
      date: new Date(),
      isPublished: publish,
    };
    handleClose();

    let response = false;
    if(edit) {
      response = await updateBlogItem(post);
    } else {
      response = await addBlogItem(post);
    }

    if (response) {
      setBlogItems(await getBlogItemsByUserId(userId));
    } else {
      alert(`Blog item not ${edit ? 'updated' : 'added'}`)
    }
  }

  const handlePublish = async (post) => {
    post.isPublished = !post.isPublished;

    if(await updateBlogItem(post)) {
      setBlogItems(await getBlogItemsByUserId(userId));
    } else {
      alert('Blog item not updated');
    }
  }

  const handleDelete = async (post) => {
    post.isDeleted = !post.isDeleted;

    if(await updateBlogItem(post)) {
      setBlogItems(await getBlogItemsByUserId(userId));
    } else {
      alert('Blog item not deleted');
    }
  }

  const loadUserData = async () => {
    const userData = JSON.parse(localStorage.getItem("UserData"));

    setUserId(userData.userId);
    setUsername(userData.username);
    setUser(userData);

    setTimeout(async () => {
      setBlogItems(await getBlogItemsByUserId(userData.userId));
      setIsLoading(false);
    }, 1000);
  };


  useEffect(() => {
    if (!checkToken()) navigate("/Login");
    else loadUserData();
  }, []);


  return (
    <>
      <Container
        data-bs-theme={isDarkMode ? "dark" : "light"}
        className={isDarkMode ? "bg-dark text-light p-5" : "bg-light p-5"}
        fluid
      >
        <Button variant="outline-primary m-2" onClick={(e) => handleShow(e, { id: 0, title: '', description: '', category: '', tag: '', image: '' })}>
          Add Blog Item
        </Button>

        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} Blog Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  value={blogData.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  name="description"
                  value={blogData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={blogData.category} onChange={handleChange}>
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tag"
                  name="tag"
                  value={blogData.tag}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select an Image from file"
                  accept="image/png, image/jpg"
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={() => handleSavePost(false)}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={() => handleSavePost(true)}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        { isLoading ? 
        <>
          <div className="d-flex justify-content-center">
            <h2 className="text-center">Loading...</h2>
            <Spinner animation="grow" variant="info" className="mt-2 ms-2" />
          </div>
        </>
        :
         blogItems.length == 0 ? (
          <h2 className="text-center">No Blog Items to Show.</h2>
        ) : (
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Published</Accordion.Header>
              <Accordion.Body>
                {blogItems.map(
                  (item) =>
                    item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>
                        <ListGroup.Item as={"li"} md={2}><h3>Title:</h3>{ item.title }</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}><h3>Description:</h3>{ item.description }</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}> <h3>Category:</h3> { item.category }</ListGroup.Item>
                        <ListGroup.Item  as={"li"} md={2}><h3>Tags:</h3>{ item.tag }</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
                         Image: { item.image ? item.image.slice(5, 14) : 'No image' }
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} className="d-flex justify-content-end">
                          <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                            Delete
                          </Button>
                          <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>
                            Edit
                          </Button>
                          <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                            UnPublish
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    )
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Unpublished</Accordion.Header>
              <Accordion.Body>
                {blogItems.map(
                  (item) =>
                    !item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>
                        <ListGroup.Item as={"li"} md={2}><h3>Title:</h3>{ item.title }</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}><h3>Description:</h3>{ item.description }</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}> <h3>Category:</h3> { item.category }</ListGroup.Item>
                        <ListGroup.Item  as={"li"} md={2}><h3>Tags:</h3>{ item.tag }</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
                         Image: { item.image ? item.image.slice(5, 14) : 'No image' }
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} className="d-flex justify-content-end">
                          <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                            Delete
                          </Button>
                          <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>
                            Edit
                          </Button>
                          <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                            Publish
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    )
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
