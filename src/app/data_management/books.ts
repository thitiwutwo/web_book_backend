import { Router } from "express";
import { book } from "../../models";
import { book_author } from "../../models";
import { author } from "../../models";
import { publisher } from "../../models";
import { book_language } from "../../models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const booksRouter: Router = Router();
let multer  = require('multer');
let storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, '../frontend/public/image/')
  },
  filename: function (req:any, file:any, cb:any) {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req:any, file:any, cb:any) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      cb(new Error('Please upload an image.'))
    }
      cb(undefined, true)
    }
  });
let upload = multer({ storage: storage });

// get
booksRouter.get("/", async function (req, res) {
  try {
    let value = await book.findAll({
      limit: 10,
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/count", async function (req, res) {
  try {
    let value = await book.count();

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/overall/:page/:topic/:order", async function (req, res) {
  try {
    book.hasMany(book_author, {foreignKey: 'book_id'});
    book_author.belongsTo(book, {foreignKey: 'book_id'});
    book_author.belongsTo(author, {foreignKey: 'author_id'});
    book.belongsTo(publisher, {foreignKey: 'publisher_id'});
    let value = await book.findAll({
      include: [
        {model: book_author, include:[{model: author}]},
        {model: publisher},
      ],
      offset: (parseInt(req.params.page)-1)*10,
      limit: 10,
      order: [
        [req.params.topic, req.params.order],
      ]
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/getByLang/:lang", async function (req, res) {
  try {
    let value = await book.findAll({
      where: {
        language_id: req.params.lang,
      },
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/get/:id", async function (req, res) {
  try {
    book.hasMany(book_author, {foreignKey: 'book_id'});
    book_author.belongsTo(book, {foreignKey: 'book_id'});
    author.hasMany(book_author, {foreignKey: 'author_id'});
    book_author.belongsTo(author, {foreignKey: 'author_id'});
    publisher.hasMany(book, {foreignKey: 'publisher_id'});
    book.belongsTo(publisher, {foreignKey: 'publisher_id'});
    book.belongsTo(book_language,{foreignKey: 'language_id'})
    let value = await book.findOne({
      include: [
        {model: book_author, include:[{model: author, required: false}]},
        {model: book_language},
        {model: publisher},
        // {model: author},
      ],
      where: {
        book_id: req.params.id,
      },
    });

    return res.json({status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/getAll", async function (req, res) {
  try {
    let value = await book.findAll();

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/getByPage/:page/:topic/:order", async function (req, res) {
  try {
    let value = await book.findAll({
      offset: (parseInt(req.params.page)-1)*10,
      limit: 10,
      order: [
        [req.params.topic, req.params.order],
      ]
    },);

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/getAll/:start/:max", async function (req, res) {
  try {
    let value = await book.findAll({
      offset: parseInt(req.params.start),
      limit: parseInt(req.params.max) || 10,
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/search/:keyword", async function (req, res) {
  try {
    book.hasMany(book_author, {foreignKey: 'book_id'});
    book_author.belongsTo(book, {foreignKey: 'book_id'});
    book_author.belongsTo(author, {foreignKey: 'author_id'});
    book.belongsTo(publisher, {foreignKey: 'publisher_id'});
    let keyword:string = req.params.keyword;
    let value = await book.findAll({
      include: [
        {model: book_author, include:[{model: author}]},
        {model: publisher},
      ],
      limit: 10,
      where: { title: {[Op.like]: keyword +'%'}},
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/book_author", async function (req, res) {
  try {
    book.hasMany(book_author, {foreignKey: 'book_id'});
    book_author.belongsTo(book, {foreignKey: 'book_id'});
    author.hasMany(book_author, {foreignKey: 'author_id'});
    book_author.belongsTo(author, {foreignKey: 'author_id'});
    let value = await book_author.findAll({
      include: [
        {model: book},
        {model: author}
      ]
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/borrow", async function (req, res) {
  try {
    let value = await book.findAll({
      where: {borrowed: 1}
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

booksRouter.get("/not_borrow", async function (req, res) {
  try {
    let value = await book.findAll({
      where: {borrowed: 0}
    });

    return res.json({ status: true, data: value });
  } catch (e: any) {
    return res.json({
      status: false,
      data: "error",
      errorDetail: e.toString(),
    });
  }
});

// post
// booksRouter.post("/upload_img",upload.single('book_img'),async function (req, res){
//     let book_img: string = req.file.filename;
//     return res.json({ status: true, data: book_img});
// })

booksRouter.post("/", upload.single('book_img'), async function (req:any, res:any) {
  try {
    let title: string = req.body.title;
    let isbn13: string = req.body.isbn13;
    let language_id: string = req.body.language_id;
    let num_pages: string = req.body.num_pages;
    let publication_date: string = req.body.publication_date;
    let publisher_id: string = req.body.publisher_id;
    let book_img_name: string = req.body.book_img_name;
    let borrowed: string = "0";
    let author_id: any = req.body.author_id; 
    
    let objbook = await book.create({
      title: title,
      isbn13: isbn13,
      language_id: parseInt(language_id),
      num_pages: parseInt(num_pages),
      publication_date: publication_date,
      publisher_id: parseInt(publisher_id),
      book_img: book_img_name,
      borrowed: parseInt(borrowed)
    });
    let author = await book_author.create({ 
        book_id: objbook.book_id,
        author_id: author_id,
    });
    return res.json({ status: true, data: objbook, author });
  } catch (e: any) {
    return res.status(201).json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

// put or update
booksRouter.put("/:id", upload.single('book_img'), async function (req:any, res:any) {
  try {
    let book_id = req.params.id;
    let title: string = req.body.title;
    let isbn13: string = req.body.isbn13;
    let language_id: string = req.body.language_id;
    let num_pages: string = req.body.num_pages;
    let publication_date: string = req.body.publication_date;
    let publisher_id: string = req.body.publisher_id;
    let book_img_name: string = req.body.book_img_name;
    let borrowed: string = "0";
    let author_id: any = req.body.author_id; 

    await book.update(
      {
        title: title,
        isbn13: isbn13,
        language_id: parseInt(language_id),
        num_pages: parseInt(num_pages),
        publication_date: publication_date,
        publisher_id: parseInt(publisher_id),
        book_img: book_img_name,
        borrowed: parseInt(borrowed)
      },
      { where: { book_id: book_id } }
    );
    await book_author.update({ 
      book_id: book_id,
      author_id: author_id,
    },{ where: { book_id: book_id } }
    );
    let mybook = await book.findByPk(book_id);

    return res.json({ status: true, data: mybook });
  } catch (e: any) {
    return res.status(201).json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

// delete
booksRouter.delete("/:book_id", async function (req, res) {
  try {
    let book_id = req.params.book_id;
    let objbook = await book.destroy({ where: { book_id: book_id } });
    let objbook_author = await book_author.destroy({ where: { book_id: book_id} });
    if (objbook) {
      return res.json({ status: true, data: "success" });
    } else {
      return res.status(201).json({ status: false, data: "fail or not found" });
    }
  } catch (e: any) {
    res.status(201).json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

export { booksRouter };
