const controller = {};

controller.list =  (req,res)=>{
    req.getConnection((_err, conn) =>{
        conn.query('SELECT * FROM pacientes', (err, pacientes)=>{
            try {
                res.render('pacientes',{
                    data: pacientes
                });
            } 
            catch (error) {
                res.json(err);
            }
        })
    });
};

controller.save = (req, res) =>{
    
    const data = req.body;
    console.log('Datos recibidos:', data);  // Verifica qué datos están llegando
 
    req.getConnection((_err, conn)=>{
        if (_err) {
            console.log('Error de conexión:', _err);  // Error de conexión
            return res.status(500).json({ message: 'Error de conexión a la base de datos' });
        }
        conn.query('INSERT INTO pacientes set ?', [data], (err, _paciente) => {
            if (err) {
                console.error(err);  // Error al insertar
                return res.status(500).json({ message: 'Error al insertar paciente', error: err});
            }
            try {
                res.redirect('/');
                } 
            catch (error) {
                res.json(err);
            }});
        })
};

controller.edit = (req, res) =>{
    const { id } = req.params;
 
    req.getConnection((_err, conn)=>{

        if (_err) {
            console.error('Error de conexión:', _err);
            return res.status(500).json({ message: 'Error de conexión a la base de datos', error: _err });
        }

        conn.query('SELECT * FROM pacientes WHERE id=?', [id], (err, paciente) => {

            if (err) {
                console.error('Error en la consulta SELECT:', err);
                return res.status(500).json({ message: 'Error al obtener paciente', error: err });
            }

            try {
                if (paciente.length === 0) {
                    return res.status(404).json({ message: 'Paciente no encontrado' });
                }

                res.render('pacientes_edit', {
                    data: paciente[0]
                });
                } 
            catch (error) {
                res.json(err);
            }});
        })
};

controller.update = (req, res) =>{
    const { id } = req.params;
    const newPaciente = req.body;
    req.getConnection((_err, conn)=>{
        conn.query('UPDATE pacientes set ? WHERE id=?', [newPaciente, id], (err, _rows) => {
            try {
                res.redirect('/');
                } 
            catch (error) {
                res.json(err);
            }});
        })
};

controller.delete = (req, res) =>{
    const { id } = req.params;

    req.getConnection((_err, conn) => {
        conn.query('DELETE FROM pacientes where id = ?', [id], (_err, _rows) => {
            try {
                res.redirect('/');
            } catch (err) {
                console.log(err);
            }
        } );
    } )
};

export default controller;