const instance = async (props) => {
  const { url, addurl, method, data } = props;
  try {
    let response;
    if (method === "POST") {
      response = await fetch(url + addurl, {
        method,
        body: data,
      });
    } else if (method === "GET") {
      response = await fetch(url + addurl, {
        method,
        params: data,
      });
    }
    console.log("instance", response);
    if (response !== undefined) {
      return await response.json();
    } else if (response !== undefined && !response.ok) {
      throw Error("something wrong");
    } else {
      return null;
    }
  } catch (error) {
    console.log("error is occurred", error);
    new Error(error);
  }
};

export default instance;
