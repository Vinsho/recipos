class RequestError:
    def __new__(cls, message: str, error_code: int, error=""):
        return {
            "message": message,
            "error": error,
        }, error_code
