
const PRECIO_ENTRADA = 20;
const CUPOS_INICIALES = 50;

const DESCUENTO_ESTUDIANTE = 0.30;
const DESCUENTO_DOCENTE = 0.15;
const DESCUENTO_PUBLICO_GENERAL = 0;

const MAXIMO_ENTRADAS = 5;

let cuposDisponibles = CUPOS_INICIALES;
let entradasVendidas = 0;
let ingresosAcumulados = 0;
let numeroCompras = 0;

let opcionMenu = "";

function comprarEntradas() {
    const nombreIngresado = prompt("Ingrese el nombre del comprador:");

    if (nombreIngresado === null || nombreIngresado.trim() === "") {
        alert("Compra rechazada: debe ingresar el nombre del comprador.");
        console.log("Compra rechazada por nombre inválido.");
        return;
    }

    const nombreComprador = nombreIngresado.trim();

    const tipoIngresado = prompt(
        "Seleccione el tipo de participante:\n\n" +
        "1. Estudiante\n" +
        "2. Docente\n" +
        "3. Público general"
    );

    if (tipoIngresado === null) {
        alert("Compra cancelada.");
        console.log("El usuario canceló la selección del participante.");
        return;
    }

    const tipoParticipante = tipoIngresado.trim().toLowerCase();

    let nombreTipo = "";
    let porcentajeDescuento = 0;

    switch (tipoParticipante) {
        case "1":
        case "estudiante":
            nombreTipo = "Estudiante";
            porcentajeDescuento = DESCUENTO_ESTUDIANTE;
            break;

        case "2":
        case "docente":
            nombreTipo = "Docente";
            porcentajeDescuento = DESCUENTO_DOCENTE;
            break;

        case "3":
        case "publico general":
        case "público general":
        case "publico":
        case "público":
            nombreTipo = "Público general";
            porcentajeDescuento = DESCUENTO_PUBLICO_GENERAL;
            break;

        default:
            alert(
                "Compra rechazada: el tipo de participante no es válido."
            );
            console.log(
                `Tipo de participante inválido: ${tipoIngresado}`
            );
            return;
    }

    const cantidadIngresada = prompt(
        `Ingrese la cantidad de entradas.\nMáximo permitido: ${MAXIMO_ENTRADAS}`
    );

    if (cantidadIngresada === null) {
        alert("Compra cancelada.");
        console.log("El usuario canceló el ingreso de la cantidad.");
        return;
    }

    const cantidadEntradas = Number(cantidadIngresada);

    const cantidadValida =
        Number.isInteger(cantidadEntradas) &&
        cantidadEntradas >= 1 &&
        cantidadEntradas <= MAXIMO_ENTRADAS;

    if (!cantidadValida) {
        alert(
            `Compra rechazada.\n` +
            `La cantidad debe ser un número entero entre 1 y ${MAXIMO_ENTRADAS}.`
        );

        console.log(
            `Compra rechazada por cantidad inválida: ${cantidadIngresada}`
        );

        return;
    }

    if (cantidadEntradas > cuposDisponibles) {
        alert(
            `Compra rechazada.\n\n` +
            `Entradas solicitadas: ${cantidadEntradas}\n` +
            `Cupos disponibles: ${cuposDisponibles}`
        );

        console.log("Compra rechazada por falta de cupos.");
        return;
    }

    const subtotal = cantidadEntradas * PRECIO_ENTRADA;
    const valorDescuento = subtotal * porcentajeDescuento;
    const totalPagar = subtotal - valorDescuento;
    const porcentajeMostrar = porcentajeDescuento * 100;

    cuposDisponibles -= cantidadEntradas;
    entradasVendidas += cantidadEntradas;
    ingresosAcumulados += totalPagar;
    numeroCompras++;

    const resumenCompra =
        `SIMULACIÓN DE UNA COMPRA\n\n` +
        `Nombre: ${nombreComprador}\n` +
        `Tipo de participante: ${nombreTipo}\n` +
        `Cantidad de entradas: ${cantidadEntradas}\n\n` +
        `Subtotal: $${subtotal.toFixed(2)}\n` +
        `Descuento (${porcentajeMostrar}%): $${valorDescuento.toFixed(2)}\n` +
        `Total a pagar: $${totalPagar.toFixed(2)}\n\n` +
        `Compra realizada exitosamente.\n\n` +
        `Cupos restantes: ${cuposDisponibles}`;

    alert(resumenCompra);
    console.log(resumenCompra);
}

function consultarCupos() {
    let mensajeDisponibilidad = "";

    if (cuposDisponibles > 10) {
        mensajeDisponibilidad = "Cupos disponibles";
    } else if (cuposDisponibles >= 1 && cuposDisponibles <= 10) {
        mensajeDisponibilidad = "Últimos cupos disponibles";
    } else {
        mensajeDisponibilidad = "Evento agotado";
    }

    const mensaje =
        `CONSULTA DE CUPOS\n\n` +
        `Cupos disponibles: ${cuposDisponibles}\n` +
        `Estado: ${mensajeDisponibilidad}`;

    alert(mensaje);
    console.log(mensaje);
}

function consultarIngresos() {
    const mensaje =
        `INGRESOS ACUMULADOS\n\n` +
        `Entradas vendidas: ${entradasVendidas}\n` +
        `Ingresos acumulados: $${ingresosAcumulados.toFixed(2)}\n` +
        `Número de compras realizadas: ${numeroCompras}`;

    alert(mensaje);
    console.log(mensaje);
}

function mostrarResumenFinal() {
    const resumenFinal =
        `RESUMEN FINAL - INNOVA ESPE 2026\n\n` +
        `Cupos iniciales: ${CUPOS_INICIALES}\n` +
        `Entradas vendidas: ${entradasVendidas}\n` +
        `Cupos restantes: ${cuposDisponibles}\n` +
        `Compras realizadas: ${numeroCompras}\n` +
        `Ingresos acumulados: $${ingresosAcumulados.toFixed(2)}\n\n` +
        `Gracias por utilizar el sistema.`;

    alert(resumenFinal);
    console.log(resumenFinal);
}

do {
    opcionMenu = prompt(
        "SISTEMA INNOVA ESPE 2026\n\n" +
        "1. Comprar entradas\n" +
        "2. Consultar cupos disponibles\n" +
        "3. Consultar ingresos acumulados\n" +
        "4. Salir\n\n" +
        "Seleccione una opción:"
    );

    if (opcionMenu === null) {
        opcionMenu = "4";
    } else {
        opcionMenu = opcionMenu.trim();
    }

    switch (opcionMenu) {
        case "1":
            comprarEntradas();
            break;

        case "2":
            consultarCupos();
            break;

        case "3":
            consultarIngresos();
            break;

        case "4":
            mostrarResumenFinal();
            break;

        default:
            alert(
                "Opción no válida.\nSeleccione una opción entre 1 y 4."
            );

            console.log(`Opción de menú inexistente: ${opcionMenu}`);
    }
} while (opcionMenu !== "4");