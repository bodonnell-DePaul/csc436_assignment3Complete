import React, {useState} from 'react';
import { ListGroup, Button, Form, Container, Row, Col, Tab, Nav, Dropdown } from 'react-bootstrap';
import "./ToDoList.css"

function TodoList() {
  
  const start_todos = [
    { title: 'Todo 1', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`, dueDate: '2024-05-03' },

    { title: 'Todo 2', description: `Sed auctor nunc nec nisi ultrices, in molestie nibh mattis. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
    Suspendisse potenti. Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. 
    Vivamus nec nisi nec nunc mattis molestie. Sed auctor nunc nec nisi ultrices, in molestie nibh mattis.`, dueDate: '2024-04-26' },

    { title: 'Todo 3', description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
    Suspendisse potenti. Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. Vivamus nec nisi nec nunc mattis molestie. 
    Sed auctor nunc nec nisi ultrices, in molestie nibh mattis. Pellentesque habitant morbi tristique 
    senectus et netus et malesuada fames ac turpis egestas.`, dueDate: '2024-04-23' },

    { title: 'Todo 4', description: `Suspendisse potenti. Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. 
    Vivamus nec nisi nec nunc mattis molestie. Sed auctor nunc nec nisi ultrices, in molestie nibh mattis. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. 
    Nullam nec nibh nibh. Nullam quis nisl nec nunc congue mollis. `, dueDate: '2024-04-21' },
  ];

  const [todoLists, setTodoLists] = useState([
    { name: 'All Items', todos: start_todos},
  ]);

  const [selectedList, setSelectedList] = useState('All Items');

  const [todos, setTodos] = useState(start_todos);
  const getVariant = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 2) {
      return 'danger';
    } else if (diffDays < 4) {
      return 'warning';
    } else if (diffDays < 7) {
      return 'success';
    } else {
      return 'primary';
    }
  };

  const addTodoList = (newListName) => {
    setTodoLists([...todoLists, { name: newListName, todos: [] }]);
  };

  function addTodo(newTodo, listName){
    setTodoLists(todoLists.map(list => {
      if (list.name === listName || list.name === 'All Items') {
        return { ...list, todos: [...list.todos, newTodo] };
      } else {
        return list;
      }
    }));
  };

  const moveTodo = (todoToMove, newListName) => {
    setTodoLists(todoLists.map(list => {
      if (list.name === newListName) {
        // Add the todo to the new list
        return { ...list, todos: [...list.todos, todoToMove] };
      } else if (list.todos.includes(todoToMove)) {
        // Remove the todo from the old list
        return { ...list, todos: list.todos.filter(todo => todo !== todoToMove) };
      } else {
        return list;
      }
    }));
  };

return (
  <Container className="p-3">
    <Row className="mb-5">
      <Col>
        <h1 className="text-center">Assignment 3: Brian's ToDo List</h1>
      </Col>
    </Row>
    <Row className="d-flex align-items-start">
      <Col md={4} className="form-container">
        <Form onSubmit={(e) => {
            e.preventDefault();
            addTodoList(e.target.elements[0].value);
            e.target.reset();
          }}>
          <Form.Group className="mb-3">
            <Form.Label>New List Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add New List
          </Button>
        </Form>

        <Form onSubmit={(e) => {
            e.preventDefault();
            addTodo({
              title: e.target.elements.title.value,
              description: e.target.elements.description.value,
              dueDate: e.target.elements.dueDate.value
            }, e.target.elements.list.value);
            e.target.reset();
        }}>
  <Form.Group>
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" name="title" required />
  </Form.Group>
  <Form.Group>
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} name="description" required />
  </Form.Group>
  <Form.Group>
    <Form.Label>Due Date</Form.Label>
    <Form.Control type="date" name="dueDate" required />
  </Form.Group>
  <Form.Group>
    <Form.Label>List</Form.Label>
    <Form.Control as="select" name="list" required>
      {todoLists.map((list, index) => (
        <option key={index} value={list.name}>{list.name}</option>
      ))}
    </Form.Control>
  </Form.Group>
  <Button variant="primary" type="submit" className="w-100">Add Todo</Button>
</Form>
      </Col>
      <Col md={8}>
        <Tab.Container id="list-tabs" defaultActiveKey="All Items">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {todoLists.map((list, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={list.name}>{list.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {todoLists.map((list, index) => (
                  <Tab.Pane eventKey={list.name} key={index}>
                    {list.todos.map((todo, index) => (
                      <ListGroup.Item key={index} variant={getVariant(todo.dueDate)}>
                        <h4 contentEditable>{todo.title}</h4>
                        <p contentEditable>{todo.description}</p>
                        <input type="date" defaultValue={todo.dueDate} className="p-2" />
                        <Dropdown onSelect={(newListName) => moveTodo(todo, newListName)} className="float-right">
                          <Dropdown.Toggle variant="success" id={`dropdown-basic${index}`}>
                            Move to...
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {todoLists.map((list, listIndex) => (
                              <Dropdown.Item eventKey={list.name} key={listIndex}>{list.name}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </ListGroup.Item>
                    ))}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
    </Row>
  </Container>
);

}

export default TodoList;