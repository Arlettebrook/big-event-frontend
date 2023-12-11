// 导入request.js请求工具
import request from "@/utils/request.js";

// 提供调用接口的函数
export const userRegisterService = (registerData) => {
  // 这个接口接收的是params参数，借助UrlSearchParams完成传递
  const params = new URLSearchParams();
  for (let key in registerData) {
    params.append(key, registerData[key]);
  }
  return request.post("/user/register", params);
};

// 提供调用接口的函数
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return request.post("/user/login",params)

};
