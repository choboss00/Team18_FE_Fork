// 로그인, 개인정보 조회

export const mockUsers = {
  "user@example.com": {
    uid: 10,
    firstName: "John",
    lastName: "Doe",
    email: "user@example.com",
    password: "password123!",
    profileImage:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400",
    role: "Mentor",
    categoryList: ["Sports", "IDOL", "K-POP"],
    country: "IL",
    phone: "010-1111-1111",
    age: "2002-10-30",
    introduction: "Hi! I love soccer! \nLet's study Korean hard together!",
  },
  "user2@example.com": {
    firstName: "Chae",
    lastName: "mina",
    uid: 11,
    email: "user2@example.com",
    password: "password123!",
    profileImage:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400",
    role: "Mentee",
    categoryList: ["Game", "Drama", "K-POP"],
    country: "US",
    phone: "010-1111-1111",
    age: "2010-10-30",
    introduction: "Hi! I'm Chae mina",
  },
};

// 프로필 조회 (uid 파라미터)

export const ProfileData = {
  10: {
    firstName: "John",
    uid: 10,
    lastName: "Doe",
    email: "user@example.com",
    password: "password123!",
    profileImage:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400",
    role: "Mentor",
    categoryList: ["Sports", "IDOL", "K-POP"],
    country: "IL",
    phone: "010-1111-1111",
    age: "2002-10-30",
    introduction: "Hi! I love soccer! \n Let's study Korean hard together!",
  },
  11: {
    firstName: "Chae",
    lastName: "mina",
    uid: 11,
    email: "user2@example.com",
    password: "password123!",
    profileImage:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400",
    role: "Mentee",
    categoryList: ["Game", "Drama", "K-POP"],
    country: "US",
    phone: "010-1111-1111",
    age: "2010-10-30",
    introduction: "Hi! I'm Chae mina",
  },
};

export const mockResponse = (data) => ({
  data: data,
  status: 200,
  statusText: "OK",
  headers: {
    authorization: "Bearer {JWT Token}",
  },
  config: {},
  request: {},
});
