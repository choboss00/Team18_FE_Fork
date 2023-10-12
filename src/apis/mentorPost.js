import { instance } from "./instance.js";

export async function getPostsReq(page = 0) {
  return await instance.get(`/mentorings/post?page=${page}`);
}

export async function getPostReq(pid) {
  return await instance.get(`/mentorings/post/${pid}`);
}

export async function addPostReq(data) {
  const { datas } = data;
  return await instance.post("/mentorings/post", {
    datas: datas,
  });
}

export async function editPostReq(pid, data) {
  const { datas } = data;
  return await instance.put(`/mentorings/post/${pid}`, {
    datas: datas,
  });
}

export async function deletePostReq(pid) {
  return await instance.delete(`/mentorings/post/${pid}`);
}

export async function donePostReq(pid) {
  return await instance.patch(`/mentorings/post/${pid}/done`);
}
