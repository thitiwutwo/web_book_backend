import { Router } from "express";
import { borrow } from "../../models";
import { book } from "../../models";
import { publisher } from "../../models";
import { users } from "../../models";
const borrowRouter: Router = Router();

//get
borrowRouter.get("/", async (req, res) => {
  try {
    let data = await borrow.findAll();
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

borrowRouter.get("/date/:date", async (req, res) => {
  try {
    book.hasMany(borrow, {foreignKey: 'book_id'});
    borrow.belongsTo(book, {foreignKey: 'book_id'});
    users.hasMany(borrow, {foreignKey: 'user_id'});
    borrow.belongsTo(users, {foreignKey: 'user_id'});
    let date = req.params.date;
    let data = await borrow.findAll({ 
      include: [
        {model: book},
        {model: users}
      ],
      where: { date_borrow: date},
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

borrowRouter.get("/book_not_return", async (req, res) => {
  try {
    
    let data = await borrow.findAll({
      
      where: {is_return : 0}
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

borrowRouter.get("/boom_return", async (req, res) => {
  try {
    let data = await borrow.findAll({ 
      where: {is_return : 1}
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

borrowRouter.get("/user/:id", async (req, res) => {
  try {
    //book
    book.hasMany(borrow, {foreignKey: 'book_id'});
    borrow.belongsTo(book, {foreignKey: 'book_id'});
    

    book.belongsTo(publisher, {foreignKey: 'publisher_id'});
    let user_id = req.params.id;
    let data = await borrow.findAll({
      include: [
        {model: book},
      ],
      where: {user_id : user_id, is_return: 0}
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

borrowRouter.get("/all/user/:id", async (req, res) => {
  try {
    //book
    book.hasMany(borrow, {foreignKey: 'book_id'});
    borrow.belongsTo(book, {foreignKey: 'book_id'});
    

    book.belongsTo(publisher, {foreignKey: 'publisher_id'});
    let user_id = req.params.id;
    let data = await borrow.findAll({
      include: [
        {model: book},
      ],
      where: {user_id : user_id},
      order: [
        ['borrow_id', 'DESC'],
      ],
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//post
borrowRouter.post("/", async (req, res) => {
  try {
    let book_id: string = req.body.book_id;
    let user_id: string = req.body.user_id;
    let check_borrow = await book.findOne({ where: {book_id: book_id, borrowed: 0} });
    if(check_borrow){
      let date_now: any = new Date();
      let date_borrow = date_now.getFullYear() + "-" + (date_now.getMonth()+1) + "-" + date_now.getDate();
      let data = await borrow.create({ 
        book_id : parseInt(book_id),
        user_id : parseInt(user_id),
        date_borrow : date_borrow
      });
      let bookUpdate = await book.update({
        borrowed : 1
      },{where: { book_id: req.body.book_id }});
      res.json({ status: true, data: data , bookUpdate });
    }else{
      res.status(201).json({ status: false, data: "already borrowed" });
    }

  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//put
borrowRouter.put("/:id", async (req, res) => {
  try {
    let book_id: string = req.body.book_id;
    let user_id: string = req.body.user_id;
    await borrow.update({ 
      book_id : parseInt(book_id),
      user_id : parseInt(user_id),
    },
    { where: { borrow_id: req.params.id } }
    );
    let data = await borrow.findByPk(req.params.id);
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

borrowRouter.put("/return/:id", async (req, res) => {
  try {
    let borrow_id: string = req.params.id;
    let data:any = await borrow.findByPk(borrow_id) || 0;
    let book_id = data.book_id;
    let check_borrow = await book.findOne({ where: {book_id: book_id, borrowed: 1} });
    if(check_borrow){
      let date_now: any = new Date();
      let date_return = date_now.getFullYear() + "-" + (date_now.getMonth()+1) + "-" + date_now.getDate();
      await borrow.update({ 
        is_return : 1,
        date_return : date_return,
      },
      { where: { borrow_id: borrow_id } }
      );
      let bookUpdate = await book.update({
        borrowed : 0
      },{where: { book_id: book_id }});
      let data = await borrow.findByPk(borrow_id);
      res.json({ status: true, data: data, bookUpdate });
    
    }else{
      res.json({ status: false, data: "didn't borrow"})
    }
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//delete
borrowRouter.delete("/:id", async (req, res) => {
  try {
    let objborrow = await borrow.destroy({ where: { borrow_id: req.params.id } });
    if (objborrow) {
      return res.json({ status: true, data: "success" });
    } else {
      return res.json({ status: false, data: "fail or not found" });
    }
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

export { borrowRouter };