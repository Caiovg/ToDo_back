const express = require('express');
const router = express.Router();
//endentifica as rotas que estão chegando
const TaskController = require('../controller/TaskController');
/**Validação */
const TaskValidation = require("../middlewares/TaskValidation");

/**Validação para o all(buscar todos) */
const MacaddressValidation = require("../middlewares/MacaddressValidation");

router.post('/', TaskValidation, TaskController.create);
//chamndo a função de criar ou a rota de criar tarefas

router.put('/:id', TaskValidation, TaskController.update);

/**Buscar Todos*/
router.get('/filter/all/:macaddress', TaskController.all);
/**Buscar por id */
router.get('/:id', TaskController.show);
/**Buscar as tarefas atrasadas */
router.get('/filter/late/:macaddress', TaskController.late);
/**Buscar as tarefas do dia */
router.get('/filter/today/:macaddress', TaskController.Today);
/**Buscar as tarefas da semana */
router.get('/filter/week/:macaddress', TaskController.week);
/**Buscar as tarefas do mês */
router.get('/filter/month/:macaddress', TaskController.month);
/**Buscar as tarefas do ano */
router.get('/filter/year/:macaddress', TaskController.year);

router.delete('/:id', TaskController.delete);
router.put('/:id/:done', TaskController.done);

module.exports = router;