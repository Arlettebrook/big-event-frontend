import request from "@/utils/request.js";
// import { useTokenStore } from "@/stores/token.js";

// 文章分类列表查询
export const articleCategoryListService = () => {
  //   const tokenStore = useTokenStore();
  /* return request.get("/category", {
    headers: { Authorization: tokenStore.token },
  }); */
  return request.get("/category");
};

// 文章分类添加接口
export const articleCategoryAddService = (categoryData) => {
  return request.post('/category',categoryData)
};
