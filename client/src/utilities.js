import { useEffect, useState } from "react";

/**
 * Utility functions to make API requests.
 * By importing this file, you can use the provided get and post functions.
 * You shouldn't need to modify this file, but if you want to learn more
 * about how these functions work, google search "Fetch API"
 *
 * These functions return promises, which means you should use ".then" on them.
 * e.g. get('/api/foo', { bar: 0 }).then(res => console.log(res))
 */

// ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

// convert a fetch result to a JSON object with error handling for fetch and json errors
function convertToJSON(res) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      console.log(res);
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
}

// Helper code to convert Greenwich time to local time
export function convertToLocalTime(date) {
  let currentDate = new Date(date);
  return currentDate.toLocaleString('zh-CN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}

// Helper code to make a delete request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function deleteHelper(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath, {
    method: "delete",
    headers: { "Content-type": "application/json" },
  })
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}


// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function post(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}

// Helper code to make a put request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function put(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "put",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `PUT request to ${endpoint} failed with error:\n${error}`;
    });
}

export function toFirstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const urls = [
  ["user", "/api/users"],
  ["topic", "/api/topics"],
  ["story", "/api/stories"],
  ["comment", "/api/comments"],
  ["reply", "/api/replies"]
]

export const dashboardUrlMap = new Map(urls);

// export const userTableHeader =
//   <thead>
//     <tr>
//       <th>User Name</th>
//       <th>User ID</th>
//       <th>Is Administrator</th>
//       <th>Status</th>
//       <th>Operation</th>
//     </tr>
//   </thead>;
//
// const topicTableHeader =
//   <thead>
//     <tr>
//       <th>Topic Name</th>
//       <th>Topic ID</th>
//       <th>Description</th>
//       <th>Operation</th>
//     </tr>
//   </thead>;
//
// const storyTableHeader =
//   <thead>
//     <tr>
//       <th>Story Title</th>
//       <th>Content</th>
//       <th>Topic</th>
//       <th>Comment Count</th>
//       <th>Last Comment Time</th>
//       <th>Creator Name</th>
//       <th>Create Time</th>
//     </tr>
//   </thead>;
//
// const commentTableHeader =
//   <thead>
//   <tr>
//     <th>Creator NAme</th>
//     <th>Content</th>
//     <th>Reply Count</th>
//     <th>Last Reply Time</th>
//     <th>Create Time</th>
//     <th>Parent ID</th>
//   </tr>
//   </thead>;
//
// const replyTableHeader =
//   <thead>
//     <tr>
//       <th>From Name</th>
//       <th>To Name</th>
//       <th>content</th>
//       <th>Create Time</th>
//       <th>Comment ID</th>
//     </tr>
//   </thead>;
//
// const tableHeaders = [
//   ["user", userTableHeader],
//   ["topic", topicTableHeader],
//   ["story", storyTableHeader],
//   ["comment", commentTableHeader],
//   ["reply", replyTableHeader]
// ]
//
// export const tableHeaderMap = new Map(tableHeaders);
