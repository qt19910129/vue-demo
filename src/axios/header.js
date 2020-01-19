import request from "./request";
import global from "../global/global";

/**
 * 头部 修改密码
 */
export function modifyPassWord(query) {
    return request.post(global.domainUrl + "/school/index/changepwd", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 头部 退出登录
 */
export function loginOuts(query) {
    return request.post(global.domainUrl + "/school/index/loginOut", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}