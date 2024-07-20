const ProfilePage = ({ params }) => {
  return (
    <div className='font-bold bg-zinc-900 h-full text-white flex justify-center'>
      {params.name}
    </div>
  );
};

export default ProfilePage;
