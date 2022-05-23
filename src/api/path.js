export const loginUserId = localStorage.getItem('userId');

export function portalpath() {
    return '/g/portal/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function trainpath() {
    return '/g/train/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function userbasepath() {
    return '/g/userbase/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function messagepath() {
    return '/g/messagev2/' + localStorage.getItem("Admin-Token") + '/v1/'
}
export function messageV2path() {
    return '/g/messagev2/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function fileserverpath() {
    return '/supportapi/fileserver/'
}

export function wechatpath() {
    return '/g/wechatservice/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function wechatcppath() {
    return '/g/wechatcpservice/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function datacenterpath() {
    return '/g/datacenter/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function microlessonpath() {
    return '/g/microlesson/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function userbehaviorPath() {
    return 'http://behavior.ctldcloud.com/g/behavior/userbehavior/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function surveypath() {
    return '/g/survey/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function schoolselfpath() {
    return '/g/schoolself/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function activitypath() {
    return '/g/activiti/' + localStorage.getItem("Admin-Token") + '/v1/'
}
export function messagev2path() {
    return '/g/messagev2/' + localStorage.getItem("Admin-Token") + '/v1/'
}
export function learnpath(v='v1') {
    return `/g/learn/${localStorage.getItem("Admin-Token")}/${v}/`
}
export function competitionpath() {
    return '/g/competition/' + localStorage.getItem("Admin-Token") + '/v1/'
}
// export function teachresearchpath() {
//     return '/g/teachresearch/' + localStorage.getItem("Admin-Token") + '/v1/'
// }
export function teachresearchpath(v = 'v1') {
    return `/g/teachresearch/${localStorage.getItem("Admin-Token")}/${v}/`
  }

export function processpath() {
  return '/g/process/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function dicpath() {
  return '/g/dic/' + localStorage.getItem("Admin-Token") + '/v1/'
}

export function flowformpath() {
    return '/g/flowform/' + localStorage.getItem("Admin-Token") + '/v1/'
}
export function consultationpath(v = 'v1') {
    return `/g/consultation/${localStorage.getItem("Admin-Token")}/${v}/`
}

export function placepath() {
    return '/g/place/' + localStorage.getItem("Admin-Token") + '/v1/'
}
export function contestpath(v = 'v1') {
    return `/g/contest/${localStorage.getItem("Admin-Token")}/${v}/`
}