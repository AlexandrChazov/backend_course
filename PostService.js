import Post from "./Post.js";
import fileService from "./fileService.js";

class PostService {

  async create(post, picture) {
    const fileName = fileService.saveFile(picture)
    const createdPost = await Post.create({ ...post, picture: fileName })   // добавляем к постам поле "picture
    return createdPost
  }


  async getAll() {
    const allPosts = await Post.find()
    return allPosts
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Id doesn't match")
    }
    const post = await Post.find({ _id: id })
    return post
  }

  async update(post) {
    if (!post._id) {
      throw new Error("Id doesn't match")
    }
    const updatedPost = await Post.findByIdAndUpdate(post.id, post, { new: true } )
    return updatedPost
  }

  async delete(id) {
      if (!id) {
        throw new Error("Id doesn't match")
      }
      await Post.findByIdAndDelete(id)
  }
}

export default new PostService();
