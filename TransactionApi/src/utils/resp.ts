/**
 *
 * @param status
 * @param message
 * @param data
 * @param error
 * @example resp(200, 'User found', user);
 */
const resp = (s: number, m: string, d: any, err?: any) => {
  if (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
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
