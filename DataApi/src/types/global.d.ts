declare global {
  namespace Express {
    interface Request {
      ticker?: string;
    }
  }
}


export {  RequestType  };
