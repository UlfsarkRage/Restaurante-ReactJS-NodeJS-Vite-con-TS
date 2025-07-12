// 1. Importaciones: Usaremos los mismos hooks y librerías
import { useState } from "react";
import axios from "axios";
import "./App.css";

// 2. Definir los tipos de datos (Interfaces)
// Las interfaces son como "contratos" que describen la forma de los objetos.
// Esto es el corazón de TypeScript.

// Esta es la interfaz para una respuesta exitosa
interface RespuestaExitosa {
  nombre: string;
  ingredientes: string;
  mensajeEspecial?: string; // El '?' indica que este campo es opcional
}

// Esta es la interfaz para una respuesta de error
interface RespuestaError {
  error: string;
}

// 3. El componente: Le agregaremos tipos a las variables de estado y a las funciones.
function App() {
  // El estado para el tipo de cliente y el plato que pedirá
  const [tipoCliente, setTipoCliente] = useState("normal");
  const [plato, setPlato] = useState("sopa");

  // Ahora le decimos a useState que la respuesta puede ser uno de tres tipos:
  // o la respuesta exitosa, o la respuesta de error, o nula
  // (el null es necesario por que asi se inicializa al renderizar el componente
  // podemos renderizar con una cadena de texto u otro valor (| string>('Esperando pedido...'); pero no es recomendado
  // lo ideal es usar otra variable como flagpara ese paso como a continuación con "mensajeEstado")
  const [respuesta, setRespuesta] = useState<
    RespuestaExitosa | RespuestaError | null
  >(null);

  // Estado para el mensaje de estado (inicialmente un string)
  const [mensajeEstado, setMensajeEstado] = useState("Esperando pedido...");

  // La función que se ejecuta al enviar el formulario
  // Le indicamos a TypeScript que 'e' es un evento de formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeEstado("Enviando pedido al servidor..."); // Mostramos un mensaje de carga
    try {
      // Hacemos una petición POST al backend usando Axios
      // Le decimos a Axios que esperamos una respuesta a cualquier contrato de los establecidos al inicio
      // (RespuestaExitosa o RespuestaError)
      const res = await axios.post<RespuestaExitosa>(
        "http://localhost:5000/api/pedidos/procesar",
        {
          tipoCliente,
          plato,
        }
      );
      setRespuesta(res.data);
    } catch (error) {
      console.error("Error al hacer el pedido:", error);
      setRespuesta({ error: "Hubo un error con tu pedido." });
      setMensajeEstado("¡Ha ocurrido un error!"); // Mostramos un mensaje de error
    }
  };
  // En el JSX, puedes mostrar el mensaje de estado o la respuesta de los datos
  return (
    <div className="App">
      <h1>Haciendo un pedido al restaurante</h1>
      <p>
        Elige tu tipo de cliente y tu plato. El mesero (el controlador) le dirá
        al chef (la clase de servicio) correcto qué preparar.
      </p>

      {/* El formulario del cliente */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="cliente">Tipo de Cliente:</label>
        <select
          id="cliente"
          value={tipoCliente}
          onChange={(e) => setTipoCliente(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="sin-gluten">Sin Gluten</option>
        </select>

        <label htmlFor="plato">Plato:</label>
        <select
          id="plato"
          value={plato}
          onChange={(e) => setPlato(e.target.value)}
        >
          <option value="sopa">Sopa</option>
          <option value="plato_principal">Plato Principal</option>
        </select>

        <button type="submit">Hacer Pedido</button>
      </form>

      {mensajeEstado && <p>{mensajeEstado}</p>}

      {/* Mostramos la respuesta del chef */}
      {respuesta && (
        <div className="respuesta">
          <h2>Respuesta del Chef:</h2>
          {("error" in respuesta) ? (
            <p className="error">{respuesta.error}</p>
          ) : (
            <>
              <h3>Nombre del Plato: {respuesta.nombre}</h3>
              <p>Ingredientes: {respuesta.ingredientes}</p>
              {respuesta.mensajeEspecial && (
                <p>Mensaje Especial: {respuesta.mensajeEspecial}</p>
              )}
            </>
          )}
        </div>
      )}

     
    </div>
  );
}

export default App;
