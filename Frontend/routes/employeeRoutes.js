const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/edit/:id', isAuthenticated, (req, res) => {
  res.render('employees/editEmployee', { employeeId: req.params.id, title: 'Edit Employee' });
});

module.exports = router;