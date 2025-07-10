import apiClient from '../utils/apiClient'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await apiClient.get('/blogs')
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await apiClient.post('/blogs', blog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await apiClient.put(`/blogs/${blog.id}`, blog, config)
  return response.data
}

const deleteItem = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await apiClient.delete(`/blogs/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, deleteItem }