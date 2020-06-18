
const fs = require('fs').promises;
const path = require('path');

function Model(resource, data) {
  this.resource = resource;
  this._id = this.db.generateId();

  if (data) {
    this.data = {_id: this._id, ...data};
  }
}

Model.getAll = async function getAll() {
  const all = await this.db.readData(this.resource)
  return all || [];
}

Model.find = async function find(fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) { throw new Error('Provide fields!')}

  const all = await this.getAll();
  if (all.length === 0) { return null; };

  const result = all.find(a => {
    const isFound = keys.every(k => {
      return fields[k] === a[k];
    })

    return isFound;
  })

  if (!result) { return null; }
  return new this(result);
}

Model.prototype.remove = async function remove() {
  const keys = Object.keys(this.data);
  if (keys.length === 0) { throw new Error('Provide fields!')}

  const all = await Model.getAll.call(this);
  if (all.length === 0) { return null; };

  const index = all.findIndex(a => {
    const isFound = keys.every(k => {
      return this.data[k] === a[k];
    })

    return isFound;
  })

  all.splice(index, 1);
  await this.db.saveData(this.resource, all);

  if (index === -1) { throw new Error('Cannot remove data!')}

  return true;
}

Model.prototype.save = async function save() {
  const all = await Model.getAll.call(this);
  all.push(this.data);
  await this.db.saveData(this.resource, all);
  return this.data;
}

class Connection {
  resolvePath(resource) {
    return path.join(__dirname, 'data', `${resource}.json`);
  }

  async readData(resource) {
    try {
      const data = await fs.readFile(this.resolvePath(resource), 'utf8');
      if (!data) { return null; }
      return JSON.parse(data);
    } catch(e) {
      if (e.code = 'ENOENT') {
        return [];
      }

      throw e;
    }
  }

  saveData(resource, data) {
    try {
      fs.writeFile(this.resolvePath(resource), JSON.stringify(data, null, 2));
    } catch (e) {
      throw(e);
    }
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
}

class FileDatabase {
  constructor() {
    this.models = {};
    this.db = new Connection();
  }

  register(resource, schema = {}) {
    let model;

    model = function model(data) {
      Model.call(this, resource, data);
    }

    model.resource = resource;
    model.db = model.prototype.db = this.db;

    if (!(model.prototype instanceof Model)) {
      model.__proto__ = Model;
      model.prototype.__proto__ = Model.prototype;
    }

    if (schema.methods) {
      const methods = schema.methods;
      Object.keys(methods).forEach((method) => {
        model.prototype[method] = methods[method];
      })
    }

    this.models[resource] = model;
    return this.models[resource];
  }
}

module.exports = new FileDatabase();
