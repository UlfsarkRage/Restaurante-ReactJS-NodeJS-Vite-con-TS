import ChefPrincipal from '../services/chefs/ChefPrincipal.js';
import ChefVegetariano from '../services/chefs/ChefVegetariano.js';
import ChefSinGluten from '../services/chefs/ChefSinGluten.js';
// La lógica del mesero para tomar el pedido
export function procesarPedido(req, res) {
    const { tipoCliente, plato } = req.body;
    console.log(`\nMESERO(Controlador): Recibí un pedido de un cliente de tipo '${tipoCliente}' para el plato '${plato}'.`);
    let chef;
    // Usa la lógica para asignar el pedido al chef correcto
    if (tipoCliente === 'vegetariano') {
        // Si el cliente es vegetariano, SIEMPRE se le asigna al Chef Vegetariano
        chef = new ChefVegetariano(plato);
        console.log(`MESERO(Controlador): Decido llamar al Chef Vegetariano.`);
    }
    else if (tipoCliente === 'sin-gluten') {
        // Si el cliente es sin-gluten, SIEMPRE se le asigna al Chef Sin Gluten
        chef = new ChefSinGluten(plato);
        console.log(`MESERO(Controlador): Decido llamar al Chef Sin Gluten.`);
    }
    else {
        // Para cualquier otro caso, se le asigna al Chef Principal
        chef = new ChefPrincipal(plato);
        console.log(`MESERO(Controlador): Decido llamar al Chef Principal.`);
    }
    // Y ahora el controlador toma la decisión de qué método llamar
    let resultado;
    if (plato === 'sopa') {
        resultado = chef.prepararSopa();
    }
    else if (plato === 'plato_principal') {
        resultado = chef.prepararPlatoPrincipal();
    }
    else {
        resultado = { error: 'Plato no encontrado en este recetario.' };
    }
    console.log(`MESERO(Controlador): El chef me devolvió el plato. Devuelvo el resultado al cliente.`);
    res.json(resultado);
}
