import { Router } from "express";
import { users } from "../../models";

const usersRouter: Router = Router();

//get
usersRouter.get('/', async function(req, res){
    try{
        let value = await users.findAll();
        return res.json({status: true, data: value});
    }catch (e: any) {
        return res.json({status: false, data: "error", errorDetail: e.toString()});
    }
});

usersRouter.get('/:id', async function(req, res){
    try{
        let value = await users.findOne({
            where: { id: req.params.id }
        });
        return res.json({status: true, data: value});
    }catch (e: any) {
        return res.json({status: false, data: "error", errorDetail: e.toString()});
    }
});

//post
usersRouter.post('/', async function(req, res){
    try{
        let username = req.body.username;
        let password = req.body.password;
        let scope = 'profile';
        let name = req.body.name;
        let role_id = "1";

        let user = await users.findOne({
            where: { username: username}
        });
        if(user){
            return res.json({status: false, data: "username already used"});
        }else{
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let obj_user = await users.create({
                username: username,
                password: hash,
                scope: scope,
                name: name,
                role_id: parseInt(role_id),
            });
            return res.json({status: true, data: obj_user});
        }

    }catch(e: any){
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
});

//put
usersRouter.put('/:id', async function(req, res){
    try {
        let name = req.body.name;
        await users.update({
            name: name,
        },
        { where: { id: req.params.id } }
        );
        let user = await users.findByPk(req.params.id);

        return res.json({ status: true, data: user });
    }catch(e: any){

        res.json({ status: false, data: "error", errorDetail: e.toString() });
    
    }
});

//delete
usersRouter.delete('/:id', async function(req, res){
    try {
        let objuser = await users.destroy({
            where: { id: req.params.id }
        });
        if (objuser) {
            return res.json({ status: true, data: "success" });
        } else {
            return res.json({ status: false, data: "fail or not found" });
        }
    }catch(e: any){
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
});

// usersRouter.post('/encode_pass', async function(req, res){
//     const bcrypt = require('bcryptjs');
//     let password = req.body.password;
//     let password2 = req.body.password2;
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     const isSame = await bcrypt.compare(password2, hash);
//     return res.json({password_hash: hash, issame: isSame});
// });

export { usersRouter };