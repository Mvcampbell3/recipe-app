const router = require('express').Router();
const user_routes = require('./user')
const ingredient_routes = require('./ingredient')
const recipe_routes = require('./recipe')

router.use('/user', user_routes);
router.use('/recipe', recipe_routes);
router.use('/ingredient', ingredient_routes);


module.exports = router;