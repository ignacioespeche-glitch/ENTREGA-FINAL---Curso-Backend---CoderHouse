import fs from "fs";

export default class ArchivoDAO {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find(p => p.id === id);
  }

  async create(obj) {
    const items = await this.getAll();
    items.push(obj);
    await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2));
    return obj;
  }

  async update(id, newData) {
    const items = await this.getAll();
    const index = items.findIndex(p => p.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...newData };
    await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2));
    return items[index];
  }

  async delete(id) {
    const items = await this.getAll();
    const filtered = items.filter(p => p.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
    return true;
  }
}
