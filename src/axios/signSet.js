import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
let token = 9999;

/**
 * 获取报名管理 数据列表
 */
export function getSignSetList(query) {
    return request.post(domainUrl + "/school/register/list", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 新增用户
 */
export function addRegister(query) {
    return request.post(domainUrl + "/school/register/add", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 点击沟通记录记录
 */
export function getRemark(query) {
    return request.post(domainUrl + "/school/register/edit_page", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 沟通记录保存
 */
export function addRemark(query) {
    return request.post(domainUrl + "/school/register/save", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 保存缴费信息
 */
export function addPay(query) {
    return request.post(domainUrl + "/school/register/toUpdateRenewTimeForId", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 删除缴费信息  未签约
 */
export function deletePay(query) {
    return request.post(domainUrl + "/school/register/delete", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 省市区
 */
export function getAllArea(query) {
    return request.post(domainUrl + "/school/area/getAllArea", query
        , {
            headers:{
                token:token
            }
        }
    );
}