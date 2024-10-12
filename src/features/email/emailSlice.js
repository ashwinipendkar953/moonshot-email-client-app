import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URl = "https://flipkart-email-mock.vercel.app";

export const fetchEmails = createAsyncThunk(
  "email/fetchEmails",
  async (pageNumber = 1) => {
    try {
      const response = await axios.get(`${API_URl}/?page=${pageNumber}`);
      return {
        data: response.data,
        totalPages: 2,
        currentPage: pageNumber,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchEmailBody = createAsyncThunk(
  "email/fetchEmailBody",
  async (emailId) => {
    try {
      const response = await axios.get(`${API_URl}/?id=${emailId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  emails: [],
  totalEmails: [],
  emailBody: {},
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  readEmails: JSON.parse(localStorage.getItem("readEmails")) || [],
  selectedEmail: null,
  activeFilter: "all",
  currentPage: 1,
  totalPages: 2,
  status: "idle",
  error: null,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },

    setFavorites: (state, action) => {
      const email = action.payload;
      const exists = state.favorites.find((el) => el.id === email.id);
      if (!exists) {
        state.favorites = [email, ...state.favorites];

        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },

    setReadEmails: (state, action) => {
      const email = action.payload;
      const exists = state.readEmails.find((el) => el.id === email.id);
      if (!exists) {
        state.readEmails = [email, ...state.readEmails];
        localStorage.setItem("readEmails", JSON.stringify(state.readEmails));
      }
    },

    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        console.log(action);
        state.status = "success";
        state.emails = action.payload?.data.list;
        state.totalEmails = action.payload?.data.total;

        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchEmailBody.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.status = "success";
        state.emailBody = action.payload?.body;
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedEmail,
  setFavorites,
  setReadEmails,
  setActiveFilter,
} = emailSlice.actions;
export const emailReducer = emailSlice.reducer;
