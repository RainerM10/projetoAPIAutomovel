var _ = require('underscore');

module.exports = app => {
    const carData = app.data.car;
    const controller = {};

    // Method called by GET.
    controller.listCars = (req, res) => {
        // Checks the request for filters.
        if (typeof req.query !== 'undefined'
            && req.query != null &&
            !_.isEmpty(req.query)) {
            let objectFilter = [];
            // Check the type of the filter, so that we know
            // what data will be checked.
            if (
                (typeof req.query.color !== 'undefined'
                    && req.query.color != null) &&
                (typeof req.query.brand === 'undefined'
                    || req.query.brand == null)) {
                carData.data.map(function (car) {
                    if (car.color.toLowerCase() == req.query.color.toLowerCase()) {
                        objectFilter.push(car)
                    }
                });
            } else if ((typeof req.query.color === 'undefined'
                || req.query.color == null) &&
                (typeof req.query.brand !== 'undefined'
                    || req.query.brand != null)) {
                carData.data.map(function (car) {
                    if (car.brand.toLowerCase() == req.query.brand.toLowerCase()) {
                        objectFilter.push(car)
                    }
                });
            } else if ((typeof req.query.color !== 'undefined'
                && req.query.color != null) &&
                (typeof req.query.brand !== 'undefined'
                    || req.query.brand != null)) {
                carData.data.map(function (car) {
                    if (car.brand.toLowerCase() == req.query.brand.toLowerCase() &&
                        car.color.toLowerCase() == req.query.color.toLowerCase()) {
                        objectFilter.push(car)
                    }
                });
            } else {
                res.status(400).json("Are missing some variables in your request.");
            }
            res.status(200).json(objectFilter);
        }
        // If there is no filter.
        res.status(200).json(carData);
    }

    // Method called by POST.
    controller.createCar = (req, res) => {
        // Check if exist the three required variables.
        if (
            (typeof req.body.licensePlate !== 'undefined'
                && req.body.licensePlate != null) &&
            (typeof req.body.color !== 'undefined'
                && req.body.color != null) &&
            (typeof req.body.brand !== 'undefined'
                && req.body.brand != null)
        ) {
            try {
                // Check if it is the first element of this type,
                // if not, we will collect the last id entered.
                if (!_.isEmpty(carData.data)) {
                    let lastIndex = carData.data.length;
                    id = carData.data[lastIndex - 1]['id'] + 1;
                } else {
                    id = 1;
                }
                carData.data.push({
                    "id": id,
                    "licensePlate": req.body.licensePlate,
                    "color": req.body.color,
                    "brand": req.body.brand
                });
                res.status(201).json(`Car ${id} created with success.`);
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    // Method called by DELETE.
    controller.deleteCar = (req, res) => {
        // Collect the parameters sent by the request.
        const { idCar } = req.params;
        if (typeof idCar !== 'undefined'
            && idCar != null) {
            try {
                // If the car exists, we will exclude it from the list.
                const foundCar = carData.data.findIndex(car => car['id'] == idCar);
                if (foundCar === -1) {
                    res.status(404).json("The car was not found.")
                } else {
                    carData.data.splice(foundCar, 1);
                    res.status(200).json(`Car ${idCar} was deleted with sucess.`)
                }
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    // Method called by UPDATE.
    controller.updateCar = (req, res) => {
        // Collect the parameters sent by the request.
        const { idCar } = req.params;
        if (typeof idCar !== 'undefined'
            && idCar != null) {
            try {
                // If the car exists, we will update it.
                const foundCar = carData.data.findIndex(car => car['id'] == idCar);
                if (foundCar === -1) {
                    res.status(404).json("The car was not found.")
                } else {
                    // We check what data was sent by the request,
                    // so that we can update as necessary.
                    if (
                        (typeof req.body.licensePlate !== 'undefined'
                            && req.body.licensePlate != null)
                    ) {
                        carData.data[foundCar]['licensePlate'] =
                            req.body.licensePlate;
                    }
                    if (
                        (typeof req.body.color !== 'undefined'
                            && req.body.color != null)
                    ) {
                        carData.data[foundCar]['color'] =
                            req.body.color;
                    }
                    if (
                        (typeof req.body.brand !== 'undefined'
                            && req.body.brand != null)
                    ) {
                        carData.data[foundCar]['brand'] =
                            req.body.brand;
                    }
                    res.status(200).json(`Car ${idCar} was updated with sucess.`)
                }
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    return controller;
}