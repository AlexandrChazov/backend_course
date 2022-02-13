import PostService from "./PostService.js";

class PostController {

  async create(req, res) {
    try {
      const newPost = await PostService.create(req.body, req.files.picture)
      res.json(newPost)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll()       // находит все документы если ни какой аргумент не передан
      res.json(posts)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      const post = await PostService.getOne(id)
      res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await PostService.update(req.body)
      res.json(updatedPost)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async delete(req, res) {
    try {
      await PostService.delete(req.params.id)
      res.json({ message: `Post with id="${req.params.id}" deleted` })
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new PostController();
