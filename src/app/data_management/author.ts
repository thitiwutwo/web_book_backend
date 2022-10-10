import { Router } from "express";
import { author } from "../../models";

const authorRouter: Router = Router();

//get
authorRouter.get("/", async (req, res) => {
  try {
    let mydata = await author.findAll();
    res.json({ status: true, data: mydata });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//post
authorRouter.post("/", async (req, res) => {
  try {
    let author_name: string = req.body.author_name;
    let data = await author.create({ 
      author_name : author_name,
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//put
authorRouter.put("/:id", async (req, res) => {
  try {
    let author_name: string = req.body.author_name;
    await author.update({ 
      author_name : author_name,
    },
    { where: { author_id: req.params.id } }
    );
    let data = await author.findByPk(req.params.id);
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//delete
authorRouter.delete("/:id", async (req, res) => {
  try {
    let objauthor = await author.destroy({ where: { author_id: req.params.id } });
    if (objauthor) {
      return res.json({ status: true, data: "success" });
    } else {
      return res.json({ status: false, data: "fail or not found" });
    }
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

export { authorRouter };