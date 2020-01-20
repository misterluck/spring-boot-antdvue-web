import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`,params)
