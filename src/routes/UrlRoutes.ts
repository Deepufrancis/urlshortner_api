import type { Request, Response } from "express";
import express from "express";
import shortid from "shortid";
import Url from "../models/Url";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: URL Shortener
 *   description: API for creating and managing short URLs
 */

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Create a shortened URL
 *     description: Generates a short URL for a given original URL.
 *     tags: [URL Shortener]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://www.example.com/long-page-url"
 *     responses:
 *       200:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                   example: "https://www.example.com/long-page-url"
 *                 shortUrl:
 *                   type: string
 *                   example: "http://localhost:3000/abc123"
 *                 shortCode:
 *                   type: string
 *                   example: "abc123"
 *                 clicks:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: Invalid or missing original URL
 *       500:
 *         description: Server error
 */
router.post("/shorten", async (req: Request, res: Response) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE_URL || "http://localhost:3000";

  console.log("BASE_URL in route:", base);

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    new URL(originalUrl);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortCode = shortid.generate();
  const shortUrl = `${base}/${shortCode}`;

  try {
    let existing = await Url.findOne({ originalUrl });
    if (existing) return res.json(existing);

    const url = new Url({ originalUrl, shortUrl, shortCode });
    await url.save();

    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @swagger
 * /{code}:
 *   get:
 *     summary: Redirect to original URL
 *     description: Redirects the user to the original URL for a given short code.
 *     tags: [URL Shortener]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique short code
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 *       500:
 *         description: Server error
 */
router.get("/:code", async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).json({ error: "URL not found" });

    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
