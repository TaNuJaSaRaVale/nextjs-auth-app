export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-center text-lg font-semibold text-gray-700"> Profile Page</p>
      <span className="text-center text-lg font-semibold text-gray-700">{params.id}</span>
    </div>
  );
}
