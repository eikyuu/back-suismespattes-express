import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 100, // Limit each IP to 100 requests per `window` (here, per hour)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const signInLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 5, // Limit each IP to 5 login requests per `window` (here, per hour)
	message:'Too many login from this IP, please try again after an hour',
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const signUpLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 5, // Limit each IP to 5 signup requests per `window` (here, per hour)
	message:'Too many signup from this IP, please try again after an hour',
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export {
	signInLimiter,
	signUpLimiter,
	limiter
}