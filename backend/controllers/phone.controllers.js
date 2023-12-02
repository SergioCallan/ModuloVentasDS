    // backend/controllers/phoneControllers.js
    const logError = require('./errorHandler');

    const {
        GetAllPhonesCommand,
        GetPhoneByIdCommand,
        CreatePhoneCommand,
        DeletePhoneByIdCommand,
        UpdatePhoneByIdCommand
    } = require('../actions/phoneActions');

    const getAllPhone = async (req, res, next) => {
        try {
            const command = new GetAllPhonesCommand();
            const phones = await command.execute();
            res.json(phones);
        } catch (error) {
            next(error);
            logError(error);
        }
    };

    const getPhone = async (req, res, next) => {
        try {
            const command = new GetPhoneByIdCommand(req.params.id);
            const phone = await command.execute();
            if (!phone) {
                return res.status(404).json({ message: "Phone not found" });
            }
            res.json(phone);
        } catch (error) {
            next(error);
            logError(error);
        }
    };

    const createPhone = async (req, res, next) => {
        try {
            const command = new CreatePhoneCommand(req.body);
            const newPhone = await command.execute();
            res.json(newPhone);
        } catch (error) {
            next(error);
            logError(error);
        }
    };

    const deletePhone = async (req, res, next) => {
        try {
            const command = new DeletePhoneByIdCommand(req.params.id);
            await command.execute();
            res.status(204).send(); // No Content
        } catch (error) {
            next(error);
            logError(error);
        }
    };

    const updatePhone = async (req, res, next) => {
        try {
            const command = new UpdatePhoneByIdCommand(req.params.id, req.body);
            const updatedPhone = await command.execute();
            res.json(updatedPhone);
        } catch (error) {
            next(error);
            logError(error);
        }
    };

    module.exports = {
        getAllPhone,
        getPhone,
        createPhone,
        deletePhone,
        updatePhone,
    };
