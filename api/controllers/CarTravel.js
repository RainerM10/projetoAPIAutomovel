const axios = require('axios');
const { response } = require('express');
var _ = require('underscore');


module.exports = app => {
    const carTravelData = app.data.carTravel;
    const driverData = app.data.driver;
    const carData = app.data.car;
    const controller = {};

    // Method called by GET.
    controller.listCarTravels = (req, res) => {
        responseData = [];
        carTravelData.data.map(function (carTravel) {
            responseData.push({
                "id": carTravel.id,
                "startDate": carTravel.startDate,
                "endDate": carTravel.endDate,
                "car": getCar(carTravel.idCar),
                "driver": getDriver(carTravel.idDriver),
                "reasonUse": carTravel.reasonUse
            })
        });
        res.status(200).json(responseData);
    }

    // Method called by POST.
    controller.createCarTravel = (req, res) => {
        // Check if exist the three required variables.
        if (
            (typeof req.body.startDate !== 'undefined'
                && req.body.startDate != null) &&
            (typeof req.body.idDriver !== 'undefined'
                && req.body.idDriver != null) &&
            (typeof req.body.idCar !== 'undefined'
                && req.body.idCar != null)
        ) {
            try {
                // Conference if the user sent in the request exists.
                let idDriver = getDriver(req.body.idDriver);
                if (_.isEmpty(idDriver)) {
                    res.status(500).json("Sorry. This driver doesn't exist.");
                } else {
                    // Conference if the car sent in the request exists.
                    let idCar = getCar(req.body.idCar);
                    if (_.isEmpty(idCar)) {
                        res.status(500).json("Sorry. This driver doesn't exist.");
                    } else {
                        // Checks whether the user and the car are available.
                        if (!verifyRules(idDriver[0], idCar[0])) {
                            res.status(500).json("Sorry. The driver is already driving a car or this car is already in use.");
                        } else {
                            // Check if it is the first element of this type,
                            // if not, we will collect the last id entered.
                            if (!_.isEmpty(carTravelData.data)) {
                                let lastIndex = carTravelData.data.length;
                                id = carTravelData.data[lastIndex - 1]['id'] + 1;
                            } else {
                                id = 1;
                            }
                            carTravelData.data.push({
                                "id": id,
                                "startDate": req.body.startDate,
                                "endDate": "",
                                "idDriver": req.body.idDriver,
                                "idCar": req.body.idCar,
                                "reasonUse": (req.body.reasonUse != null) ? req.body.reasonUse : ""
                            });
                            res.status(201).json(`Car ${id} created with success.`);
                        }
                    }
                }
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    controller.updateCarTravel = (req, res) => {
        // Collect the parameters sent by the request.
        const { idCarTravel } = req.params;
        if (typeof idCarTravel !== 'undefined'
            && idCarTravel != null) {
            try {
                // If the travel exists, we will update it.
                const foundCarTravel = carTravelData.data.findIndex(carTravel => carTravel['id'] == idCarTravel);
                if (foundCarTravel === -1) {
                    res.status(404).json("The carTravel was not found.")
                } else {
                    // We check what data was sent by the request,
                    // so that we can update as necessary.
                    if (
                        (typeof req.body.endDate !== 'undefined'
                            && req.body.endDate != null)
                    ) {
                        carTravelData.data[foundCarTravel]['endDate'] =
                            req.body.endDate;
                    }
                    res.status(200).json(`CarTravel ${idCarTravel} was updated with sucess.`)
                }
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    function getDriver(idDriver) {
        let driverUser = [];
        if ((typeof idDriver !== 'undefined'
            && idDriver != null)) {
            const foundDriver = driverData.data.findIndex(driver => driver['id'] == idDriver);
            if (foundDriver !== -1) {
                driverUser.push(driverData.data[foundDriver])
            }
        }
        return driverUser;
    }

    function getCar(idCar) {
        let carUse = [];
        if ((typeof idCar !== 'undefined'
            && idCar != null)) {
            const foundDriver = carData.data.findIndex(driver => driver['id'] == idCar);
            if (foundDriver !== -1) {
                carUse.push(carData.data[foundDriver])
            }
        }
        return carUse;
    }

    function verifyRules(idDriver, idCar) {
        let verify = true;
        carTravelData.data.map(function (carTravel) {
            if (carTravel.idDriver == idDriver.id ||
                carTravel.idCar == idCar.id) {
                if (carTravel.endDate == "") {
                    verify = false;
                }
            }
        });
        return verify;
    }

    return controller;
}