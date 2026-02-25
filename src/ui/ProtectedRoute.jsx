/**
 * ProtectedRoute wrapper.
 *
 * Currently this app allows guest browsing, so we simply render children.
 * To enforce login, uncomment the redirect below.
 */
export default function ProtectedRoute({ children }) {
  // const { user } = useAppContext();
  // if (!user) return <Navigate to="/login" replace />;
  return children;
}
