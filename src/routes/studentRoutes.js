const express = require("express");

const studentController = require("../controllers/studentController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management endpoints
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid access token
 */
router.get("/", authenticateToken, studentController.getStudents);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - course
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Dela Cruz
 *               course:
 *                 type: string
 *                 example: BSCS
 *     responses:
 *       201:
 *         description: Student successfully added
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid access token
 */
router.post("/", authenticateToken, studentController.addStudent);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Student found
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid access token
 *       404:
 *         description: Student not found
 */
router.get("/:id", authenticateToken, studentController.getStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Dela Cruz
 *               course:
 *                 type: string
 *                 example: BSIT
 *     responses:
 *       200:
 *         description: Student successfully updated
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid access token
 *       404:
 *         description: Student not found
 */
router.put("/:id", authenticateToken, studentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Student successfully deleted
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid access token
 *       404:
 *         description: Student not found
 */
router.delete("/:id", authenticateToken, studentController.deleteStudent);

module.exports = router;