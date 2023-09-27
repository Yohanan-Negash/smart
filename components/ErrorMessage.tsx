export default function ErrorMessage({ message }) {
  return (
    <div className='bg-red-500 text-white p-2 rounded mt-4'>{message}</div>
  );
}
