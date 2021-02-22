var _ = require('underscore');

module.exports = app => {
    const driverData = app.data.driver;
    const controller = {};

    // Method called by GET.
    controller.listDrivers = (req, res) => {
        // Checks the request for filters.
        if (typeof req.query !== 'undefined'
            && req.query != null &&
            !_.isEmpty(req.query)) {
            let objectFilter = [];
            if (
                (typeof req.query.name !== 'undefined'
                    && req.query.name != null)) {
                driverData.data.map(function (driver) {
                    if (driver.name.toLowerCase() == req.query.name.toLowerCase()) {
                        objectFilter.push(driver)
                    }
                });
            } else {
                res.status(400).json("Are missing some variables in your request.");
            }
            res.status(200).json(objectFilter);
        }
        // If there is no filter.
        res.status(200).json(driverData);
    }

    // Method called by POST.
    controller.createDriver = (req, res) => {
        // Check if exist the required variable.
        if (
            (typeof req.body.name !== 'undefined'
                && req.body.name != null)
        ) {
            try {
                // Check if it is the first element of this type,
                // if not, we will collect the last id entered.
                if (!_.isEmpty(driverData.data)) {
                    let lastIndex = driverData.data.length;
                    id = driverData.data[lastIndex - 1]['id'] + 1;
                } else {
                    id = 1;
                }
                driverData.data.push({
                    "id": id,
                    "name": req.body.name,
                });
                res.status(201).json(`Car ${id} created with success.`);
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    // Method called by UPDATE.
    controller.updateDriver = (req, res) => {
        // Collect the parameters sent by the request.
        const { idDriver } = req.params;
        if (typeof idDriver !== 'undefined'
            && idDriver != null) {
            try {
                // If the driver exists, we will update it.
                const foundDriver = driverData.data.findIndex(driver => driver['id'] == idDriver);
                if (foundDriver === -1) {
                    res.status(404).json("The driver was not found.")
                } else {
                    // We check what data was sent by the request,
                    // so that we can update as necessary.
                    if (
                        (typeof req.body.name !== 'undefined'
                            && req.body.name != null)
                    ) {
                        driverData.data[foundDriver]['name'] =
                            req.body.name;
                        res.status(200).json(`Driver ${idDriver} was updated with sucess.`)
                    }
                }
                res.status(400).json("Are missing some variables in your request.");
            } catch (error) {
                res.status(500).json("Sorry. Something went happens.");
            }
        } else {
            res.status(400).json("Are missing some variables in your request.");
        }
    }

    // Method called by DELETE.
    controller.deleteDriver = (req, res) => {
        // Collect the parameters sent by the request.
        const { idDriver } = req.params;
        if (typeof idDriver !== 'undefined'
            && idDriver != null) {
            try {
                // If the driver exists, we will exclude it from the list.
                const foundDriver = driverData.data.findIndex(driver => driver['id'] == idDriver);
                if (foundDriver === -1) {
                    res.status(404).json("The driver was not found.")
                } else {
                    driverData.data.splice(foundDriver, 1);
                    res.status(200).json(`Driver ${idDriver} was deleted with sucess.`)
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