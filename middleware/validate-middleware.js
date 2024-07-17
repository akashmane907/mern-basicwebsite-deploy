const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        console.log("Parsed Body:", parsedBody); // Log the parsed body
        req.body = parsedBody;
        next();
    } catch (error) {
        const status = 422;
        const message = "INVALID INPUT";
        const extraDetails = error.errors.map(err => err.message);
        
        const erro = {
            status,
            message,
            extraDetails,
        };

        console.error("Validation errors:", extraDetails); // Log the validation errors
        next(erro);
    }
};

module.exports = validate;
