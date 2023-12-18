import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Remove16x } from "../../components/icons";

interface TodoType {
  id: string;
  title: string;
  isCompleted: boolean;
}

const initialTodoList: TodoType[] = [
  { id: "1", title: "evi temizle", isCompleted: false },
  { id: "2", title: "mutfak için alışveriş yap", isCompleted: false },
  { id: "3", title: "internet faturası öde", isCompleted: false },
];

export function TodoContainer() {
  const [todos, setTodos] = useState(initialTodoList);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //#region fonksiyonlar
  //------------------------

  const saveTodos = (newTodos: TodoType[]) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const loadTodos = () => {
    const loadedText = localStorage.getItem("todos");
    if (loadedText !== null) {
      const loadedItems: TodoType[] = JSON.parse(loadedText);
      setTodos(loadedItems);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addNewItemClick = () => {
    if (newTodoTitle !== "") {
      const newTodo: TodoType = {
        id: crypto.randomUUID(),
        title: newTodoTitle,
        isCompleted: false,
      };
      saveTodos([...todos, newTodo]);
      setNewTodoTitle("");
      setShowAlert(false);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const delItemClick = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };

  const deleteCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    saveTodos(newTodos);
  };

  const swapCompeted = (id: string) => {
    console.log(id);
    const newTodos: TodoType[] = todos.map((todo) => ({
      ...todo,
      isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
    }));
    console.log(newTodos);
    saveTodos(newTodos);
  };

  //#endregion

  return (
    <div>
      <h2>Görev listesi</h2>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item className="d-flex justify-content-between align-items-center" key={todo.id}>
            <div role="button" className="w-100" onClick={() => swapCompeted(todo.id)}>
              {todo.isCompleted ? (
                <del className="text-success">
                  <i>{todo.title}</i>
                </del>
              ) : (
                <div>{todo.title}</div>
              )}
            </div>
            <div onDoubleClick={() => delItemClick(todo.id)}></div>
            <Button className="m-0" variant="outline-danger" onClick={() => delItemClick(todo.id)}>
              <Remove16x />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="text-danger small" role="button" onClick={deleteCompleted}>
        Tamamlanan görevleri sil
      </div>

      <h2 className="mt-4">Yeni görev ekle</h2>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Label>Görev tanımı</Form.Label>
        <InputGroup>
          <Form.Control value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.currentTarget.value)} />
          <Button type="submit" onClick={addNewItemClick}>
            Kaydet
          </Button>
        </InputGroup>
        {showAlert && <Alert variant="danger">Görev tanımı girilmelidir !</Alert>}
      </Form>
    </div>
  );
}
