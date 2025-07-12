import ChefPrincipal, { RespuestaExitosa, RespuestaError, RespuestaPlato } from './ChefPrincipal.js';
import ChefSinGluten from './ChefSinGluten.js';

class ChefVegetariano extends ChefPrincipal {
  constructor(plato: string) {
    super(plato);
  }

  prepararSopa(): RespuestaPlato {
    console.log(`CHEF VEGETARIANO: ¡Estoy preparando la sopa con MI receta especial de verduras!`);
    return {
      nombre: 'Sopa de Verduras',
      ingredientes: 'Caldo de verduras, fideos, zanahoria y apio.'
    };
  }

  prepararPlatoPrincipal(): RespuestaPlato {
    const chefDelegado = new ChefSinGluten(this.plato);
    const platoSinGluten = chefDelegado.prepararPlatoPrincipal();

    // 1. Estrechamiento de tipos: Comprobamos si el resultado del otro chef es un error
    if ('error' in platoSinGluten) {
      // 2. Si es un error, retornamos el error directamente
      return { error: 'El Chef Sin Gluten no pudo hacer el plato principal.' };
    }

    // 3. Si no es un error, TypeScript sabe que es una RespuestaExitosa y podemos usar sus propiedades
    return {
      nombre: platoSinGluten.nombre,
      ingredientes: platoSinGluten.ingredientes,
      mensajeEspecial: 'El Chef vegetariano no hace platos secos. Este plato fue preparado por el Chef Sin Gluten.'
    };
  }
}

export default ChefVegetariano;