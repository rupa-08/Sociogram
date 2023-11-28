import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Models } from "appwrite";

import { Button } from "../ui/button";
import GridPostList from "./GridPostList";

type CurrentUserProfilePorps = {
  currentProfile: Models.Document;
  isLoggedInUser: boolean;
};

const ProfileCard = ({
  currentProfile,
  isLoggedInUser,
}: CurrentUserProfilePorps) => {
  const [activeTab, setActiveTab] = useState("posts");

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const savedPosts =
    currentProfile?.save?.length > 0 &&
    currentProfile?.save.map((item: Models.Document) => item.post);

  const handleEditProfile = () => {
    navigate(`/update-profile/${currentProfile?.$id}`);
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <img
            src={
              currentProfile?.imageUrl ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="h-20 w-20 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="h3-bold lg:h2-bold">{currentProfile.name}</h2>
            <p className="base-medium text-light-3">
              @{currentProfile.username}
            </p>
          </div>
        </div>

        {isLoggedInUser ? (
          <Button
            type="button"
            onClick={() => handleEditProfile()}
            className="shad-button_dark_4"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button className="shad-button_primary">Follow</Button>
            <Button className="shad-button_secondary">Message</Button>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-5 w-full justify-between px-24 gap-5">
        <p>{currentProfile?.bio}</p>
        <div className="flex flex-col">
          <p className="text-primary-500">Posts</p>
          <p>{currentProfile?.posts?.length}</p>
        </div>
      </div>

      <hr className="border w-full border-white/40 my-5" />

      <div className="flex gap-6">
        <Button
          type="button"
          className={`border ${
            activeTab === "posts"
              ? "border-primary-500 text-primary-500"
              : "border-slate-400 text-slate-400"
          } mb-6 text-sm`}
          onClick={() => handleTabClick("posts")}
        >
          Posts
        </Button>

        <Button
          type="button"
          className={`border ${
            activeTab === "saved"
              ? "border-primary-500 text-primary-500"
              : "border-slate-400 text-slate-400"
          } mb-6 text-sm`}
          onClick={() => handleTabClick("saved")}
        >
          Saved
        </Button>

        <Button
          type="button"
          className={`border ${
            activeTab === "liked"
              ? "border-primary-500 text-primary-500"
              : "border-slate-400 text-slate-400"
          } mb-6 text-sm`}
          onClick={() => handleTabClick("liked")}
        >
          Liked
        </Button>
      </div>

      {activeTab === "saved" && savedPosts && (
        <GridPostList posts={savedPosts} showStats={false} showUser={false} />
      )}

      {activeTab === "liked" && currentProfile?.liked?.length > 0 && (
        <GridPostList
          posts={currentProfile?.liked}
          showStats={false}
          showUser={false}
        />
      )}

      {activeTab === "posts" && currentProfile?.posts?.length > 0 && (
        <GridPostList
          posts={currentProfile?.posts}
          showStats={false}
          showUser={false}
        />
      )}
    </div>
  );
};

export default ProfileCard;
