const express = require('express')

// Import books-controller
const EmpRoutes = require('./../controllers/Employee-Controller.js')

// Create router
const router = express.Router()

// Add route for POST request to add employee
router.get('/add', EmpRoutes.addEmployee)

// Add route for GET to retrieve all employees
router.post('/view', EmpRoutes.viewEmployees)

// Add route for PUT request to delete specific employee
router.put('/delete', EmpRoutes.delEmployee)

// Export router
module.exports = router