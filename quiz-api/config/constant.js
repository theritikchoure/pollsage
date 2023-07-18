module.exports = {


    // Some of the General Length for Validation
    defaultLen: {
        CURRENT_PAGE: 1, // For Pagination
        PER_PAGE_LIMIT: 10, //For Pagination limit in admin panel
        PER_PAGE_LIMIT_APP: 10, //For Pagination limit in app. (client side)

        MIN_VALUE_LENGTH: 3,
        MED_VALUE_LENGTH: 500,
        MAX_VALUE_LENGTH: 1000,
        MIN_URL_LENGTH: 5
    },

    resStatusCode: {
        SERVER_ERROR: 504,
        SUCCESS: 200,
        UPDATED: 200,
        CREATED: 201,
        DELETED: 200,
        SUCCESS_FETCH: 200,
        NO_RECORD_FOUND: 404,
        BAD_REQUEST: 400,
        SWR: 500,
        CONTACT_MSG: 201,
        LOGIN: 200,
        LOGOUT: 200,
        OTP_GENERATED: 200,
        UNABLE_GENERATE_OTP: 400,
        OTP_FAILED: 400,
        INVALID_OTP:400,
        TOKEN_EXPIRED: 400,
        TOKEN_NOT_FOUND: 404,
        VALIDATION_ERROR: 400,
        NO_IP_AGENT: 400,
        INVALID_OBJECT_ID: 404,
        UNABLE_FETCH: 400,
        UNABLE_CREATE: 400,
        UNABLE_UPDATE: 400,
        UNABLE_DELETE: 400,
        WARNING: 400,
        ERROR: 500,
        INVALID_CREDENTIAL: 400,
        PASSWORD_RESET: 200,
    },

    resMsg: {
        SERVER_ERROR: 'Something Went Wrong',
        SUCCESS: 'Sucessfully Done',
        UPDATED: 'Sucessfully Update',
        CREATED: 'New Record Created',
        DELETED: 'Record Deleted',
        SUCCESS_FETCH: 'Successfully Retrived.',
        NO_RECORD_FOUND: 'No Record Found!',
        NO_FILE_FOUND: 'Media Not Found!',
        BAD_REQUEST: 'Bad Request!.',
        SWR: 'Something Went Wrong',
        CONTACT_MSG: 'Thank You For Contacting Us',
        LOGIN: 'Successfully Logged-in',
        LOGOUT: 'Successfully Logout',
        OTP_GENERATED: 'OTP generated successfully',
        UNABLE_GENERATE_OTP: 'Unable to generate OTP, Please try again later',
        OTP_FAILED: 'OTP Expired. Please request another OTP',
        INVALID_OTP: 'Invalid OTP, please try again',
        TOKEN_EXPIRED: 'Token Has Been Expired',
        TOKEN_NOT_FOUND: 'Token Has Been Expired',
        VALIDATION_ERROR: "Validation Error",
        NO_IP_AGENT: "Unable to get ip address and browser agent",
        INVALID_OBJECT_ID: "Invalid Object ID",
        UNABLE_FETCH: 'Unable to fetch record(s), please try again',
        UNABLE_CREATE: 'Unable to add record(s), please try again',
        UNABLE_UPDATE: 'Unable to update record(s), please try again',
        UNABLE_DELETE: 'Unable to delete record(s), please try again',
        INVALID_CREDENTIAL: 'Invalid Credentials',
        PASSWORD_RESET: 'Password Reset Successfully',
    },

    altMsg: {
        DEFAULT_URL: 'https://picsum.photos/seed/picsum/200/300?random=2'
    },

    emailSubject: {
        EMAIL_VERIFICATION: "Verify your email id",
    },
}