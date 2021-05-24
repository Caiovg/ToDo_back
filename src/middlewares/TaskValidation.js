const TaskModel = require("../model/TaskModel");
/**verificação de data e hora*/
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {

    const {
        macaddress,
        type,
        title,
        description,
        when
    } = req.body;

    if(!macaddress)
    return res.status(400).json({ error: 'Macaddress é obrigatório'});
    else if(!type)
    return res.status(400).json({ error: 'Tipo é obrigatório'});
    else if(!title)
    return res.status(400).json({ error: 'Titulo é obrigatório'});
    else if(!description)
    return res.status(400).json({ error: 'Descrição é obrigatório'});
    else if(!when)
    return res.status(400).json({ error: 'Data e Hora são obrigatórios'});
    
    else{
        let exists;

        /**para o update se não ele atualiza as tarefas para o mesmo dia e hora */
        if(req.params.id){
            exists = await TaskModel.
                findOne({ 
                '_id': {'$ne': req.params.id},
                'when': {'$eq': new Date(when)},
                /**Ira executar essa linha de codigo se o macaddress da pessoa for o mesmo */
                'macaddress': {'$in': macaddress}
                }); 
        }else{
            
            /**verifica se a data e a hora esta no passado sendo assim ele não pode cadastrar */
            if(isPast(new Date(when)))
                return res.status(400).json({ error: 'Escolha uma data e hora futura'});
            /**Vai verificar se ja não existe uma tarefa marcada para essa mesma data e hora*/
            exists = await TaskModel.
                findOne({ 'when': {'$eq': new Date(when)},
                /**Ira executar essa linha de codigo se o macaddress da pessoa for o mesmo */
                'macaddress': {'$in': macaddress}
                });
            
            /** */
        }

        if(exists){
            return res.status(400).json({ error: 'já existe uma tarefa nesse mesmo dia e horario'});
        }
      
      
        next();
    }
}

module.exports = TaskValidation;