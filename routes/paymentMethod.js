var express = require('express');
var router = express.Router();
var PaymentMethodHandler = require('../handlers/paymentMethod');
var authStackMiddleware = require('../helpers/checkAuth');
var MODULES = require('../constants/modules');

module.exports = function (models) {
    var handler = new PaymentMethodHandler(models);
    var moduleId = MODULES.CUSTOMER_PAYMENTS;
    var accessStackMiddlware = require('../helpers/access')(moduleId, models);

    router.use(authStackMiddleware);
    router.use(accessStackMiddlware);

    router.get('/', handler.getForDd);
    router.get('/getForList', handler.getForList);
    router.put('/:id', handler.update);
    router.post('/', handler.create);
    router.delete('/:id', handler.remove);

    return router;
};
