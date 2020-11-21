import React, { useEffect } from "react";
import { usePropertyState, usePropertyDispatch, getUploaded } from "../../contexts";
import { UploadedUI } from "./UploadedUI";
export * from "./UploadedUI";
export function Uploaded({ limit }) {
  const { error, loading, uploaded } = usePropertyState();
  const PropertyDispatch = usePropertyDispatch();
  useEffect(() => {
    getUploaded(PropertyDispatch);
    // eslint-disable-next-line
  },[]);
  return (
    <UploadedUI
      error={error}
      loading={loading}
      uploaded={uploaded}
      limit={limit}
    />
  );
}
