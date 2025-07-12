import ChefPrincipal, { RespuestaExitosa, RespuestaError, RespuestaPlato } from './ChefPrincipal.js';
import ChefVegetariano from './ChefVegetariano.js';

class ChefSinGluten extends ChefPrincipal {
  constructor(plato: string) {
    super(plato);
  }

  prepararPlatoPrincipal(): RespuestaPlato {
    console.log(`CHEF SIN GLUTEN: ¡Estoy preparando el plato ${this.plato} con MI receta especial sin gluten!`);
    return {
      nombre: 'Bistec con Arroz y Papa',
      ingredientes: 'Carne de res, arroz, papa y plátano maduro. (SIN huevo).'
    };
  }

  prepararSopa(): RespuestaPlato {
    const chefDelegado = new ChefVegetariano(this.plato);
    const sopaVegetariana = chefDelegado.prepararSopa();

    // 1. Estrechamiento de tipos: Comprobamos si el resultado del otro chef es un error
    if ('error' in sopaVegetariana) {
      // 2. Si es un error, retornamos el error directamente
      return { error: 'El Chef Vegetariano no pudo hacer la sopa.' };
    }

    // 3. Si no es un error, TypeScript sabe que es una RespuestaExitosa y podemos usar sus propiedades
    return {
      nombre: sopaVegetariana.nombre,
      ingredientes: sopaVegetariana.ingredientes,
      mensajeEspecial: 'El Chef Sin Gluten no hace sopas. Este plato fue preparado por el Chef Vegetariano.'
    };
  }
}

export default ChefSinGluten;