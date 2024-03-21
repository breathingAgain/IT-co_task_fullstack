const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('my_database.db');

function createTable() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY,
        name TEXT,
        image TEXT,
        description TEXT
      )
    `, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertProject(name, image, description) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO projects (name, image, description) VALUES (?, ?, ?)", [name, image, description], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function deleteProject(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM projects WHERE id = ?", id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function getProjectById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM projects WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


function updateProject(id, name, image, description) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE projects SET name = ?, image = ?, description = ? WHERE id = ?",
      [name, image, description, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

/*function clearDatabase() {
  return new Promise((resolve, reject) => {
    db.run("DROP TABLE IF EXISTS projects", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}*/


module.exports = {
  createTable,
  insertProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProjectById
};
