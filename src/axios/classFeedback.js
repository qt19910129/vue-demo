import request from "./request";
import global from "../global/global";

/**
 * 获取课后反馈列表
 */
export function getClassFeedbackList(query) {
    return request.post(global.domainUrl + "/school/feedbackAfterClass/list", query
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
export function getClassTeacher(query) {
    return request.post(global.domainUrl + "/school/teacher/selectTeachersBySchoolId", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 删除一条课后反馈
 */
export function deleteOneFeedback(query) {
    return request.post(global.domainUrl + "/school/feedbackAfterClass/deleteFeedBackTeacherStudent", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 批量删除课后反馈
 */
export function deleteMoreFeedback(query) {
    return request.post(global.domainUrl + "/school/feedbackAfterClass/batchDelFeedBackTeacherStudent", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}