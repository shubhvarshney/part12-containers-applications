import apiClient from '../utils/apiClient'

const login = async credentials => {
  const response = await apiClient.post('/login', credentials)
  return response.data
}

export default { login }