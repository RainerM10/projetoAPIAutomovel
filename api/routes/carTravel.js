module.exports = app => {
    const controller = app.controllers.CarTravel;

    app.route('/api/v1/carTravel')
        .get(controller.listCarTravels)
        .post(controller.createCarTravel);

    app.route('/api/v1/carTravel/:idCarTravel')
        .put(controller.updateCarTravel)
}