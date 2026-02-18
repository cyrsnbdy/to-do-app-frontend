export type TokenStoreType = {
  accessToken: string | null;
  initialized: boolean;
  _refreshPromise: Promise<boolean> | null;
  loading: boolean;

  init: () => Promise<boolean>;
  setToken: (token: string | null) => void;
  setClearToken: () => void;
};
