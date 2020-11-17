const fs = require('fs');


let list_to_do = [];

function getListado() {
    cargarBD();

    return list_to_do;
}

function cargarBD() {
    try {
        list_to_do = require('../DB/data.json');
    } catch (err) {
        list_to_do = [];
        console.log(err);
    }
}

function crear(descripcion) {

    cargarBD();

    let to_do = {
        descripcion,
        completado: false,
    };

    list_to_do.push(to_do);

    saveDB();

    return to_do;
}

function saveDB() {
    let data = JSON.stringify(list_to_do);

    fs.writeFile('./DB/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
    });
}

function update(descripcion, complete = true) {
    cargarBD();

    let index = list_to_do.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index > -1) {
        list_to_do[index].completado = complete;
        saveDB();
        return true;
    } else {

        return false
    }
}

function delete_task(description) {
    cargarBD();
    let index = list_to_do.findIndex(tarea => tarea.descripcion === description);

    if (index >= 0) {
        list_to_do.splice(1, index);
        saveDB();
        return true;
    } else {
        return false;
    }



}

module.exports = {
    crear,
    getListado,
    update,
    delete_task
}