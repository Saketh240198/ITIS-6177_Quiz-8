const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("./helper");
const OPTIONS = {
    "definition": {
      "openapi": "3.0.0",
      "info": {
        "title": "Swagger Express Excercise API Reference",
        "version": "1.0.0",
        "description": "A Simple Express Swagger API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
          "name": "Venkata Saketh Vellanki",
          "url": "https://github.com/Saketh240198",
          "email": "vvellank@uncc.edu"
        }
      },
  
      "servers": [
        {
          "url": "http://143.198.110.140:3000/",
          "description": "Swagger Express API Documentation"
        }
      ]
    },
    "apis": ["./*.js"]
  }
const PORT = process.env.PORT || 3000;
const app = express();
const specs = swaggerJsDoc(OPTIONS);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         CUST_CODE:
 *           type: string
 *         CUST_NAME:
 *           type: string
 *         CUST_CITY:
 *           type: string
 *         WORKING_AREA:
 *           type: string
 *         CUST_COUNTRY:
 *           type: string
 *         GRADE:
 *           type: string
 *         OPENING_AMT:
 *           type: string
 *         RECEIVE_AMT:
 *           type: string
 *         PAYMENT_AMT:
 *           type: string
 *         OUTSTANDING_AMT:
 *           type: string
 *         PHONE_NO:
 *           type: string
 *         AGENT_CODE:
 *           type: string
 */


/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Inserting a new customer
 *     tags: [customer]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CUST_CODE:
 *                    type: string
 *                    example: C00027
 *                  CUST_NAME:
 *                    type: string
 *                    example: Saketh
 *                  CUST_CITY:
 *                    type: string
 *                    example: Charlotte
 *                  WORKING_AREA:
 *                    type: string
 *                    example: Charlotte
 *                  CUST_COUNTRY:
 *                    type: string
 *                    example: USA
 *                  GRADE:
 *                    type: string
 *                    example: 1
 *                  OPENING_AMT:
 *                    type: string
 *                    example: 8000
 *                  RECEIVE_AMT:
 *                    type: string
 *                    example: 4000
 *                  PAYMENT_AMT:
 *                    type: string
 *                    example: 6000
 *                  OUTSTANDING_AMT:
 *                    type: string
 *                    example: 6000
 *                  PHONE_NO:
 *                    type: string
 *                    example: VVSSVVS
 *                  AGENT_CODE:
 *                    type: string
 *                    example: A004
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get company
 */
app.post("/customer", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO customer VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [body.CUST_CODE, body.CUST_NAME, body.CUST_CITY, body.WORKING_AREA, body.CUST_COUNTRY, body.GRADE, body.OPENING_AMT, body.RECEIVE_AMT, body.PAYMENT_AMT, body.OUTSTANDING_AMT, body.PHONE_NO, body.AGENT_CODE])
          .then((rows) => {
             conn.release();
             res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  /**
 * @swagger
 * /customer:
 *   get:
 *     summary: Returns the list of all the customers
 *     tags: [customer]
 *     responses:
 *       200:
 *         description: The list of the customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get customers
 */
app.get("/customer", (req, res) => {
  getConnection()
    .then((conn) => {
      conn
        .query("SELECT * from customer")
        .then((rows) => {
           conn.release();
           res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
/**
 * @swagger
 * /customer:
 *   put:
 *     summary: Updates the customer name and agent code for a specified customer code
 *     tags: [customer]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CUST_CODE:
 *                    type: string
 *                    example: C00027
 *                  CUST_NAME:
 *                    type: string
 *                    example: Venkata
 *                  AGENT_CODE:
 *                    type: string
 *                    example: A009
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get company
 */
app.put("/customer", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE customer SET CUST_NAME = ?, AGENT_CODE = ? WHERE CUST_CODE = ?",
          [body.CUST_NAME, body.AGENT_CODE, body.CUST_CODE])
          .then((rows) => {
             conn.release();
             res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
/**
 * @swagger
 * /customer:
 *   patch:
 *     summary: Updates the customer name, customer city and working area for a specified customer code
 *     tags: [customer]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CUST_CODE:
 *                    type: string
 *                    example: C00027
 *                  CUST_NAME:
 *                    type: string
 *                    example: Vellanki
 *                  CUST_CITY:
 *                    type: string
 *                    example: Atlanta
 *                  WORKING_AREA:
 *                    type: string
 *                    example: Atlanta
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get company
 */
  app.patch("/customer", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE customer SET CUST_NAME = ?, CUST_CITY = ?, WORKING_AREA = ? WHERE CUST_CODE = ?",
          [body.CUST_NAME, body.CUST_CITY, body.WORKING_AREA, body.CUST_CODE])
          .then((rows) => {
             conn.release();
             res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  /**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Deletes a customer with a specified customer code
 *     tags: [customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: C00027
 *         required: true
 *         description: id that needs to be deleted
 *     responses:
 *       200:
 *         description: Succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not delete company
 */
  app.delete("/customer/:id", (req, res) => {
    let id = req.params.id
    getConnection()
      .then((conn) => {
        conn
          .query("DELETE FROM customer WHERE CUST_CODE = ?",id)
          .then((rows) => {
             conn.release();
             res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

app.get("/foods/:id", (req, res) => {
  var id = req.params.id;
  getConnection()
    .then((conn) => {
      conn
        .query(`SELECT * from foods where ITEM_ID=?`, id)
        .then((rows) => {
            conn.release();
            res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/orders", (req, res) => {
  var code = req.query.code;
  getConnection()
    .then((conn) => {
      conn
        .query(`SELECT * from orders where AGENT_CODE = ?`, code)
        .then((rows) => {
            conn.release();
            res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/agents", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from agents where WORKING_AREA like 'B%'`)
          .then((rows) => {
              conn.release();
              res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  app.get("/company", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from company where company_id > 15`)
          .then((rows) => {
              conn.release();
              res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));