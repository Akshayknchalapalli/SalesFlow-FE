import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IData {
  status: "loading" | "succeeded" | "failed" | "idle";
  data: any;
}

export const createGenericSlice = (name: string, apiCall: any) => {
  const initialState: IData = {
    status: "idle",
    data: null,
  };

  const thunk = createAsyncThunk(
    name,
    async (payload: any, { rejectWithValue }) => {
      try {
        const response = await apiCall(payload);
        return response?.data;
      } catch (error: any) {
        return rejectWithValue(error.response || "An error occurred");
      }
    }
  );

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setData: (state, action) => {
        state.data = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = "loading";
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(thunk.rejected, (state) => {
          state.status = "failed";
        });
    },
  });

  return { slice, thunk };
};
