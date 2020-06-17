import { IAxioRequestConfig } from './types/index'
import xhr from './xhr'

export default function axios(config: IAxioRequestConfig) {
    xhr(config)
}