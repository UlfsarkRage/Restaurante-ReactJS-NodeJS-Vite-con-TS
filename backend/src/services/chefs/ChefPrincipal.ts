// 1. Define las interfaces para la respuesta de éxito y de error
interface RespuestaExitosa {
  nombre: string;
  ingredientes: string;
  mensajeEspecial?: string;
}

interface RespuestaError {
  error: string;
}

// 2. Define un tipo de unión para el resultado de la clase
type RespuestaPlato = RespuestaExitosa | RespuestaError;

// La Clase Base (el Chef Principal)
class ChefPrincipal {
  plato: string;

  constructor(plato: string) {
    this.plato = plato;
  }

  // Ahora, estos métodos devuelven un tipo de unión para que la herencia funcione
  prepararSopa(): RespuestaPlato {
    console.log(
      `CHEF PRINCIPAL: ¡Estoy preparando la sopa con mi receta base!`
    );
    return {
      nombre: "Sopa de Pollo",
      ingredientes: "Caldo de pollo, fideos, zanahoria y papas.",
    };
  }

  prepararPlatoPrincipal(): RespuestaPlato {
    console.log(
      `CHEF PRINCIPAL: ¡Estoy preparando el plato principal con mi receta base!`
    );
    return {
      nombre: "Bistec a la Criolla",
      ingredientes: "Carne de res, arroz, huevo frito y plátano maduro.",
    };
  }
}

export default ChefPrincipal;
export { RespuestaExitosa, RespuestaError, RespuestaPlato };