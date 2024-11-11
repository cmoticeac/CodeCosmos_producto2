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
import {
  AngularFireAuth,
  LANGUAGE_CODE,
  PERSISTENCE,
  SETTINGS,
  TENANT_ID,
  USE_DEVICE_LANGUAGE,
  USE_EMULATOR,
  ɵauthFactory
} from "./chunk-LICU6LHJ.js";
import "./chunk-UV2BQ6X2.js";
import {
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
  ɵcacheInstance,
  ɵfirebaseAppFactory
} from "./chunk-JXHIFBH6.js";
import {
  firebase
} from "./chunk-ARMIPHK3.js";
import "./chunk-UXNI2VDG.js";
import "./chunk-45AXUQUO.js";
import {
  VERSION,
  keepUnstableUntilFirst,
  ɵAngularFireSchedulers,
  ɵAppCheckInstances
} from "./chunk-F7O7ZNNE.js";
import "./chunk-PFEPKP7F.js";
import {
  Component,
  ComponentContainer,
  Deferred,
  Logger,
  Provider,
  errorPrefix,
  validateArgCount,
  validateCallback,
  validateContextObject
} from "./chunk-7EG3QRLR.js";
import "./chunk-ZGQ7RQJI.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Observable,
  Optional,
  PLATFORM_ID,
  asyncScheduler,
  distinctUntilChanged,
  map,
  merge,
  of,
  scan,
  setClassMetadata,
  share,
  skipWhile,
  switchMap,
  withLatestFrom,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ZKL6ZUTH.js";
import "./chunk-NTERNHDG.js";
import {
  __spreadValues
} from "./chunk-35ENWJA4.js";

// node_modules/@firebase/database-compat/dist/index.esm2017.js
var name = "@firebase/database-compat";
var version = "1.0.8";
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
  startAt(value = null, name2) {
    validateArgCount("Query.startAt", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, startAt(value, name2)));
  }
  startAfter(value = null, name2) {
    validateArgCount("Query.startAfter", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, startAfter(value, name2)));
  }
  endAt(value = null, name2) {
    validateArgCount("Query.endAt", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, endAt(value, name2)));
  }
  endBefore(value = null, name2) {
    validateArgCount("Query.endBefore", 0, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, endBefore(value, name2)));
  }
  /**
   * Load the selection of children with exactly the specified value, and, optionally,
   * the specified name.
   */
  equalTo(value, name2) {
    validateArgCount("Query.equalTo", 1, 2, arguments.length);
    return new _Query(this.database, query(this._delegate, equalTo(value, name2)));
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
  version: version2,
  customAuthImpl,
  customAppCheckImpl,
  namespace,
  nodeAdmin = false
}) {
  setSDKVersion(version2);
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
  instance.registerVersion(name, version);
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
  constructor(options, name2, databaseURL, platformId, zone, schedulers, _useEmulator, auth, useAuthEmulator, authSettings, tenantId, languageCode, useDeviceLanguage, persistence, _appCheckInstances) {
    this.schedulers = schedulers;
    const useEmulator = _useEmulator;
    const app = ɵfirebaseAppFactory(options, zone, name2);
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
