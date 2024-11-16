import "./chunk-UV2BQ6X2.js";
import {
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
  ɵapplyMixins,
  ɵcacheInstance,
  ɵfirebaseAppFactory,
  ɵlazySDKProxy
} from "./chunk-352MRFOA.js";
import {
  firebase
} from "./chunk-ARMIPHK3.js";
import {
  OnDisconnect,
  QueryImpl,
  QueryParams,
  ReferenceImpl,
  child,
  connectDatabaseEmulator,
  enableLogging,
  endAt,
  endBefore,
  equalTo,
  forceLongPolling,
  forceWebSockets,
  get,
  goOffline,
  goOnline,
  increment,
  limitToFirst,
  limitToLast,
  off,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  onChildRemoved,
  onValue,
  orderByChild,
  orderByKey,
  orderByPriority,
  orderByValue,
  push,
  query,
  ref,
  refFromURL,
  remove,
  repoManagerDatabaseFromApp,
  runTransaction,
  serverTimestamp,
  set,
  setPriority,
  setSDKVersion,
  setWithPriority,
  startAfter,
  startAt,
  update,
  validatePathString,
  validateWritablePath
} from "./chunk-XYELTP44.js";
import "./chunk-UXNI2VDG.js";
import {
  FirebaseApp
} from "./chunk-S6J6DC2Y.js";
import {
  VERSION,
  keepUnstableUntilFirst,
  ɵAPP_CHECK_PROVIDER_NAME,
  ɵAngularFireSchedulers,
  ɵAppCheckInstances,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-UQJTAQ7X.js";
import "./chunk-PFEPKP7F.js";
import {
  Component,
  ComponentContainer,
  Deferred,
  ErrorFactory,
  Logger,
  Provider,
  _getProvider,
  _registerComponent,
  base64,
  errorPrefix,
  getApp,
  getGlobal,
  getModularInstance,
  isIndexedDBAvailable,
  registerVersion,
  uuidv4,
  validateArgCount,
  validateCallback,
  validateContextObject
} from "./chunk-7EG3QRLR.js";
import {
  isPlatformServer
} from "./chunk-JYP4ZKIW.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-IXRTPHDO.js";
import {
  Observable,
  Subject,
  asyncScheduler,
  concatMap,
  distinct,
  distinctUntilChanged,
  filter,
  first,
  from,
  map,
  merge,
  observeOn,
  of,
  scan,
  share,
  shareReplay,
  skipWhile,
  subscribeOn,
  switchMap,
  switchMapTo,
  timer,
  withLatestFrom
} from "./chunk-I6S27ITP.js";
import "./chunk-NTERNHDG.js";
import {
  __async,
  __spreadValues
} from "./chunk-35ENWJA4.js";

// node_modules/@firebase/app-check/dist/esm/index.esm2017.js
var APP_CHECK_STATES = /* @__PURE__ */ new Map();
var DEFAULT_STATE = {
  activated: false,
  tokenObservers: []
};
var DEBUG_STATE = {
  initialized: false,
  enabled: false
};
function getStateReference(app) {
  return APP_CHECK_STATES.get(app) || Object.assign({}, DEFAULT_STATE);
}
function setInitialState(app, state) {
  APP_CHECK_STATES.set(app, state);
  return APP_CHECK_STATES.get(app);
}
function getDebugState() {
  return DEBUG_STATE;
}
var BASE_ENDPOINT = "https://content-firebaseappcheck.googleapis.com/v1";
var EXCHANGE_DEBUG_TOKEN_METHOD = "exchangeDebugToken";
var TOKEN_REFRESH_TIME = {
  /**
   * The offset time before token natural expiration to run the refresh.
   * This is currently 5 minutes.
   */
  OFFSET_DURATION: 5 * 60 * 1e3,
  /**
   * This is the first retrial wait after an error. This is currently
   * 30 seconds.
   */
  RETRIAL_MIN_WAIT: 30 * 1e3,
  /**
   * This is the maximum retrial wait, currently 16 minutes.
   */
  RETRIAL_MAX_WAIT: 16 * 60 * 1e3
};
var ONE_DAY = 24 * 60 * 60 * 1e3;
var Refresher = class {
  constructor(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
    this.operation = operation;
    this.retryPolicy = retryPolicy;
    this.getWaitDuration = getWaitDuration;
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    this.pending = null;
    this.nextErrorWaitInterval = lowerBound;
    if (lowerBound > upperBound) {
      throw new Error("Proactive refresh lower bound greater than upper bound!");
    }
  }
  start() {
    this.nextErrorWaitInterval = this.lowerBound;
    this.process(true).catch(() => {
    });
  }
  stop() {
    if (this.pending) {
      this.pending.reject("cancelled");
      this.pending = null;
    }
  }
  isRunning() {
    return !!this.pending;
  }
  process(hasSucceeded) {
    return __async(this, null, function* () {
      this.stop();
      try {
        this.pending = new Deferred();
        this.pending.promise.catch((_e) => {
        });
        yield sleep(this.getNextRun(hasSucceeded));
        this.pending.resolve();
        yield this.pending.promise;
        this.pending = new Deferred();
        this.pending.promise.catch((_e) => {
        });
        yield this.operation();
        this.pending.resolve();
        yield this.pending.promise;
        this.process(true).catch(() => {
        });
      } catch (error) {
        if (this.retryPolicy(error)) {
          this.process(false).catch(() => {
          });
        } else {
          this.stop();
        }
      }
    });
  }
  getNextRun(hasSucceeded) {
    if (hasSucceeded) {
      this.nextErrorWaitInterval = this.lowerBound;
      return this.getWaitDuration();
    } else {
      const currentErrorWaitInterval = this.nextErrorWaitInterval;
      this.nextErrorWaitInterval *= 2;
      if (this.nextErrorWaitInterval > this.upperBound) {
        this.nextErrorWaitInterval = this.upperBound;
      }
      return currentErrorWaitInterval;
    }
  }
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
var ERRORS = {
  [
    "already-initialized"
    /* AppCheckError.ALREADY_INITIALIZED */
  ]: "You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.",
  [
    "use-before-activation"
    /* AppCheckError.USE_BEFORE_ACTIVATION */
  ]: "App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.",
  [
    "fetch-network-error"
    /* AppCheckError.FETCH_NETWORK_ERROR */
  ]: "Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",
  [
    "fetch-parse-error"
    /* AppCheckError.FETCH_PARSE_ERROR */
  ]: "Fetch client could not parse response. Original error: {$originalErrorMessage}.",
  [
    "fetch-status-error"
    /* AppCheckError.FETCH_STATUS_ERROR */
  ]: "Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",
  [
    "storage-open"
    /* AppCheckError.STORAGE_OPEN */
  ]: "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
  [
    "storage-get"
    /* AppCheckError.STORAGE_GET */
  ]: "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
  [
    "storage-set"
    /* AppCheckError.STORAGE_WRITE */
  ]: "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
  [
    "recaptcha-error"
    /* AppCheckError.RECAPTCHA_ERROR */
  ]: "ReCAPTCHA error.",
  [
    "throttled"
    /* AppCheckError.THROTTLED */
  ]: `Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}`
};
var ERROR_FACTORY = new ErrorFactory("appCheck", "AppCheck", ERRORS);
function ensureActivated(app) {
  if (!getStateReference(app).activated) {
    throw ERROR_FACTORY.create("use-before-activation", {
      appName: app.name
    });
  }
}
function exchangeToken(_0, _1) {
  return __async(this, arguments, function* ({
    url,
    body
  }, heartbeatServiceProvider) {
    const headers = {
      "Content-Type": "application/json"
    };
    const heartbeatService = heartbeatServiceProvider.getImmediate({
      optional: true
    });
    if (heartbeatService) {
      const heartbeatsHeader = yield heartbeatService.getHeartbeatsHeader();
      if (heartbeatsHeader) {
        headers["X-Firebase-Client"] = heartbeatsHeader;
      }
    }
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers
    };
    let response;
    try {
      response = yield fetch(url, options);
    } catch (originalError) {
      throw ERROR_FACTORY.create("fetch-network-error", {
        originalErrorMessage: originalError === null || originalError === void 0 ? void 0 : originalError.message
      });
    }
    if (response.status !== 200) {
      throw ERROR_FACTORY.create("fetch-status-error", {
        httpStatus: response.status
      });
    }
    let responseBody;
    try {
      responseBody = yield response.json();
    } catch (originalError) {
      throw ERROR_FACTORY.create("fetch-parse-error", {
        originalErrorMessage: originalError === null || originalError === void 0 ? void 0 : originalError.message
      });
    }
    const match = responseBody.ttl.match(/^([\d.]+)(s)$/);
    if (!match || !match[2] || isNaN(Number(match[1]))) {
      throw ERROR_FACTORY.create("fetch-parse-error", {
        originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration format: ${responseBody.ttl}`
      });
    }
    const timeToLiveAsNumber = Number(match[1]) * 1e3;
    const now = Date.now();
    return {
      token: responseBody.token,
      expireTimeMillis: now + timeToLiveAsNumber,
      issuedAtTimeMillis: now
    };
  });
}
function getExchangeDebugTokenRequest(app, debugToken) {
  const {
    projectId,
    appId,
    apiKey
  } = app.options;
  return {
    url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_DEBUG_TOKEN_METHOD}?key=${apiKey}`,
    body: {
      // eslint-disable-next-line
      debug_token: debugToken
    }
  };
}
var DB_NAME = "firebase-app-check-database";
var DB_VERSION = 1;
var STORE_NAME = "firebase-app-check-store";
var DEBUG_TOKEN_KEY = "debug-token";
var dbPromise = null;
function getDBPromise() {
  if (dbPromise) {
    return dbPromise;
  }
  dbPromise = new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        var _a;
        reject(ERROR_FACTORY.create("storage-open", {
          originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
        }));
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        switch (event.oldVersion) {
          case 0:
            db.createObjectStore(STORE_NAME, {
              keyPath: "compositeKey"
            });
        }
      };
    } catch (e) {
      reject(ERROR_FACTORY.create("storage-open", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      }));
    }
  });
  return dbPromise;
}
function readTokenFromIndexedDB(app) {
  return read(computeKey(app));
}
function writeTokenToIndexedDB(app, token) {
  return write(computeKey(app), token);
}
function writeDebugTokenToIndexedDB(token) {
  return write(DEBUG_TOKEN_KEY, token);
}
function readDebugTokenFromIndexedDB() {
  return read(DEBUG_TOKEN_KEY);
}
function write(key, value) {
  return __async(this, null, function* () {
    const db = yield getDBPromise();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({
      compositeKey: key,
      value
    });
    return new Promise((resolve, reject) => {
      request.onsuccess = (_event) => {
        resolve();
      };
      transaction.onerror = (event) => {
        var _a;
        reject(ERROR_FACTORY.create("storage-set", {
          originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
        }));
      };
    });
  });
}
function read(key) {
  return __async(this, null, function* () {
    const db = yield getDBPromise();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const result = event.target.result;
        if (result) {
          resolve(result.value);
        } else {
          resolve(void 0);
        }
      };
      transaction.onerror = (event) => {
        var _a;
        reject(ERROR_FACTORY.create("storage-get", {
          originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
        }));
      };
    });
  });
}
function computeKey(app) {
  return `${app.options.appId}-${app.name}`;
}
var logger = new Logger("@firebase/app-check");
function readTokenFromStorage(app) {
  return __async(this, null, function* () {
    if (isIndexedDBAvailable()) {
      let token = void 0;
      try {
        token = yield readTokenFromIndexedDB(app);
      } catch (e) {
        logger.warn(`Failed to read token from IndexedDB. Error: ${e}`);
      }
      return token;
    }
    return void 0;
  });
}
function writeTokenToStorage(app, token) {
  if (isIndexedDBAvailable()) {
    return writeTokenToIndexedDB(app, token).catch((e) => {
      logger.warn(`Failed to write token to IndexedDB. Error: ${e}`);
    });
  }
  return Promise.resolve();
}
function readOrCreateDebugTokenFromStorage() {
  return __async(this, null, function* () {
    let existingDebugToken = void 0;
    try {
      existingDebugToken = yield readDebugTokenFromIndexedDB();
    } catch (_e) {
    }
    if (!existingDebugToken) {
      const newToken = uuidv4();
      writeDebugTokenToIndexedDB(newToken).catch((e) => logger.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`));
      return newToken;
    } else {
      return existingDebugToken;
    }
  });
}
function isDebugMode() {
  const debugState = getDebugState();
  return debugState.enabled;
}
function getDebugToken() {
  return __async(this, null, function* () {
    const state = getDebugState();
    if (state.enabled && state.token) {
      return state.token.promise;
    } else {
      throw Error(`
            Can't get debug token in production mode.
        `);
    }
  });
}
function initializeDebugMode() {
  const globals = getGlobal();
  const debugState = getDebugState();
  debugState.initialized = true;
  if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== "string" && globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== true) {
    return;
  }
  debugState.enabled = true;
  const deferredToken = new Deferred();
  debugState.token = deferredToken;
  if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN === "string") {
    deferredToken.resolve(globals.FIREBASE_APPCHECK_DEBUG_TOKEN);
  } else {
    deferredToken.resolve(readOrCreateDebugTokenFromStorage());
  }
}
var defaultTokenErrorData = {
  error: "UNKNOWN_ERROR"
};
function formatDummyToken(tokenErrorData) {
  return base64.encodeString(
    JSON.stringify(tokenErrorData),
    /* webSafe= */
    false
  );
}
function getToken$2(appCheck, forceRefresh = false) {
  return __async(this, null, function* () {
    const app = appCheck.app;
    ensureActivated(app);
    const state = getStateReference(app);
    let token = state.token;
    let error = void 0;
    if (token && !isValid(token)) {
      state.token = void 0;
      token = void 0;
    }
    if (!token) {
      const cachedToken = yield state.cachedTokenPromise;
      if (cachedToken) {
        if (isValid(cachedToken)) {
          token = cachedToken;
        } else {
          yield writeTokenToStorage(app, void 0);
        }
      }
    }
    if (!forceRefresh && token && isValid(token)) {
      return {
        token: token.token
      };
    }
    let shouldCallListeners = false;
    if (isDebugMode()) {
      if (!state.exchangeTokenPromise) {
        state.exchangeTokenPromise = exchangeToken(getExchangeDebugTokenRequest(app, yield getDebugToken()), appCheck.heartbeatServiceProvider).finally(() => {
          state.exchangeTokenPromise = void 0;
        });
        shouldCallListeners = true;
      }
      const tokenFromDebugExchange = yield state.exchangeTokenPromise;
      yield writeTokenToStorage(app, tokenFromDebugExchange);
      state.token = tokenFromDebugExchange;
      return {
        token: tokenFromDebugExchange.token
      };
    }
    try {
      if (!state.exchangeTokenPromise) {
        state.exchangeTokenPromise = state.provider.getToken().finally(() => {
          state.exchangeTokenPromise = void 0;
        });
        shouldCallListeners = true;
      }
      token = yield getStateReference(app).exchangeTokenPromise;
    } catch (e) {
      if (e.code === `appCheck/${"throttled"}`) {
        logger.warn(e.message);
      } else {
        logger.error(e);
      }
      error = e;
    }
    let interopTokenResult;
    if (!token) {
      interopTokenResult = makeDummyTokenResult(error);
    } else if (error) {
      if (isValid(token)) {
        interopTokenResult = {
          token: token.token,
          internalError: error
        };
      } else {
        interopTokenResult = makeDummyTokenResult(error);
      }
    } else {
      interopTokenResult = {
        token: token.token
      };
      state.token = token;
      yield writeTokenToStorage(app, token);
    }
    if (shouldCallListeners) {
      notifyTokenListeners(app, interopTokenResult);
    }
    return interopTokenResult;
  });
}
function getLimitedUseToken$1(appCheck) {
  return __async(this, null, function* () {
    const app = appCheck.app;
    ensureActivated(app);
    const {
      provider
    } = getStateReference(app);
    if (isDebugMode()) {
      const debugToken = yield getDebugToken();
      const {
        token
      } = yield exchangeToken(getExchangeDebugTokenRequest(app, debugToken), appCheck.heartbeatServiceProvider);
      return {
        token
      };
    } else {
      const {
        token
      } = yield provider.getToken();
      return {
        token
      };
    }
  });
}
function addTokenListener(appCheck, type, listener, onError) {
  const {
    app
  } = appCheck;
  const state = getStateReference(app);
  const tokenObserver = {
    next: listener,
    error: onError,
    type
  };
  state.tokenObservers = [...state.tokenObservers, tokenObserver];
  if (state.token && isValid(state.token)) {
    const validToken = state.token;
    Promise.resolve().then(() => {
      listener({
        token: validToken.token
      });
      initTokenRefresher(appCheck);
    }).catch(() => {
    });
  }
  void state.cachedTokenPromise.then(() => initTokenRefresher(appCheck));
}
function removeTokenListener(app, listener) {
  const state = getStateReference(app);
  const newObservers = state.tokenObservers.filter((tokenObserver) => tokenObserver.next !== listener);
  if (newObservers.length === 0 && state.tokenRefresher && state.tokenRefresher.isRunning()) {
    state.tokenRefresher.stop();
  }
  state.tokenObservers = newObservers;
}
function initTokenRefresher(appCheck) {
  const {
    app
  } = appCheck;
  const state = getStateReference(app);
  let refresher = state.tokenRefresher;
  if (!refresher) {
    refresher = createTokenRefresher(appCheck);
    state.tokenRefresher = refresher;
  }
  if (!refresher.isRunning() && state.isTokenAutoRefreshEnabled) {
    refresher.start();
  }
}
function createTokenRefresher(appCheck) {
  const {
    app
  } = appCheck;
  return new Refresher(
    // Keep in mind when this fails for any reason other than the ones
    // for which we should retry, it will effectively stop the proactive refresh.
    () => __async(this, null, function* () {
      const state = getStateReference(app);
      let result;
      if (!state.token) {
        result = yield getToken$2(appCheck);
      } else {
        result = yield getToken$2(appCheck, true);
      }
      if (result.error) {
        throw result.error;
      }
      if (result.internalError) {
        throw result.internalError;
      }
    }),
    () => {
      return true;
    },
    () => {
      const state = getStateReference(app);
      if (state.token) {
        let nextRefreshTimeMillis = state.token.issuedAtTimeMillis + (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) * 0.5 + 5 * 60 * 1e3;
        const latestAllowableRefresh = state.token.expireTimeMillis - 5 * 60 * 1e3;
        nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
        return Math.max(0, nextRefreshTimeMillis - Date.now());
      } else {
        return 0;
      }
    },
    TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT,
    TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT
  );
}
function notifyTokenListeners(app, token) {
  const observers = getStateReference(app).tokenObservers;
  for (const observer of observers) {
    try {
      if (observer.type === "EXTERNAL" && token.error != null) {
        observer.error(token.error);
      } else {
        observer.next(token);
      }
    } catch (e) {
    }
  }
}
function isValid(token) {
  return token.expireTimeMillis - Date.now() > 0;
}
function makeDummyTokenResult(error) {
  return {
    token: formatDummyToken(defaultTokenErrorData),
    error
  };
}
var AppCheckService = class {
  constructor(app, heartbeatServiceProvider) {
    this.app = app;
    this.heartbeatServiceProvider = heartbeatServiceProvider;
  }
  _delete() {
    const {
      tokenObservers
    } = getStateReference(this.app);
    for (const tokenObserver of tokenObservers) {
      removeTokenListener(this.app, tokenObserver.next);
    }
    return Promise.resolve();
  }
};
function factory(app, heartbeatServiceProvider) {
  return new AppCheckService(app, heartbeatServiceProvider);
}
function internalFactory(appCheck) {
  return {
    getToken: (forceRefresh) => getToken$2(appCheck, forceRefresh),
    getLimitedUseToken: () => getLimitedUseToken$1(appCheck),
    addTokenListener: (listener) => addTokenListener(appCheck, "INTERNAL", listener),
    removeTokenListener: (listener) => removeTokenListener(appCheck.app, listener)
  };
}
var name = "@firebase/app-check";
var version = "0.8.8";
function initializeAppCheck(app = getApp(), options) {
  app = getModularInstance(app);
  const provider = _getProvider(app, "app-check");
  if (!getDebugState().initialized) {
    initializeDebugMode();
  }
  if (isDebugMode()) {
    void getDebugToken().then((token) => (
      // Not using logger because I don't think we ever want this accidentally hidden.
      console.log(`App Check debug token: ${token}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)
    ));
  }
  if (provider.isInitialized()) {
    const existingInstance = provider.getImmediate();
    const initialOptions = provider.getOptions();
    if (initialOptions.isTokenAutoRefreshEnabled === options.isTokenAutoRefreshEnabled && initialOptions.provider.isEqual(options.provider)) {
      return existingInstance;
    } else {
      throw ERROR_FACTORY.create("already-initialized", {
        appName: app.name
      });
    }
  }
  const appCheck = provider.initialize({
    options
  });
  _activate(app, options.provider, options.isTokenAutoRefreshEnabled);
  if (getStateReference(app).isTokenAutoRefreshEnabled) {
    addTokenListener(appCheck, "INTERNAL", () => {
    });
  }
  return appCheck;
}
function _activate(app, provider, isTokenAutoRefreshEnabled) {
  const state = setInitialState(app, Object.assign({}, DEFAULT_STATE));
  state.activated = true;
  state.provider = provider;
  state.cachedTokenPromise = readTokenFromStorage(app).then((cachedToken) => {
    if (cachedToken && isValid(cachedToken)) {
      state.token = cachedToken;
      notifyTokenListeners(app, {
        token: cachedToken.token
      });
    }
    return cachedToken;
  });
  state.isTokenAutoRefreshEnabled = isTokenAutoRefreshEnabled === void 0 ? app.automaticDataCollectionEnabled : isTokenAutoRefreshEnabled;
  state.provider.initialize(app);
}
function setTokenAutoRefreshEnabled(appCheckInstance, isTokenAutoRefreshEnabled) {
  const app = appCheckInstance.app;
  const state = getStateReference(app);
  if (state.tokenRefresher) {
    if (isTokenAutoRefreshEnabled === true) {
      state.tokenRefresher.start();
    } else {
      state.tokenRefresher.stop();
    }
  }
  state.isTokenAutoRefreshEnabled = isTokenAutoRefreshEnabled;
}
function getToken(appCheckInstance, forceRefresh) {
  return __async(this, null, function* () {
    const result = yield getToken$2(appCheckInstance, forceRefresh);
    if (result.error) {
      throw result.error;
    }
    return {
      token: result.token
    };
  });
}
function getLimitedUseToken(appCheckInstance) {
  return getLimitedUseToken$1(appCheckInstance);
}
function onTokenChanged(appCheckInstance, onNextOrObserver, onError, onCompletion) {
  let nextFn = () => {
  };
  let errorFn = () => {
  };
  if (onNextOrObserver.next != null) {
    nextFn = onNextOrObserver.next.bind(onNextOrObserver);
  } else {
    nextFn = onNextOrObserver;
  }
  if (onNextOrObserver.error != null) {
    errorFn = onNextOrObserver.error.bind(onNextOrObserver);
  } else if (onError) {
    errorFn = onError;
  }
  addTokenListener(appCheckInstance, "EXTERNAL", nextFn, errorFn);
  return () => removeTokenListener(appCheckInstance.app, nextFn);
}
var APP_CHECK_NAME = "app-check";
var APP_CHECK_NAME_INTERNAL = "app-check-internal";
function registerAppCheck() {
  _registerComponent(new Component(
    APP_CHECK_NAME,
    (container) => {
      const app = container.getProvider("app").getImmediate();
      const heartbeatServiceProvider = container.getProvider("heartbeat");
      return factory(app, heartbeatServiceProvider);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setInstantiationMode(
    "EXPLICIT"
    /* InstantiationMode.EXPLICIT */
  ).setInstanceCreatedCallback((container, _identifier, _appcheckService) => {
    container.getProvider(APP_CHECK_NAME_INTERNAL).initialize();
  }));
  _registerComponent(new Component(
    APP_CHECK_NAME_INTERNAL,
    (container) => {
      const appCheck = container.getProvider("app-check").getImmediate();
      return internalFactory(appCheck);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setInstantiationMode(
    "EXPLICIT"
    /* InstantiationMode.EXPLICIT */
  ));
  registerVersion(name, version);
}
registerAppCheck();

// node_modules/@angular/fire/fesm2022/angular-fire-app-check.mjs
var AppCheck = class {
  constructor(appCheck) {
    return appCheck;
  }
};
var appCheckInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(ɵAPP_CHECK_PROVIDER_NAME))), distinct());
var PROVIDED_APP_CHECK_INSTANCES = new InjectionToken("angularfire2.app-check-instances");
function defaultAppCheckInstanceFactory(provided, defaultApp) {
  const defaultAppCheck = ɵgetDefaultInstanceOf(ɵAPP_CHECK_PROVIDER_NAME, provided, defaultApp);
  return defaultAppCheck && new AppCheck(defaultAppCheck);
}
var LOCALHOSTS = ["localhost", "0.0.0.0", "127.0.0.1"];
var isLocalhost = typeof window !== "undefined" && LOCALHOSTS.includes(window.location.hostname);
var APP_CHECK_INSTANCES_PROVIDER = {
  provide: ɵAppCheckInstances,
  deps: [[new Optional(), PROVIDED_APP_CHECK_INSTANCES]]
};
var DEFAULT_APP_CHECK_INSTANCE_PROVIDER = {
  provide: AppCheck,
  useFactory: defaultAppCheckInstanceFactory,
  deps: [[new Optional(), PROVIDED_APP_CHECK_INSTANCES], FirebaseApp, PLATFORM_ID]
};
var AppCheckModule = class _AppCheckModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "app-check");
  }
  static ɵfac = function AppCheckModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppCheckModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AppCheckModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_APP_CHECK_INSTANCE_PROVIDER, APP_CHECK_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppCheckModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_APP_CHECK_INSTANCE_PROVIDER, APP_CHECK_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
var getLimitedUseToken2 = ɵzoneWrap(getLimitedUseToken, true);
var getToken2 = ɵzoneWrap(getToken, true);
var initializeAppCheck2 = ɵzoneWrap(initializeAppCheck, true);
var onTokenChanged2 = ɵzoneWrap(onTokenChanged, true);
var setTokenAutoRefreshEnabled2 = ɵzoneWrap(setTokenAutoRefreshEnabled, true);

// node_modules/@angular/fire/fesm2022/angular-fire-compat-auth.mjs
var proxyPolyfillCompat = {
  name: null,
  config: null,
  emulatorConfig: null,
  app: null,
  applyActionCode: null,
  checkActionCode: null,
  confirmPasswordReset: null,
  createUserWithEmailAndPassword: null,
  currentUser: null,
  fetchSignInMethodsForEmail: null,
  isSignInWithEmailLink: null,
  getRedirectResult: null,
  languageCode: null,
  settings: null,
  onAuthStateChanged: null,
  onIdTokenChanged: null,
  sendSignInLinkToEmail: null,
  sendPasswordResetEmail: null,
  setPersistence: null,
  signInAndRetrieveDataWithCredential: null,
  signInAnonymously: null,
  signInWithCredential: null,
  signInWithCustomToken: null,
  signInWithEmailAndPassword: null,
  signInWithPhoneNumber: null,
  signInWithEmailLink: null,
  signInWithPopup: null,
  signInWithRedirect: null,
  signOut: null,
  tenantId: null,
  updateCurrentUser: null,
  useDeviceLanguage: null,
  useEmulator: null,
  verifyPasswordResetCode: null
};
var USE_EMULATOR = new InjectionToken("angularfire2.auth.use-emulator");
var SETTINGS = new InjectionToken("angularfire2.auth.settings");
var TENANT_ID = new InjectionToken("angularfire2.auth.tenant-id");
var LANGUAGE_CODE = new InjectionToken("angularfire2.auth.langugage-code");
var USE_DEVICE_LANGUAGE = new InjectionToken("angularfire2.auth.use-device-language");
var PERSISTENCE = new InjectionToken("angularfire.auth.persistence");
var ɵauthFactory = (app, zone, useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence) => ɵcacheInstance(`${app.name}.auth`, "AngularFireAuth", app.name, () => {
  const auth = zone.runOutsideAngular(() => app.auth());
  if (useEmulator) {
    auth.useEmulator(...useEmulator);
  }
  if (tenantId) {
    auth.tenantId = tenantId;
  }
  auth.languageCode = languageCode;
  if (useDeviceLanguage) {
    auth.useDeviceLanguage();
  }
  if (settings) {
    for (const [k, v] of Object.entries(settings)) {
      auth.settings[k] = v;
    }
  }
  if (persistence) {
    auth.setPersistence(persistence);
  }
  return auth;
}, [useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence]);
var AngularFireAuth = class _AngularFireAuth {
  /**
   * Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out
   */
  authState;
  /**
   * Observable of the currently signed-in user's JWT token used to identify the user to a Firebase service (or null).
   */
  idToken;
  /**
   * Observable of the currently signed-in user (or null).
   */
  user;
  /**
   * Observable of the currently signed-in user's IdTokenResult object which contains the ID token JWT string and other
   * helper properties for getting different data associated with the token as well as all the decoded payload claims
   * (or null).
   */
  idTokenResult;
  /**
   * Observable of the currently signed-in user's credential, or null
   */
  credential;
  constructor(options, name3, platformId, zone, schedulers, useEmulator, settings, tenantId, languageCode, useDeviceLanguage, persistence, _appCheckInstances) {
    const logins = new Subject();
    const auth = of(void 0).pipe(observeOn(schedulers.outsideAngular), switchMap(() => zone.runOutsideAngular(() => import("./index.esm-YRWDDI2F.js"))), map(() => ɵfirebaseAppFactory(options, zone, name3)), map((app) => ɵauthFactory(app, zone, useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence)), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    if (isPlatformServer(platformId)) {
      this.authState = this.user = this.idToken = this.idTokenResult = this.credential = of(null);
    } else {
      auth.pipe(first()).subscribe();
      const redirectResult = auth.pipe(switchMap((auth2) => auth2.getRedirectResult().then((it) => it, () => null)), keepUnstableUntilFirst, shareReplay({
        bufferSize: 1,
        refCount: false
      }));
      const authStateChanged = auth.pipe(switchMap((auth2) => new Observable((sub) => ({
        unsubscribe: zone.runOutsideAngular(() => auth2.onAuthStateChanged((next) => sub.next(next), (err) => sub.error(err), () => sub.complete()))
      }))));
      const idTokenChanged = auth.pipe(switchMap((auth2) => new Observable((sub) => ({
        unsubscribe: zone.runOutsideAngular(() => auth2.onIdTokenChanged((next) => sub.next(next), (err) => sub.error(err), () => sub.complete()))
      }))));
      this.authState = redirectResult.pipe(switchMapTo(authStateChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
      this.user = redirectResult.pipe(switchMapTo(idTokenChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
      this.idToken = this.user.pipe(switchMap((user) => user ? from(user.getIdToken()) : of(null)));
      this.idTokenResult = this.user.pipe(switchMap((user) => user ? from(user.getIdTokenResult()) : of(null)));
      this.credential = merge(
        redirectResult,
        logins,
        // pipe in null authState to make credential zipable, just a weird devexp if
        // authState and user go null to still have a credential
        this.authState.pipe(filter((it) => !it))
      ).pipe(
        // handle the { user: { } } when a user is already logged in, rather have null
        // TODO handle the type corcersion better
        map((credential) => credential?.user ? credential : null),
        subscribeOn(schedulers.outsideAngular),
        observeOn(schedulers.insideAngular)
      );
    }
    return ɵlazySDKProxy(this, auth, zone, {
      spy: {
        apply: (name4, _, val) => {
          if (name4.startsWith("signIn") || name4.startsWith("createUser")) {
            val.then((user) => logins.next(user));
          }
        }
      }
    });
  }
  static ɵfac = function AngularFireAuth_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireAuth)(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(ɵAngularFireSchedulers), ɵɵinject(USE_EMULATOR, 8), ɵɵinject(SETTINGS, 8), ɵɵinject(TENANT_ID, 8), ɵɵinject(LANGUAGE_CODE, 8), ɵɵinject(USE_DEVICE_LANGUAGE, 8), ɵɵinject(PERSISTENCE, 8), ɵɵinject(ɵAppCheckInstances, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AngularFireAuth,
    factory: _AngularFireAuth.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireAuth, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [FIREBASE_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [FIREBASE_APP_NAME]
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }, {
    type: ɵAngularFireSchedulers
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [SETTINGS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [TENANT_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [LANGUAGE_CODE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_DEVICE_LANGUAGE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [PERSISTENCE]
    }]
  }, {
    type: ɵAppCheckInstances,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
ɵapplyMixins(AngularFireAuth, [proxyPolyfillCompat]);
var AngularFireAuthModule = class _AngularFireAuthModule {
  constructor() {
    firebase.registerVersion("angularfire", VERSION.full, "auth-compat");
  }
  static ɵfac = function AngularFireAuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireAuthModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularFireAuthModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AngularFireAuth]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireAuthModule, [{
    type: NgModule,
    args: [{
      providers: [AngularFireAuth]
    }]
  }], () => [], null);
})();

// node_modules/@firebase/database-compat/dist/index.esm2017.js
var name2 = "@firebase/database-compat";
var version2 = "1.0.8";
var logClient = new Logger("@firebase/database-compat");
var warn = function(msg) {
  const message = "FIREBASE WARNING: " + msg;
  logClient.warn(message);
};
var validateBoolean = function(fnName, argumentName, bool, optional) {
  if (optional && bool === void 0) {
    return;
  }
  if (typeof bool !== "boolean") {
    throw new Error(errorPrefix(fnName, argumentName) + "must be a boolean.");
  }
};
var validateEventType = function(fnName, eventType, optional) {
  if (optional && eventType === void 0) {
    return;
  }
  switch (eventType) {
    case "value":
    case "child_added":
    case "child_removed":
    case "child_changed":
    case "child_moved":
      break;
    default:
      throw new Error(errorPrefix(fnName, "eventType") + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".');
  }
};
var OnDisconnect2 = class {
  constructor(_delegate) {
    this._delegate = _delegate;
  }
  cancel(onComplete) {
    validateArgCount("OnDisconnect.cancel", 0, 1, arguments.length);
    validateCallback("OnDisconnect.cancel", "onComplete", onComplete, true);
    const result = this._delegate.cancel();
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  remove(onComplete) {
    validateArgCount("OnDisconnect.remove", 0, 1, arguments.length);
    validateCallback("OnDisconnect.remove", "onComplete", onComplete, true);
    const result = this._delegate.remove();
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  set(value, onComplete) {
    validateArgCount("OnDisconnect.set", 1, 2, arguments.length);
    validateCallback("OnDisconnect.set", "onComplete", onComplete, true);
    const result = this._delegate.set(value);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  setWithPriority(value, priority, onComplete) {
    validateArgCount("OnDisconnect.setWithPriority", 2, 3, arguments.length);
    validateCallback("OnDisconnect.setWithPriority", "onComplete", onComplete, true);
    const result = this._delegate.setWithPriority(value, priority);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  update(objectToMerge, onComplete) {
    validateArgCount("OnDisconnect.update", 1, 2, arguments.length);
    if (Array.isArray(objectToMerge)) {
      const newObjectToMerge = {};
      for (let i = 0; i < objectToMerge.length; ++i) {
        newObjectToMerge["" + i] = objectToMerge[i];
      }
      objectToMerge = newObjectToMerge;
      warn("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
    }
    validateCallback("OnDisconnect.update", "onComplete", onComplete, true);
    const result = this._delegate.update(objectToMerge);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
};
var TransactionResult = class {
  /**
   * A type for the resolve value of Firebase.transaction.
   */
  constructor(committed, snapshot) {
    this.committed = committed;
    this.snapshot = snapshot;
  }
  // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
  // for end-users
  toJSON() {
    validateArgCount("TransactionResult.toJSON", 0, 1, arguments.length);
    return {
      committed: this.committed,
      snapshot: this.snapshot.toJSON()
    };
  }
};
var DataSnapshot = class _DataSnapshot {
  constructor(_database, _delegate) {
    this._database = _database;
    this._delegate = _delegate;
  }
  /**
   * Retrieves the snapshot contents as JSON.  Returns null if the snapshot is
   * empty.
   *
   * @returns JSON representation of the DataSnapshot contents, or null if empty.
   */
  val() {
    validateArgCount("DataSnapshot.val", 0, 0, arguments.length);
    return this._delegate.val();
  }
  /**
   * Returns the snapshot contents as JSON, including priorities of node.  Suitable for exporting
   * the entire node contents.
   * @returns JSON representation of the DataSnapshot contents, or null if empty.
   */
  exportVal() {
    validateArgCount("DataSnapshot.exportVal", 0, 0, arguments.length);
    return this._delegate.exportVal();
  }
  // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
  // for end-users
  toJSON() {
    validateArgCount("DataSnapshot.toJSON", 0, 1, arguments.length);
    return this._delegate.toJSON();
  }
  /**
   * Returns whether the snapshot contains a non-null value.
   *
   * @returns Whether the snapshot contains a non-null value, or is empty.
   */
  exists() {
    validateArgCount("DataSnapshot.exists", 0, 0, arguments.length);
    return this._delegate.exists();
  }
  /**
   * Returns a DataSnapshot of the specified child node's contents.
   *
   * @param path - Path to a child.
   * @returns DataSnapshot for child node.
   */
  child(path) {
    validateArgCount("DataSnapshot.child", 0, 1, arguments.length);
    path = String(path);
    validatePathString("DataSnapshot.child", "path", path, false);
    return new _DataSnapshot(this._database, this._delegate.child(path));
  }
  /**
   * Returns whether the snapshot contains a child at the specified path.
   *
   * @param path - Path to a child.
   * @returns Whether the child exists.
   */
  hasChild(path) {
    validateArgCount("DataSnapshot.hasChild", 1, 1, arguments.length);
    validatePathString("DataSnapshot.hasChild", "path", path, false);
    return this._delegate.hasChild(path);
  }
  /**
   * Returns the priority of the object, or null if no priority was set.
   *
   * @returns The priority.
   */
  getPriority() {
    validateArgCount("DataSnapshot.getPriority", 0, 0, arguments.length);
    return this._delegate.priority;
  }
  /**
   * Iterates through child nodes and calls the specified action for each one.
   *
   * @param action - Callback function to be called
   * for each child.
   * @returns True if forEach was canceled by action returning true for
   * one of the child nodes.
   */
  forEach(action) {
    validateArgCount("DataSnapshot.forEach", 1, 1, arguments.length);
    validateCallback("DataSnapshot.forEach", "action", action, false);
    return this._delegate.forEach((expDataSnapshot) => action(new _DataSnapshot(this._database, expDataSnapshot)));
  }
  /**
   * Returns whether this DataSnapshot has children.
   * @returns True if the DataSnapshot contains 1 or more child nodes.
   */
  hasChildren() {
    validateArgCount("DataSnapshot.hasChildren", 0, 0, arguments.length);
    return this._delegate.hasChildren();
  }
  get key() {
    return this._delegate.key;
  }
  /**
   * Returns the number of children for this DataSnapshot.
   * @returns The number of children that this DataSnapshot contains.
   */
  numChildren() {
    validateArgCount("DataSnapshot.numChildren", 0, 0, arguments.length);
    return this._delegate.size;
  }
  /**
   * @returns The Firebase reference for the location this snapshot's data came
   * from.
   */
  getRef() {
    validateArgCount("DataSnapshot.ref", 0, 0, arguments.length);
    return new Reference(this._database, this._delegate.ref);
  }
  get ref() {
    return this.getRef();
  }
};
var Query = class _Query {
  constructor(database, _delegate) {
    this.database = database;
    this._delegate = _delegate;
  }
  on(eventType, callback, cancelCallbackOrContext, context) {
    var _a;
    validateArgCount("Query.on", 2, 4, arguments.length);
    validateCallback("Query.on", "callback", callback, false);
    const ret = _Query.getCancelAndContextArgs_("Query.on", cancelCallbackOrContext, context);
    const valueCallback = (expSnapshot, previousChildName) => {
      callback.call(ret.context, new DataSnapshot(this.database, expSnapshot), previousChildName);
    };
    valueCallback.userCallback = callback;
    valueCallback.context = ret.context;
    const cancelCallback = (_a = ret.cancel) === null || _a === void 0 ? void 0 : _a.bind(ret.context);
    switch (eventType) {
      case "value":
        onValue(this._delegate, valueCallback, cancelCallback);
        return callback;
      case "child_added":
        onChildAdded(this._delegate, valueCallback, cancelCallback);
        return callback;
      case "child_removed":
        onChildRemoved(this._delegate, valueCallback, cancelCallback);
        return callback;
      case "child_changed":
        onChildChanged(this._delegate, valueCallback, cancelCallback);
        return callback;
      case "child_moved":
        onChildMoved(this._delegate, valueCallback, cancelCallback);
        return callback;
      default:
        throw new Error(errorPrefix("Query.on", "eventType") + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".');
    }
  }
  off(eventType, callback, context) {
    validateArgCount("Query.off", 0, 3, arguments.length);
    validateEventType("Query.off", eventType, true);
    validateCallback("Query.off", "callback", callback, true);
    validateContextObject("Query.off", "context", context, true);
    if (callback) {
      const valueCallback = () => {
      };
      valueCallback.userCallback = callback;
      valueCallback.context = context;
      off(this._delegate, eventType, valueCallback);
    } else {
      off(this._delegate, eventType);
    }
  }
  /**
   * Get the server-value for this query, or return a cached value if not connected.
   */
  get() {
    return get(this._delegate).then((expSnapshot) => {
      return new DataSnapshot(this.database, expSnapshot);
    });
  }
  /**
   * Attaches a listener, waits for the first event, and then removes the listener
   */
  once(eventType, callback, failureCallbackOrContext, context) {
    validateArgCount("Query.once", 1, 4, arguments.length);
    validateCallback("Query.once", "callback", callback, true);
    const ret = _Query.getCancelAndContextArgs_("Query.once", failureCallbackOrContext, context);
    const deferred = new Deferred();
    const valueCallback = (expSnapshot, previousChildName) => {
      const result = new DataSnapshot(this.database, expSnapshot);
      if (callback) {
        callback.call(ret.context, result, previousChildName);
      }
      deferred.resolve(result);
    };
    valueCallback.userCallback = callback;
    valueCallback.context = ret.context;
    const cancelCallback = (error) => {
      if (ret.cancel) {
        ret.cancel.call(ret.context, error);
      }
      deferred.reject(error);
    };
    switch (eventType) {
      case "value":
        onValue(this._delegate, valueCallback, cancelCallback, {
          onlyOnce: true
        });
        break;
      case "child_added":
        onChildAdded(this._delegate, valueCallback, cancelCallback, {
          onlyOnce: true
        });
        break;
      case "child_removed":
        onChildRemoved(this._delegate, valueCallback, cancelCallback, {
          onlyOnce: true
        });
        break;
      case "child_changed":
        onChildChanged(this._delegate, valueCallback, cancelCallback, {
          onlyOnce: true
        });
        break;
      case "child_moved":
        onChildMoved(this._delegate, valueCallback, cancelCallback, {
          onlyOnce: true
        });
        break;
      default:
        throw new Error(errorPrefix("Query.once", "eventType") + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".');
    }
    return deferred.promise;
  }
  /**
   * Set a limit and anchor it to the start of the window.
   */
  limitToFirst(limit) {
    validateArgCount("Query.limitToFirst", 1, 1, arguments.length);
    return new _Query(this.database, query(this._delegate, limitToFirst(limit)));
  }
  /**
   * Set a limit and anchor it to the end of the window.
   */
  limitToLast(limit) {
    validateArgCount("Query.limitToLast", 1, 1, arguments.length);
    return new _Query(this.database, query(this._delegate, limitToLast(limit)));
  }
  /**
   * Given a child path, return a new query ordered by the specified grandchild path.
   */
  orderByChild(path) {
    validateArgCount("Query.orderByChild", 1, 1, arguments.length);
    return new _Query(this.database, query(this._delegate, orderByChild(path)));
  }
  /**
   * Return a new query ordered by the KeyIndex
   */
  orderByKey() {
    validateArgCount("Query.orderByKey", 0, 0, arguments.length);
    return new _Query(this.database, query(this._delegate, orderByKey()));
  }
  /**
   * Return a new query ordered by the PriorityIndex
   */
  orderByPriority() {
    validateArgCount("Query.orderByPriority", 0, 0, arguments.length);
    return new _Query(this.database, query(this._delegate, orderByPriority()));
  }
  /**
   * Return a new query ordered by the ValueIndex
   */
  orderByValue() {
    validateArgCount("Query.orderByValue", 0, 0, arguments.length);
    return new _Query(this.database, query(this._delegate, orderByValue()));
  }
  startAt(value = null, name3) {
    validateArgCount("Query.startAt", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, startAt(value, name3)));
  }
  startAfter(value = null, name3) {
    validateArgCount("Query.startAfter", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, startAfter(value, name3)));
  }
  endAt(value = null, name3) {
    validateArgCount("Query.endAt", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, endAt(value, name3)));
  }
  endBefore(value = null, name3) {
    validateArgCount("Query.endBefore", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, endBefore(value, name3)));
  }
  /**
   * Load the selection of children with exactly the specified value, and, optionally,
   * the specified name.
   */
  equalTo(value, name3) {
    validateArgCount("Query.equalTo", 1, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, equalTo(value, name3)));
  }
  /**
   * @returns URL for this location.
   */
  toString() {
    validateArgCount("Query.toString", 0, 0, arguments.length);
    return this._delegate.toString();
  }
  // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
  // for end-users.
  toJSON() {
    validateArgCount("Query.toJSON", 0, 1, arguments.length);
    return this._delegate.toJSON();
  }
  /**
   * Return true if this query and the provided query are equivalent; otherwise, return false.
   */
  isEqual(other) {
    validateArgCount("Query.isEqual", 1, 1, arguments.length);
    if (!(other instanceof _Query)) {
      const error = "Query.isEqual failed: First argument must be an instance of firebase.database.Query.";
      throw new Error(error);
    }
    return this._delegate.isEqual(other._delegate);
  }
  /**
   * Helper used by .on and .once to extract the context and or cancel arguments.
   * @param fnName - The function name (on or once)
   *
   */
  static getCancelAndContextArgs_(fnName, cancelOrContext, context) {
    const ret = {
      cancel: void 0,
      context: void 0
    };
    if (cancelOrContext && context) {
      ret.cancel = cancelOrContext;
      validateCallback(fnName, "cancel", ret.cancel, true);
      ret.context = context;
      validateContextObject(fnName, "context", ret.context, true);
    } else if (cancelOrContext) {
      if (typeof cancelOrContext === "object" && cancelOrContext !== null) {
        ret.context = cancelOrContext;
      } else if (typeof cancelOrContext === "function") {
        ret.cancel = cancelOrContext;
      } else {
        throw new Error(errorPrefix(fnName, "cancelOrContext") + " must either be a cancel callback or a context object.");
      }
    }
    return ret;
  }
  get ref() {
    return new Reference(this.database, new ReferenceImpl(this._delegate._repo, this._delegate._path));
  }
};
var Reference = class _Reference extends Query {
  /**
   * Call options:
   *   new Reference(Repo, Path) or
   *   new Reference(url: string, string|RepoManager)
   *
   * Externally - this is the firebase.database.Reference type.
   */
  constructor(database, _delegate) {
    super(database, new QueryImpl(_delegate._repo, _delegate._path, new QueryParams(), false));
    this.database = database;
    this._delegate = _delegate;
  }
  /** @returns {?string} */
  getKey() {
    validateArgCount("Reference.key", 0, 0, arguments.length);
    return this._delegate.key;
  }
  child(pathString) {
    validateArgCount("Reference.child", 1, 1, arguments.length);
    if (typeof pathString === "number") {
      pathString = String(pathString);
    }
    return new _Reference(this.database, child(this._delegate, pathString));
  }
  /** @returns {?Reference} */
  getParent() {
    validateArgCount("Reference.parent", 0, 0, arguments.length);
    const parent = this._delegate.parent;
    return parent ? new _Reference(this.database, parent) : null;
  }
  /** @returns {!Reference} */
  getRoot() {
    validateArgCount("Reference.root", 0, 0, arguments.length);
    return new _Reference(this.database, this._delegate.root);
  }
  set(newVal, onComplete) {
    validateArgCount("Reference.set", 1, 2, arguments.length);
    validateCallback("Reference.set", "onComplete", onComplete, true);
    const result = set(this._delegate, newVal);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  update(values, onComplete) {
    validateArgCount("Reference.update", 1, 2, arguments.length);
    if (Array.isArray(values)) {
      const newObjectToMerge = {};
      for (let i = 0; i < values.length; ++i) {
        newObjectToMerge["" + i] = values[i];
      }
      values = newObjectToMerge;
      warn("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
    }
    validateWritablePath("Reference.update", this._delegate._path);
    validateCallback("Reference.update", "onComplete", onComplete, true);
    const result = update(this._delegate, values);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  setWithPriority(newVal, newPriority, onComplete) {
    validateArgCount("Reference.setWithPriority", 2, 3, arguments.length);
    validateCallback("Reference.setWithPriority", "onComplete", onComplete, true);
    const result = setWithPriority(this._delegate, newVal, newPriority);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  remove(onComplete) {
    validateArgCount("Reference.remove", 0, 1, arguments.length);
    validateCallback("Reference.remove", "onComplete", onComplete, true);
    const result = remove(this._delegate);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  transaction(transactionUpdate, onComplete, applyLocally) {
    validateArgCount("Reference.transaction", 1, 3, arguments.length);
    validateCallback("Reference.transaction", "transactionUpdate", transactionUpdate, false);
    validateCallback("Reference.transaction", "onComplete", onComplete, true);
    validateBoolean("Reference.transaction", "applyLocally", applyLocally, true);
    const result = runTransaction(this._delegate, transactionUpdate, {
      applyLocally
    }).then((transactionResult) => new TransactionResult(transactionResult.committed, new DataSnapshot(this.database, transactionResult.snapshot)));
    if (onComplete) {
      result.then((transactionResult) => onComplete(null, transactionResult.committed, transactionResult.snapshot), (error) => onComplete(error, false, null));
    }
    return result;
  }
  setPriority(priority, onComplete) {
    validateArgCount("Reference.setPriority", 1, 2, arguments.length);
    validateCallback("Reference.setPriority", "onComplete", onComplete, true);
    const result = setPriority(this._delegate, priority);
    if (onComplete) {
      result.then(() => onComplete(null), (error) => onComplete(error));
    }
    return result;
  }
  push(value, onComplete) {
    validateArgCount("Reference.push", 0, 2, arguments.length);
    validateCallback("Reference.push", "onComplete", onComplete, true);
    const expPromise = push(this._delegate, value);
    const promise = expPromise.then((expRef) => new _Reference(this.database, expRef));
    if (onComplete) {
      promise.then(() => onComplete(null), (error) => onComplete(error));
    }
    const result = new _Reference(this.database, expPromise);
    result.then = promise.then.bind(promise);
    result.catch = promise.catch.bind(promise, void 0);
    return result;
  }
  onDisconnect() {
    validateWritablePath("Reference.onDisconnect", this._delegate._path);
    return new OnDisconnect2(new OnDisconnect(this._delegate._repo, this._delegate._path));
  }
  get key() {
    return this.getKey();
  }
  get parent() {
    return this.getParent();
  }
  get root() {
    return this.getRoot();
  }
};
var Database = class {
  /**
   * The constructor should not be called by users of our public API.
   */
  constructor(_delegate, app) {
    this._delegate = _delegate;
    this.app = app;
    this.INTERNAL = {
      delete: () => this._delegate._delete(),
      forceWebSockets,
      forceLongPolling
    };
  }
  /**
   * Modify this instance to communicate with the Realtime Database emulator.
   *
   * <p>Note: This method must be called before performing any other operation.
   *
   * @param host - the emulator host (ex: localhost)
   * @param port - the emulator port (ex: 8080)
   * @param options.mockUserToken - the mock auth token to use for unit testing Security Rules
   */
  useEmulator(host, port, options = {}) {
    connectDatabaseEmulator(this._delegate, host, port, options);
  }
  ref(path) {
    validateArgCount("database.ref", 0, 1, arguments.length);
    if (path instanceof Reference) {
      const childRef = refFromURL(this._delegate, path.toString());
      return new Reference(this, childRef);
    } else {
      const childRef = ref(this._delegate, path);
      return new Reference(this, childRef);
    }
  }
  /**
   * Returns a reference to the root or the path specified in url.
   * We throw a exception if the url is not in the same domain as the
   * current repo.
   * @returns Firebase reference.
   */
  refFromURL(url) {
    const apiName = "database.refFromURL";
    validateArgCount(apiName, 1, 1, arguments.length);
    const childRef = refFromURL(this._delegate, url);
    return new Reference(this, childRef);
  }
  // Make individual repo go offline.
  goOffline() {
    validateArgCount("database.goOffline", 0, 0, arguments.length);
    return goOffline(this._delegate);
  }
  goOnline() {
    validateArgCount("database.goOnline", 0, 0, arguments.length);
    return goOnline(this._delegate);
  }
};
Database.ServerValue = {
  TIMESTAMP: serverTimestamp(),
  increment: (delta) => increment(delta)
};
function initStandalone({
  app,
  url,
  version: version3,
  customAuthImpl,
  customAppCheckImpl,
  namespace,
  nodeAdmin = false
}) {
  setSDKVersion(version3);
  const container = new ComponentContainer("database-standalone");
  const authProvider = new Provider("auth-internal", container);
  authProvider.setComponent(new Component(
    "auth-internal",
    () => customAuthImpl,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  let appCheckProvider = void 0;
  if (customAppCheckImpl) {
    appCheckProvider = new Provider("app-check-internal", container);
    appCheckProvider.setComponent(new Component(
      "app-check-internal",
      () => customAppCheckImpl,
      "PRIVATE"
      /* ComponentType.PRIVATE */
    ));
  }
  return {
    instance: new Database(repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin), app),
    namespace
  };
}
var INTERNAL = Object.freeze({
  __proto__: null,
  initStandalone
});
var ServerValue = Database.ServerValue;
function registerDatabase(instance) {
  instance.INTERNAL.registerComponent(new Component(
    "database-compat",
    (container, {
      instanceIdentifier: url
    }) => {
      const app = container.getProvider("app-compat").getImmediate();
      const databaseExp = container.getProvider("database").getImmediate({
        identifier: url
      });
      return new Database(databaseExp, app);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setServiceProps(
    // firebase.database namespace properties
    {
      Reference,
      Query,
      Database,
      DataSnapshot,
      enableLogging,
      INTERNAL,
      ServerValue
    }
  ).setMultipleInstances(true));
  instance.registerVersion(name2, version2);
}
registerDatabase(firebase);

// node_modules/@angular/fire/fesm2022/angular-fire-compat-database.mjs
function fromRef(ref2, event, listenType = "on", scheduler = asyncScheduler) {
  return new Observable((subscriber) => {
    let fn = null;
    fn = ref2[listenType](event, (snapshot, prevKey) => {
      scheduler.schedule(() => {
        subscriber.next({
          snapshot,
          prevKey
        });
      });
      if (listenType === "once") {
        scheduler.schedule(() => subscriber.complete());
      }
    }, (err) => {
      scheduler.schedule(() => subscriber.error(err));
    });
    if (listenType === "on") {
      return {
        unsubscribe() {
          if (fn != null) {
            ref2.off(event, fn);
          }
        }
      };
    } else {
      return {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unsubscribe() {
        }
      };
    }
  }).pipe(map((payload) => {
    const {
      snapshot,
      prevKey
    } = payload;
    let key = null;
    if (snapshot.exists()) {
      key = snapshot.key;
    }
    return {
      type: event,
      payload: snapshot,
      prevKey,
      key
    };
  }), share());
}
function isString(value) {
  return typeof value === "string";
}
function isFirebaseDataSnapshot(value) {
  return typeof value.exportVal === "function";
}
function isNil(obj) {
  return obj === void 0 || obj === null;
}
function isFirebaseRef(value) {
  return typeof value.set === "function";
}
function getRef(database, pathRef) {
  return isFirebaseRef(pathRef) ? pathRef : database.ref(pathRef);
}
function checkOperationCases(item, cases) {
  if (isString(item)) {
    return cases.stringCase();
  } else if (isFirebaseRef(item)) {
    return cases.firebaseCase();
  } else if (isFirebaseDataSnapshot(item)) {
    return cases.snapshotCase();
  }
  throw new Error(`Expects a string, snapshot, or reference. Got: ${typeof item}`);
}
function validateEventsArray(events) {
  if (isNil(events) || events.length === 0) {
    events = ["child_added", "child_removed", "child_changed", "child_moved"];
  }
  return events;
}
function stateChanges(query2, events, scheduler) {
  events = validateEventsArray(events);
  const childEvent$ = events.map((event) => fromRef(query2, event, "on", scheduler));
  return merge(...childEvent$);
}
function auditTrail(query2, events, scheduler) {
  const auditTrail$ = stateChanges(query2, events).pipe(scan((current, action) => [...current, action], []));
  return waitForLoaded(query2, auditTrail$, scheduler);
}
function loadedData(query2, scheduler) {
  return fromRef(query2, "value", "on", scheduler).pipe(map((data) => {
    let lastKeyToLoad;
    data.payload.forEach((child2) => {
      lastKeyToLoad = child2.key;
      return false;
    });
    return {
      data,
      lastKeyToLoad
    };
  }));
}
function waitForLoaded(query2, action$, scheduler) {
  const loaded$ = loadedData(query2, scheduler);
  return loaded$.pipe(
    withLatestFrom(action$),
    // Get the latest values from the "loaded" and "child" datasets
    // We can use both datasets to form an array of the latest values.
    map(([loaded, actions]) => {
      const lastKeyToLoad = loaded.lastKeyToLoad;
      const loadedKeys = actions.map((snap) => snap.key);
      return {
        actions,
        lastKeyToLoad,
        loadedKeys
      };
    }),
    // This is the magical part, only emit when the last load key
    // in the dataset has been loaded by a child event. At this point
    // we can assume the dataset is "whole".
    skipWhile((meta) => meta.loadedKeys.indexOf(meta.lastKeyToLoad) === -1),
    // Pluck off the meta data because the user only cares
    // to iterate through the snapshots
    map((meta) => meta.actions)
  );
}
function createDataOperationMethod(ref2, operation) {
  return function dataOperation(item, value) {
    return checkOperationCases(item, {
      stringCase: () => ref2.child(item)[operation](value),
      firebaseCase: () => item[operation](value),
      snapshotCase: () => item.ref[operation](value)
    });
  };
}
function createRemoveMethod(ref2) {
  return function remove2(item) {
    if (!item) {
      return ref2.remove();
    }
    return checkOperationCases(item, {
      stringCase: () => ref2.child(item).remove(),
      firebaseCase: () => item.remove(),
      snapshotCase: () => item.ref.remove()
    });
  };
}
function listChanges(ref2, events, scheduler) {
  return fromRef(ref2, "value", "once", scheduler).pipe(switchMap((snapshotAction) => {
    const childEvent$ = [of(snapshotAction)];
    events.forEach((event) => childEvent$.push(fromRef(ref2, event, "on", scheduler)));
    return merge(...childEvent$).pipe(scan(buildView, []));
  }), distinctUntilChanged());
}
function positionFor(changes, key) {
  const len = changes.length;
  for (let i = 0; i < len; i++) {
    if (changes[i].payload.key === key) {
      return i;
    }
  }
  return -1;
}
function positionAfter(changes, prevKey) {
  if (isNil(prevKey)) {
    return 0;
  } else {
    const i = positionFor(changes, prevKey);
    if (i === -1) {
      return changes.length;
    } else {
      return i + 1;
    }
  }
}
function buildView(current, action) {
  const {
    payload,
    prevKey,
    key
  } = action;
  const currentKeyPosition = positionFor(current, key);
  const afterPreviousKeyPosition = positionAfter(current, prevKey);
  switch (action.type) {
    case "value":
      if (action.payload?.exists()) {
        let prevKey2 = null;
        action.payload.forEach((payload2) => {
          const action2 = {
            payload: payload2,
            type: "value",
            prevKey: prevKey2,
            key: payload2.key
          };
          prevKey2 = payload2.key;
          current = [...current, action2];
          return false;
        });
      }
      return current;
    case "child_added":
      if (currentKeyPosition > -1) {
        const previous = current[currentKeyPosition - 1];
        if ((previous?.key || null) !== prevKey) {
          current = current.filter((x) => x.payload.key !== payload.key);
          current.splice(afterPreviousKeyPosition, 0, action);
        }
      } else if (prevKey == null) {
        return [action, ...current];
      } else {
        current = current.slice();
        current.splice(afterPreviousKeyPosition, 0, action);
      }
      return current;
    case "child_removed":
      return current.filter((x) => x.payload.key !== payload.key);
    case "child_changed":
      return current.map((x) => x.payload.key === key ? action : x);
    case "child_moved":
      if (currentKeyPosition > -1) {
        const data = current.splice(currentKeyPosition, 1)[0];
        current = current.slice();
        current.splice(afterPreviousKeyPosition, 0, data);
        return current;
      }
      return current;
    default:
      return current;
  }
}
function snapshotChanges(query2, events, scheduler) {
  events = validateEventsArray(events);
  return listChanges(query2, events, scheduler);
}
function createListReference(query2, afDatabase) {
  const outsideAngularScheduler = afDatabase.schedulers.outsideAngular;
  const refInZone = afDatabase.schedulers.ngZone.run(() => query2.ref);
  return {
    query: query2,
    update: createDataOperationMethod(refInZone, "update"),
    set: createDataOperationMethod(refInZone, "set"),
    push: (data) => refInZone.push(data),
    remove: createRemoveMethod(refInZone),
    snapshotChanges(events) {
      return snapshotChanges(query2, events, outsideAngularScheduler).pipe(keepUnstableUntilFirst);
    },
    stateChanges(events) {
      return stateChanges(query2, events, outsideAngularScheduler).pipe(keepUnstableUntilFirst);
    },
    auditTrail(events) {
      return auditTrail(query2, events, outsideAngularScheduler).pipe(keepUnstableUntilFirst);
    },
    valueChanges(events, options) {
      const snapshotChanges$ = snapshotChanges(query2, events, outsideAngularScheduler);
      return snapshotChanges$.pipe(map((actions) => actions.map((a) => {
        if (options && options.idField) {
          return __spreadValues(__spreadValues({}, a.payload.val()), {
            [options.idField]: a.key
          });
        } else {
          return a.payload.val();
        }
      })), keepUnstableUntilFirst);
    }
  };
}
function createObjectSnapshotChanges(query2, scheduler) {
  return function snapshotChanges2() {
    return fromRef(query2, "value", "on", scheduler);
  };
}
function createObjectReference(query2, afDatabase) {
  return {
    query: query2,
    snapshotChanges() {
      return createObjectSnapshotChanges(query2, afDatabase.schedulers.outsideAngular)().pipe(keepUnstableUntilFirst);
    },
    update(data) {
      return query2.ref.update(data);
    },
    set(data) {
      return query2.ref.set(data);
    },
    remove() {
      return query2.ref.remove();
    },
    valueChanges() {
      const snapshotChanges$ = createObjectSnapshotChanges(query2, afDatabase.schedulers.outsideAngular)();
      return snapshotChanges$.pipe(keepUnstableUntilFirst, map((action) => action.payload.exists() ? action.payload.val() : null));
    }
  };
}
var URL = new InjectionToken("angularfire2.realtimeDatabaseURL");
var USE_EMULATOR2 = new InjectionToken("angularfire2.database.use-emulator");
var AngularFireDatabase = class _AngularFireDatabase {
  schedulers;
  database;
  constructor(options, name3, databaseURL, platformId, zone, schedulers, _useEmulator, auth, useAuthEmulator, authSettings, tenantId, languageCode, useDeviceLanguage, persistence, _appCheckInstances) {
    this.schedulers = schedulers;
    const useEmulator = _useEmulator;
    const app = ɵfirebaseAppFactory(options, zone, name3);
    if (auth) {
      ɵauthFactory(app, zone, useAuthEmulator, tenantId, languageCode, useDeviceLanguage, authSettings, persistence);
    }
    this.database = ɵcacheInstance(`${app.name}.database.${databaseURL}`, "AngularFireDatabase", app.name, () => {
      const database = zone.runOutsideAngular(() => app.database(databaseURL || void 0));
      if (useEmulator) {
        database.useEmulator(...useEmulator);
      }
      return database;
    }, [useEmulator]);
  }
  list(pathOrRef, queryFn) {
    const ref2 = this.schedulers.ngZone.runOutsideAngular(() => getRef(this.database, pathOrRef));
    let query2 = ref2;
    if (queryFn) {
      query2 = queryFn(ref2);
    }
    return createListReference(query2, this);
  }
  object(pathOrRef) {
    const ref2 = this.schedulers.ngZone.runOutsideAngular(() => getRef(this.database, pathOrRef));
    return createObjectReference(ref2, this);
  }
  createPushId() {
    const ref2 = this.schedulers.ngZone.runOutsideAngular(() => this.database.ref());
    return ref2.push().key;
  }
  static ɵfac = function AngularFireDatabase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireDatabase)(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(URL, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(ɵAngularFireSchedulers), ɵɵinject(USE_EMULATOR2, 8), ɵɵinject(AngularFireAuth, 8), ɵɵinject(USE_EMULATOR, 8), ɵɵinject(SETTINGS, 8), ɵɵinject(TENANT_ID, 8), ɵɵinject(LANGUAGE_CODE, 8), ɵɵinject(USE_DEVICE_LANGUAGE, 8), ɵɵinject(PERSISTENCE, 8), ɵɵinject(ɵAppCheckInstances, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AngularFireDatabase,
    factory: _AngularFireDatabase.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireDatabase, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [FIREBASE_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [FIREBASE_APP_NAME]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [URL]
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }, {
    type: ɵAngularFireSchedulers
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR2]
    }]
  }, {
    type: AngularFireAuth,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [SETTINGS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [TENANT_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [LANGUAGE_CODE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_DEVICE_LANGUAGE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [PERSISTENCE]
    }]
  }, {
    type: ɵAppCheckInstances,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var AngularFireDatabaseModule = class _AngularFireDatabaseModule {
  constructor() {
    firebase.registerVersion("angularfire", VERSION.full, "rtdb-compat");
  }
  static ɵfac = function AngularFireDatabaseModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireDatabaseModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularFireDatabaseModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AngularFireDatabase]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireDatabaseModule, [{
    type: NgModule,
    args: [{
      providers: [AngularFireDatabase]
    }]
  }], () => [], null);
})();
export {
  AngularFireDatabase,
  AngularFireDatabaseModule,
  URL,
  USE_EMULATOR2 as USE_EMULATOR,
  auditTrail,
  createListReference,
  fromRef,
  listChanges,
  snapshotChanges,
  stateChanges
};
/*! Bundled license information:

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database-compat/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@angular_fire_compat_database.js.map
