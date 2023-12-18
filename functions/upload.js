import axios from "axios";
export async function onRequest(context) {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  console.log(context.request);
  const url = new URL(request.url);
  console.log(url);
  const response = await fetch("https://telegra.ph/" + url.pathname + url.search, {
    method: request.method,
    headers: {
      "Origin": "https://telegra.ph",
      "Referer": "https://telegra.ph",
    },
    body: request.body,
  })
    .then((response) => {
      console.log("请求成功", response);
      return response
    })
    .catch((error) => {
      console.error( error);
      return error
    });

  console.log(response)

  /* axios.post("http://telegra.ph/upload",request.body).then(
    response=>{
      console.log(response)
    }
  ).catch(
    error=>{
      console.log(error)
    }
  ) */
  return response;
}
