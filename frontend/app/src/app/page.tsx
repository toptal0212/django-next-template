"use client";

import { useGetUsersQuery } from "@/redux/services/userApi";
import { login, logout, me } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
  const count = useAppSelector((state) => state.authReducer.value);
  const dispatch = useAppDispatch();


  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
    <button onClick={() => dispatch(login())}>increment</button>
      <button onClick={() => dispatch(logout())}>logout</button>
      <button onClick={() => dispatch(me())}>me</button>
    </main>
  );
}
