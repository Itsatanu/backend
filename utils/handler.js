// const handler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }

//we had't use this sentex because we set a class apiResponce for responce and apiError for through error



const handler = (fn) => async (req, res, next) => {
        try {
            await fn(req, res, next)
            
        } catch (err) {
            res.status(err.statusCode || 400).json({
                success: false,
                message: err.message,
                statusCode:err.statusCode || 400
            })
        }
    }

export {handler}