export default class MongoDAO {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return this.model.find().lean();
  }

  async getById(id) {
    return this.model.findById(id).lean();
  }

  async create(obj) {
    return this.model.create(obj);
  }

  async update(id, newData) {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}
