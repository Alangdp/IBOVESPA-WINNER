// error is optional
const resp = (s: number, m: string, d: any, err?: any) => {
  if (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log(err.errors.length);

      return {
        status: 400,
        message: 'Unique constraint error',
        data: { msg: err.errors[0].message, field: err.errors[0].path },
      };
    }
  }

  return {
    status: s,
    message: m,
    data: d,
  };
};

export { resp };
