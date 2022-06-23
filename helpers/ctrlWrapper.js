const ctrlWrapper = (ctrl) => {
  const catchErrors = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return catchErrors;
};

module.exports = ctrlWrapper;
