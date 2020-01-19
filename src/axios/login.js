import request from "./request";
import global from "../global/global";


/**
 * 登录页 登陆
 */
export function userLogin(query) {
    return request.post(global.domainUrl + "/school/index/login", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}