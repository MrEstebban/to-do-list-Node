const { argv } = require('./config/yargs');
const { to_do, crear, getListado, update, delete_task } = require('./to-do/to-do.js');
const { colors } = require('colors');

let commando = argv._[0];

switch (commando) {
    case 'crear':
        let task = crear(argv.descripcion);
        console.log('Tarea registrada');
        break;
    case 'listar':

        let list = getListado();

        for (let tarea of list) {
            console.log('=======Tarea por hacer======='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ' + tarea.completado);
            console.log('=============================\n'.green);
        }

        break;
    case 'actualizar':
        if (update(argv.descripcion, argv.completado)) {
            console.log(`Tarea actualizada`);
        } else {
            console.log('Tarea NO encontrada')
        }
        break;

    case 'borrar':
        let borrado = delete_task(argv.descripcion);

        if (borrado) {
            console.log('Tarea eliminada')
        } else {
            console.log('No fue eliminado ningún elemento');
        }

        break;
    default:
        console.log('Comando no reconocido');
        break;
}