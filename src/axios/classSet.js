import request from "./request";
import global from "../global/global";

/**
 * 获取班级管理   列表
 */
export function getSchoolClassList(query) {
    return request.post(global.domainUrl + "/school/schoolClass/list", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 获取班级状态   列表
 */
export function getClassState(query) {
    return request.post(global.domainUrl + "/school/schoolClass/selectClassStatus", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 班级结课
 */
export function classOver(query) {
    return request.post(global.domainUrl + "/school/schoolClass/finishClass", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 获取老师列表
 */
export function classTeachers(query) {
    return request.post(global.domainUrl + "/school/teacher/listTeachersForClass", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 获取老师列表
 */
export function classStudent(query) {
    return request.post(global.domainUrl + "/school/student/listStudentsForClass", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 添加班级
 */
export function addClass(query) {
    return request.post(global.domainUrl + "/school/schoolClass/addSchoolClass", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 编辑班级   回显
 */
export function editClass(query) {
    return request.post(global.domainUrl + "/school/schoolClass/goToupdateClassPage", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 班级修改 保存
 */
export function saveEditClass(query) {
    return request.post(global.domainUrl + "/school/schoolClass/updateSchoolClass", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 科目导出
 */
export function loadSubject(query) {
    return request.get(global.domainUrl + "/school/schoolClass/exportSbjectExcel", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 换班 班级列表
 */
export function changeClassList(query) {
    return request.post(global.domainUrl + "/school/schoolClass/selectClassForNotIn", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 换班 保存
 */
export function saveChangeClass(query) {
    return request.post(global.domainUrl + "/school/schoolClass/updateClassForStudent", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 换班 开课
 */
export function classOnIt(query) {
    return request.post(global.domainUrl + "/school/schoolClass/startClass", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}