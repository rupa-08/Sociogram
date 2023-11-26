import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { updateUserValidation } from "@/lib/validation";
import ProfileImageUploader from "../shared/ProfileImageUploader";
import {
  useGetOtherUserProfile,
  useUpdateUserData,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "../shared/Loader";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const { toast } = useToast();

  // queries
  const { data: currentUser } = useGetOtherUserProfile(id || "");
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUserData();

  // form validation
  const form = useForm<z.infer<typeof updateUserValidation>>({
    resolver: zodResolver(updateUserValidation),
    defaultValues: {
      file: [],
      name: user ? user?.name : "",
      username: user ? user?.username : "",
      email: user ? user?.email : "",
      bio: user ? user.bio : "",
    },
  });

  // form submission handle
  const handleProfileUpdate = async (
    value: z.infer<typeof updateUserValidation>
  ) => {
    if (currentUser) {
      const updatedUser = await updateUser({
        userId: currentUser?.$id,
        name: value.name,
        bio: value.bio,
        file: value.file,
        imageUrl: currentUser?.imageUrl,
        imageId: currentUser?.imageId,
      });

      if (!updateUser) {
        toast({ title: "Please try again." });
      }

      setUser({
        ...user,
        name: updatedUser?.name,
        bio: updatedUser?.bio,
        imageUrl: updatedUser?.imageUrl,
      });
      return navigate(`/profile/${id}`);
    }
  };

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleProfileUpdate)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <ProfileImageUploader
                    fieldChange={field.onChange}
                    mediaUrl={user.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="shad-input"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <Button type="submit" className="shad-button_primary whitespace-nowrap">
          {isUpdatingUser ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
