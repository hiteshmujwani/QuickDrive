export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URL = `${BASE_URL}/api`;

export const UPLOAD_FILE = `${API_URL}/createfiledoc`;
export const GET_FILE_USER = `${API_URL}/getfiledoc`;
export const GET_FILE_PUBLIC = `${API_URL}/getfiledocpublic`;
export const SEND_EMAIL = `${API_URL}/send-email`;
export const UPDATE_FILE = `${API_URL}/updatefiledoc`;
export const GET_USER_FILES = `${API_URL}/getuserfiles`;
