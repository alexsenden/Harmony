/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}`

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
  PUT = 'put',
}

interface HttpRequestInput {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

const useHttpRequest = ({
  url,
  method,
  body = {},
  headers = {},
}: HttpRequestInput): [() => void, any, any, boolean] => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setloading] = useState(true)

  const sendHttpRequest = async () => {
    const requestHeaders = { accept: '*/*', ...headers }

    new Promise(() =>
      axios[method](url, requestHeaders, body)
        .then(res => {
          setResponse(res.data)
        })
        .catch(err => {
          setError(err)
        })
        .finally(() => {
          setloading(false)
        })
    )
  }

  return [sendHttpRequest, response, error, loading]
}

export default useHttpRequest