export default class mainApi {
  static async instance(addurl, params, method) {
    const url = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com";

    try {
      let response;
      if (method === "POST") {
        response = await fetch(url + addurl, {
          method,
          body: params,
        });
      } else if (method === "GET") {
        response = await fetch(url + addurl, {
          method,
          params,
        });
      }
      if (response !== undefined) {
        return await response.json();
      } else if (!response.ok) {
        throw Error("something wrong");
      } else {
        return null;
      }
    } catch (error) {
      console.log("error is occurred", error);
      new Error(error);
      return null;
    }
  }
}
