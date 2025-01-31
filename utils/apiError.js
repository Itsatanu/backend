class apiError{
    constructor(
        statusCode=400,
        message="Error"
    ){
        this.statusCode=statusCode,
        this.message=message
    }
}
export {apiError}