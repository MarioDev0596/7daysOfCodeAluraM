// DIA 2 //

document.getElementById('iniciar-quiz').addEventListener('click', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace

    // Pregunta 1: Nombre
    const { value: nombre } = await Swal.fire({
        title: '¿Cuál es tu nombre?',
        input: 'text',
        inputPlaceholder: 'Escribe tu nombre',
        inputValidator: (value) => !value && '¡Por favor, ingresa tu nombre!'
    });
    if (!nombre) return;

    // Pregunta 2: Edad
    const { value: edad } = await Swal.fire({
        title: '¿Cuántos años tienes?',
        input: 'number',
        inputPlaceholder: 'Escribe tu edad',
        inputValidator: (value) => !value && '¡Por favor, ingresa tu edad!'
    });
    if (!edad) return;

    // Pregunta 3: Lenguaje de programación
    const { value: lenguaje } = await Swal.fire({
        title: '¿Qué lenguaje de programación estás estudiando?',
        input: 'text',
        inputPlaceholder: 'Escribe el lenguaje',
        inputValidator: (value) => !value && '¡Por favor, ingresa el lenguaje que estás estudiando!'
    });
    if (!lenguaje) return;

    await Swal.fire({
        title: 'Resultado',
        text: `Hola ${nombre}, tienes ${edad} años y ya estás aprendiendo ${lenguaje}!`,
        icon: 'success'
    });

    // Pregunta 4: ¿Te gusta estudiar el lenguaje?
    const { value: gusto } = await Swal.fire({
        title: `¿Te gusta estudiar ${lenguaje}?`,
        input: 'radio',
        inputOptions: {
            1: 'SÍ',
            2: 'NO'
        },
        inputValidator: (value) => !value && '¡Por favor, selecciona una opción!'
    });

    if (gusto === '1') {
        await Swal.fire({
            title: '¡Muy bien!',
            text: 'Sigue estudiando y tendrás mucho éxito.',
            icon: 'success'
        });
    } else if (gusto === '2') {
        await Swal.fire({
            title: 'Oh, qué pena...',
            text: '¿Ya intentaste aprender otros lenguajes?',
            icon: 'error'
        });
    }
});


// Día 3 //
async function startGame() {
    const { value: area } = await Swal.fire({
        title: '¿Qué área te interesa?',
        input: 'radio',
        inputOptions: {
            'Front-End': 'Front-End',
            'Back-End': 'Back-End'
        },
        inputValidator: (value) => !value && 'Selecciona una opción.'
    });

    if (!area) return;

    const { value: choice } = await Swal.fire({
        title: `¿Qué quieres aprender en ${area}?`,
        input: 'radio',
        inputOptions: area === 'Front-End'
            ? { 'React': 'React', 'Vue': 'Vue' }
            : { 'C#': 'C#', 'Java': 'Java' },
        inputValidator: (value) => !value && 'Selecciona una opción.'
    });

    if (!choice) return;

    await Swal.fire(`¡Genial! Has elegido ${choice}.`);

    const { value: path } = await Swal.fire({
        title: '¿Qué camino prefieres?',
        input: 'radio',
        inputOptions: { 'Especialización': 'Especialización', 'Fullstack': 'Fullstack' },
        inputValidator: (value) => !value && 'Selecciona una opción.'
    });

    await Swal.fire(`¡Perfecto! Has elegido ${path}.`);

    const technologies = [];
    while (true) {
        const { value: tech } = await Swal.fire({
            title: '¿Hay alguna otra tecnología que te gustaría aprender?',
            input: 'text',
            inputLabel: 'Tecnología',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'No'
        });

        if (tech) {
            technologies.push(tech);
            await Swal.fire(`${tech} es una tecnología valiosa.`);
        } else {
            break;
        }
    }

    Swal.fire(`Las tecnologías que te gustaría aprender son: ${technologies.join(', ') || 'ninguna'}.`);
}

// Asignar el evento al botón de iniciar juego para Día 3
document.getElementById('iniciar-juego-dia3').addEventListener('click', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace
    await startGame(); // Inicia el juego
});

// Día 4: Juego de Adivinar el Número Secreto
async function adivinarNumero() {
    let numeroSecreto = 2;
    let numeroUsuario;
    let intentos = 0;
    let posiblesIntentos = 3;

    while (intentos < posiblesIntentos) {
        // Solicitar número al usuario usando SweetAlert2
        const { value: input } = await Swal.fire({
            title: 'Indica un número del 1 al 10',
            input: 'text',
            inputPlaceholder: 'Escribe un número',
            inputValidator: (value) => {
                if (!value) return '¡Por favor, ingresa un número!';
                if (isNaN(value)) return '¡Debe ser un número!';
            }
        });

        numeroUsuario = parseInt(input); // Convertir el valor ingresado a número

        if (numeroUsuario === numeroSecreto) {
            await Swal.fire({
                title: '¡Acertaste!',
                text: `El número es ${numeroUsuario}. Lo hiciste en ${intentos + 1} ${intentos === 0 ? 'vez' : 'veces'}.`,
                icon: 'success'
            });
            break; // Salir del bucle si se adivina el número
        } else {
            intentos++; // Incrementar el número de intentos

            let mensaje = numeroUsuario > numeroSecreto 
                ? `El número es menor. Te quedan ${posiblesIntentos - intentos} intentos.`
                : `El número es mayor. Te quedan ${posiblesIntentos - intentos} intentos.`;
            
            await Swal.fire({
                title: 'Intento fallido',
                text: mensaje,
                icon: 'info'
            });
        }

        // Verificar si se acabaron los intentos
        if (intentos === posiblesIntentos) {
            await Swal.fire({
                title: 'Se acabaron los intentos',
                text: `Lo siento, se acabaron los intentos. El número secreto era ${numeroSecreto}.`,
                icon: 'error'
            });
        }
    }
}

// Asignar el evento al botón de iniciar juego para Día 4
document.getElementById('iniciar-juego-dia4').addEventListener('click', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace
    await adivinarNumero(); // Inicia el juego
});


// DIA 5 //

document.getElementById('iniciar-juego-dia5').addEventListener('click', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace

    const frutas = [];
    const lacteos = [];
    const congelados = [];
    const dulces = [];
    const otros = [];

    // Preguntar si desea agregar un alimento a la lista de compras
    const { value: respuesta } = await Swal.fire({
        title: '¿Deseas agregar un alimento a tu lista de compras?',
        input: 'radio',
        inputOptions: {
            si: 'Sí',
            no: 'No'
        },
        inputValidator: (value) => !value && 'Por favor, selecciona una opción'
    });

    if (respuesta === 'si') {
        let continuar = true;

        while (continuar) {
            // Solicitar el nombre del producto
            const { value: productoNuevo } = await Swal.fire({
                title: 'Escribe el nombre del producto que deseas agregar',
                input: 'text',
                inputPlaceholder: 'Nombre del producto',
                inputValidator: (value) => !value && 'Por favor, ingresa un nombre de producto'
            });

            // Solicitar la categoría del producto
            const { value: categoria } = await Swal.fire({
                title: '¿En qué categoría encaja ese alimento?',
                input: 'radio',
                inputOptions: {
                    frutas: 'Frutas',
                    lacteos: 'Lácteos',
                    congelados: 'Congelados',
                    dulces: 'Dulces',
                    otros: 'Otros'
                },
                inputValidator: (value) => !value && 'Por favor, selecciona una categoría'
            });

            switch (categoria) {
                case 'frutas':
                    frutas.push(productoNuevo);
                    break;
                case 'lacteos':
                    lacteos.push(productoNuevo);
                    break;
                case 'congelados':
                    congelados.push(productoNuevo);
                    break;
                case 'dulces':
                    dulces.push(productoNuevo);
                    break;
                case 'otros':
                    otros.push(productoNuevo);
                    break;
                default:
                    await Swal.fire({
                        title: 'Categoría no reconocida',
                        text: 'Por favor, ingresa una categoría válida.',
                        icon: 'error'
                    });
                    break;
            }

            // Preguntar si desean agregar más productos
            const { value: agregarMas } = await Swal.fire({
                title: '¿Deseas agregar más productos?',
                input: 'radio',
                inputOptions: {
                    si: 'Sí',
                    no: 'No'
                },
                inputValidator: (value) => !value && 'Por favor, selecciona una opción'
            });

            continuar = agregarMas === 'si';
        }

        // Mostrar la lista final usando SweetAlert2
        Swal.fire({
            title: 'Lista de compras',
            html: `
                <strong>Frutas:</strong> ${frutas.join(", ") || 'Ninguna'}<br>
                <strong>Lácteos:</strong> ${lacteos.join(", ") || 'Ninguno'}<br>
                <strong>Congelados:</strong> ${congelados.join(", ") || 'Ninguno'}<br>
                <strong>Dulces:</strong> ${dulces.join(", ") || 'Ninguno'}<br>
                <strong>Otros:</strong> ${otros.join(", ") || 'Ninguno'}
            `,
            icon: 'info'
        });
    }
});

// Dia 6 //

let frutas = [];
let lacteos = [];
let congelados = [];
let dulces = [];
let confirmar = true;

document.getElementById('iniciar-juego-dia6').addEventListener('click', () => {
    Swal.fire({
        title: '¡Bienvenido!',
        text: 'Este programa está diseñado para realizar una lista de compras.',
        icon: 'info',
        confirmButtonText: 'Comenzar'
    }).then(() => {
        agregarProducto();
    });
});

function agregarProducto() {
    Swal.fire({
        title: 'Agregar Producto',
        input: 'text',
        inputLabel: 'Ingrese el artículo que desea comprar:',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Terminar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debe ingresar un producto';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let compra = result.value;
            Swal.fire({
                title: `${compra} en qué categoría se encuentra:`,
                input: 'radio',
                inputOptions: {
                    1: 'Frutas',
                    2: 'Lácteos',
                    3: 'Congelados',
                    4: 'Dulces'
                },
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debe seleccionar una categoría';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    let categoria = parseInt(result.value);
                    switch (categoria) {
                        case 1:
                            frutas.push(compra);
                            break;
                        case 2:
                            lacteos.push(compra);
                            break;
                        case 3:
                            congelados.push(compra);
                            break;
                        case 4:
                            dulces.push(compra);
                            break;
                    }
                    Swal.fire({
                        title: 'Producto Agregado',
                        text: `Se ha agregado ${compra} a la categoría seleccionada.`,
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    }).then(() => {
                        continuarProceso();
                    });
                }
            });
        } else {
            mostrarLista();
        }
    });
}

function continuarProceso() {
    Swal.fire({
        title: '¿Qué te gustaría hacer ahora?',
        input: 'radio',
        inputOptions: {
            'agregar': 'Agregar otro producto',
            'eliminar': 'Eliminar un producto',
            'terminar': 'Terminar y mostrar lista'
        },
        inputValidator: (value) => {
            if (!value) {
                return 'Debes seleccionar una opción';
            }
        }
    }).then((result) => {
        if (result.value === 'agregar') {
            agregarProducto();
        } else if (result.value === 'eliminar') {
            eliminarProducto();
        } else {
            mostrarLista();
        }
    });
}

function eliminarProducto() {
    const todasLasListas = [...frutas, ...lacteos, ...congelados, ...dulces];
    if (todasLasListas.length === 0) {
        Swal.fire({
            title: 'No hay productos para eliminar',
            text: 'Tu lista está vacía.',
            icon: 'info',
            confirmButtonText: 'Continuar'
        }).then(() => {
            continuarProceso();
        });
    } else {
        Swal.fire({
            title: 'Eliminar Producto',
            input: 'select',
            inputOptions: todasLasListas.reduce((options, item, index) => {
                options[index] = item;
                return options;
            }, {}),
            inputPlaceholder: 'Selecciona un producto para eliminar',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (value === null) {
                    return 'Debes seleccionar un producto';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                let indice = parseInt(result.value);
                let productoEliminado = todasLasListas[indice];

                if (frutas.includes(productoEliminado)) {
                    frutas.splice(frutas.indexOf(productoEliminado), 1);
                } else if (lacteos.includes(productoEliminado)) {
                    lacteos.splice(lacteos.indexOf(productoEliminado), 1);
                } else if (congelados.includes(productoEliminado)) {
                    congelados.splice(congelados.indexOf(productoEliminado), 1);
                } else if (dulces.includes(productoEliminado)) {
                    dulces.splice(dulces.indexOf(productoEliminado), 1);
                }

                Swal.fire({
                    title: 'Producto Eliminado',
                    text: `${productoEliminado} ha sido eliminado de la lista.`,
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    continuarProceso();
                });
            } else {
                continuarProceso();
            }
        });
    }
}

function mostrarLista() {
    Swal.fire({
        title: 'Lista de Compras',
        html: `<p><strong>Frutas:</strong> ${frutas.join(", ") || "Ninguno"}</p>
               <p><strong>Lácteos:</strong> ${lacteos.join(", ") || "Ninguno"}</p>
               <p><strong>Congelados:</strong> ${congelados.join(", ") || "Ninguno"}</p>
               <p><strong>Dulces:</strong> ${dulces.join(", ") || "Ninguno"}</p>`,
        confirmButtonText: 'Finalizar'
    });
}


// DIA 7 //

document.getElementById('iniciar-calculadora-dia7').addEventListener('click', () => {
    mostrarOperaciones();
});

function mostrarOperaciones() {
    Swal.fire({
        title: 'Calculadora',
        text: 'Elige una operación:',
        input: 'select',
        inputOptions: {
            '1': 'Suma',
            '2': 'Resta',
            '3': 'Multiplicación',
            '4': 'División',
            '5': 'Salir'
        },
        inputPlaceholder: 'Selecciona una operación',
        showCancelButton: false,
        confirmButtonText: 'Seleccionar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debes seleccionar una operación';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let opcion = parseInt(result.value);
            if (opcion === 5) {
                Swal.fire({
                    title: 'Hasta la próxima',
                    icon: 'info',
                    confirmButtonText: 'Cerrar'
                });
            } else {
                ingresarValores(opcion);
            }
        }
    });
}

function ingresarValores(opcion) {
    Swal.fire({
        title: 'Ingrese dos números',
        html: `
            <input id="valor1" class="swal2-input" type="number" placeholder="Primer número">
            <input id="valor2" class="swal2-input" type="number" placeholder="Segundo número">
        `,
        confirmButtonText: 'Calcular',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const valor1 = parseFloat(Swal.getPopup().querySelector('#valor1').value);
            const valor2 = parseFloat(Swal.getPopup().querySelector('#valor2').value);
            if (isNaN(valor1) || isNaN(valor2)) {
                Swal.showValidationMessage('Debes ingresar dos números válidos');
                return false;
            }
            return { valor1, valor2 };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { valor1, valor2 } = result.value;
            let resultado;
            switch (opcion) {
                case 1:
                    resultado = suma(valor1, valor2);
                    break;
                case 2:
                    resultado = resta(valor1, valor2);
                    break;
                case 3:
                    resultado = multiplicacion(valor1, valor2);
                    break;
                case 4:
                    resultado = division(valor1, valor2);
                    break;
            }
            Swal.fire({
                title: 'Resultado',
                text: `El resultado es: ${resultado}`,
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                mostrarOperaciones();
            });
        }
    });
}

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return 'No se puede dividir entre cero';
    }
    return a / b;
}


