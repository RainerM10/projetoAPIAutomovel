module.exports = app => {
    const controller = app.controllers.Car;

    app.route('/api/v1/Cars')
        .get(controller.listCars)
        .post(controller.createCar);

    app.route('/api/v1/Cars/:idCar')
        .delete(controller.deleteCar)
        .put(controller.updateCar)
}