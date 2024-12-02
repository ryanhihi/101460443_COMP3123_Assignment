import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1/emp';

export const fetchEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
};

export const searchEmployees = async (criteria) => {
  const { department, position } = criteria;
  const query = new URLSearchParams();

  if (department) query.append('department', department);
  if (position) query.append('position', position);

  const response = await axios.get(`${API_URL}/employees/search?${query.toString()}`);
  return response.data;
};
