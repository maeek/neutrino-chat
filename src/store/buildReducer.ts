interface BuildInfoState {}

export const initialState: BuildInfoState = {
  target: import.meta.env.MODE
  // version: process.env.GIT_COMMIT,
  // branch: process.env.GIT_BRANCH,
  // buildName: process.env.BUILD_NAME
};

const buildInfoReducer = (state = initialState) => state;

export default buildInfoReducer;
