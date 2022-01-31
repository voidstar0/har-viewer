export interface Creator {
  name: string;
  version: string;
  comment?: string;
}

export interface Browser {
  name: string;
  version: string;
  comment?: string;
}

export interface PageTimings {
  onContentLoad?: number;
  onLoad?: number;
  comment?: string;
}

export interface Page {
  startedDateTime: string;
  id: string;
  title: string;
  pageTimings: PageTimings;
  comment?: string;
}

export interface QueryString {
  name: string;
  value: string;
  comment?: string;
}

export interface Parameter {
  name: string;
  value?: string;
  fileName?: string;
  contentType?: string;
  comment?: string;
}

export interface PostData {
  mimeType: string;
  params: Parameter[];
  text: string;
  comment?: string;
}

export interface HarRequest {
  method: string;
  url: string;
  httpVersion: string;
  cookies: Cookie[];
  headers: Header[];
  queryString: QueryString[];
  postData?: PostData;
  headersSize: number;
  bodySize: number;
  comment?: string;
}

export interface Content {
  size: number;
  compression?: number;
  mimeType: string;
  text?: string;
  encoding?: string;
  comment?: string;
}

export interface HarResponse {
  status: number;
  statusText: string;
  httpVersion: string;
  cookies: Cookie[];
  headers: Header[];
  content: Content;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
  comment?: string;
  _transferSize?: number;
}

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: string | null;
  httpOnly?: boolean;
  secure?: boolean;
  comment?: string;
}

export interface Header {
  name: string;
  value: string;
  comment?: string;
}

export interface BeforeAfterRequest {
  expires: string;
  lastAccess: string;
  eTag: string;
  hitCount: number;
  comment?: string;
}

export interface Timing {
  blocked?: number;
  dns?: number;
  connect?: number;
  send: number;
  wait: number;
  receive: number;
  ssl?: number;
  comment?: string;
}

export interface Cache {
  beforeRequest?: BeforeAfterRequest;
  afterRequest?: BeforeAfterRequest;
  comment?: string;
}

export interface Entry {
  pageref?: string;
  startedDateTime: string;
  time: number;
  request: HarRequest;
  response: HarResponse;
  cache: Cache;
  timings: Timing;
  serverIPAddress?: string;
  connection?: string;
  comment?: string;
  uuid?: string;
}

export interface Log {
  version: string;
  creator: Creator;
  browser?: Browser;
  pages?: Page[];
  entries: Entry[];
  comment?: string;
}

export interface Har {
  log: Log;
}
