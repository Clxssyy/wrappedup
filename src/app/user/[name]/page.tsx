const ProfilePage = ({ params }: { params: { name: string } }) => {
  return <div>{params.name}</div>;
};

export default ProfilePage;
