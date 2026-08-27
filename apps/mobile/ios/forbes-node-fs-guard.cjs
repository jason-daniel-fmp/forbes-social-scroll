/**
 * Softens EPERM/EACCES when Node walks up into an unreadable parent node_modules.
 * Without this, Expo's "[Expo] Configure project" script can crash on macOS
 * if e.g. /Users/.../Projects/node_modules exists but cannot be scanned.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BLOCKED_CODES = new Set(['EPERM', 'EACCES']);

function isNodeModulesPath(target) {
  if (typeof target !== 'string' || target.length === 0) {
    return false;
  }
  const normalized = path.resolve(target);
  return normalized === 'node_modules' || normalized.endsWith(`${path.sep}node_modules`);
}

function softEmptyOnBlocked(error, emptyValue) {
  if (error && BLOCKED_CODES.has(error.code) && isNodeModulesPath(error.path || '')) {
    return emptyValue;
  }
  throw error;
}

const originalReaddirSync = fs.readdirSync.bind(fs);
fs.readdirSync = function patchedReaddirSync(target, options) {
  try {
    return originalReaddirSync(target, options);
  } catch (error) {
    return softEmptyOnBlocked(error, []);
  }
};

const originalReaddir = fs.readdir.bind(fs);
fs.readdir = function patchedReaddir(target, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  if (typeof callback === 'function') {
    return originalReaddir(target, options, (error, files) => {
      if (error && BLOCKED_CODES.has(error.code) && isNodeModulesPath(error.path || target)) {
        callback(null, []);
        return;
      }
      callback(error, files);
    });
  }

  return originalReaddir(target, options).catch((error) => {
    if (BLOCKED_CODES.has(error.code) && isNodeModulesPath(error.path || target)) {
      return [];
    }
    throw error;
  });
};

try {
  const originalPromisesReaddir = fs.promises.readdir.bind(fs.promises);
  fs.promises.readdir = async function patchedPromisesReaddir(target, options) {
    try {
      return await originalPromisesReaddir(target, options);
    } catch (error) {
      return softEmptyOnBlocked(error, []);
    }
  };
} catch {
  // Older Node without fs.promises — ignore.
}
