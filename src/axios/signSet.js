import request from "./request";
import global from "../global/global";

/**
 * 获取报名管理 数据列表
 */
export function getSignSetList(query) {
    return request.post(global.domainUrl + "/school/register/list", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 新增用户
 */
export function addRegister(query) {
    return request.post(global.domainUrl + "/school/register/add", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 点击沟通记录记录
 */
export function getRemark(query) {
    return request.post(global.domainUrl + "/school/register/edit_page", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 沟通记录保存
 */
export function addRemark(query) {
    return request.post(global.domainUrl + "/school/register/save", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 保存缴费信息
 */
export function addPay(query) {
    return request.post(global.domainUrl + "/school/register/toUpdateRenewTimeForId", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 删除缴费信息  未签约
 */
export function deletePay(query) {
    return request.post(global.domainUrl + "/school/register/delete", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 省市区
 */
export function getAllArea(query) {
    return request.post(global.domainUrl + "/school/area/getAllArea", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}