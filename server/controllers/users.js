const fs = require("fs");
const voca = require("voca");
const process = require("process");

const multer = require("multer");

// Import database
const knex = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "9B7swEiUycNwhQXmuDP2";
const usersTable = "User";

// Retrieve all Users
exports.usersAll = async (req, res) => {
  // Get all Users from database
  knex
    .select("*")
    .from(usersTable)
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving Users: ${err}` });
    });
};

// Create new User
exports.usersCreate = async (req, res) => {
  const {
    id,
    email,
    password,
    firstName,
    lastName,
    avatar,
    role,
    bio,
    createdAt,
    updatedAt,
    address,
    borough,
    businessName,
    city,
    companyWebsiteUrl,
    districtBoroNumber,
    famisNumber,
    gradeBand,
    hasMTAC,
    inquiryContactName,
    inquiryContactPhone,
    languagesSpoken,
    nycMwbeNumber,
    nysMwbeNumber,
    officeDepartment,
    phoneNumber,
    pitchVideoUrl,
    registrationType,
    servicesOffered,
    state,
    title,
    businessLogoUrl,
  } = req.body;

  // Add new User to database
  knex(usersTable)
    .insert({
      // insert new record, a User
      id,
      email,
      password: bcrypt.hash(password, 10),
      firstName,
      lastName,
      avatar,
      role,
      bio,
      createdAt,
      updatedAt,
      address,
      borough,
      businessName,
      city,
      companyWebsiteUrl,
      districtBoroNumber,
      famisNumber,
      gradeBand,
      hasMTAC: hasMTAC || "false",
      inquiryContactName,
      inquiryContactPhone,
      languagesSpoken,
      nycMwbeNumber,
      nysMwbeNumber,
      officeDepartment,
      phoneNumber,
      pitchVideoUrl,
      registrationType,
      servicesOffered,
      state,
      title,
      businessLogoUrl,
    })
    .then(() => {
      res.json({
        message: `User created.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating User: ${err}`,
      });
    });
};

// Remove specific User
exports.usersDelete = async (req, res) => {
  knex(usersTable)
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.id} deleted.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error deleting ${req.body.id} User: ${err}`,
      });
    });
};

// Remove all Users on the list
exports.usersReset = async (req, res) => {
  knex
    .select("*")
    .from(usersTable)
    .truncate()
    .then(() => {
      res.json({ message: "User list cleared." });
    })
    .catch((err) => {
      res.json({ message: `There was an error resetting User list: ${err}.` });
    });
};

// Get specific User
exports.usersGetOne = async (req, res) => {
  knex(usersTable)
    .where("id", req.params.userId)
    .then((userData) => {
      const {
        address,
        avatar,
        bio,
        borough,
        businessLogoUrl,
        businessName,
        city,
        companyWebsiteUrl,
        createdAt,
        email,
        famisNumber,
        firstName,
        hasMTAC,
        inquiryContactName,
        inquiryContactPhone,
        languagesSpoken,
        lastName,
        nycMwbeNumber,
        nysMwbeNumber,
        phoneNumber,
        pitchVideoUrl,
        registrationType,
        role,
        servicesOffered,
        state,
        title,
        updatedAt,
      } = userData[0];
      res.json([
        {
          address,
          avatar,
          bio,
          borough,
          businessLogoUrl,
          businessName,
          city,
          companyWebsiteUrl,
          createdAt,
          email,
          famisNumber,
          firstName,
          hasMTAC,
          inquiryContactName,
          inquiryContactPhone,
          languagesSpoken,
          lastName,
          nycMwbeNumber,
          nysMwbeNumber,
          phoneNumber,
          pitchVideoUrl,
          registrationType,
          role,
          servicesOffered,
          state,
          title,
          updatedAt,
        },
      ]);
    })
    .catch((err) => {
      res.json({
        message: `There was an error getting ${req.body.id} User: ${err}`,
      });
    });
};

// Update specific User
exports.usersUpdateOne = async (req, res) => {
  knex(usersTable)
    .update({ ...req.body })
    .where("id", req.params.userId)
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({
        message: `There was an error updating ${req.body.id} User: ${err}`,
      });
    });
};

exports.getFeaturedLogos = async (req, res) => {
  knex
    .select("id", "businessName", "businessLogoUrl")
    .from(usersTable)
    .where({
      role: "VENDOR",
    })
    .then((userData) => {
      const formattedLogoData = userData.map(
        ({ id, businessName, businessLogoUrl }) => ({
          folderId: id,
          businessName,
          businessLogoUrl,
        })
      );
      res.json(formattedLogoData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving Users: ${err}` });
    });
};

exports.usersLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400);
  if (!password) return res.status(400);

  const {
    id,
    role,
    firstName,
    lastName,
    password: dbPassword,
  } = await knex
    .table(usersTable)
    .first("id", "role", "firstName", "lastName", "password")
    .where({ email });

  const isAuthenticated = await bcrypt.compare(password, dbPassword);
  if (!isAuthenticated) {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    const userData = await knex(usersTable).where("id", id);
    const {
      avatar,
      bio,
      createdAt,
      updatedAt,
      address,
      borough,
      businessName,
      city,
      companyWebsiteUrl,
      districtBoroNumber,
      famisNumber,
      gradeBand,
      hasMTAC,
      inquiryContactName,
      inquiryContactPhone,
      languagesSpoken,
      nycMwbeNumber,
      nysMwbeNumber,
      officeDepartment,
      phoneNumber,
      pitchVideoUrl,
      registrationType,
      servicesOffered,
      state,
      title,
      businessLogoUrl,
    } = userData[0];
    return jwt.sign(
      { id, role, firstName, lastName },
      SECRET,
      { expiresIn: "1h" },
      (error, token) => {
        if (error) console.log(error);
        res.status(200).json({
          id,
          role,
          firstName,
          lastName,
          token,
          userData:
            role === "USER"
              ? {
                  address,
                  avatar,
                  bio,
                  borough,
                  city,
                  createdAt,
                  districtBoroNumber,
                  email,
                  firstName,
                  gradeBand,
                  lastName,
                  officeDepartment,
                  phoneNumber,
                  registrationType,
                  state,
                  title,
                  updatedAt,
                }
              : {
                  address,
                  avatar,
                  bio,
                  borough,
                  businessLogoUrl,
                  businessName,
                  city,
                  companyWebsiteUrl,
                  createdAt,
                  email,
                  famisNumber,
                  firstName,
                  hasMTAC,
                  inquiryContactName,
                  inquiryContactPhone,
                  languagesSpoken,
                  lastName,
                  nycMwbeNumber,
                  nysMwbeNumber,
                  phoneNumber,
                  pitchVideoUrl,
                  registrationType,
                  role,
                  servicesOffered,
                  state,
                  title,
                  updatedAt,
                },
        });
      }
    );
  }
};

exports.usersTokenVerify = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, SECRET, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      res.status(200).json({
        id: decodedToken.id,
      });
    }
  });
};

exports.usersUploadImage = async (req, res) => {
  let filename;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `${process.cwd()}/public/images/${req.params.userId}`;
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const parseName = file.originalname.split(".");
      filename =
        Date.now() +
        "-" +
        voca.slugify(file.originalname, { lowercase: true }) +
        "." +
        parseName[parseName.length - 1];
      cb(null, filename);
    },
  });
  const upload = multer({ storage: storage }).single("file");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    knex(usersTable)
      .update(
        req.params.uploadType !== "photo"
          ? { businessLogoUrl: `/${req.params.userId}/${filename}` }
          : { avatar: `/${req.params.userId}/${filename}` }
      )
      .where("id", req.params.userId)
      .then((userData) => {
        console.log(userData);
      })
      .catch((err) => {
        console.log({
          message: `There was an error updating ${req.body.id} User: ${err}`,
        });
      });
    return res.status(200).json(filename);
  });
};

exports.usersSearch = async (req, res) => {
  const { q: query, sort, filters = "" } = req.query;
  try {
    const filtersArray = filters.split(",").filter(Boolean);
    const results = await knex
      .select(
        "borough",
        "businessLogoUrl",
        "businessName",
        "famisNumber",
        "hasMTAC",
        "id",
        "inquiryContactName",
        "languagesSpoken",
        "nycMwbeNumber",
        "nysMwbeNumber",
        "servicesOffered",
        "bio"
      )
      .from(usersTable)
      .where({ role: "VENDOR" })
      .where((qry) => {
        if (query) {
          qry.where("businessName", "like", `%${query}%`);
          qry.orWhere("borough", "like", `%${query}%`);
          qry.orWhere("famisNumber", "like", `%${query}%`);
          qry.orWhere("inquiryContactName", "like", `%${query}%`);
          qry.orWhere("languagesSpoken", "like", `%${query}%`);
          qry.orWhere("nycMwbeNumber", "like", `%${query}%`);
          qry.orWhere("nysMwbeNumber", "like", `%${query}%`);
          qry.orWhere("servicesOffered", "like", `%${query}%`);
          qry.orWhere("bio", "like", `%${query}%`);
        }
      })
      .where((qb) => {
        if (filtersArray.length > 0 && filtersArray.includes("mtac")) {
          qb.where("hasMTAC", true);
        }
        if (filtersArray.length > 0 && filtersArray.includes("nyc-mwbe")) {
          qb.whereNotNull("nysMwbeNumber");
          qb.andWhere("nysMwbeNumber", "!=", "");
        }
        if (filtersArray.length > 0 && filtersArray.includes("nys-mwbe")) {
          qb.whereNotNull("nycMwbeNumber");
          qb.andWhere("nycMwbeNumber", "!=", "");
        }
        if (filtersArray.length > 0 && filtersArray.includes("famis")) {
          qb.whereNotNull("famisNumber");
          qb.andWhere("famisNumber", "!=", "");
        }
      })
      .orderBy(
        sort === "name"
          ? "businessName"
          : sort === "borough"
          ? "borough"
          : "createdAt"
      );
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};
