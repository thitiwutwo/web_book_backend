import { Router } from "express";
import { publisher } from "../../models";

const publishersRouter: Router = Router();

//get
publishersRouter.get("/", async (req, res) => {
  try {
    let data = await publisher.findAll();
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//post
publishersRouter.post("/", async (req, res) => {
  try {
    let publisher_name: string = req.body.publisher_name;
    let data = await publisher.create({ 
      publisher_name : publisher_name,
    });
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//put
publishersRouter.put("/:id", async (req, res) => {
  try {
    let publisher_name: string = req.body.publisher_name;
    await publisher.update({ 
      publisher_name : publisher_name,
    },
    { where: { publisher_id: req.params.id } }
    );
    let data = await publisher.findByPk(req.params.id);
    res.json({ status: true, data: data });
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

//delete
publishersRouter.delete("/:id", async (req, res) => {
  try {
    let objpublisher = await publisher.destroy({ where: { publisher_id: req.params.id } });
    if (objpublisher) {
      return res.json({ status: true, data: "success" });
    } else {
      return res.json({ status: false, data: "fail or not found" });
    }
  } catch (e: any) {
    res.json({ status: false, data: "error", errorDetail: e.toString() });
  }
});

export { publishersRouter };
