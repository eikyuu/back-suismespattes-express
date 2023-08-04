var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var bodyParser = __toESM(require("body-parser"), 1);

// src/data-source.ts
var import_process = require("process");
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm = require("typeorm");
var import_config = require("dotenv/config");
var e = require("cors");
var AppDataSource = new import_typeorm.DataSource({
  type: "mysql",
  host: import_process.env.DB_HOST || "localhost",
  port: 3306,
  username: import_process.env.DB_USER,
  password: import_process.env.DB_PASSWORD,
  database: import_process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.ts"],
  migrations: [],
  subscribers: []
});

// src/entity/Walk.ts
var import_typeorm3 = require("typeorm");

// src/entity/WalkImage.ts
var import_typeorm2 = require("typeorm");
var WalkImage = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", { name: "id" })
], WalkImage.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)("string", { name: "name", length: 255, nullable: false, default: null })
], WalkImage.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => Walk, (walk) => walk.images)
], WalkImage.prototype, "walk", 2);
WalkImage = __decorateClass([
  (0, import_typeorm2.Entity)()
], WalkImage);

// src/entity/Walk.ts
var Walk = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid", { name: "id" })
], Walk.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("string", { name: "name", unique: true, length: 255, nullable: false, default: null })
], Walk.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm3.Column)("string", { name: "slug", unique: true, length: 255, nullable: false, default: null })
], Walk.prototype, "slug", 2);
__decorateClass([
  (0, import_typeorm3.Column)("text", { name: "description", nullable: false, default: null })
], Walk.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm3.Column)("string", { name: "city", length: 255, nullable: false, default: null })
], Walk.prototype, "city", 2);
__decorateClass([
  (0, import_typeorm3.Column)("string", { name: "postal_code", length: 5, nullable: false, default: null })
], Walk.prototype, "postalCode", 2);
__decorateClass([
  (0, import_typeorm3.Column)("string", { name: "street", length: 255, nullable: false, default: null })
], Walk.prototype, "street", 2);
__decorateClass([
  (0, import_typeorm3.Column)("string", { name: "country", length: 255, nullable: false, default: null })
], Walk.prototype, "country", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float", { name: "latitude", nullable: true })
], Walk.prototype, "latitude", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float", { name: "longitude", nullable: true })
], Walk.prototype, "longitude", 2);
__decorateClass([
  (0, import_typeorm3.Column)("boolean", { name: "obligatory_leash", default: false })
], Walk.prototype, "obligatoryLeash", 2);
__decorateClass([
  (0, import_typeorm3.Column)("boolean", { name: "water_point", default: false })
], Walk.prototype, "waterPoint", 2);
__decorateClass([
  (0, import_typeorm3.Column)("boolean", { name: "processionary_caterpillar_alert", default: false })
], Walk.prototype, "processionaryCaterpillarAlert", 2);
__decorateClass([
  (0, import_typeorm3.Column)("boolean", { name: "cyanobacteria_alert", default: false })
], Walk.prototype, "cyanobacteriaAlert", 2);
__decorateClass([
  (0, import_typeorm3.Column)("int", { name: "note", nullable: true })
], Walk.prototype, "note", 2);
__decorateClass([
  (0, import_typeorm3.CreateDateColumn)({ name: "created_at" })
], Walk.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm3.UpdateDateColumn)({ name: "updated_at" })
], Walk.prototype, "updatedAt", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => WalkImage, (walkImage) => walkImage.walk)
], Walk.prototype, "images", 2);
Walk = __decorateClass([
  (0, import_typeorm3.Entity)()
], Walk);

// src/utils/Utils.ts
var formatSlug = (slug) => {
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9-]/g, "");
  slug = slug.replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
  return slug.toLowerCase();
};

// src/controller/WalkController.ts
var import_axios = __toESM(require("axios"), 1);

// src/utils/Exceptions.ts
var Exception = class {
  constructor(error, status) {
    this.error = error;
    this.status = status;
  }
};
var NotFoundException = class extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error) {
    super(error, 404);
  }
};
var BadRequestException = class extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error) {
    super(error, 400);
  }
};

// src/controller/WalkController.ts
var import_util = require("util");

// src/repository/walk.repository.ts
var WalkRepository = AppDataSource.getRepository(Walk).extend({
  findWalkBySlug(slug) {
    return __async(this, null, function* () {
      return yield this.findOne({
        where: { slug },
        relations: ["images"]
      });
    });
  },
  findAllWalks() {
    return __async(this, null, function* () {
      return yield this.find({
        relations: ["images"]
      });
    });
  },
  findWalkById(id) {
    return __async(this, null, function* () {
      return yield this.findOne({
        where: { id },
        relations: ["images"]
      });
    });
  }
});

// src/repository/walkImage.repository.ts
var WalkImageRepository = AppDataSource.getRepository(WalkImage).extend({
  findWalkImageByFilename(filename) {
    return __async(this, null, function* () {
      return yield this.findOne({
        where: { name: filename }
      });
    });
  },
  findWalkImageById(id) {
    return __async(this, null, function* () {
      return yield this.findOne({
        where: { id }
      });
    });
  },
  saveWalkImage(walkImage) {
    return __async(this, null, function* () {
      return yield this.save(walkImage);
    });
  }
});

// src/controller/WalkController.ts
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var _WalkController = class _WalkController {
  constructor() {
    this.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    this.walkRepository = WalkRepository;
    this.walkImageRepository = WalkImageRepository;
  }
  geocodeAddress(address) {
    return __async(this, null, function* () {
      const geocodingUrl = `${_WalkController.GEOCODING_URI}?address=${encodeURIComponent(address)}&key=${this.GOOGLE_API_KEY}&language=${_WalkController.LANGUAGE}`;
      try {
        const response = yield import_axios.default.get(geocodingUrl);
        return response.data.results[0].geometry.location;
      } catch (error) {
        throw new Error("Geocoding error");
      }
    });
  }
  all(request, response, next) {
    return __async(this, null, function* () {
      try {
        const walks = yield this.walkRepository.findAllWalks();
        return walks;
      } catch (error) {
        throw new Error("Error while fetching walks");
      }
    });
  }
  one(request, response, next) {
    return __async(this, null, function* () {
      const slug = request.params.slug;
      const walk = yield this.walkRepository.findWalkBySlug(slug);
      if (!walk) {
        throw new NotFoundException("Walk not found");
      }
      return walk;
    });
  }
  save(request, response, next) {
    return __async(this, null, function* () {
      const {
        name,
        description,
        city,
        postalCode,
        street,
        country,
        obligatoryLeash,
        waterPoint,
        processionaryCaterpillarAlert,
        cyanobacteriaAlert,
        note
      } = request.body;
      let slug = formatSlug(name);
      let latitude;
      let longitude;
      try {
        const geocodeResult = yield this.geocodeAddress(`${postalCode} ${city} ${country}`);
        latitude = geocodeResult.lat;
        longitude = geocodeResult.lng;
      } catch (error) {
        console.log(error);
        return error;
      }
      const walk = Object.assign(new Walk(), {
        name,
        slug,
        description,
        city,
        postalCode,
        street,
        country,
        latitude,
        longitude,
        obligatoryLeash,
        waterPoint,
        processionaryCaterpillarAlert,
        cyanobacteriaAlert,
        note
      });
      try {
        yield this.walkRepository.save(walk);
        return walk;
      } catch (error) {
        throw new Error("Error while saving walk");
      }
    });
  }
  remove(request, response, next) {
    return __async(this, null, function* () {
      const slug = request.params.slug;
      let walkToRemove = yield this.walkRepository.findWalkBySlug(slug);
      if (!walkToRemove) {
        throw new NotFoundException("Walk not found");
      }
      yield this.walkRepository.remove(walkToRemove);
      return "walk has been removed";
    });
  }
  uploadImage(request, response, next) {
    return __async(this, null, function* () {
      const unlinkAsync = (0, import_util.promisify)(fs.unlink);
      let filename = "";
      const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, _WalkController.UPLOAD_DIR);
        },
        filename: function(req, file, cb) {
          filename = file.fieldname + "-" + Date.now() + "." + file.originalname.split(".").pop();
          cb(null, filename);
        }
      });
      const upload = multer({ storage }).single("image");
      upload(request, response, function(err) {
        return __async(this, null, function* () {
          const walk = yield this.findWalkBySlug(request.body.slug);
          if (err) {
            throw new Error("Error while uploading image");
          }
          if (!walk) {
            yield unlinkAsync(_WalkController.UPLOAD_DIR + filename);
            throw new NotFoundException("Walk not found");
          }
          if (!request.file) {
            throw new BadRequestException("Image not found");
          }
          const walkImage = Object.assign(new WalkImage(), {
            name: request.file.filename,
            walk
          });
          yield this.walkImageRepository.saveWalkImage(walkImage);
          return "image has been uploaded";
        });
      });
      return "image has been uploaded";
    });
  }
  removeImage(request, response, next) {
    return __async(this, null, function* () {
      const unlinkAsync = (0, import_util.promisify)(fs.unlink);
      const filename = request.params.filename;
      const walkImageToRemove = yield this.walkImageRepository.findWalkImageByFilename(filename);
      if (!walkImageToRemove) {
        throw new NotFoundException("Image not found");
      }
      yield unlinkAsync(_WalkController.UPLOAD_DIR + walkImageToRemove.name);
      yield this.walkImageRepository.remove(walkImageToRemove);
      return "image has been removed";
    });
  }
  getImage(request, response, next) {
    return __async(this, null, function* () {
      const walkImage = yield this.walkImageRepository.findWalkImageByFilename(request.params.filename);
      if (!walkImage) {
        throw new NotFoundException("Image not found");
      }
      return response.sendFile(path.resolve(_WalkController.UPLOAD_DIR + walkImage.name));
    });
  }
};
_WalkController.GEOCODING_URI = "https://maps.googleapis.com/maps/api/geocode/json";
_WalkController.LANGUAGE = "fr";
_WalkController.UPLOAD_DIR = "src/../uploads/walks/";
var WalkController = _WalkController;

// src/routes.ts
var Routes = [
  // Walks
  {
    method: "get",
    route: "/walks",
    controller: WalkController,
    action: "all"
  },
  {
    method: "get",
    route: "/walks/:slug",
    controller: WalkController,
    action: "one"
  },
  {
    method: "post",
    route: "/walks",
    controller: WalkController,
    action: "save"
  },
  {
    method: "delete",
    route: "/walks/:slug",
    controller: WalkController,
    action: "remove"
  },
  {
    method: "post",
    route: "/walks/images",
    controller: WalkController,
    action: "uploadImage"
  },
  {
    method: "delete",
    route: "/walks/images/:filename",
    controller: WalkController,
    action: "removeImage"
  },
  {
    method: "get",
    route: "/walks/images/:filename",
    controller: WalkController,
    action: "getImage"
  }
];

// src/middlewares/exceptions.handler.ts
var ExceptionsHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.status && err.error) {
    return res.status(err.status).json({ error: err.error });
  }
  return res.status(500).json({ error: "Erreur interne" });
};

// src/middlewares/unknownRoutes.handler.ts
var UnknownRoutesHandler = () => {
  throw new NotFoundException(`La resource demand\xE9e n'existe pas`);
};

// src/index.ts
var import_config2 = require("dotenv/config");
var import_process2 = require("process");
var express = require("express");
var cors = require("cors");
AppDataSource.initialize().then(() => __async(void 0, null, function* () {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  Routes.forEach((route) => {
    app[route.method](route.route, (req, res, next) => {
      const result = new route.controller()[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then((result2) => result2 !== null && result2 !== void 0 ? res.send(result2) : void 0);
      } else if (result !== null && result !== void 0) {
        res.json(result);
      }
    });
  });
  app.use(express.json());
  app.all("*", UnknownRoutesHandler);
  app.use(ExceptionsHandler);
  app.listen(import_process2.env.PORT);
  console.log(`Express application is up and running on port ${import_process2.env.PORT}`);
})).catch((error) => console.log(error));
