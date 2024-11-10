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
    const data = req.body();
 
    req.getConnection((_err, conn)=>{
        conn.query('INSERT INTO pacientes set ?', [data], (err, _paciente) => {
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
        conn.query('SELECT * FROM pacientes WHERE id=?', [id], (err, paciente) => {
            try {
                res.render('paciente_edit', {
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
        conn.query('UPDATE paciente set ? WHERE id=?', [newPaciente, id], (err, _rows) => {
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