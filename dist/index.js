var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/index.ts
var bodyParser = __toESM(require("body-parser"));

// src/data-source.ts
var import_process = require("process");
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm4 = require("typeorm");
var import_config = require("dotenv/config");

// src/entity/Walk.ts
var import_typeorm2 = require("typeorm");

// src/entity/WalkImage.ts
var import_typeorm = require("typeorm");
var WalkImage = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("uuid", { name: "id" })
], WalkImage.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { name: "name", length: 255, nullable: false, default: null })
], WalkImage.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => Walk, (walk) => walk.images, { onDelete: "CASCADE" })
], WalkImage.prototype, "walk", 2);
WalkImage = __decorateClass([
  (0, import_typeorm.Entity)()
], WalkImage);

// src/entity/Walk.ts
var Walk = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", { name: "id" })
], Walk.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { name: "name", unique: true, length: 255, nullable: false, default: null })
], Walk.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { name: "slug", unique: true, length: 255, nullable: false, default: null })
], Walk.prototype, "slug", 2);
__decorateClass([
  (0, import_typeorm2.Column)("text", { name: "description", nullable: false, default: null })
], Walk.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { name: "city", length: 255, nullable: false, default: null })
], Walk.prototype, "city", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { name: "postal_code", length: 5, nullable: false, default: null })
], Walk.prototype, "postalCode", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { name: "street", length: 255, nullable: false, default: null })
], Walk.prototype, "street", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { name: "country", length: 255, nullable: false, default: null })
], Walk.prototype, "country", 2);
__decorateClass([
  (0, import_typeorm2.Column)("float", { name: "latitude", nullable: true })
], Walk.prototype, "latitude", 2);
__decorateClass([
  (0, import_typeorm2.Column)("float", { name: "longitude", nullable: true })
], Walk.prototype, "longitude", 2);
__decorateClass([
  (0, import_typeorm2.Column)("enum", { name: "obligatory_leash", enum: ["YES", "NO", "RECOMANDED"], default: "NO" })
], Walk.prototype, "obligatoryLeash", 2);
__decorateClass([
  (0, import_typeorm2.Column)("boolean", { name: "water_point", default: false })
], Walk.prototype, "waterPoint", 2);
__decorateClass([
  (0, import_typeorm2.Column)("boolean", { name: "processionary_caterpillar_alert", default: false })
], Walk.prototype, "processionaryCaterpillarAlert", 2);
__decorateClass([
  (0, import_typeorm2.Column)("boolean", { name: "cyanobacteria_alert", default: false })
], Walk.prototype, "cyanobacteriaAlert", 2);
__decorateClass([
  (0, import_typeorm2.Column)("int", { name: "note", nullable: false })
], Walk.prototype, "note", 2);
__decorateClass([
  (0, import_typeorm2.CreateDateColumn)({ name: "created_at" })
], Walk.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm2.UpdateDateColumn)({ name: "updated_at" })
], Walk.prototype, "updatedAt", 2);
__decorateClass([
  (0, import_typeorm2.OneToMany)(() => WalkImage, (walkImage) => walkImage.walk, { cascade: true })
], Walk.prototype, "images", 2);
Walk = __decorateClass([
  (0, import_typeorm2.Entity)()
], Walk);

// src/entity/Review.ts
var import_typeorm3 = require("typeorm");
var Review = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid", { name: "id" })
], Review.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("varchar", { name: "name", length: 255, nullable: false, default: null })
], Review.prototype, "content", 2);
__decorateClass([
  (0, import_typeorm3.CreateDateColumn)({ name: "created_at" })
], Review.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm3.UpdateDateColumn)({ name: "updated_at" })
], Review.prototype, "updatedAt", 2);
Review = __decorateClass([
  (0, import_typeorm3.Entity)()
], Review);

// src/data-source.ts
var e = require("cors");
var AppDataSource = new import_typeorm4.DataSource({
  type: "mysql",
  host: import_process.env.DB_HOST,
  port: parseInt(import_process.env.DB_PORT),
  username: import_process.env.DB_USER,
  password: import_process.env.DB_PASSWORD,
  database: import_process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    Walk,
    Review,
    WalkImage
  ],
  migrations: [],
  subscribers: []
});

// src/utils/Utils.ts
var fs = require("fs");
var formatSlug = (slug) => {
  slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
  slug = slug.replace(/\s+/g, "-");
  return slug.toLowerCase();
};
var getFiles = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

// src/controller/WalkController.ts
var import_axios = __toESM(require("axios"));

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
  async findWalkBySlug(slug) {
    return await this.findOne({
      where: { slug },
      relations: ["images"]
    });
  },
  async findAllWalks() {
    return await this.find({
      relations: ["images"]
    });
  },
  async findWalkById(id) {
    return await this.findOne({
      where: { id },
      relations: ["images"]
    });
  },
  async saveWalk(walk) {
    return await this.save(walk);
  },
  async removeWalkBySlug(slug) {
    return await this.delete({
      slug
    });
  }
});

// src/repository/walkImage.repository.ts
var WalkImageRepository = AppDataSource.getRepository(WalkImage).extend({
  async findWalkImageByFilename(filename) {
    return await this.findOne({
      where: { name: filename }
    });
  },
  async findWalkImageById(id) {
    return await this.findOne({
      where: { id }
    });
  },
  async saveWalkImage(walkImage) {
    return await this.save(walkImage);
  }
});

// src/controller/WalkController.ts
var multer = require("multer");
var path = require("path");
var fs2 = require("fs");
var sharp = require("sharp");
var _WalkController = class _WalkController {
  constructor() {
    this.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    this.walkRepository = WalkRepository;
    this.walkImageRepository = WalkImageRepository;
  }
  /**
   * Retrieves the latitude and longitude coordinates of a given address.
   *
   * @param {string} address - The address to geocode.
   * @return {Promise<{lat: number, lng: number}> | string} - The latitude and longitude coordinates of the address if successful, or an error message if unsuccessful.
   */
  async geocodeAddress(address) {
    const geocodingUrl = `${_WalkController.GEOCODING_URI}?address=${encodeURIComponent(address)}&key=${this.GOOGLE_API_KEY}&language=${_WalkController.LANGUAGE}`;
    try {
      const response = await import_axios.default.get(geocodingUrl);
      return response.data.results[0].geometry.location;
    } catch (error) {
      return error.message;
    }
  }
  /**
   * Retrieves all walks.
   *
   * @param {Request} request - The request object.
   * @param {Response} response - The response object.
   * @param {NextFunction} next - The next function.
   * @return {Promise<Walk[]>} - A promise that resolves to an array of Walk objects.
   */
  async all(request, response, next) {
    try {
      const walks = await this.walkRepository.findAllWalks();
      return walks;
    } catch (error) {
      next(error);
    }
  }
  async one(request, response, next) {
    try {
      const slug = request.params.slug;
      const walk = await this.walkRepository.findWalkBySlug(slug);
      if (!walk) {
        next(new NotFoundException("Walk not found"));
      }
      response.json(walk);
    } catch (error) {
      next(error);
    }
  }
  /**
   * Saves a walk based on the provided request data.
   *
   * @param {Request} request - The request object containing the walk data.
   * @param {Response} response - The response object to send the result.
   * @param {NextFunction} next - The next function to handle the request.
   * @return {Promise<Walk>} The saved walk object.
   */
  async save(request, response, next) {
    let slug = formatSlug(request.body.name);
    let latitude;
    let longitude;
    try {
      const geocodeResult = await this.geocodeAddress(`${request.body.postalCode} ${request.body.city} ${request.body.country}`);
      latitude = geocodeResult.lat;
      longitude = geocodeResult.lng;
    } catch (error) {
      return error.message;
    }
    const walk = Object.assign(new Walk(), __spreadProps(__spreadValues({}, request.body), {
      slug,
      latitude: request.body.latitude ? request.body.latitude : latitude,
      longitude: request.body.longitude ? request.body.longitude : longitude
    }));
    try {
      if (!walk || typeof walk !== "object") {
        next(new BadRequestException("Walk not found"));
      }
      await this.walkRepository.save(walk);
      return walk;
    } catch (error) {
      return error.message;
    }
  }
  /**
   * Removes a walk from the database and associated images.
   *
   * @param {Request} request - The HTTP request object.
   * @param {Response} response - The HTTP response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   * @return {Promise<void>} - A Promise that resolves when the walk has been removed.
   */
  async remove(request, response, next) {
    const slug = request.params.slug;
    const walkToRemove = await this.walkRepository.findWalkBySlug(slug);
    const filenames = walkToRemove.images.map((image) => image.name);
    await Promise.all(filenames.map(async (filename) => {
      await this.removeImage(filename);
    }));
    if (!walkToRemove) {
      next(new NotFoundException("Walk not found"));
    }
    try {
      await this.walkRepository.remove(walkToRemove);
      response.json("Walk has been removed");
    } catch (error) {
      next(error);
    }
  }
  /**
   * Uploads an image.
   *
   * @param {Request} request - the request object
   * @param {Response} response - the response object
   * @param {NextFunction} next - the next function
   * @return {Promise<void>} - a promise that resolves when the image is uploaded
   */
  async uploadImage(request, response, next) {
    const unlinkAsync = (0, import_util.promisify)(fs2.unlink);
    let filename = "";
    const uploadDir = path.join(_WalkController.UPLOAD_DIR, "walks");
    if (!fs2.existsSync(uploadDir)) {
      fs2.mkdirSync(uploadDir);
    }
    const storage = multer.diskStorage({
      destination: (req, file, done) => {
        done(null, _WalkController.UPLOAD_DIR + "/walks/");
      },
      filename: (req, file, done) => {
        filename = `${file.fieldname}-${Date.now()}`;
        done(null, filename);
      }
    });
    const upload = multer({ storage }).single("image");
    upload(request, response, async function(err) {
      const slug = formatSlug(request.body.slug);
      const walk = await WalkRepository.findWalkBySlug(slug);
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!walk) {
        if (request.file) {
          await unlinkAsync(_WalkController.UPLOAD_DIR + "/walks/" + filename);
        }
        return next(new NotFoundException("Walk not found"));
      }
      if (!request.file) {
        return next(new BadRequestException("No file uploaded"));
      }
      if (request.file.size > 5 * 1024 * 1024) {
        await unlinkAsync(_WalkController.UPLOAD_DIR + "/walks/" + filename);
        return next(new BadRequestException("File too large"));
      }
      if (request.file.mimetype !== "image/jpeg" && request.file.mimetype !== "image/png") {
        await unlinkAsync(_WalkController.UPLOAD_DIR + "/walks/" + filename);
        return next(new BadRequestException("Invalid file type"));
      }
      const newFilename = path.join(_WalkController.UPLOAD_DIR + "/walks/" + filename + ".webp");
      await sharp(request.file.path).resize(500, 500).webp({ quality: 80 }).toFile(newFilename);
      await unlinkAsync(_WalkController.UPLOAD_DIR + "/walks/" + filename);
      const walkImage = new WalkImage();
      walkImage.name = filename + ".webp";
      walkImage.walk = walk;
      try {
        await WalkImageRepository.saveWalkImage(walkImage);
        return response.send({ message: "Image has been uploaded" });
      } catch (error) {
        return next({ error: error.message, status: 500 });
      }
    });
  }
  /**
   * Removes an image file.
   *
   * @param {string} filename - The name of the image file to be removed.
   * @return {Promise<string>} - A promise that resolves to a string indicating that the image has been removed.
   */
  async removeImage(filename) {
    const unlinkAsync = (0, import_util.promisify)(fs2.unlink);
    await unlinkAsync(_WalkController.UPLOAD_DIR + "/walks/" + filename);
    return "image has been removed";
  }
  /**
   * Retrieves an image based on the given filename from the walkImageRepository
   * and sends it as a response.
   *
   * @param {Request} request - the HTTP request object
   * @param {Response} response - the HTTP response object
   * @param {NextFunction} next - the next middleware function
   * @return {void}
   */
  async getImage(request, response, next) {
    const walkImage = await this.walkImageRepository.findWalkImageByFilename(request.params.filename);
    if (!walkImage) {
      return next(new NotFoundException("Image not found"));
    }
    return response.sendFile(path.resolve(_WalkController.UPLOAD_DIR + "/walks/" + walkImage.name));
  }
};
_WalkController.GEOCODING_URI = "https://maps.googleapis.com/maps/api/geocode/json";
_WalkController.LANGUAGE = "fr";
_WalkController.UPLOAD_DIR = process.env.UPLOAD_PATH;
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

// src/email/nodemailer.ts
var nodemailer = require("nodemailer");
var config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "v.duguet.dev@gmail.com",
    pass: "rydsxhecsokowkyb"
  }
};
var transporter = nodemailer.createTransport(config);
var send = async (data) => {
  try {
    const info = await transporter.sendMail(data);
    console.log("Message sent: %s", info.response);
    return info.response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// src/scheduledFunctions/scheduledFunctions.ts
var import_child_process = require("child_process");
var CronJob = require("node-cron");
var fs3 = require("fs");
var spawn = require("child_process").spawn;
var dumpDatabase = () => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", async () => {
    const dumpToFile = async (path3) => {
      console.log(`Dumping database to file at ${path3}...`);
      await new Promise((resolve, reject) => {
        (0, import_child_process.exec)(
          `mysqldump --host=${process.env.DB_HOST} --port=${process.env.DB_PORT} --user=${process.env.DB_USER} --password=${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${path3}`,
          (error, _, stderr) => {
            if (error) {
              reject({ error: JSON.stringify(error), stderr });
              return;
            }
            resolve(void 0);
          }
        );
      });
      console.log("Dump created.");
    };
    const sendMail = async (filename2, path3) => {
      await send({
        "form": "v.duguet.dev@gmail.com",
        "to": "v.duguet.dev@gmail.com",
        "subject": `Dump database ${process.env.DB_NAME}, ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
        "text": `Dump database ${process.env.DB_NAME}, ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
        "html": `<b>Dump database ${process.env.DB_NAME}, ${(/* @__PURE__ */ new Date()).toLocaleString()}</b>`,
        "attachments": [
          {
            "filename": `${filename2}`,
            "path": `${path3}`,
            "cid": `${filename2}`
          }
        ]
      });
    };
    const filename = `${Math.round(Date.now() / 1e3)}.dump.sql`;
    const path2 = `${process.env.UPLOAD_PATH}/${filename}`;
    await dumpToFile(path2);
    await sendMail(filename, path2);
  });
  scheduledJobFunction.start();
};

// src/index.ts
var express = require("express");
var cors = require("cors");
AppDataSource.initialize().then(async () => {
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
  app.get("/hello", (req, res) => {
    res.status(200).send({ message: "hello world" });
  });
  app.post("/folder", async (req, res) => {
    const { folder } = req.body;
    try {
      const files = await getFiles(folder);
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.post("/send", async (req, res) => {
    const { form, to, subject, text, html, attachments } = req.body;
    const data = { form, to, subject, text, html: `<b>${text}</b>`, attachments };
    try {
      const response = await send(data);
      res.status(200).send({ message: "mail send" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.use(express.static("uploads"));
  app.use(express.static("data"));
  app.all("*", UnknownRoutesHandler);
  app.use(ExceptionsHandler);
  app.listen(import_process2.env.PORT);
  dumpDatabase();
  console.log(`Express application is running`);
}).catch((error) => console.log(error));
