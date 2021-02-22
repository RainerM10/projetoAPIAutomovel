module.exports = app => {
    const controller = app.controllers.Driver;

    app.route('/api/v1/Drivers')
        .get(controller.listDrivers)
        .post(controller.createDriver);

    app.route('/api/v1/Drivers/:idDriver')
        .delete(controller.deleteDriver)
        .put(controller.updateDriver)
}