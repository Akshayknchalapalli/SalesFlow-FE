import { createAsyncThunk, createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";

export interface GenericState<T = any, E = any> {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: T | null;
  error: E | null;
  extraData?: any;
}

export interface GenericExtraReducers<T = any, E = any> {
  [key: string]: (state: GenericState<T, E>, action: PayloadAction<any>) => void;
}

export interface GenericThunkOptions {
  // Disable automatic error handling
  disableErrorHandling?: boolean;
  // Transform the response data before setting it in the state
  transformResponse?: (response: any) => any;
  // Transform the error data before setting it in the state
  transformError?: (error: any) => any;
  // Custom request options
  requestOptions?: {
    headers?: Record<string, string>;
    timeout?: number;
    baseURL?: string;
  };
}

export interface CreateGenericSliceOptions<T = any, E = any> {
  name: string;
  initialState?: Partial<GenericState<T, E>>;
  extraReducers?: GenericExtraReducers<T, E>;
  thunkOptions?: GenericThunkOptions;
}

export const createEnhancedGenericSlice = <T = any, E = any, P = any>(
  options: CreateGenericSliceOptions<T, E>,
  apiCall: (payload: P) => Promise<any>
) => {
  const { name, initialState = {}, extraReducers = {}, thunkOptions = {} } = options;

  const defaultState: GenericState<T, E> = {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  };

  const thunk = createAsyncThunk<T, P, { rejectValue: E }>(
    name,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await apiCall(payload);
        // Allow transforming the response before it's set in the state
        if (thunkOptions.transformResponse) {
          return thunkOptions.transformResponse(response);
        }
        return response;
      } catch (error: any) {
        // Disable automatic error handling if requested
        if (thunkOptions.disableErrorHandling) {
          throw error;
        }
        
        // Allow transforming the error before it's set in the state
        const transformedError = thunkOptions.transformError 
          ? thunkOptions.transformError(error)
          : error.response?.data || error.message || 'Unknown error occurred';
          
        return rejectWithValue(transformedError as E);
      }
    }
  );

  const slice = createSlice({
    name,
    initialState: defaultState,
    reducers: {
      setData: (state, action: PayloadAction<T>) => {
        state.data = action.payload as Draft<T> | null;
      },
      setError: (state, action: PayloadAction<E>) => {
        state.error = action.payload as Draft<E> | null;
      },
      setStatus: (state, action: PayloadAction<GenericState<T, E>["status"]>) => {
        state.status = action.payload;
      },
      setExtraData: (state, action: PayloadAction<any>) => {
        state.extraData = action.payload;
      },
      resetState: (state) => {
        state.status = "idle";
        state.data = null;
        state.error = null;
        if (state.extraData !== undefined) {
          state.extraData = null;
        }
      },
      ...extraReducers,
    },
    extraReducers: (builder) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload as Draft<T> | null;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload as Draft<E> | null;
        });
    },
  });

  return {
    slice,
    thunk,
    reducer: slice.reducer,
    actions: slice.actions,
  };
};