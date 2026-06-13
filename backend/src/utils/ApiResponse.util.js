class ApiResponse {
    constructor(
        data,
        statusCode = 200,
        message = "Successfull Response"
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export default ApiResponse