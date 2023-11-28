import EditProfile from "@/components/forms/EditProfile";

const UpdateProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-row gap-4">
          <img src="/assets/icons/edit.svg" alt="edit" height={35} width={35} />
          <h2 className="h3-bold md:h2-bold">Edit Profile</h2>
        </div>

        <EditProfile />
      </div>
    </div>
  );
};

export default UpdateProfile;
