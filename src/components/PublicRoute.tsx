import { useTokenStore } from "@/stores/token/token.store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const accessToken = useTokenStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/tasks" replace />;
  }

  return <>{children}</>;
}
