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
  const response = await fetch(
    "https://telegra.ph/" + url.pathname + url.search,
    {
      method: request.method,
      body: request.body,
      headers: request.headers,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return new Response(data);
    })
    .catch((error) => {
      console.log(error);
      return new Response(error + "服务服务器异常");
    });

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
