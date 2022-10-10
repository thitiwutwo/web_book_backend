import { Router } from "express";
import { book_language } from "../../models";

const bookLanguagesRouter: Router = Router();

//get
bookLanguagesRouter.get("/", async (req, res) => {
  try {
    let booklang = await book_language.findAll();
    res.json({ status: true, data: booklang });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//post
bookLanguagesRouter.post("/", async (req, res) => {
  try {
    let language_name: string = req.body.language_name;
    let language_code: string = req.body.language_code;
    let data = await book_language.create({
      language_code : language_code,
      language_name : language_name,
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//put
bookLanguagesRouter.put("/:id", async (req, res) => {
  try {
    let language_name: string = req.body.language_name;
    let language_code: string = req.body.language_code;
    await book_language.update({ 
      language_code : language_code,
      language_name : language_name,
    },
    { where: { language_id: req.params.id } }
    );
    let data = await book_language.findByPk(req.params.id);
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//delete
bookLanguagesRouter.delete("/:id", async (req, res) => {
  try {
    let objauthor = await book_language.destroy({ where: { language_id: req.params.id } });
    if (objauthor) {
      return res.json({ status: true, data: "success" });
    } else {
      return res.json({ status: false, data: "fail or not found" });
    }
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

export { bookLanguagesRouter };
