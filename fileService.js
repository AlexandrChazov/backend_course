import * as uuid from "uuid";
import * as path from "path";

class FileService {      // тут можно написать методы для записи файла, удаления, получения и т.д.
  saveFile(file) {
    try {
      const fileName = `${ uuid.v4() }.jpg`    // генереруем случайное уникальное имя файла
      const filePath = path.resolve("static", fileName)   // resolve создаёт кросплатформенный путь (Mac, Windows ...)
                                                                      // папку "static" нужно создать самостоятельно
      file.mv(filePath)
      return fileName
    } catch(e) {
      console.log(e)
    }
  }
}

export default new FileService();
