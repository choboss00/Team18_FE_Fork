import { instance } from "../instance";
import { mockResponse } from "./mock";

export async function getConnectiontsReq() {
  return await instance.get("/contacts");
}

export async function addConnectionReq(pid) {
  // return await instance.post(`/contacts/${pid}`);

  // api 구현 전까지 mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse(null);
}

export async function deleteConnectionReq(uid) {
  return await instance.delete(`/contacts/${uid}`);
}

export async function acceptConnectionReq(uid) {
  return await instance.patch(`/contacts/${uid}/accept`);
}

export async function refuseConnectionReq(uid) {
  return await instance.patch(`/contacts/${uid}/refuse`);
}
