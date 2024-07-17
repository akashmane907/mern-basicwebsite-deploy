const { z } = require("zod");

const signupSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "Username must be alphanumeric and between 3 and 20 characters long" }),
    email: z.string()
        .email({ message: "Please enter a valid email" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
    phone: z.string()
        .min(10, { message: "Phone number must be at least 10 characters long" })
        .max(15, { message: "Phone number must be at most 15 characters long" })
});

module.exports = signupSchema;

