const TaskModel = require('../model/TaskModel');
const { response } = require('express');

/**Essa constante pega a data e a hora atual para que possamos listar as tarefas 
 * atrasadas, as de hoje, semana que vem, do mês e do ano
 */
const current = new Date();

/**Para conseguir pegar as tarefas do dia eu preciso pegar o primeiro horario do dia e o ultimo horario do dia */
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns')

//chamando o banco

class TaskController {

    async create(req, res){
        //para criar tarefas para o aplicativo
        //req = requisição res = resposta
        const task = new TaskModel(req.body);
        //tudo o que o usuario digitar vai vim para cá e sera jogado para o taskmodel
        await task
            .save()
            //salva no banco
            .then(response => {
                return res.status(200).json(response);
            })
            //mostra se deu certo
            .catch(error => {
                return res.status(500).json(error);
            });
            //mostra se deu errado

    }

    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true })
        .then(response => {
            return res.status(200).json(response);
        })
        //mostra se deu certo
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Mostrar todos as tarefas */
    async all(req, res){
        await TaskModel.find({ macaddress: {'$in': req.params.macaddress }})
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            //mostra se deu certo
            .catch(error => {
                return res.status(500).json(error);
            });
            //mostra se deu errado
    }

    /**Mostrar uma tarefa específica */
    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response => {
            if(response)
                return res.status(200).json(response);
            else
                return res.status(404).json({error: 'tarefa não encontrada'});
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Vai alterar o status da tarefa para concluida ou não concluida */
    async done(req, res){
        await TaskModel.findByIdAndUpdate(
        {'_id': req.params.id},
        {'done': req.params.done},
        {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Vai me mostrar as tarefas atrasadas */
    async late(req, res){
        await TaskModel
        .find({
            'when': {'$lt': current},
            'macaddress': {'$in': req.params.macaddress}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Vai me mostrar as tarefas de hoje */
    async Today(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            /**aonde a data seja maior ou igual que a primeira hora daquele dia do current é menor igual a ultima hora daquele dia do current */
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)},
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Vai me mostrar as tarefas da semana  */
    async week(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            /**aonde a data seja maior ou igual que a primeira hora do dia da semana do current é menor igual a ultima hora do dia da semana do current */
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)},
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Vai me mostrar as tarefas do mês  */
    async month(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            /**aonde a data seja maior ou igual que a primeira hora do dia da semana do current é menor igual a ultima hora do dia da semana do current */
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)},
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    /**Vai me mostrar as tarefas do ano  */
    async year(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            /**aonde a data seja maior ou igual que a primeira hora do dia da semana do current é menor igual a ultima hora do dia da semana do current */
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)},
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }
}
//para passa os comandos para o banco usa class para caber mais de um metodo
module.exports = new TaskController();