import React, {useState, useEffect} from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const API_URL = "https://playground.4geeks.com/todo";   		{/*4Geeks API URL */}
  const USERNAME = "jabon05";                                 {/*My User */}


{/*Creacion de nuevo usuario */}
  const createNewUser = async () => {
  try {
    const response = await fetch(`${API_URL}/users/${USERNAME}`, { method: "POST" });
    if (!response.ok) console.log("Este usuario ya existe");
  } catch (error) {
    console.error("Error creando el usuario, codigo:", error);
  };
  };

{/*Llamar todas las tareas del usuario */}
  const getAllTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/users/${USERNAME}`);  {/*AQUI SE ESPECIFICA EL DIRECTORIO Y SE IDENTIFICA SI ES UNA ACCION DEL TODO O EL USUARIO (/users/ {o} /todos/)*/}
    if (response.ok) {
      const data = await response.json();
      setTasks(data.todos || []);
    } else if (response.status === 404) {           {/* Solo crea el usuario si el GET devuelve 404 porque el usuario no existe */}
      console.warn("Usuario no existe, creando un nuevo usuario.");
      await createNewUser(); 
    } else {
      console.error("Fallo al buscar las tareas, codigo:", response.status);
    }
  } catch (error) {
    console.error("Error buscando las tareas, codigo:", error);
  }
  };

{/*Agregar una nueva tarea */}
  const addTask = async (value) => {
    if (!value) return;
    const newTask = {
      label: value, 
      is_done: false
    };
    try {
      const response = await fetch(`${API_URL}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        await getAllTasks();
        setText("");
      } else {
      console.error("Error agregando una nueva tarea:", response.status);
      }
    } catch (error) {
      console.error("Error agregando una nueva tarea:", error);
    }
  };

{/*Eliminar una tarea */}
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
      if (response.ok) {
        await getAllTasks();
      }
    } catch (error) {
      console.error("Error borrando la tarea:", error);
    }
  };

{/*Eliminar todas las tareas */}
  const clearAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${USERNAME}`, { method: "DELETE" });
      if (response.ok) {
        await createNewUser();
        await getAllTasks();
      }
    } catch (error) {
      console.error("Error eliminando todas las tareas:", error);
    }
  };

  useEffect(() => {
      getAllTasks();
  }, []);

  return (
    <div className="container py-5 ">
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
		{/* Empieza la caja de tareas */}
        <div className="card-body bg-light">
          <h1 className="card-title mb-4 text-center">To-Do List</h1>
		  {/* Input para agregar las tareas */}
			<input
				className="form-control mb-3"
				placeholder="Agregar nueva tarea."
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
				if (e.key === "Enter") addTask(text);
				}}
			/>
			{/* Aqui empieza la lista de tareas */}
          <ul className="list-group mb-3">
			{/* Si no hay tareas se mostrara esto */}
            {tasks.length === 0 && (
              <li className="list-group-item text-center text-muted">
                No hay tareas, añadir tareas.
              </li>
            )}
			{/* lista de tareas */}
            {tasks.map((task) => (
              <li
                key={task.id}
                className="list-group-item d-flex justify-content-between align-items-center position-relative task-item"
				onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
              >
               <span className="task-text"> {task.label} </span>
				
			{/* boton para borrar las tareas */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn-close btn-close-red"
                  aria-label="Eliminar tarea"
				  style={{
                    opacity: hoveredTaskId === task.id ? 1 : 0,
                    transition: "opacity 0.2s", 
					color: "red"
	                  }}></button>
              </li>
            ))}
          </ul>

          <p className="text-muted">Tareas pendientes: {tasks.length}</p>
          {/* Boton para borrar todo */}
          <button onClick={clearAllTasks} className="btn btn-danger w-100">
            Borrar todas las tareas
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
