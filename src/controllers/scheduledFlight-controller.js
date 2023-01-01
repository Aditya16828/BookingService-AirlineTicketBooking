const {ScheduledFlightService} = require('../services/index');

const sfs = new ScheduledFlightService();

const createScheduledFlight = async (req, res) => {
    try {
        const response = await sfs.createScheduledFlight(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created scheduled Flight",
            err: {}
        })
    } catch (error) {
        return res.status(201).json({
            data: {},
            success: false,
            message: "Not able to create scheduled Flight",
            err: error
        })
    }
}

const getScheduledFlight = async (req, res) => {
    try {
        const response = await sfs.getScheduledFlight(req.params.id);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully fetched scheduled Flight",
            err: {}
        })
    } catch (error) {
        return res.status(201).json({
            data: {},
            success: false,
            message: "Not able to fetch scheduled Flight",
            err: error
        })
    }
}

const updateScheduledFlight = async (req, res) => {
    try {
        const response = await sfs.updateScheduledFlight(req.body, req.params.id);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully updated scheduled Flight",
            err: {}
        })
    } catch (error) {
        return res.status(201).json({
            data: {},
            success: false,
            message: "Not able to update scheduled Flight",
            err: error
        })
    }
}

const removeScheduledFlight = async (req, res) => {
    try {
        const response = await sfs.removeScheduledFlight(req.params.id);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully deleted scheduled Flight",
            err: {}
        })
    } catch (error) {
        return res.status(201).json({
            data: {},
            success: false,
            message: "Not able to delete scheduled Flight",
            err: error
        })
    }
}

module.exports = {
    createScheduledFlight,
    getScheduledFlight,
    updateScheduledFlight,
    removeScheduledFlight
}