import React, {useState} from "react";

//*    if (!value) return >> Verifica que no haya texto vacio


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  const addTask = (value) => {
    if (!value) return;
    const newTask = {
      id: Date.now().toString(),
      text: value,
    };
    setTasks([newTask, ...tasks]);
    setText("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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
               <span className="task-text"> {task.text} </span>
				
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
        </div>
      </div>
    </div>
  );
};

export default Home;