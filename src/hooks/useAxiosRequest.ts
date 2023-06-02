import * as React from 'react';

import { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

type ExtractResponse<Type> = Type extends Promise<infer X> ? (X extends AxiosResponse<infer XX> ? XX : never) : never;

interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

type Action<Data> = {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
  payload?: { data?: Data; error?: Error };
};
type State<Data> = {
  isLoading: boolean;
  isError: boolean;
  data: Data | void;
  error: Error | void;
};

function getDataFetchReducer<Data>() {
  return (state: State<Data>, action: Action<Data>): State<Data> => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'FETCH_SUCCESS':
        return {
          isLoading: false,
          isError: false,
          data: action.payload?.data,
          error: void 0,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
          error: action.payload?.error,
        };
      default:
        return {
          ...state,
        };
    }
  };
}

export function useAxiosRequest<
  ApiGetter extends (
    config: ApiConfig,
    params: Omit<AxiosRequestConfig<unknown>, 'data' | 'params' | 'url'>,
  ) => Record<keyof ReturnType<ApiGetter>, ReturnType<ApiGetter>[keyof ReturnType<ApiGetter>]>,
  Method extends keyof ReturnType<ApiGetter>,
>(
  api: ApiGetter,
  method: Method,
  initialData: ExtractResponse<ReturnType<ReturnType<ApiGetter>[Method]>>,
  config: ApiConfig = {},
  params: Omit<AxiosRequestConfig<unknown>, 'data' | 'params' | 'url'> = {},
): [
  callApi: ($args: Parameters<ReturnType<ApiGetter>[Method]>) => void,
  state: State<ExtractResponse<ReturnType<ReturnType<ApiGetter>[Method]>>>,
] {
  const [args, setArgs] = React.useState<Parameters<ReturnType<ApiGetter>[Method]> | null>(null);

  const [state, dispatch] = React.useReducer(
    getDataFetchReducer<ExtractResponse<ReturnType<ReturnType<ApiGetter>[Method]>>>(),
    {
      isLoading: false,
      isError: false,
      data: initialData,
      error: void 0,
    },
  );

  const callApi = ($args: Parameters<ReturnType<ApiGetter>[Method]>) => {
    setArgs($args);
  };

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (args) {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await api(config, params)[method](...args);

          if (!didCancel) {
            dispatch({ type: 'FETCH_SUCCESS', payload: { data: result.data } });
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({
              type: 'FETCH_FAILURE',
              payload: { error: error as Error },
            });
          }
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [args]); // eslint-disable-line react-hooks/exhaustive-deps

  return [callApi, state];
}
