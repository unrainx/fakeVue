export type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

export interface IAxioRequestConfig {
    url: string
    method?: string
    data?: any
    params?: any
}