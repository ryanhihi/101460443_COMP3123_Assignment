exports.searchEmployees = async (req, res, next) => {
    try {
      const { department, position } = req.query;
      const employees = await employeeService.searchEmployees({ department, position });
      res.status(200).json(employees);
    } catch (error) {
      next(error);
    }
  };
  