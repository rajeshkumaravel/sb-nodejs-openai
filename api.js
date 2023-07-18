const express         = require('express');
const router          = express.Router();
const { ask, image }  = require('./openai');

/**
 * @swagger
 * /api/fetch:
 *   post:
 *     summary: Query OpenAI
 *     tags:
 *       - Course
 *     requestBody:
 *       description: Response generated for query
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FetchRequest'
 *     responses:
 *       201:
 *         description: Response generated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       503:
 *         description: Error while fetching data
 * components:
 *   schemas:
 *     FetchRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 */
router.post('/fetch', async (req, res) => {
  try {
    if (!req['body']['query']) return res.status(400).json({ error: 'Query is mandatory' });
    let { query } = req.body;
    await ask(query)
      .then((answer) => {
        if (answer) {
          return res.status(200).json({
            success: true,
            message: String(answer).replace(/\n/g, ' ').trim(),
          });
        } else {
          res.status(503).json({ error: 'Something went wrong, please try agin later' });
        }
      })
      .catch((error) => {
        res.status(503).json(error);
      });
    res.send(completion.data.choices[0]);
  } catch (err) {
    res.send(err);
  }
});

/**
 * @swagger
 * /api/fetch/description:
 *   post:
 *     summary: Generate description for given title
 *     tags:
 *       - Course
 *     requestBody:
 *       description: Description to be generated for title
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FetchDescriptionRequest'
 *     responses:
 *       201:
 *         description: Description generated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       503:
 *         description: Error while fetching data
 * components:
 *   schemas:
 *     FetchDescriptionRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 */
router.post('/fetch/description', async (req, res) => {
  if (!req['body']['query']) return res.status(400).json({ error: 'Query is mandatory' });
  let { query } = req.body;
  query = 'generate brief description on ' + query;
  await ask(query)
    .then((answer) => {
      if (answer) {
        if (answer?.error) {
          res.status(503).json({ error: answer?.error || 'Something went wrong, please try agin later' });
        } else {
          return res.status(200).json({
            success: true,
            message: String(answer).replace(/\n/g, ' ').trim(),
          });
        }
      } else {
        res.status(503).json({ error: 'Something went wrong, please try agin later' });
      }
    })
    .catch((error) => {
      res.status(503).json(error);
    });
});

/**
 * @swagger
 * /api/fetch/keywords:
 *   post:
 *     summary: Generate keywords for given title
 *     tags:
 *       - Course
 *     requestBody:
 *       description: Keywords to be generated for title
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FetchKeywordsRequest'
 *     responses:
 *       201:
 *         description: Tags generated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       503:
 *         description: Error while fetching data
 * components:
 *   schemas:
 *     FetchKeywordsRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 */
router.post('/fetch/keywords', async (req, res) => {
  if (!req['body']['query']) return res.status(400).json({ error: 'Query is mandatory' });
  let { query } = req.body;
  query = 'generate comma separated keywords for topic ' + query;
  await ask(query)
    .then((answer) => {
      if (answer) {
        if (answer?.error) {
          res.status(503).json({ error: answer?.error || 'Something went wrong, please try agin later' });
        } else {
          return res.status(200).json({
            success: true,
            message: (String(answer).replace(/\n/g, ' ').trim()).split(',').map(item=>item.trim()),
          });
        }
      } else {
        res.status(503).json({ error: 'Something went wrong, please try agin later' });
      }
    })
    .catch((error) => {
      console.log('Error ', error); // TODO: log!
      res.status(503).json(error);
    });
});

/**
 * @swagger
 * /api/fetch/topics:
 *   post:
 *     summary: Generate topics (TOC) for given title
 *     tags:
 *       - Course
 *     requestBody:
 *       description: Table of contents to be generated for title
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FetchTOCRequest'
 *     responses:
 *       201:
 *         description: TOC generated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       503:
 *         description: Error while fetching data
 * components:
 *   schemas:
 *     FetchTOCRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 */
router.post('/fetch/topics', async (req, res) => {
  if (!req['body']['query']) return res.status(400).json({ error: 'Query is mandatory' });
  let { query } = req.body;
  query = 'generate chapter titles for textbook ' + query + ' in the form of ordered list using number format';
  await ask(query)
    .then((answer) => {
      if (answer) {
        if (answer?.error) {
          res.status(503).json({ error: answer?.error || 'Something went wrong, please try agin later' });
        } else {
          if (typeof answer == 'string' && answer.match(/\n\n/g).length == 1) {
            return res.status(200).json({
              success: true,
              message: answer.toString().split('\n').splice(2),
            });
          } else if (typeof answer == 'string' && answer.match(/\n\n/g).length > 1) {
            return res.status(200).json({
              success: true,
              message: answer.toString().split('\n\n').splice(1),
            });
          } else if (typeof answer == 'string') {
            return res.status(200).json({
              success: true,
              message: String(answer).replace(/\n/g, ' ').trim().split(','),
            });
          } else {
            res.status(503).json({ error: 'Something went wrong, please try agin later', message: answer?.error || '' });
          }
        }
      } else {
        res.status(503).json({ error: 'Something went wrong, please try agin later' });
      }
    })
    .catch((error) => {
      console.log('Error ', error); // TODO: log!
      res.status(503).json(error);
    });
});

/**
 * @swagger
 * /api/fetch/images:
 *   post:
 *     summary: Generate image for given prompt
 *     tags:
 *       - Course
 *     requestBody:
 *       description: Image to be generated for prompt
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FetchImageRequest'
 *     responses:
 *       201:
 *         description: Image generated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       503:
 *         description: Error while fetching data
 * components:
 *   schemas:
 *     FetchImageRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 */
router.post('/fetch/images', async (req, res) => {
  if (!req['body']['query']) return res.status(400).json({ error: 'Query is mandatory' });
  let { query } = req.body;
  query = 'cover of a ' + query;
  await image(query)
    .then((answer) => {
      if (answer) {
        return res.status(200).json({
          success: true,
          message: answer,
        });
      } else {
        res.status(503).json({ error: 'Something went wrong, please try agin later' });
      }
    })
    .catch((error) => {
      console.log('Error ', error); // TODO: log!
      res.status(503).json(error);
    });
});

module.exports = router;
