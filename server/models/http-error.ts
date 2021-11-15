// class HttpError extends Error {
//     constructor(message, errorCode) {
//         super(message);

//     }
// }

// interface HttpError extends Error {
//   code: number;
// }

interface HttpError {
  message: string;
  code: number;
}

export default HttpError;
