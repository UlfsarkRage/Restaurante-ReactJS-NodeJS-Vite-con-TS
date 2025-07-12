// La Clase Base (el Chef Principal)
class ChefPrincipal {
    plato;
    constructor(plato) {
        this.plato = plato;
    }
    // Ahora, estos métodos devuelven un tipo de unión para que la herencia funcione
    prepararSopa() {
        console.log(`CHEF PRINCIPAL: ¡Estoy preparando la sopa con mi receta base!`);
        return {
            nombre: "Sopa de Pollo",
            ingredientes: "Caldo de pollo, fideos, zanahoria y papas.",
        };
    }
    prepararPlatoPrincipal() {
        console.log(`CHEF PRINCIPAL: ¡Estoy preparando el plato principal con mi receta base!`);
        return {
            nombre: "Bistec a la Criolla",
            ingredientes: "Carne de res, arroz, huevo frito y plátano maduro.",
        };
    }
}
export default ChefPrincipal;
