declare global {
  namespace Express {
    interface RequestType {
      userId?: number;
    }
  }
}


export {  RequestType  };
